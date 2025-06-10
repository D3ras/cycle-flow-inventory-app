
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'business-owner' | 'manager' | 'employee';
  tier: 'free' | 'premium' | 'enterprise-plus';
  managerId?: string;
  createdBy: string;
  isActive: boolean;
}

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  currentUserRole: string;
  managers: User[];
}

export const AddUserDialog = ({ open, onOpenChange, onAddUser, currentUserRole, managers }: AddUserDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'employee' as 'business-owner' | 'manager' | 'employee',
    tier: 'free' as 'free' | 'premium' | 'enterprise-plus',
    managerId: '',
  });

  const getAvailableRoles = () => {
    if (currentUserRole === 'business-owner') {
      return [
        { value: 'manager', label: 'Manager' },
        { value: 'employee', label: 'Employee' }
      ];
    }
    if (currentUserRole === 'manager') {
      return [{ value: 'employee', label: 'Employee' }];
    }
    return [];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.role) {
      return;
    }

    const newUser: Omit<User, 'id' | 'createdAt'> = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      tier: formData.tier,
      managerId: formData.managerId || undefined,
      createdBy: '1', // Would be current user ID
      isActive: true,
    };

    onAddUser(newUser);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      role: 'employee',
      tier: 'free',
      managerId: '',
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user account and assign their role
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableRoles().map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tier">Service Tier</Label>
              <Select value={formData.tier} onValueChange={(value: any) => setFormData({ ...formData, tier: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="enterprise-plus">Enterprise Plus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.role === 'employee' && managers.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="manager">Assign Manager</Label>
              <Select value={formData.managerId} onValueChange={(value) => setFormData({ ...formData, managerId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select manager" />
                </SelectTrigger>
                <SelectContent>
                  {managers.map((manager) => (
                    <SelectItem key={manager.id} value={manager.id}>
                      {manager.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add User
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
