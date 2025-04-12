
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { PlusCircle, Sparkles } from "lucide-react";
import SavingsGoalCard from "../savings/SavingsGoalCard";
import SavingsGoalDialog from "../savings/SavingsGoalDialog";
import AddFundsDialog from "../savings/AddFundsDialog";
import { 
  SavingsGoal, 
  getSavingsGoals, 
  createSavingsGoal, 
  updateSavingsGoal, 
  deleteSavingsGoal
} from "@/services/savingsGoalService";

const SavingsGoalsSection = () => {
  const queryClient = useQueryClient();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addFundsDialogOpen, setAddFundsDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);

  const { data: goals = [], isLoading } = useQuery({
    queryKey: ["savingsGoals"],
    queryFn: getSavingsGoals,
  });

  const createMutation = useMutation({
    mutationFn: createSavingsGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savingsGoals"] });
      toast({ 
        title: "Goal Created", 
        description: "Your savings goal has been created successfully!",
        variant: "success"
      });
      setCreateDialogOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<SavingsGoal> }) => 
      updateSavingsGoal(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["savingsGoals"] });
      
      if (addFundsDialogOpen) {
        // Display a celebratory message when adding funds
        toast({ 
          title: "Funds Added!", 
          description: <div className="flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
            <span>Great job! You're making progress towards your goal!</span>
          </div>,
          variant: "success"
        });
        setAddFundsDialogOpen(false);
      } else {
        toast({ 
          title: "Goal Updated", 
          description: "Your savings goal has been updated successfully!",
          variant: "success" 
        });
        setEditDialogOpen(false);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSavingsGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savingsGoals"] });
      toast({ 
        title: "Goal Deleted", 
        description: "Your savings goal has been deleted successfully.",
      });
    },
  });

  const handleCreateGoal = (data: any) => {
    createMutation.mutate(data);
  };

  const handleEditGoal = (data: any) => {
    if (selectedGoal) {
      updateMutation.mutate({ id: selectedGoal.id, updates: data });
    }
  };

  const handleOpenEditDialog = (goal: SavingsGoal) => {
    setSelectedGoal(goal);
    setEditDialogOpen(true);
  };

  const handleDeleteGoal = (id: string) => {
    if (confirm("Are you sure you want to delete this savings goal?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleAddFunds = (goal: SavingsGoal) => {
    setSelectedGoal(goal);
    setAddFundsDialogOpen(true);
  };

  const handleAddFundsSubmit = (amount: number) => {
    if (selectedGoal) {
      const newAmount = selectedGoal.current_amount + amount;
      const isGoalReached = newAmount >= selectedGoal.target_amount;
      
      updateMutation.mutate({
        id: selectedGoal.id,
        updates: { current_amount: newAmount },
      });
      
      // If goal is reached, show special celebration toast
      if (isGoalReached) {
        setTimeout(() => {
          toast({ 
            title: "🎉 Goal Achieved!", 
            description: "Congratulations! You've reached your savings goal!",
            variant: "success"
          });
        }, 500);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-2 text-muted-foreground">Loading your savings goals...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button 
          size="sm" 
          onClick={() => setCreateDialogOpen(true)}
          className="ml-auto bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-purple-50 dark:bg-purple-900/20">
              <PlusCircle className="h-10 w-10 text-purple-500 dark:text-purple-400" />
            </div>
          </div>
          <h3 className="text-lg font-medium mb-2">No savings goals yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Create your first savings goal to start tracking your progress toward financial success.
          </p>
          <Button 
            onClick={() => setCreateDialogOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create your first goal
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
          {goals.map((goal) => (
            <SavingsGoalCard
              key={goal.id}
              goal={goal}
              onEdit={handleOpenEditDialog}
              onDelete={handleDeleteGoal}
              onAddFunds={handleAddFunds}
            />
          ))}
        </div>
      )}

      <SavingsGoalDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateGoal}
        title="Create Savings Goal"
      />

      {selectedGoal && (
        <>
          <SavingsGoalDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            onSubmit={handleEditGoal}
            goal={selectedGoal}
            title="Edit Savings Goal"
          />

          <AddFundsDialog
            open={addFundsDialogOpen}
            onOpenChange={setAddFundsDialogOpen}
            onAddFunds={handleAddFundsSubmit}
            goal={selectedGoal}
          />
        </>
      )}
    </div>
  );
};

export default SavingsGoalsSection;
