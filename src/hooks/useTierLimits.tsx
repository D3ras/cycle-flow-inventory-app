
import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

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
  const { user } = useAuth();
  const [currentTier, setCurrentTier] = useState<Tier>('free');
  const [currentShopCount, setCurrentShopCount] = useState(0);
  const [currentEmployeeCount, setCurrentEmployeeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserTierData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Get user's organization and tier information - include id in select
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .select('id, tier, max_shops, max_employees')
          .eq('owner_id', user.id)
          .single();

        if (orgError) {
          console.error('Error fetching organization data:', orgError);
          setLoading(false);
          return;
        }

        if (orgData) {
          setCurrentTier(orgData.tier as Tier);
        }

        // Get current employee count
        const { data: employeeData, error: employeeError } = await supabase
          .from('user_organizations')
          .select('id')
          .eq('organization_id', orgData.id);

        if (!employeeError && employeeData) {
          setCurrentEmployeeCount(employeeData.length);
        }

        // For now, we'll set shops to 1 as we don't have a shops table yet
        setCurrentShopCount(1);

      } catch (error) {
        console.error('Error fetching tier data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTierData();
  }, [user]);

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
    if (!user) return;

    try {
      const { error } = await supabase
        .from('organizations')
        .update({ tier: newTier })
        .eq('owner_id', user.id);

      if (!error) {
        setCurrentTier(newTier);
      }
    } catch (error) {
      console.error('Error updating tier:', error);
    }
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
