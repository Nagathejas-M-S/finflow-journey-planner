
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import MainLayout from "@/components/layout/MainLayout";
import { PiggyBank, Wallet, ArrowUpRight, DollarSign, BarChart3 } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import SavingsGoalsSection from "@/components/sections/SavingsGoalsSection";
import AIAssistantSection from "@/components/sections/AIAssistantSection";
import { useAuth } from "@/contexts/AuthContext";
import { formatCurrency } from "@/lib/formatters";

// Create a client
const queryClient = new QueryClient();

const DashboardContent = () => {
  const { user } = useAuth();
  
  // Dummy data for demonstration - this would come from Supabase in a real app
  const userProfile = {
    name: user?.user_metadata?.name || "User",
    monthlyIncome: 5000,
    expenseCategories: [
      { name: "Housing", budget: 1500, spent: 1450 },
      { name: "Food", budget: 800, spent: 650 },
      { name: "Transportation", budget: 400, spent: 320 },
      { name: "Entertainment", budget: 300, spent: 250 },
      { name: "Utilities", budget: 200, spent: 180 },
    ],
  };

  // Calculate total budget and spent
  const totalBudget = userProfile.expenseCategories.reduce((sum, category) => sum + category.budget, 0);
  const totalSpent = userProfile.expenseCategories.reduce((sum, category) => sum + category.spent, 0);
  const budgetUsagePercentage = Math.round((totalSpent / totalBudget) * 100);

  const handleAddTransaction = () => {
    toast({
      title: "Coming Soon",
      description: "This feature will be available in the next update.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Financial Dashboard</h1>
        <Button onClick={handleAddTransaction}>
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(userProfile.monthlyIncome)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(userProfile.monthlyIncome - totalSpent)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Monthly Budget</CardTitle>
            <CardDescription>
              You've spent {formatCurrency(totalSpent)} out of {formatCurrency(totalBudget)} ({budgetUsagePercentage}%)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {userProfile.expenseCategories.map((category, index) => {
              const percentage = Math.round((category.spent / category.budget) * 100);
              return (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{category.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatCurrency(category.spent)} / {formatCurrency(category.budget)}
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* AI Assistant Placeholder */}
        <div className="lg:col-span-1">
          <AIAssistantSection />
        </div>
      </div>

      {/* Savings Goals Section */}
      <SavingsGoalsSection />
    </div>
  );
};

const Dashboard = () => {
  return (
    <MainLayout>
      <QueryClientProvider client={queryClient}>
        <DashboardContent />
      </QueryClientProvider>
    </MainLayout>
  );
};

export default Dashboard;
