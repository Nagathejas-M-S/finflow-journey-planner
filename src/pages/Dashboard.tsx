
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import MainLayout from "@/components/layout/MainLayout";
import { PiggyBank, Wallet, ArrowUpRight, DollarSign, BarChart3 } from "lucide-react";

const Dashboard = () => {
  // Dummy data for demonstration - this would come from Supabase in a real app
  const userProfile = {
    name: "John Doe",
    monthlyIncome: 5000,
    expenseCategories: [
      { name: "Housing", budget: 1500, spent: 1450 },
      { name: "Food", budget: 800, spent: 650 },
      { name: "Transportation", budget: 400, spent: 320 },
      { name: "Entertainment", budget: 300, spent: 250 },
      { name: "Utilities", budget: 200, spent: 180 },
    ],
    savingsGoal: {
      name: "Emergency Fund",
      targetAmount: 10000,
      saved: 2500,
      deadline: new Date("2024-12-31"),
    },
  };

  // Calculate total budget and spent
  const totalBudget = userProfile.expenseCategories.reduce((sum, category) => sum + category.budget, 0);
  const totalSpent = userProfile.expenseCategories.reduce((sum, category) => sum + category.spent, 0);
  const budgetUsagePercentage = Math.round((totalSpent / totalBudget) * 100);
  const savingsProgress = Math.round((userProfile.savingsGoal.saved / userProfile.savingsGoal.targetAmount) * 100);
  const remainingToSave = userProfile.savingsGoal.targetAmount - userProfile.savingsGoal.saved;
  const daysToDeadline = Math.floor((new Date(userProfile.savingsGoal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Financial Dashboard</h1>
          <Button>
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
              <div className="text-2xl font-bold">${userProfile.monthlyIncome.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalBudget.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining</CardTitle>
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(userProfile.monthlyIncome - totalSpent).toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Progress */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Monthly Budget</CardTitle>
              <CardDescription>
                You've spent ${totalSpent.toFixed(2)} out of ${totalBudget.toFixed(2)} ({budgetUsagePercentage}%)
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
                        ${category.spent.toFixed(2)} / ${category.budget.toFixed(2)}
                      </div>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Savings Goal */}
          <Card>
            <CardHeader>
              <CardTitle>Savings Goal</CardTitle>
              <CardDescription>{userProfile.savingsGoal.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Progress</div>
                  <div className="text-sm font-medium">{savingsProgress}%</div>
                </div>
                <Progress value={savingsProgress} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="grid gap-1">
                  <div className="text-sm font-medium">Target: ${userProfile.savingsGoal.targetAmount.toLocaleString()}</div>
                  <div className="text-sm font-medium">Saved: ${userProfile.savingsGoal.saved.toLocaleString()}</div>
                  <div className="text-sm font-medium">Remaining: ${remainingToSave.toLocaleString()}</div>
                  <div className="text-sm font-medium">Days left: {daysToDeadline}</div>
                </div>
                <Button className="w-full" variant="outline">
                  Add to Savings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
