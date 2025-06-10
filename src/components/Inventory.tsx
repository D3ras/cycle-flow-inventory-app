
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import { AddItemDialog } from '@/components/AddItemDialog';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  category: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
}

export const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  // Mock inventory data
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Widget Pro X1',
      sku: 'WPX-001',
      quantity: 150,
      price: 29.99,
      category: 'Electronics',
      status: 'in-stock',
      lastUpdated: '2024-06-10'
    },
    {
      id: '2',
      name: 'Basic Widget',
      sku: 'BW-002',
      quantity: 25,
      price: 12.50,
      category: 'Basic',
      status: 'low-stock',
      lastUpdated: '2024-06-09'
    },
    {
      id: '3',
      name: 'Premium Widget',
      sku: 'PW-003',
      quantity: 0,
      price: 45.00,
      category: 'Premium',
      status: 'out-of-stock',
      lastUpdated: '2024-06-08'
    },
    {
      id: '4',
      name: 'Mini Widget',
      sku: 'MW-004',
      quantity: 8,
      price: 8.99,
      category: 'Compact',
      status: 'low-stock',
      lastUpdated: '2024-06-10'
    }
  ]);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddItem = (newItem: Omit<InventoryItem, 'id' | 'lastUpdated'>) => {
    const item: InventoryItem = {
      ...newItem,
      id: (items.length + 1).toString(),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setItems([...items, item]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-2">Manage your inventory items and stock levels</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Items ({filteredItems.length})</CardTitle>
          <CardDescription>Overview of all inventory items</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Item</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">SKU</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Quantity</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{item.sku}</td>
                    <td className="py-4 px-4">
                      <span className={`font-medium ${
                        item.quantity > 50 ? 'text-green-600' :
                        item.quantity > 10 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {item.quantity}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900">${item.price}</td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AddItemDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
        onAddItem={handleAddItem}
      />
    </div>
  );
};
