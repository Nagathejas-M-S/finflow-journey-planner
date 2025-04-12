
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, DollarSign, PiggyBank, BarChart3, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Take Control of Your Financial Journey</h1>
            <p className="text-xl mb-8">
              Track expenses, set budgets, and achieve your savings goals with our intuitive financial planning tool.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How FinJourney Helps You</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <DollarSign className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Budget Management</CardTitle>
                <CardDescription>
                  Set up custom categories and budgets to track where your money goes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Create personalized expense categories that match your lifestyle. Set monthly budgets for each category and get insights on your spending patterns.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Expense Tracking</CardTitle>
                <CardDescription>
                  Log and categorize your expenses to understand your spending habits.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Easily record transactions as they happen. View detailed reports showing where your money is going and identify areas for improvement.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <PiggyBank className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Savings Goals</CardTitle>
                <CardDescription>
                  Set financial targets and track progress to achieve your dreams.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Define specific savings goals with target amounts and deadlines. Watch your progress and stay motivated as you get closer to your financial dreams.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Financial Journey?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are taking control of their finances and working toward a more secure financial future.
          </p>
          <Link to="/register">
            <Button size="lg">
              Start Now
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">FinJourney</h2>
              <p className="text-gray-400">Your Financial Journey Planner</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
              <Link to="/register" className="text-gray-300 hover:text-white">Register</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} FinJourney. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
