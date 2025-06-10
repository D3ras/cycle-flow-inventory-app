
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, UserPlus, Crown, Shield, User } from 'lucide-react';
import { AddUserDialog } from '@/components/AddUserDialog';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'business-owner' | 'manager' | 'employee';
  tier: 'free' | 'premium' | 'enterprise-plus';
  managerId?: string;
  createdBy: string;
  isActive: boolean;
  createdAt: string;
}

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@business.com',
      role: 'business-owner',
      tier: 'enterprise-plus',
      createdBy: 'system',
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@business.com',
      role: 'manager',
      tier: 'enterprise-plus',
      managerId: '1',
      createdBy: '1',
      isActive: true,
      createdAt: '2024-02-20'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@business.com',
      role: 'employee',
      tier: 'enterprise-plus',
      managerId: '2',
      createdBy: '2',
      isActive: true,
      createdAt: '2024-03-10'
    }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [currentUser] = useState('1'); // Simulated current user

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'business-owner': return Crown;
      case 'manager': return Shield;
      case 'employee': return User;
      default: return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'business-owner': return 'bg-purple-100 text-purple-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'employee': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'enterprise-plus': return 'bg-gold-100 text-gold-800';
      case 'premium': return 'bg-orange-100 text-orange-800';
      case 'free': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCurrentUserRole = () => {
    const user = users.find(u => u.id === currentUser);
    return user?.role || 'employee';
  };

  const canManageUser = (targetUser: User) => {
    const currentUserRole = getCurrentUserRole();
    
    if (currentUserRole === 'business-owner') return true;
    if (currentUserRole === 'manager' && targetUser.role === 'employee') return true;
    
    return false;
  };

  const handleAddUser = (newUser: Omit<User, 'id' | 'createdAt'>) => {
    const user: User = {
      ...newUser,
      id: (users.length + 1).toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, user]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage users, roles, and permissions</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Role Hierarchy Info */}
      <Card>
        <CardHeader>
          <CardTitle>Role Hierarchy & Permissions</CardTitle>
          <CardDescription>Understanding user roles and their capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Crown className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-purple-600">Business Owner</span>
              </div>
              <p className="text-sm text-gray-600">Full access to all features, can manage managers and view all analytics</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-600">Manager</span>
              </div>
              <p className="text-sm text-gray-600">Can add/remove employees, manage inventory, and view sales analytics</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <User className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-600">Employee</span>
              </div>
              <p className="text-sm text-gray-600">Can process sales, view basic inventory, and update stock levels</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members ({users.length})</CardTitle>
          <CardDescription>Manage your team members and their roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Tier</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Manager</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const RoleIcon = getRoleIcon(user.role);
                  const manager = users.find(u => u.id === user.managerId);
                  
                  return (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <RoleIcon className="h-4 w-4" />
                          <Badge className={getRoleColor(user.role)}>
                            {user.role.replace('-', ' ')}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getTierColor(user.tier)}>
                          {user.tier.replace('-', ' ')}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {manager ? manager.name : 'N/A'}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {canManageUser(user) && (
                            <>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AddUserDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
        onAddUser={handleAddUser}
        currentUserRole={getCurrentUserRole()}
        managers={users.filter(u => u.role === 'manager')}
      />
    </div>
  );
};
