
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb } from 'lucide-react';

const FinancialInsightsSection = () => {
  const spendingData = [
    { month: 'Jan', amount: 1800 },
    { month: 'Feb', amount: 2200 },
    { month: 'Mar', amount: 1750 },
    { month: 'Apr', amount: 1900 },
    { month: 'May', amount: 2300 },
    { month: 'Jun', amount: 1980 },
  ];

  const savingsData = [
    { month: 'Jan', amount: 500 },
    { month: 'Feb', amount: 450 },
    { month: 'Mar', amount: 600 },
    { month: 'Apr', amount: 550 },
    { month: 'May', amount: 700 },
    { month: 'Jun', amount: 800 },
  ];

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="h-44">
            <ChartContainer
              config={{
                spending: {
                  label: "Monthly Spending",
                  theme: {
                    light: "#3B82F6",
                    dark: "#60A5FA"
                  }
                }
              }}
            >
              <LineChart data={spendingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  name="spending"
                  stroke="var(--color-spending, #3B82F6)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        <InsightCard 
          title="Spending Trend" 
          icon={<TrendingUp className="h-4 w-4 text-green-500" />} 
          color="text-green-500"
          insight="Your spending decreased by 8% compared to last month"
        />
        
        <InsightCard 
          title="Potential Savings" 
          icon={<Lightbulb className="h-4 w-4 text-amber-500" />} 
          color="text-amber-500"
          insight="You could save $120 more by reducing entertainment expenses"
        />
        
        <InsightCard 
          title="Budget Alert" 
          icon={<AlertTriangle className="h-4 w-4 text-red-500" />} 
          color="text-red-500"
          insight="Housing costs are 97% of your budget allocation"
        />
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-2 shadow-md rounded-md border border-gray-200 dark:border-gray-700 text-xs">
        <p className="font-medium">{`$${payload[0].value}`}</p>
        <p className="text-muted-foreground">{payload[0].payload.month}</p>
      </div>
    );
  }

  return null;
};

const InsightCard = ({ title, icon, color, insight }: { title: string, icon: React.ReactNode, color: string, insight: string }) => {
  return (
    <Card className="overflow-hidden border border-gray-100 dark:border-gray-800 shadow hover:shadow-md transition-all duration-300">
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            {icon}
            <h4 className={`text-xs font-medium ml-1 ${color}`}>{title}</h4>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{insight}</p>
      </CardContent>
    </Card>
  );
};

export default FinancialInsightsSection;
