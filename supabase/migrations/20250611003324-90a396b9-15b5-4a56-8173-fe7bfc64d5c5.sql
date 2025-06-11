
-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('business-owner', 'manager', 'employee');

-- Create enum for tiers
CREATE TYPE public.tier_type AS ENUM ('free', 'premium', 'enterprise-plus');

-- Create profiles table to store user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'employee',
  tier tier_type NOT NULL DEFAULT 'free',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  
  PRIMARY KEY (id)
);

-- Create organizations table
CREATE TABLE public.organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tier tier_type NOT NULL DEFAULT 'free',
  max_shops INTEGER NOT NULL DEFAULT 2,
  max_employees INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  
  PRIMARY KEY (id)
);

-- Create user_organizations junction table for managing user-org relationships
CREATE TABLE public.user_organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'employee',
  manager_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  
  PRIMARY KEY (id),
  UNIQUE(user_id, organization_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_organizations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- RLS Policies for organizations
CREATE POLICY "Users can view organizations they belong to" 
  ON public.organizations 
  FOR SELECT 
  USING (
    id IN (
      SELECT organization_id 
      FROM public.user_organizations 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Organization owners can update their organizations" 
  ON public.organizations 
  FOR UPDATE 
  USING (owner_id = auth.uid());

-- RLS Policies for user_organizations
CREATE POLICY "Users can view their organization memberships" 
  ON public.user_organizations 
  FOR SELECT 
  USING (user_id = auth.uid());

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, tier)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', ''),
    'business-owner',
    'enterprise-plus'
  );
  
  -- Create a default organization for the new user
  INSERT INTO public.organizations (name, owner_id, tier, max_shops, max_employees)
  VALUES (
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'My Business'),
    NEW.id,
    'enterprise-plus',
    999999,
    999999
  );
  
  -- Add the user to their organization
  INSERT INTO public.user_organizations (user_id, organization_id, role)
  VALUES (
    NEW.id,
    (SELECT id FROM public.organizations WHERE owner_id = NEW.id LIMIT 1),
    'business-owner'
  );
  
  RETURN NEW;
END;
$$;

-- Trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to get user's current tier limits
CREATE OR REPLACE FUNCTION public.get_user_tier_limits(user_uuid UUID)
RETURNS TABLE(
  tier tier_type,
  max_shops INTEGER,
  max_employees INTEGER,
  current_shops BIGINT,
  current_employees BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.tier,
    o.max_shops,
    o.max_employees,
    0::BIGINT as current_shops, -- Will be updated when we add shops table
    (SELECT COUNT(*) FROM public.user_organizations uo WHERE uo.organization_id = o.id)::BIGINT as current_employees
  FROM public.organizations o
  WHERE o.owner_id = user_uuid
  LIMIT 1;
END;
$$;
