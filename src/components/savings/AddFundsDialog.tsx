
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SavingsGoal } from "@/services/savingsGoalService";
import { formatCurrency } from "@/lib/formatters";

const formSchema = z.object({
  amount: z.coerce.number().positive("Amount must be positive"),
});

interface AddFundsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddFunds: (amount: number) => void;
  goal: SavingsGoal;
}

const AddFundsDialog: React.FC<AddFundsDialogProps> = ({
  open,
  onOpenChange,
  onAddFunds,
  goal,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onAddFunds(data.amount);
    form.reset();
  };

  const remainingAmount = goal.target_amount - goal.current_amount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add funds to {goal.name}</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground">
          <div className="flex justify-between mb-2">
            <span>Current amount:</span>
            <span>{formatCurrency(goal.current_amount)}</span>
          </div>
          <div className="flex justify-between">
            <span>Remaining to goal:</span>
            <span>{formatCurrency(remainingAmount)}</span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount to Add</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" min="0" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add Funds</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFundsDialog;
