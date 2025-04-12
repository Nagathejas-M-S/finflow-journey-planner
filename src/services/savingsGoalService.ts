
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export type SavingsGoal = {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
  created_at: string;
  updated_at: string;
};

export type NewSavingsGoal = {
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
};

export const getSavingsGoals = async () => {
  try {
    const { data, error } = await supabase
      .from("savings_goals")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data as SavingsGoal[];
  } catch (error) {
    console.error("Error fetching savings goals:", error);
    toast({
      title: "Error",
      description: "Failed to load savings goals. Please try again.",
      variant: "destructive",
    });
    return [];
  }
};

export const createSavingsGoal = async (goal: NewSavingsGoal) => {
  try {
    const { data, error } = await supabase
      .from("savings_goals")
      .insert([goal])
      .select();

    if (error) {
      throw error;
    }

    return data[0] as SavingsGoal;
  } catch (error) {
    console.error("Error creating savings goal:", error);
    toast({
      title: "Error",
      description: "Failed to create savings goal. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

export const updateSavingsGoal = async (id: string, updates: Partial<SavingsGoal>) => {
  try {
    const { error } = await supabase
      .from("savings_goals")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error updating savings goal:", error);
    toast({
      title: "Error",
      description: "Failed to update savings goal. Please try again.",
      variant: "destructive",
    });
    return false;
  }
};

export const deleteSavingsGoal = async (id: string) => {
  try {
    const { error } = await supabase
      .from("savings_goals")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error deleting savings goal:", error);
    toast({
      title: "Error",
      description: "Failed to delete savings goal. Please try again.",
      variant: "destructive",
    });
    return false;
  }
};
