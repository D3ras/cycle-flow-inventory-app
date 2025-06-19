
import { useState, useMemo, useEffect } from 'react';

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
  // Set default tier to 'enterprise-plus' since authentication is removed
  const [currentTier, setCurrentTier] = useState<Tier>('enterprise-plus');
  const [currentShopCount, setCurrentShopCount] = useState(1);
  const [currentEmployeeCount, setCurrentEmployeeCount] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Since we removed authentication, we'll just use default values
    setLoading(false);
  }, []);

  const limits = useMemo(() => TIER_LIMITS[currentTier], [currentTier]);

  const canAddShop = (shopCount?: number) => {
    const count = shopCount !== undefined ? shopCount : currentShopCount;
    return count < limits.maxShops;
  };

  const canAddEmployee = (employeeCount?: number) => {
    const count = employeeCount !== undefined ? employeeCount : currentEmployeeCount;
    return count < limits.maxEmployees;
  };

  const hasFeature = (feature: string) => {
    return limits.features.includes(feature);
  };

  const getRemainingShops = (shopCount?: number) => {
    const count = shopCount !== undefined ? shopCount : currentShopCount;
    if (limits.maxShops === Infinity) return Infinity;
    return Math.max(0, limits.maxShops - count);
  };

  const getRemainingEmployees = (employeeCount?: number) => {
    const count = employeeCount !== undefined ? employeeCount : currentEmployeeCount;
    if (limits.maxEmployees === Infinity) return Infinity;
    return Math.max(0, limits.maxEmployees - count);
  };

  const updateTier = async (newTier: Tier) => {
    // Since we removed authentication, just update local state
    setCurrentTier(newTier);
  };

  return {
    currentTier,
    setCurrentTier: updateTier,
    limits,
    canAddShop,
    canAddEmployee,
    hasFeature,
    getRemainingShops,
    getRemainingEmployees,
    currentShopCount,
    currentEmployeeCount,
    loading
  };
};
