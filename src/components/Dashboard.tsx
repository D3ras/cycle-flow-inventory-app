
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Package, Users, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Items',
      value: '1,234',
      change: '+12%',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Low Stock Alerts',
      value: '23',
      change: '-5%',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      title: 'Total Users',
      value: '45',
      change: '+8%',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: '$12,345',
      change: '+15%',
      icon: DollarSign,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {user?.user_metadata?.full_name || user?.email || 'User'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                  {' '}from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest inventory updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Widget Pro X1 restocked</span>
                <span className="text-xs text-muted-foreground">2h ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Low stock alert: Basic Widget</span>
                <span className="text-xs text-muted-foreground">4h ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">New user added</span>
                <span className="text-xs text-muted-foreground">1d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Performance</span>
            </CardTitle>
            <CardDescription>This month's overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Sales Growth</span>
                <span className="text-sm font-medium text-green-600">+15.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Inventory Turnover</span>
                <span className="text-sm font-medium text-blue-600">2.4x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Customer Satisfaction</span>
                <span className="text-sm font-medium text-purple-600">98.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Alerts</span>
            </CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Low Stock Items</span>
                <span className="text-sm font-medium text-red-600">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Expired Items</span>
                <span className="text-sm font-medium text-orange-600">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending Orders</span>
                <span className="text-sm font-medium text-blue-600">12</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
