
import React, { useState } from "react";
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
import { Slider } from "@/components/ui/slider";
import { SavingsGoal } from "@/services/savingsGoalService";
import { formatCurrency } from "@/lib/formatters";
import { Sparkles } from "lucide-react";

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
  const remainingAmount = goal.target_amount - goal.current_amount;
  const [sliderValue, setSliderValue] = useState<number[]>([Math.min(100, remainingAmount / 2)]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: Math.min(100, remainingAmount / 2),
    },
  });

  const updateSliderFromInput = (value: number) => {
    setSliderValue([value]);
  };

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onAddFunds(data.amount);
    form.reset();
    setSliderValue([Math.min(100, remainingAmount / 2)]);
  };

  // Calculate the progress percentage after adding the current amount
  const newProgress = Math.min(Math.round(((goal.current_amount + (sliderValue[0] || 0)) / goal.target_amount) * 100), 100);
  
  // Determine if this contribution will achieve the goal
  const willAchieveGoal = goal.current_amount + (sliderValue[0] || 0) >= goal.target_amount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950/30">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Add funds to {goal.name}</span>
            {willAchieveGoal && <Sparkles className="h-5 w-5 text-yellow-500" />}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-white/80 dark:bg-gray-800/50 rounded-md p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current amount:</span>
              <span className="font-medium">{formatCurrency(goal.current_amount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Target amount:</span>
              <span className="font-medium">{formatCurrency(goal.target_amount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Remaining:</span>
              <span className="font-medium">{formatCurrency(remainingAmount)}</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-white/40 to-purple-50/40 dark:from-gray-800/40 dark:to-purple-900/20 rounded-md p-3 space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>After this contribution:</span>
              <span className={willAchieveGoal ? "text-green-500" : ""}>
                {newProgress}% {willAchieveGoal && "🎉"}
              </span>
            </div>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                style={{ width: `${newProgress}%` }}
              ></div>
            </div>
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
                  <div className="space-y-5">
                    <Slider
                      value={sliderValue}
                      min={1}
                      max={remainingAmount}
                      step={1}
                      onValueChange={(vals) => {
                        setSliderValue(vals);
                        field.onChange(vals[0]);
                      }}
                      className="py-4"
                    />
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</div>
                        <Input
                          type="number"
                          step="0.01"
                          min="1"
                          max={remainingAmount}
                          className="pl-8"
                          {...field}
                          onChange={(e) => {
                            field.onChange(parseFloat(e.target.value) || 0);
                            updateSliderFromInput(parseFloat(e.target.value) || 0);
                          }}
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button 
                type="submit"
                className={willAchieveGoal ? 
                  "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700" : 
                  "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                }
              >
                {willAchieveGoal ? 'Complete Goal 🎉' : 'Add Funds'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFundsDialog;
