
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export type SavingsGoal = {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
  created_at: string;
  updated_at: string;
  user_id: string;
};

export type NewSavingsGoal = {
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
  user_id: string;
};

export const getSavingsGoals = async () => {
  try {
    const { data: session } = await supabase.auth.getSession();
    const userId = session.session?.user.id;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("savings_goals")
      .select("*")
      .eq("user_id", userId)
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

export const createSavingsGoal = async (goal: Omit<NewSavingsGoal, "user_id">) => {
  try {
    const { data: session } = await supabase.auth.getSession();
    const userId = session.session?.user.id;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const goalWithUserId = { ...goal, user_id: userId };

    const { data, error } = await supabase
      .from("savings_goals")
      .insert([goalWithUserId])
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
