
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, SparkleIcon } from "lucide-react";

const AIAssistantSection = () => {
  return (
    <Card className="border-dashed border-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bot className="mr-2 h-5 w-5" />
          AI Financial Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center bg-primary/10 rounded-lg p-4">
          <SparkleIcon className="text-primary h-8 w-8 mr-4" />
          <div>
            <h3 className="font-semibold">Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              Get instant financial advice from our AI chatbot. We're working hard to bring you 
              personalized budgeting tips, expense categorization, and financial insights.
            </p>
          </div>
        </div>
        <Button disabled className="w-full">
          <SparkleIcon className="mr-2 h-4 w-4" />
          Get AI Financial Advice (Coming Soon)
        </Button>
      </CardContent>
    </Card>
  );
};

export default AIAssistantSection;
