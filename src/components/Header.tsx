import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onChatToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onChatToggle }) => {
  const { currentUser, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              RasoiLink
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-orange-600 transition-colors">
              Products
            </Link>
            <Link to="/suppliers" className="text-gray-700 hover:text-orange-600 transition-colors">
              Suppliers
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-600 transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onChatToggle}
              className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
            </motion.button>

            {currentUser?.role === 'vendor' && (
              <Link to="/cart">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </motion.div>
              </Link>
            )}

            <div className="flex items-center space-x-2">
              <Link
                to={currentUser?.role === 'vendor' ? '/vendor-dashboard' : '/supplier-dashboard'}
                className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <User className="w-6 h-6" />
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;