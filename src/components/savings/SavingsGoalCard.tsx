
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SavingsGoal } from "@/services/savingsGoalService";
import { Edit, Trash2, PlusCircle } from "lucide-react";
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

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{goal.name}</CardTitle>
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => onEdit(goal)}
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
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
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span>Saved</span>
              <span className="font-medium">{formatCurrency(goal.current_amount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Target</span>
              <span className="font-medium">{formatCurrency(goal.target_amount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Remaining</span>
              <span className="font-medium">{formatCurrency(remainingAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Deadline</span>
              <span className="font-medium">{formatDate(goal.deadline)}</span>
            </div>
            <div className="flex justify-between">
              <span>Days left</span>
              <span className="font-medium">{remainingDays > 0 ? remainingDays : "Overdue"}</span>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-2" 
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
