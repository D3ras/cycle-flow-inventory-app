
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RefreshCw, Play, Pause, Square, Calendar, Clock, TrendingUp } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface Cycle {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'completed' | 'scheduled';
  progress: number;
  startDate: string;
  endDate: string;
  frequency: string;
  items: number;
  lastRun: string;
}

export const CycleManager = () => {
  const [cycles, setCycles] = useState<Cycle[]>([
    {
      id: '1',
      name: 'Weekly Inventory Count',
      description: 'Automated weekly count of all inventory items',
      status: 'active',
      progress: 75,
      startDate: '2024-06-17',
      endDate: '2024-06-24',
      frequency: 'Weekly',
      items: 1234,
      lastRun: '2024-06-19 10:00'
    },
    {
      id: '2',
      name: 'Monthly Restock Analysis',
      description: 'Monthly analysis for restock recommendations',
      status: 'scheduled',
      progress: 0,
      startDate: '2024-07-01',
      endDate: '2024-07-31',
      frequency: 'Monthly',
      items: 856,
      lastRun: '2024-05-31 23:59'
    },
    {
      id: '3',
      name: 'Daily Low Stock Check',
      description: 'Daily monitoring of low stock items',
      status: 'active',
      progress: 100,
      startDate: '2024-06-19',
      endDate: '2024-06-19',
      frequency: 'Daily',
      items: 23,
      lastRun: '2024-06-19 06:00'
    },
    {
      id: '4',
      name: 'Quarterly Audit Prep',
      description: 'Quarterly preparation for inventory audit',
      status: 'paused',
      progress: 45,
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      frequency: 'Quarterly',
      items: 2156,
      lastRun: '2024-06-15 14:30'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCycleAction = (cycleId: string, action: 'start' | 'pause' | 'stop') => {
    setCycles(cycles.map(cycle => {
      if (cycle.id === cycleId) {
        switch (action) {
          case 'start':
            return { ...cycle, status: 'active' as const };
          case 'pause':
            return { ...cycle, status: 'paused' as const };
          case 'stop':
            return { ...cycle, status: 'completed' as const, progress: 100 };
          default:
            return cycle;
        }
      }
      return cycle;
    }));
    
    toast.success(`Cycle ${action}ed successfully`);
  };

  const activeCycles = cycles.filter(c => c.status === 'active').length;
  const totalItems = cycles.reduce((sum, cycle) => sum + cycle.items, 0);
  const avgProgress = cycles.reduce((sum, cycle) => sum + cycle.progress, 0) / cycles.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Cycle Manager</h1>
        <p className="text-muted-foreground mt-2">
          Manage and monitor automated inventory cycles and processes
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <RefreshCw className="h-4 w-4 text-blue-600" />
              <span>Active Cycles</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCycles}</div>
            <p className="text-xs text-muted-foreground">
              of {cycles.length} total cycles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span>Total Items</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              across all cycles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <span>Avg Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgProgress.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">
              completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-orange-600" />
              <span>Next Due</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              cycles due today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cycles List */}
      <Card>
        <CardHeader>
          <CardTitle>All Cycles</CardTitle>
          <CardDescription>Manage your inventory cycles and their progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {cycles.map((cycle) => (
              <div key={cycle.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{cycle.name}</h3>
                      <Badge className={getStatusColor(cycle.status)}>
                        {cycle.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{cycle.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Frequency:</span>
                        <p className="font-medium">{cycle.frequency}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Items:</span>
                        <p className="font-medium">{cycle.items.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Period:</span>
                        <p className="font-medium">
                          {new Date(cycle.startDate).toLocaleDateString()} - {new Date(cycle.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Run:</span>
                        <p className="font-medium">{cycle.lastRun}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {cycle.status === 'active' && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCycleAction(cycle.id, 'pause')}
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCycleAction(cycle.id, 'stop')}
                        >
                          <Square className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    
                    {(cycle.status === 'paused' || cycle.status === 'scheduled') && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCycleAction(cycle.id, 'start')}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{cycle.progress}%</span>
                  </div>
                  <Progress value={cycle.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
