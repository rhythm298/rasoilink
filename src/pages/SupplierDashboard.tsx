import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingUp, Users, Star, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SupplierDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const stats = [
    { icon: Package, label: 'Products Listed', value: '12', change: '+2' },
    { icon: TrendingUp, label: 'Revenue This Month', value: '₹45,680', change: '+18%' },
    { icon: Users, label: 'Active Orders', value: '8', change: '+3' },
    { icon: Star, label: 'Supplier Rating', value: '4.9', change: '+0.1' }
  ];

  const myProducts = [
    {
      id: '1',
      name: 'Red Onions',
      price: 35,
      stock: 500,
      category: 'Vegetables',
      orders: 15,
      revenue: 5250
    },
    {
      id: '2',
      name: 'Potatoes',
      price: 25,
      stock: 400,
      category: 'Vegetables',
      orders: 12,
      revenue: 3600
    },
    {
      id: '3',
      name: 'Cooking Oil',
      price: 108,
      stock: 200,
      category: 'Oils',
      orders: 8,
      revenue: 4320
    }
  ];

  const recentOrders = [
    {
      id: 'ORD-101',
      vendor: 'Raj\'s Chaat Corner',
      product: 'Red Onions',
      quantity: 2,
      total: 70,
      status: 'pending',
      date: '2025-01-15'
    },
    {
      id: 'ORD-102',
      vendor: 'Mumbai Street Foods',
      product: 'Potatoes',
      quantity: 3,
      total: 75,
      status: 'confirmed',
      date: '2025-01-14'
    },
    {
      id: 'ORD-103',
      vendor: 'Spice Villa',
      product: 'Cooking Oil',
      quantity: 1,
      total: 108,
      status: 'delivered',
      date: '2025-01-13'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Supplier Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser?.displayName || 'Supplier'}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                {stat.change && (
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white/50 backdrop-blur-sm p-1 rounded-xl border border-orange-100">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'products', label: 'My Products' },
            { id: 'orders', label: 'Orders' },
            { id: 'profile', label: 'Profile' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white shadow-md text-green-600'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              
              {/* Performance Chart Placeholder */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Sales Performance</h2>
                <div className="h-64 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <p className="text-gray-600">Revenue trending upward this month</p>
                    <p className="text-2xl font-bold text-green-600 mt-2">+18% Growth</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h3>
                  <div className="space-y-3">
                    {myProducts.slice(0, 3).map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">{product.name}</h4>
                          <p className="text-sm text-gray-500">{product.orders} orders</p>
                        </div>
                        <span className="font-bold text-green-600">₹{product.revenue}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
                  <div className="space-y-3">
                    {recentOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">{order.id}</h4>
                          <p className="text-sm text-gray-500">{order.vendor}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">₹{order.total}</p>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">My Products</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </motion.button>
              </div>

              <div className="grid gap-4">
                {myProducts.map((product) => (
                  <div key={product.id} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{product.name}</h4>
                            <p className="text-sm text-gray-500">{product.category}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-6 text-center">
                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="font-bold text-green-600">₹{product.price}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Stock</p>
                          <p className="font-semibold">{product.stock}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Orders</p>
                          <p className="font-semibold">{product.orders}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Revenue</p>
                          <p className="font-bold text-green-600">₹{product.revenue}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-6">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Management</h2>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold text-gray-800">{order.id}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                          Accept
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Vendor:</span>
                        <p className="font-medium">{order.vendor}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Product:</span>
                        <p className="font-medium">{order.product}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Quantity:</span>
                        <p className="font-medium">{order.quantity}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Date:</span>
                        <p className="font-medium">{order.date}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Total:</span>
                        <p className="font-bold text-green-600">₹{order.total}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Supplier Profile</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {currentUser?.displayName?.charAt(0) || 'S'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{currentUser?.displayName || 'Supplier'}</h3>
                    <p className="text-gray-600">{currentUser?.email}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">4.9 Rating</span>
                      <span className="text-xs text-gray-500">(127 reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Business Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">Business Name:</span> FreshKart Agro</p>
                      <p><span className="text-gray-500">Location:</span> Ahmedabad, Gujarat</p>
                      <p><span className="text-gray-500">Member Since:</span> March 2024</p>
                      <p><span className="text-gray-500">Verified Supplier:</span> ✅ Yes</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Performance Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">Total Orders:</span> 127</p>
                      <p><span className="text-gray-500">On-time Delivery:</span> 98%</p>
                      <p><span className="text-gray-500">Return Rate:</span> 1.2%</p>
                      <p><span className="text-gray-500">Response Time:</span> 2 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;