
import React from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, DollarSign, PiggyBank } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

const incomeSchema = z.object({
  monthlyIncome: z.string().refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
    { message: "Monthly income must be a positive number" }
  ),
});

const savingsSchema = z.object({
  goalName: z.string().min(1, "Goal name is required"),
  targetAmount: z.string().refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
    { message: "Target amount must be a positive number" }
  ),
  deadline: z.string().refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    },
    { message: "Please enter a valid date" }
  ),
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type IncomeFormValues = z.infer<typeof incomeSchema>;
type SavingsFormValues = z.infer<typeof savingsSchema>;

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Dummy user data - in a real app, this would come from Supabase
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    monthlyIncome: 5000,
    savingsGoal: {
      name: "Emergency Fund",
      targetAmount: 10000,
      deadline: "2024-12-31",
    },
  };

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
    },
  });

  const incomeForm = useForm<IncomeFormValues>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      monthlyIncome: userData.monthlyIncome.toString(),
    },
  });

  const savingsForm = useForm<SavingsFormValues>({
    resolver: zodResolver(savingsSchema),
    defaultValues: {
      goalName: userData.savingsGoal.name,
      targetAmount: userData.savingsGoal.targetAmount.toString(),
      deadline: userData.savingsGoal.deadline,
    },
  });

  const onProfileSubmit = (data: ProfileFormValues) => {
    // In a real app, this would update the user's profile in Supabase
    console.log("Profile update:", data);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const onIncomeSubmit = (data: IncomeFormValues) => {
    // In a real app, this would update the user's income in Supabase
    console.log("Income update:", data);
    toast({
      title: "Income updated",
      description: "Your monthly income has been updated successfully.",
    });
  };

  const onSavingsSubmit = (data: SavingsFormValues) => {
    // In a real app, this would update the user's savings goal in Supabase
    console.log("Savings update:", data);
    toast({
      title: "Savings goal updated",
      description: "Your savings goal has been updated successfully.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">
          Manage your profile settings and financial goals
        </p>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="personal">
              <User className="mr-2 h-4 w-4" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="income">
              <DollarSign className="mr-2 h-4 w-4" />
              Income
            </TabsTrigger>
            <TabsTrigger value="savings">
              <PiggyBank className="mr-2 h-4 w-4" />
              Savings Goal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <CardFooter className="flex justify-end px-0">
                      <Button type="submit">Save Changes</Button>
                    </CardFooter>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="income">
            <Card>
              <CardHeader>
                <CardTitle>Income Settings</CardTitle>
                <CardDescription>
                  Update your monthly income
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...incomeForm}>
                  <form onSubmit={incomeForm.handleSubmit(onIncomeSubmit)} className="space-y-4">
                    <FormField
                      control={incomeForm.control}
                      name="monthlyIncome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Income (after taxes)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                              <Input className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <CardFooter className="flex justify-end px-0">
                      <Button type="submit">Save Changes</Button>
                    </CardFooter>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="savings">
            <Card>
              <CardHeader>
                <CardTitle>Savings Goal</CardTitle>
                <CardDescription>
                  Update your savings goal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...savingsForm}>
                  <form onSubmit={savingsForm.handleSubmit(onSavingsSubmit)} className="space-y-4">
                    <FormField
                      control={savingsForm.control}
                      name="goalName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Goal Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={savingsForm.control}
                      name="targetAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Amount</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                              <Input className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={savingsForm.control}
                      name="deadline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <CardFooter className="flex justify-end px-0">
                      <Button type="submit">Save Changes</Button>
                    </CardFooter>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Profile;
