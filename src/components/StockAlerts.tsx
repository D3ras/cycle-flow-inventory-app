
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Package, TrendingDown, RefreshCw } from 'lucide-react';

interface StockAlert {
  id: string;
  itemName: string;
  sku: string;
  currentStock: number;
  minimumStock: number;
  alertLevel: 'critical' | 'warning' | 'low';
  lastUpdated: string;
  category: string;
}

export const StockAlerts = () => {
  const [alerts] = useState<StockAlert[]>([
    {
      id: '1',
      itemName: 'Premium Widget',
      sku: 'PW-003',
      currentStock: 0,
      minimumStock: 10,
      alertLevel: 'critical',
      lastUpdated: '2024-06-10',
      category: 'Premium'
    },
    {
      id: '2',
      itemName: 'Mini Widget',
      sku: 'MW-004',
      currentStock: 8,
      minimumStock: 20,
      alertLevel: 'warning',
      lastUpdated: '2024-06-10',
      category: 'Compact'
    },
    {
      id: '3',
      itemName: 'Basic Widget',
      sku: 'BW-002',
      currentStock: 25,
      minimumStock: 50,
      alertLevel: 'low',
      lastUpdated: '2024-06-09',
      category: 'Basic'
    }
  ]);

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'warning': return <TrendingDown className="h-4 w-4 text-yellow-600" />;
      case 'low': return <Package className="h-4 w-4 text-orange-600" />;
      default: return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const criticalAlerts = alerts.filter(alert => alert.alertLevel === 'critical');
  const warningAlerts = alerts.filter(alert => alert.alertLevel === 'warning');
  const lowAlerts = alerts.filter(alert => alert.alertLevel === 'low');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stock Alerts</h1>
          <p className="text-gray-600 mt-2">Monitor low stock levels and inventory alerts</p>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <RefreshCw className="h-4 w-4" />
          <span>Refresh Alerts</span>
        </Button>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-red-800 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Critical Alerts</span>
            </CardTitle>
            <CardDescription className="text-red-600">Items that are out of stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-800">{criticalAlerts.length}</div>
            <p className="text-sm text-red-600 mt-1">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-yellow-800 flex items-center space-x-2">
              <TrendingDown className="h-5 w-5" />
              <span>Warning Alerts</span>
            </CardTitle>
            <CardDescription className="text-yellow-600">Items below reorder point</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-800">{warningAlerts.length}</div>
            <p className="text-sm text-yellow-600 mt-1">Need restocking soon</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-orange-800 flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Low Stock</span>
            </CardTitle>
            <CardDescription className="text-orange-600">Items with low inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-800">{lowAlerts.length}</div>
            <p className="text-sm text-orange-600 mt-1">Monitor closely</p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Critical Stock Alerts</span>
            </CardTitle>
            <CardDescription>Items that are completely out of stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalAlerts.map((alert) => (
                <Alert key={alert.id} className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="text-red-800">{alert.itemName} is out of stock</AlertTitle>
                  <AlertDescription className="text-red-700">
                    SKU: {alert.sku} • Current: {alert.currentStock} • Minimum: {alert.minimumStock}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Alert Details</CardTitle>
          <CardDescription>Complete list of all stock alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Item</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Current Stock</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Minimum Stock</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Alert Level</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Last Updated</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert) => (
                  <tr key={alert.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{alert.itemName}</p>
                        <p className="text-sm text-gray-500">{alert.sku} • {alert.category}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-medium ${
                        alert.currentStock === 0 ? 'text-red-600' :
                        alert.currentStock < alert.minimumStock ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {alert.currentStock}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{alert.minimumStock}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {getAlertIcon(alert.alertLevel)}
                        <Badge className={getAlertColor(alert.alertLevel)}>
                          {alert.alertLevel}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{alert.lastUpdated}</td>
                    <td className="py-4 px-4">
                      <Button size="sm" variant="outline">
                        Restock
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
