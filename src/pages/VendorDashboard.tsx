import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingUp, Clock, Star, ShoppingCart, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const VendorDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const stats = [
    { icon: Package, label: 'Total Orders', value: '24', change: '+12%' },
    { icon: TrendingUp, label: 'This Month', value: '₹15,240', change: '+25%' },
    { icon: Clock, label: 'Pending Orders', value: '3', change: '' },
    { icon: Star, label: 'Trust Score', value: '4.8', change: '+0.2' }
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2025-01-15',
      supplier: 'FreshKart Agro',
      items: 'Red Onions, Potatoes',
      total: 850,
      status: 'delivered'
    },
    {
      id: 'ORD-002',
      date: '2025-01-14',
      supplier: 'Spice World',
      items: 'Garam Masala, Chili Powder',
      total: 205,
      status: 'confirmed'
    },
    {
      id: 'ORD-003',
      date: '2025-01-13',
      supplier: 'Suresh Traders',
      items: 'Cooking Oil',
      total: 540,
      status: 'pending'
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
          <h1 className="text-3xl font-bold text-gray-800">Vendor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser?.displayName || 'Vendor'}!</p>
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
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
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
            { id: 'orders', label: 'Order History' },
            { id: 'profile', label: 'Profile' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white shadow-md text-orange-600'
                  : 'text-gray-600 hover:text-orange-600'
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
              
              {/* Recent Activity */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Orders</h2>
                <div className="space-y-4">
                  {recentOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{order.id}</h4>
                          <p className="text-sm text-gray-500">{order.supplier}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">₹{order.total}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 shadow-lg cursor-pointer hover:shadow-xl transition-all"
                >
                  <ShoppingCart className="w-12 h-12 text-orange-500 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Browse Products</h3>
                  <p className="text-gray-600 text-sm">Discover new suppliers and products</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 shadow-lg cursor-pointer hover:shadow-xl transition-all"
                >
                  <Star className="w-12 h-12 text-yellow-500 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Rate Suppliers</h3>
                  <p className="text-gray-600 text-sm">Share your experience with others</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 shadow-lg cursor-pointer hover:shadow-xl transition-all"
                >
                  <TrendingUp className="w-12 h-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Price Alerts</h3>
                  <p className="text-gray-600 text-sm">Get notified of price changes</p>
                </motion.div>
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
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order History</h2>
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
                      <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Date:</span>
                        <p className="font-medium">{order.date}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Supplier:</span>
                        <p className="font-medium">{order.supplier}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Items:</span>
                        <p className="font-medium">{order.items}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Total:</span>
                        <p className="font-bold text-orange-600">₹{order.total}</p>
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
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Profile Information</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {currentUser?.displayName?.charAt(0) || 'V'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{currentUser?.displayName || 'Vendor'}</h3>
                    <p className="text-gray-600">{currentUser?.email}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">4.8 Trust Score</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Business Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">Business Type:</span> Street Food Vendor</p>
                      <p><span className="text-gray-500">Location:</span> Mumbai, Maharashtra</p>
                      <p><span className="text-gray-500">Member Since:</span> January 2025</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Preferences</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">Preferred Categories:</span> Vegetables, Spices</p>
                      <p><span className="text-gray-500">Delivery Preference:</span> Morning</p>
                      <p><span className="text-gray-500">Payment Method:</span> UPI</p>
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

export default VendorDashboard;