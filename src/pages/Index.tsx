
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/components/Dashboard';
import { Inventory } from '@/components/Inventory';
import { Analytics } from '@/components/Analytics';
import { CycleManager } from '@/components/CycleManager';
import { UserManagement } from '@/components/UserManagement';
import { StockAlerts } from '@/components/StockAlerts';
import { SalesAnalytics } from '@/components/SalesAnalytics';
import { TierDisplay } from '@/components/TierDisplay';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'analytics':
        return <Analytics />;
      case 'sales-analytics':
        return <SalesAnalytics />;
      case 'stock-alerts':
        return <StockAlerts />;
      case 'user-management':
        return <UserManagement />;
      case 'cycles':
        return <CycleManager />;
      case 'billing':
        return <TierDisplay />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
