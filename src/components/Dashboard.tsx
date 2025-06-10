
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, TrendingUp, DollarSign, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Dashboard = () => {
  // Mock data for demonstration
  const currentCycle = {
    id: 'CYC-2024-003',
    status: 'active',
    startDate: '2024-06-01',
    daysActive: 9,
    carriedForwardCredits: 15420.50
  };

  const stats = [
    {
      title: 'Total Items',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Package,
    },
    {
      title: 'Current Cycle Value',
      value: '$89,432',
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Carried Credits',
      value: `$${currentCycle.carriedForwardCredits.toLocaleString()}`,
      change: 'From previous cycle',
      trend: 'neutral',
      icon: TrendingUp,
    },
    {
      title: 'Cycle Status',
      value: currentCycle.status.toUpperCase(),
      change: `Day ${currentCycle.daysActive}`,
      trend: 'neutral',
      icon: RefreshCw,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your inventory overview.</p>
      </div>

      {/* Current Cycle Info */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Current Cycle: {currentCycle.id}</span>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {currentCycle.status}
            </Badge>
          </CardTitle>
          <CardDescription className="text-blue-100">
            Started on {new Date(currentCycle.startDate).toLocaleDateString()} • Active for {currentCycle.daysActive} days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${currentCycle.carriedForwardCredits.toLocaleString()} carried forward
          </div>
          <p className="text-blue-100 mt-1">Credits from previous cycle</p>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className={`text-xs ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest inventory transactions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Added 50 units', item: 'Widget Pro X1', time: '2 hours ago', type: 'addition' },
              { action: 'Sold 25 units', item: 'Basic Widget', time: '4 hours ago', type: 'sale' },
              { action: 'Updated price', item: 'Premium Widget', time: '6 hours ago', type: 'update' },
              { action: 'Low stock alert', item: 'Mini Widget', time: '8 hours ago', type: 'alert' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'addition' ? 'bg-green-500' :
                    activity.type === 'sale' ? 'bg-blue-500' :
                    activity.type === 'update' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.item}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
