
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export type ExpenseCategory = {
  id: string;
  name: string;
  budget: number;
  created_at: string;
  user_id: string;
};

export type Expense = {
  id: string;
  category_id: string | null;
  amount: number;
  description: string;
  date: string;
  created_at: string;
  user_id: string;
};

export type NewExpense = {
  category_id: string | null;
  amount: number;
  description: string;
  date: string;
  user_id: string;
};

export const getExpenseCategories = async () => {
  try {
    const { data: session } = await supabase.auth.getSession();
    const userId = session.session?.user.id;
    
    if (!userId) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from("expense_categories")
      .select("*")
      .eq("user_id", userId)
      .order("name", { ascending: true });

    if (error) {
      throw error;
    }

    return data as ExpenseCategory[];
  } catch (error) {
    console.error("Error fetching expense categories:", error);
    toast({
      title: "Error",
      description: "Failed to load expense categories. Please try again.",
      variant: "destructive",
    });
    return [];
  }
};

export const updateCategoryBudget = async (id: string, budget: number) => {
  try {
    const { error } = await supabase
      .from("expense_categories")
      .update({ budget })
      .eq("id", id);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error updating category budget:", error);
    toast({
      title: "Error",
      description: "Failed to update budget. Please try again.",
      variant: "destructive",
    });
    return false;
  }
};

export const getExpenses = async (startDate: string, endDate: string) => {
  try {
    const { data: session } = await supabase.auth.getSession();
    const userId = session.session?.user.id;
    
    if (!userId) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", userId)
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: false });

    if (error) {
      throw error;
    }

    return data as Expense[];
  } catch (error) {
    console.error("Error fetching expenses:", error);
    toast({
      title: "Error",
      description: "Failed to load expenses. Please try again.",
      variant: "destructive",
    });
    return [];
  }
};

export const createExpense = async (expense: Omit<NewExpense, "user_id">) => {
  try {
    const { data: session } = await supabase.auth.getSession();
    const userId = session.session?.user.id;
    
    if (!userId) {
      throw new Error("User not authenticated");
    }
    
    const expenseWithUserId = { ...expense, user_id: userId };
    
    const { data, error } = await supabase
      .from("expenses")
      .insert([expenseWithUserId])
      .select();

    if (error) {
      throw error;
    }

    return data[0] as Expense;
  } catch (error) {
    console.error("Error creating expense:", error);
    toast({
      title: "Error",
      description: "Failed to create expense. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};
