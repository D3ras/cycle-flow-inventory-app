
import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  RefreshCw,
  Building2,
  Users,
  AlertTriangle,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTierLimits } from '@/hooks/useTierLimits';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const { currentTier, limits } = useTierLimits();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'stock-alerts', label: 'Stock Alerts', icon: AlertTriangle },
    { id: 'sales-analytics', label: 'Sales Analytics', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'user-management', label: 'User Management', icon: Users },
    { id: 'cycles', label: 'Cycle Manager', icon: RefreshCw },
    { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
  ];

  const getTierDisplayName = () => {
    switch (currentTier) {
      case 'free': return 'Free Tier';
      case 'premium': return 'Premium';
      case 'enterprise-plus': return 'Enterprise Plus';
      default: return 'Free Tier';
    }
  };

  const getTierGradient = () => {
    switch (currentTier) {
      case 'free': return 'from-gray-500 to-gray-600';
      case 'premium': return 'from-blue-500 to-blue-600';
      case 'enterprise-plus': return 'from-purple-500 to-blue-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="w-64 bg-background shadow-lg border-r border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold text-foreground">CycleFlow</h1>
            <p className="text-sm text-muted-foreground">POS & Inventory</p>
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
                  ? "bg-accent text-accent-foreground border-r-2 border-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
        <div className={cn("bg-gradient-to-r text-white p-3 rounded-lg text-center", getTierGradient())}>
          <p className="text-sm font-medium">{getTierDisplayName()}</p>
          <p className="text-xs opacity-90">
            {currentTier === 'enterprise-plus' 
              ? 'All features unlocked' 
              : `${limits.maxShops} shops, ${limits.maxEmployees} employees`
            }
          </p>
        </div>
      </div>
    </div>
  );
};
