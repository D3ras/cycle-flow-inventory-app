
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, DollarSign, Package, Award } from 'lucide-react';

export const SalesAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');

  // Mock data for sales analytics
  const dailySalesData = [
    { date: '2024-06-04', sales: 2400, revenue: 4800, day: 'Tue' },
    { date: '2024-06-05', sales: 1398, revenue: 2796, day: 'Wed' },
    { date: '2024-06-06', sales: 9800, revenue: 19600, day: 'Thu' },
    { date: '2024-06-07', sales: 3908, revenue: 7816, day: 'Fri' },
    { date: '2024-06-08', sales: 4800, revenue: 9600, day: 'Sat' },
    { date: '2024-06-09', sales: 3800, revenue: 7600, day: 'Sun' },
    { date: '2024-06-10', sales: 4300, revenue: 8600, day: 'Mon' },
  ];

  const topPerformingProducts = [
    { name: 'Widget Pro X1', sales: 234, revenue: 7018, growth: 12.5 },
    { name: 'Premium Widget', sales: 189, revenue: 8505, growth: 8.2 },
    { name: 'Basic Widget', sales: 156, revenue: 1950, growth: 15.3 },
    { name: 'Mini Widget', sales: 145, revenue: 1303, growth: -2.1 },
    { name: 'Compact Widget', sales: 98, revenue: 1470, growth: 5.7 },
  ];

  const lowPerformingProducts = [
    { name: 'Legacy Widget', sales: 12, revenue: 360, growth: -15.2 },
    { name: 'Bulk Widget', sales: 8, revenue: 200, growth: -8.7 },
    { name: 'Test Widget', sales: 5, revenue: 125, growth: -25.4 },
  ];

  const bestSalesDays = dailySalesData
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3);

  const lowSalesDays = dailySalesData
    .sort((a, b) => a.revenue - b.revenue)
    .slice(0, 3);

  const categoryPerformance = [
    { name: 'Premium', value: 35, color: '#3B82F6', revenue: 15420 },
    { name: 'Basic', value: 30, color: '#10B981', revenue: 12300 },
    { name: 'Electronics', value: 20, color: '#F59E0B', revenue: 8900 },
    { name: 'Compact', value: 15, color: '#EF4444', revenue: 5600 },
  ];

  const totalRevenue = dailySalesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalSales = dailySalesData.reduce((sum, day) => sum + day.sales, 0);
  const averageDailyRevenue = totalRevenue / dailySalesData.length;
  const bestDay = bestSalesDays[0];
  const worstDay = lowSalesDays[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Analytics</h1>
          <p className="text-gray-600 mt-2">Performance insights and sales metrics</p>
        </div>
        <div className="flex space-x-2">
          {[
            { value: '7days', label: '7 Days' },
            { value: '30days', label: '30 Days' },
            { value: '90days', label: '90 Days' },
          ].map((period) => (
            <Button
              key={period.value}
              variant={selectedPeriod === period.value ? 'default' : 'outline'}
              onClick={() => setSelectedPeriod(period.value)}
            >
              {period.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-green-600 mt-1">+12.5% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Sales</CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalSales.toLocaleString()}</div>
            <p className="text-sm text-green-600 mt-1">+8.2% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Daily Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${Math.round(averageDailyRevenue).toLocaleString()}</div>
            <p className="text-sm text-green-600 mt-1">+5.3% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Best Sales Day</CardTitle>
            <Award className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{bestDay?.day}</div>
            <p className="text-sm text-gray-600 mt-1">${bestDay?.revenue.toLocaleString()} revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Sales Performance</CardTitle>
            <CardDescription>Revenue and sales volume over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Revenue ($)"
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Sales (units)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Sales distribution by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryPerformance}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Top Performing Products</span>
            </CardTitle>
            <CardDescription>Best selling items in current period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium text-sm">
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-900">{product.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${product.revenue.toLocaleString()}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-500">{product.sales} units</p>
                      <Badge className={product.growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {product.growth > 0 ? '+' : ''}{product.growth}%
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Performing Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              <span>Low Performing Products</span>
            </CardTitle>
            <CardDescription>Products that need attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowPerformingProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-medium text-sm">
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-900">{product.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${product.revenue.toLocaleString()}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-500">{product.sales} units</p>
                      <Badge className="bg-red-100 text-red-800">
                        {product.growth}%
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Best and Worst Sales Days */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-green-600" />
              <span>Best Sales Days</span>
            </CardTitle>
            <CardDescription>Top performing days in current period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bestSalesDays.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{day.day}</p>
                      <p className="text-sm text-gray-500">{day.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-800">${day.revenue.toLocaleString()}</p>
                    <p className="text-sm text-green-600">{day.sales} units sold</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              <span>Low Sales Days</span>
            </CardTitle>
            <CardDescription>Days that underperformed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowSalesDays.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-medium text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{day.day}</p>
                      <p className="text-sm text-gray-500">{day.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-800">${day.revenue.toLocaleString()}</p>
                    <p className="text-sm text-red-600">{day.sales} units sold</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
