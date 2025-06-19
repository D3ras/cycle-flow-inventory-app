
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Bell } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from '@/components/ui/sonner';

export const SimpleHeader = () => {
  const { theme, toggleTheme } = useTheme();

  const handleNotificationClick = () => {
    toast.info('You have no new notifications');
  };

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Inventory Management</h1>
          <p className="text-sm text-muted-foreground">Manage your business inventory efficiently</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          
          {/* Notifications Button */}
          <Button variant="ghost" size="sm" onClick={handleNotificationClick}>
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
