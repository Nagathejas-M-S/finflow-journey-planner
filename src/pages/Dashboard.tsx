
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import MainLayout from "@/components/layout/MainLayout";
import { PiggyBank, Wallet, ArrowUpRight, DollarSign, BarChart3, Zap, TrendingUp, Target } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import SavingsGoalsSection from "@/components/sections/SavingsGoalsSection";
import AIAssistantSection from "@/components/sections/AIAssistantSection";
import FinancialInsightsSection from "@/components/sections/FinancialInsightsSection";
import { useAuth } from "@/contexts/AuthContext";
import { formatCurrency } from "@/lib/formatters";

// Create a client
const queryClient = new QueryClient();

const DashboardContent = () => {
  const { user } = useAuth();
  const [showInsights, setShowInsights] = useState(true);
  
  // Dummy data for demonstration - this would come from Supabase in a real app
  const userProfile = {
    name: user?.user_metadata?.name || "User",
    monthlyIncome: 5000,
    expenseCategories: [
      { name: "Housing", budget: 1500, spent: 1450, color: "#8B5CF6" },
      { name: "Food", budget: 800, spent: 650, color: "#10B981" },
      { name: "Transportation", budget: 400, spent: 320, color: "#3B82F6" },
      { name: "Entertainment", budget: 300, spent: 250, color: "#F59E0B" },
      { name: "Utilities", budget: 200, spent: 180, color: "#EC4899" },
    ],
  };

  // Calculate total budget and spent
  const totalBudget = userProfile.expenseCategories.reduce((sum, category) => sum + category.budget, 0);
  const totalSpent = userProfile.expenseCategories.reduce((sum, category) => sum + category.spent, 0);
  const budgetUsagePercentage = Math.round((totalSpent / totalBudget) * 100);
  const savingsAmount = userProfile.monthlyIncome - totalSpent;
  const savingsPercentage = Math.round((savingsAmount / userProfile.monthlyIncome) * 100);

  const handleAddTransaction = () => {
    toast({
      title: "Coming Soon",
      description: "This feature will be available in the next update.",
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Financial Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {userProfile.name}! Let's continue your financial journey.
          </p>
        </div>
        <Button onClick={handleAddTransaction} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>

      {/* Summary Cards with visual improvements */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white/90 to-white dark:from-gray-800/90 dark:to-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900">
              <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(userProfile.monthlyIncome)}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">+5%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white/90 to-white dark:from-gray-800/90 dark:to-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-emerald-100 dark:bg-emerald-900">
              <Wallet className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round((totalBudget / userProfile.monthlyIncome) * 100)}% of income allocated
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white/90 to-white dark:from-gray-800/90 dark:to-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-amber-100 dark:bg-amber-900">
              <BarChart3 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <div className="w-full bg-muted rounded-full h-1.5 mb-1">
                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${budgetUsagePercentage}%` }}></div>
              </div>
              {budgetUsagePercentage}% of monthly budget used
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white/90 to-white dark:from-gray-800/90 dark:to-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings</CardTitle>
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-violet-100 dark:bg-violet-900">
              <PiggyBank className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(savingsAmount)}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <div className="w-full bg-muted rounded-full h-1.5 mb-1">
                <div className="bg-violet-500 h-1.5 rounded-full" style={{ width: `${savingsPercentage}%` }}></div>
              </div>
              {savingsPercentage}% of your income saved
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content with budget progress, AI assistant, and financial insights */}
      <div className="grid gap-8 md:grid-cols-8">
        {/* Budget Progress */}
        <Card className="md:col-span-5 border-none shadow-lg bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/80 backdrop-blur-sm">
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
                <div key={index} className="space-y-2 hover:translate-x-1 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <div className="text-sm font-medium">{category.name}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatCurrency(category.spent)} / {formatCurrency(category.budget)}
                    </div>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-2" 
                    indicatorClassName="transition-all duration-500"
                    style={{ 
                      "--progress-background": category.color + "40",
                      "--progress-foreground": category.color
                    } as React.CSSProperties} 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{percentage >= 100 ? 'Exceeded' : `${100 - percentage}% remaining`}</span>
                    <span>{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Sidebar with AI Assistant and toggle for insights */}
        <div className="md:col-span-3 space-y-8">
          <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-gray-800/90 dark:to-indigo-950/50 backdrop-blur-sm">
            <AIAssistantSection />
          </Card>
          
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              Financial Insights
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowInsights(!showInsights)}
              className="text-xs"
            >
              {showInsights ? 'Hide' : 'Show'}
            </Button>
          </div>
          
          {showInsights && (
            <FinancialInsightsSection />
          )}
        </div>
      </div>

      {/* Savings Goals Section with improved visual design */}
      <div>
        <div className="flex items-center mb-4">
          <Target className="h-5 w-5 mr-2 text-purple-500" />
          <h2 className="text-xl font-bold">Savings Goals</h2>
        </div>
        <SavingsGoalsSection />
      </div>
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
