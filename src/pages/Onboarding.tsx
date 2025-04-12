
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import { PiggyBank, DollarSign, BarChart4, ArrowRight } from "lucide-react";

// Step 1: Income Setup
const incomeSchema = z.object({
  monthlyIncome: z.string().refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
    { message: "Monthly income must be a positive number" }
  ),
});

// Step 2: Expense Categories
const expenseCategorySchema = z.object({
  categoryName: z.string().min(1, "Category name is required"),
  budgetAmount: z.string().refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
    { message: "Budget amount must be a positive number" }
  ),
});

// Step 3: Savings Goal
const savingsGoalSchema = z.object({
  goalName: z.string().min(1, "Goal name is required"),
  targetAmount: z.string().refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
    { message: "Target amount must be a positive number" }
  ),
  deadline: z.string().refine(
    (val) => {
      const date = new Date(val);
      return date > new Date();
    },
    { message: "Deadline must be in the future" }
  ),
});

type IncomeFormValues = z.infer<typeof incomeSchema>;
type ExpenseCategoryFormValues = z.infer<typeof expenseCategorySchema>;
type SavingsGoalFormValues = z.infer<typeof savingsGoalSchema>;

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<string>("income");
  const [expenseCategories, setExpenseCategories] = useState<{ name: string; budget: number }[]>([]);
  const [userProfile, setUserProfile] = useState<any>({
    monthlyIncome: 0,
    expenseCategories: [],
    savingsGoal: null,
  });

  // Form for income
  const incomeForm = useForm<IncomeFormValues>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      monthlyIncome: "",
    },
  });

  // Form for expense categories
  const expenseCategoryForm = useForm<ExpenseCategoryFormValues>({
    resolver: zodResolver(expenseCategorySchema),
    defaultValues: {
      categoryName: "",
      budgetAmount: "",
    },
  });

  // Form for savings goal
  const savingsGoalForm = useForm<SavingsGoalFormValues>({
    resolver: zodResolver(savingsGoalSchema),
    defaultValues: {
      goalName: "",
      targetAmount: "",
      deadline: "",
    },
  });

  const onIncomeSubmit = (data: IncomeFormValues) => {
    setUserProfile({
      ...userProfile,
      monthlyIncome: parseFloat(data.monthlyIncome),
    });
    setCurrentStep("expenses");
    toast({
      title: "Income saved",
      description: "Your monthly income has been saved. Now let's set up your expense categories.",
    });
  };

  const onAddExpenseCategory = (data: ExpenseCategoryFormValues) => {
    const newCategory = {
      name: data.categoryName,
      budget: parseFloat(data.budgetAmount),
    };
    
    setExpenseCategories([...expenseCategories, newCategory]);
    expenseCategoryForm.reset();
    
    toast({
      title: "Category added",
      description: `${data.categoryName} has been added with a budget of $${data.budgetAmount}.`,
    });
  };

  const onExpenseSubmit = () => {
    if (expenseCategories.length === 0) {
      toast({
        title: "No categories added",
        description: "Please add at least one expense category.",
        variant: "destructive",
      });
      return;
    }

    setUserProfile({
      ...userProfile,
      expenseCategories,
    });
    
    setCurrentStep("savings");
    
    toast({
      title: "Expenses saved",
      description: "Your expense categories have been saved. Now let's set your savings goal.",
    });
  };

  const onSavingsGoalSubmit = (data: SavingsGoalFormValues) => {
    const savingsGoal = {
      name: data.goalName,
      targetAmount: parseFloat(data.targetAmount),
      deadline: new Date(data.deadline).toISOString(),
    };

    setUserProfile({
      ...userProfile,
      savingsGoal,
    });

    // In a real app, we would save this to Supabase
    console.log("Completed user profile:", {
      ...userProfile,
      savingsGoal,
    });

    toast({
      title: "Profile setup complete!",
      description: "Your financial profile has been set up successfully.",
    });

    navigate("/dashboard");
  };

  return (
    <MainLayout showNavigation={false}>
      <div className="mx-auto max-w-4xl">
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Set Up Your Financial Profile</CardTitle>
            <CardDescription className="text-center">
              Let's get to know your financial situation to help you achieve your goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={currentStep} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="income" disabled={currentStep !== "income"}>
                    <DollarSign className="mr-2 h-4 w-4" />
                    Income
                  </TabsTrigger>
                  <TabsTrigger value="expenses" disabled={currentStep !== "expenses"}>
                    <BarChart4 className="mr-2 h-4 w-4" />
                    Expenses
                  </TabsTrigger>
                  <TabsTrigger value="savings" disabled={currentStep !== "savings"}>
                    <PiggyBank className="mr-2 h-4 w-4" />
                    Savings Goal
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Income Setup */}
              <TabsContent value="income">
                <Form {...incomeForm}>
                  <form onSubmit={incomeForm.handleSubmit(onIncomeSubmit)} className="space-y-4">
                    <FormField
                      control={incomeForm.control}
                      name="monthlyIncome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What's your monthly income after taxes?</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                              <Input className="pl-10" placeholder="0.00" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end">
                      <Button type="submit">
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>

              {/* Expense Categories */}
              <TabsContent value="expenses">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Add Expense Categories</h3>
                    <p className="text-sm text-gray-500">
                      Create categories for your monthly expenses and set budget limits
                    </p>
                  </div>

                  <Form {...expenseCategoryForm}>
                    <form onSubmit={expenseCategoryForm.handleSubmit(onAddExpenseCategory)} className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="md:col-span-1">
                        <FormField
                          control={expenseCategoryForm.control}
                          name="categoryName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Groceries" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="md:col-span-1">
                        <FormField
                          control={expenseCategoryForm.control}
                          name="budgetAmount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Budget Amount</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                  <Input className="pl-10" placeholder="0.00" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex items-end">
                        <Button type="submit" variant="outline" className="w-full">Add Category</Button>
                      </div>
                    </form>
                  </Form>

                  {/* Display added categories */}
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Your Categories</h4>
                    {expenseCategories.length > 0 ? (
                      <div className="space-y-2">
                        {expenseCategories.map((category, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <span>{category.name}</span>
                            <span className="font-medium">${category.budget.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No categories added yet.</p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={onExpenseSubmit}>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Savings Goal */}
              <TabsContent value="savings">
                <Form {...savingsGoalForm}>
                  <form onSubmit={savingsGoalForm.handleSubmit(onSavingsGoalSubmit)} className="space-y-4">
                    <FormField
                      control={savingsGoalForm.control}
                      name="goalName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What are you saving for?</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Emergency Fund, Vacation, New Car" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={savingsGoalForm.control}
                      name="targetAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How much do you want to save?</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                              <Input className="pl-10" placeholder="0.00" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={savingsGoalForm.control}
                      name="deadline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>By when do you want to reach this goal?</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-4 flex justify-end">
                      <Button type="submit">Complete Setup</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Onboarding;
