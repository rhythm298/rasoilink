import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ChatBot from './components/ChatBot';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import VendorDashboard from './pages/VendorDashboard';
import SupplierDashboard from './pages/SupplierDashboard';

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (!currentUser) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen">
      <Header onChatToggle={() => setIsChatOpen(!isChatOpen)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route 
          path="/cart" 
          element={currentUser.role === 'vendor' ? <CartPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/checkout" 
          element={currentUser.role === 'vendor' ? <CheckoutPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/vendor-dashboard" 
          element={currentUser.role === 'vendor' ? <VendorDashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/supplier-dashboard" 
          element={currentUser.role === 'supplier' ? <SupplierDashboard /> : <Navigate to="/" />} 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ChatBot isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;