import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: 'vendor' | 'supplier') => Promise<void>;
  signInWithGoogle: (role: 'vendor' | 'supplier') => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// Mock user data for demo
const mockUsers = {
  'vendor@example.com': {
    uid: 'vendor-123',
    email: 'vendor@example.com',
    displayName: 'Demo Vendor',
    role: 'vendor' as const,
    password: 'Vendor123!'
  },
  'supplier@example.com': {
    uid: 'supplier-123',
    email: 'supplier@example.com',
    displayName: 'Demo Supplier',
    role: 'supplier' as const,
    password: 'Supply123!'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('rasoilink_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
      } catch (error) {
        localStorage.removeItem('rasoilink_user');
      }
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, role: 'vendor' | 'supplier') => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (mockUsers[email as keyof typeof mockUsers]) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser: User = {
      uid: `${role}-${Date.now()}`,
      email,
      displayName: email.split('@')[0],
      role
    };
    
    // Store user session
    localStorage.setItem('rasoilink_user', JSON.stringify(newUser));
    setCurrentUser(newUser);
  };

  const signIn = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers[email as keyof typeof mockUsers];
    
    if (!mockUser || mockUser.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    const user: User = {
      uid: mockUser.uid,
      email: mockUser.email,
      displayName: mockUser.displayName,
      role: mockUser.role
    };
    
    // Store user session
    localStorage.setItem('rasoilink_user', JSON.stringify(user));
    setCurrentUser(user);
  };

  const signInWithGoogle = async (role: 'vendor' | 'supplier') => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      uid: `google-${role}-${Date.now()}`,
      email: `demo.${role}@gmail.com`,
      displayName: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      role,
      photoURL: `https://ui-avatars.com/api/?name=Demo+${role}&background=f97316&color=fff`
    };
    
    // Store user session
    localStorage.setItem('rasoilink_user', JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = async () => {
    localStorage.removeItem('rasoilink_user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};