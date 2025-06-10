
import { useState, useMemo } from 'react';

export type Tier = 'free' | 'premium' | 'enterprise-plus';

interface TierLimits {
  maxShops: number;
  maxEmployees: number;
  features: string[];
}

const TIER_LIMITS: Record<Tier, TierLimits> = {
  free: {
    maxShops: 2,
    maxEmployees: 5,
    features: ['Basic POS', 'Simple Inventory', 'Basic Reports']
  },
  premium: {
    maxShops: 20,
    maxEmployees: 500,
    features: ['Advanced POS', 'Full Inventory Management', 'Analytics', 'Stock Alerts', 'Multi-location']
  },
  'enterprise-plus': {
    maxShops: Infinity,
    maxEmployees: Infinity,
    features: ['Everything in Premium', 'Advanced Analytics', 'API Access', 'Custom Integrations', 'Priority Support', 'White-label Options']
  }
};

export const useTierLimits = () => {
  const [currentTier, setCurrentTier] = useState<Tier>('enterprise-plus'); // Simulated current tier

  const limits = useMemo(() => TIER_LIMITS[currentTier], [currentTier]);

  const canAddShop = (currentShopCount: number) => {
    return currentShopCount < limits.maxShops;
  };

  const canAddEmployee = (currentEmployeeCount: number) => {
    return currentEmployeeCount < limits.maxEmployees;
  };

  const hasFeature = (feature: string) => {
    return limits.features.includes(feature);
  };

  const getRemainingShops = (currentShopCount: number) => {
    if (limits.maxShops === Infinity) return Infinity;
    return Math.max(0, limits.maxShops - currentShopCount);
  };

  const getRemainingEmployees = (currentEmployeeCount: number) => {
    if (limits.maxEmployees === Infinity) return Infinity;
    return Math.max(0, limits.maxEmployees - currentEmployeeCount);
  };

  return {
    currentTier,
    setCurrentTier,
    limits,
    canAddShop,
    canAddEmployee,
    hasFeature,
    getRemainingShops,
    getRemainingEmployees
  };
};
