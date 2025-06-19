
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Package, TrendingDown, Clock, CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface StockAlert {
  id: string;
  itemName: string;
  currentStock: number;
  minimumStock: number;
  category: string;
  severity: 'critical' | 'warning' | 'info';
  lastUpdated: string;
  location: string;
}

export const StockAlerts = () => {
  const [alerts, setAlerts] = useState<StockAlert[]>([
    {
      id: '1',
      itemName: 'Widget Pro X1',
      currentStock: 5,
      minimumStock: 20,
      category: 'Electronics',
      severity: 'critical',
      lastUpdated: '2024-06-19 10:30',
      location: 'Warehouse A'
    },
    {
      id: '2',
      itemName: 'Basic Widget',
      currentStock: 15,
      minimumStock: 25,
      category: 'Basic',
      severity: 'warning',
      lastUpdated: '2024-06-19 09:15',
      location: 'Warehouse B'
    },
    {
      id: '3',
      itemName: 'Mini Widget',
      currentStock: 8,
      minimumStock: 10,
      category: 'Compact',
      severity: 'info',
      lastUpdated: '2024-06-19 08:45',
      location: 'Store Front'
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return AlertTriangle;
      case 'warning': return TrendingDown;
      case 'info': return Clock;
      default: return Package;
    }
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
    toast.success('Alert resolved successfully');
  };

  const handleReorderItem = (itemName: string) => {
    toast.success(`Reorder initiated for ${itemName}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Stock Alerts</h1>
        <p className="text-muted-foreground mt-2">
          Monitor and manage inventory alerts across all locations
        </p>
      </div>

      {/* Alert Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span>Critical Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {alerts.filter(a => a.severity === 'critical').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <TrendingDown className="h-4 w-4 text-yellow-600" />
              <span>Warning Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {alerts.filter(a => a.severity === 'warning').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>Info Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {alerts.filter(a => a.severity === 'info').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
          <CardDescription>Items requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => {
              const SeverityIcon = getSeverityIcon(alert.severity);
              return (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <SeverityIcon className={`h-5 w-5 ${
                      alert.severity === 'critical' ? 'text-red-600' :
                      alert.severity === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{alert.itemName}</h3>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Current: {alert.currentStock} | Minimum: {alert.minimumStock} | 
                        Category: {alert.category} | Location: {alert.location}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Last updated: {alert.lastUpdated}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReorderItem(alert.itemName)}
                    >
                      Reorder
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleResolveAlert(alert.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {alerts.length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium">All Clear!</h3>
              <p className="text-muted-foreground">No stock alerts at this time.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
