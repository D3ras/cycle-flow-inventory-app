
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Shield, User, Building2, Users, Check, X } from 'lucide-react';
import { useTierLimits, Tier } from '@/hooks/useTierLimits';

export const TierDisplay = () => {
  const { currentTier, setCurrentTier, limits } = useTierLimits();

  const tierInfo = {
    free: {
      icon: User,
      color: 'bg-gray-100 text-gray-800',
      name: 'Free Tier',
      price: '$0/month'
    },
    premium: {
      icon: Shield,
      color: 'bg-blue-100 text-blue-800',
      name: 'Premium',
      price: '$49/month'
    },
    'enterprise-plus': {
      icon: Crown,
      color: 'bg-purple-100 text-purple-800',
      name: 'Enterprise Plus',
      price: '$199/month'
    }
  };

  const currentShopCount = 1; // Simulated
  const currentEmployeeCount = 3; // Simulated

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {React.createElement(tierInfo[currentTier].icon, { className: "h-6 w-6" })}
            <span>Current Plan: {tierInfo[currentTier].name}</span>
            <Badge className={tierInfo[currentTier].color}>
              {tierInfo[currentTier].price}
            </Badge>
          </CardTitle>
          <CardDescription>
            Your current usage and plan limits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Shops</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{currentShopCount}</p>
                <p className="text-sm text-muted-foreground">
                  of {limits.maxShops === Infinity ? '∞' : limits.maxShops}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-600" />
                <span className="font-medium">Employees</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{currentEmployeeCount}</p>
                <p className="text-sm text-muted-foreground">
                  of {limits.maxEmployees === Infinity ? '∞' : limits.maxEmployees}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Available Features:</h4>
            <div className="grid grid-cols-1 gap-2">
              {limits.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tier Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.keys(tierInfo) as Tier[]).map((tier) => {
          const info = tierInfo[tier];
          const tierLimits = {
            free: { shops: 2, employees: 5 },
            premium: { shops: 20, employees: 500 },
            'enterprise-plus': { shops: '∞', employees: '∞' }
          };
          
          return (
            <Card key={tier} className={currentTier === tier ? 'ring-2 ring-primary' : ''}>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  {React.createElement(info.icon, { className: "h-8 w-8" })}
                </div>
                <CardTitle>{info.name}</CardTitle>
                <CardDescription className="text-2xl font-bold">
                  {info.price}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center space-y-2">
                  <p className="text-sm">
                    <strong>{tierLimits[tier].shops}</strong> Shops
                  </p>
                  <p className="text-sm">
                    <strong>{tierLimits[tier].employees}</strong> Employees
                  </p>
                </div>
                
                {currentTier !== tier && (
                  <Button 
                    onClick={() => setCurrentTier(tier)}
                    className="w-full"
                    variant={tier === 'enterprise-plus' ? 'default' : 'outline'}
                  >
                    Switch to {info.name}
                  </Button>
                )}
                
                {currentTier === tier && (
                  <Badge className="w-full justify-center bg-green-100 text-green-800">
                    Current Plan
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
