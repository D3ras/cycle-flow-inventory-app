
import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  RefreshCw,
  Building2,
  Users,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'stock-alerts', label: 'Stock Alerts', icon: AlertTriangle },
    { id: 'sales-analytics', label: 'Sales Analytics', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'user-management', label: 'User Management', icon: Users },
    { id: 'cycles', label: 'Cycle Manager', icon: RefreshCw },
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">CycleFlow</h1>
            <p className="text-sm text-gray-500">POS & Inventory</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors",
                activeTab === item.id
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Tier Badge */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-3 rounded-lg text-center">
          <p className="text-sm font-medium">Enterprise Plus</p>
          <p className="text-xs opacity-90">All features unlocked</p>
        </div>
      </div>
    </div>
  );
};
