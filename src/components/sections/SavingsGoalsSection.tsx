
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import SavingsGoalCard from "../savings/SavingsGoalCard";
import SavingsGoalDialog from "../savings/SavingsGoalDialog";
import AddFundsDialog from "../savings/AddFundsDialog";
import { 
  SavingsGoal, 
  NewSavingsGoal,
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
      toast({ title: "Success", description: "Savings goal created successfully!" });
      setCreateDialogOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<SavingsGoal> }) => 
      updateSavingsGoal(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savingsGoals"] });
      toast({ title: "Success", description: "Savings goal updated successfully!" });
      setEditDialogOpen(false);
      setAddFundsDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSavingsGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savingsGoals"] });
      toast({ title: "Success", description: "Savings goal deleted successfully!" });
    },
  });

  const handleCreateGoal = (data: NewSavingsGoal) => {
    createMutation.mutate(data);
  };

  const handleEditGoal = (data: NewSavingsGoal) => {
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
      updateMutation.mutate({
        id: selectedGoal.id,
        updates: { current_amount: newAmount },
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading savings goals...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Savings Goals</h2>
        <Button size="sm" onClick={() => setCreateDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-8 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">You haven't created any savings goals yet.</p>
          <Button variant="outline" className="mt-4" onClick={() => setCreateDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create your first goal
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
