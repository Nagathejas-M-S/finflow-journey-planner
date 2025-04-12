
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SavingsGoal } from "@/services/savingsGoalService";
import { Edit, Trash2, PlusCircle, Calendar, Target, TrendingUp } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/formatters";

interface SavingsGoalCardProps {
  goal: SavingsGoal;
  onEdit: (goal: SavingsGoal) => void;
  onDelete: (id: string) => void;
  onAddFunds: (goal: SavingsGoal) => void;
}

const SavingsGoalCard: React.FC<SavingsGoalCardProps> = ({ goal, onEdit, onDelete, onAddFunds }) => {
  const progress = Math.min(Math.round((goal.current_amount / goal.target_amount) * 100), 100);
  const remainingAmount = goal.target_amount - goal.current_amount;
  const remainingDays = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  // Determine the status color
  const getStatusColor = () => {
    if (progress >= 100) return "bg-green-500";
    if (remainingDays < 0) return "bg-red-500";
    if (progress < 25) return "bg-amber-500";
    return "bg-blue-500";
  };
  
  // Generate gradient based on progress
  const generateGradient = () => {
    if (progress >= 100) return "from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20";
    if (remainingDays < 0) return "from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20";
    if (progress < 25) return "from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20";
    return "from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20";
  };

  return (
    <Card className={`h-full flex flex-col overflow-hidden transform transition-all duration-300 border-none shadow-md hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${generateGradient()}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg flex items-center">
            <div className={`h-2 w-2 rounded-full mr-2 ${getStatusColor()}`}></div>
            {goal.name}
          </CardTitle>
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-full"
              onClick={() => onEdit(goal)}
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-destructive hover:text-destructive rounded-full"
              onClick={() => onDelete(goal.id)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center">
                <Target className="h-3 w-3 mr-1" />
                Progress
              </span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2"
              style={{ 
                "--progress-background": `${getStatusColor().replace("bg-", "")}20`,
                "--progress-foreground": `var(--${getStatusColor().replace("bg-", "")})`
              } as React.CSSProperties}
            />
          </div>
          
          <div className="text-sm space-y-2">
            <div className="flex justify-between items-center p-1 rounded-md hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
              <span className="flex items-center text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1" />
                Saved
              </span>
              <span className="font-medium">{formatCurrency(goal.current_amount)}</span>
            </div>
            <div className="flex justify-between items-center p-1 rounded-md hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
              <span className="text-muted-foreground">Target</span>
              <span className="font-medium">{formatCurrency(goal.target_amount)}</span>
            </div>
            <div className="flex justify-between items-center p-1 rounded-md hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
              <span className="text-muted-foreground">Remaining</span>
              <span className="font-medium">{formatCurrency(remainingAmount)}</span>
            </div>
            <div className="flex justify-between items-center p-1 rounded-md hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
              <span className="flex items-center text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                Deadline
              </span>
              <span className="font-medium">{formatDate(goal.deadline)}</span>
            </div>
            <div className="flex justify-between items-center p-1 rounded-md hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
              <span className="text-muted-foreground">Days left</span>
              <span className={`font-medium ${remainingDays <= 0 ? "text-red-500" : ""}`}>
                {remainingDays > 0 ? remainingDays : "Overdue"}
              </span>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className={`w-full mt-2 border border-${getStatusColor().replace("bg-", "")} text-${getStatusColor().replace("bg-", "")} hover:bg-${getStatusColor().replace("bg-", "")}/10`}
          onClick={() => onAddFunds(goal)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Funds
        </Button>
      </CardContent>
    </Card>
  );
};

export default SavingsGoalCard;
