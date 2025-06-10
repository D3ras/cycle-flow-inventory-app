
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, DollarSign, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Cycle {
  id: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'pending';
  totalRevenue: number;
  unpaidCredits: number;
  carriedForward: number;
  itemsSold: number;
}

export const CycleManager = () => {
  const [showCloseCycleDialog, setShowCloseCycleDialog] = useState(false);
  
  // Mock cycle data
  const [cycles, setCycles] = useState<Cycle[]>([
    {
      id: 'CYC-2024-003',
      startDate: '2024-06-01',
      status: 'active',
      totalRevenue: 89432,
      unpaidCredits: 15420.50,
      carriedForward: 0,
      itemsSold: 1247
    },
    {
      id: 'CYC-2024-002',
      startDate: '2024-05-01',
      endDate: '2024-05-31',
      status: 'completed',
      totalRevenue: 156780,
      unpaidCredits: 15420.50,
      carriedForward: 8960.25,
      itemsSold: 2134
    },
    {
      id: 'CYC-2024-001',
      startDate: '2024-04-01',
      endDate: '2024-04-30',
      status: 'completed',
      totalRevenue: 142350,
      unpaidCredits: 8960.25,
      carriedForward: 5230.75,
      itemsSold: 1876
    }
  ]);

  const activeCycle = cycles.find(cycle => cycle.status === 'active');

  const handleCloseCycle = () => {
    if (activeCycle) {
      const updatedCycles = cycles.map(cycle => 
        cycle.id === activeCycle.id 
          ? { 
              ...cycle, 
              status: 'completed' as const, 
              endDate: new Date().toISOString().split('T')[0] 
            }
          : cycle
      );
      
      // Create new cycle with carried forward credits
      const newCycle: Cycle = {
        id: `CYC-2024-${String(cycles.length + 1).padStart(3, '0')}`,
        startDate: new Date().toISOString().split('T')[0],
        status: 'active',
        totalRevenue: 0,
        unpaidCredits: 0,
        carriedForward: activeCycle.unpaidCredits,
        itemsSold: 0
      };
      
      setCycles([newCycle, ...updatedCycles]);
      setShowCloseCycleDialog(false);
      console.log('Cycle closed and new cycle started with carried forward credits:', activeCycle.unpaidCredits);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <RefreshCw className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cycle Manager</h1>
          <p className="text-gray-600 mt-2">Manage inventory cycles and credit tracking</p>
        </div>
        {activeCycle && (
          <Dialog open={showCloseCycleDialog} onOpenChange={setShowCloseCycleDialog}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                Close Current Cycle
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Close Current Cycle</DialogTitle>
                <DialogDescription>
                  Are you sure you want to close the current cycle? This will:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Mark the current cycle as completed</li>
                    <li>Start a new cycle automatically</li>
                    <li>Carry forward unpaid credits: ${activeCycle.unpaidCredits.toLocaleString()}</li>
                  </ul>
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowCloseCycleDialog(false)}>
                  Cancel
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={handleCloseCycle}>
                  Close Cycle
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Active Cycle Overview */}
      {activeCycle && (
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Active Cycle: {activeCycle.id}</span>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {activeCycle.status}
              </Badge>
            </CardTitle>
            <CardDescription className="text-blue-100">
              Started on {new Date(activeCycle.startDate).toLocaleDateString()} • 
              Active for {Math.ceil((new Date().getTime() - new Date(activeCycle.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-blue-100 text-sm">Revenue</p>
                <p className="text-2xl font-bold">${activeCycle.totalRevenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Items Sold</p>
                <p className="text-2xl font-bold">{activeCycle.itemsSold.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Unpaid Credits</p>
                <p className="text-2xl font-bold">${activeCycle.unpaidCredits.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Carried Forward</p>
                <p className="text-2xl font-bold">${activeCycle.carriedForward.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cycle History */}
      <Card>
        <CardHeader>
          <CardTitle>Cycle History</CardTitle>
          <CardDescription>Complete history of all inventory cycles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cycles.map((cycle) => (
              <div key={cycle.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(cycle.status)}
                      <h3 className="font-semibold text-gray-900">{cycle.id}</h3>
                    </div>
                    <Badge className={getStatusColor(cycle.status)}>
                      {cycle.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">${cycle.totalRevenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-gray-600">Start Date</p>
                      <p className="font-medium">{new Date(cycle.startDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  {cycle.endDate && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-gray-600">End Date</p>
                        <p className="font-medium">{new Date(cycle.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-gray-600">Unpaid Credits</p>
                      <p className="font-medium">${cycle.unpaidCredits.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-gray-600">Carried Forward</p>
                      <p className="font-medium">${cycle.carriedForward.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Credit Flow Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Credit Flow Summary</CardTitle>
          <CardDescription>Track how credits flow between cycles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-2">Total Outstanding Credits</h4>
                <p className="text-2xl font-bold text-yellow-900">
                  ${cycles.reduce((sum, cycle) => sum + cycle.unpaidCredits, 0).toLocaleString()}
                </p>
                <p className="text-sm text-yellow-700 mt-1">Across all cycles</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">Total Revenue</h4>
                <p className="text-2xl font-bold text-green-900">
                  ${cycles.reduce((sum, cycle) => sum + cycle.totalRevenue, 0).toLocaleString()}
                </p>
                <p className="text-sm text-green-700 mt-1">All time</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">Items Sold</h4>
                <p className="text-2xl font-bold text-blue-900">
                  {cycles.reduce((sum, cycle) => sum + cycle.itemsSold, 0).toLocaleString()}
                </p>
                <p className="text-sm text-blue-700 mt-1">All time</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
