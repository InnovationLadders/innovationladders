import React, { createContext, useContext, useState } from 'react';
import { User, AdminStats } from '../types/admin';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { supabase } from '../lib/supabase';
import type { DatabaseContactMessage } from '../lib/supabase';

interface AdminContextType {
  // Authentication
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Data
  messages: DatabaseContactMessage[];
  stats: AdminStats;

  // Actions
  updateMessage: (id: string, message: Partial<DatabaseContactMessage>) => Promise<void>;
  deleteMessage: (id: string) => void;
  addMessage: (message: Omit<DatabaseContactMessage, 'id' | 'created_at' | 'updated_at'>) => void;

  // Loading states
  isLoading: boolean;
  dataLoading: boolean;
  error: string | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    messages,
    loading: dataLoading,
    error,
    addMessage: dbAddMessage,
    updateMessage: dbUpdateMessage,
    deleteMessage: dbDeleteMessage
  } = useSupabaseData();

  const stats: AdminStats = {
    totalProjects: 0,
    totalServices: 0,
    totalMessages: messages.length,
    newMessages: messages.filter(m => m.status === 'new').length,
    activeUsers: 1
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      if (!supabase) {
        console.error('Supabase client not initialized');
        setIsLoading(false);
        return false;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Login error:', error.message);
        setIsLoading(false);
        return false;
      }

      if (data.user) {
        const user: User = {
          id: data.user.id,
          name: data.user.user_metadata?.name || 'مدير النظام',
          email: data.user.email || '',
          role: 'admin',
          lastLogin: new Date().toISOString(),
          isActive: true
        };
        setCurrentUser(user);
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      }
    } catch (err) {
      console.error('Login error:', err);
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    if (supabase) {
      supabase.auth.signOut();
    }
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Message management
  const updateMessage = async (id: string, messageUpdate: Partial<DatabaseContactMessage>) => {
    await dbUpdateMessage(id, messageUpdate);
  };

  const deleteMessage = async (id: string) => {
    await dbDeleteMessage(id);
  };

  const addMessage = async (message: Omit<DatabaseContactMessage, 'id' | 'created_at' | 'updated_at'>) => {
    await dbAddMessage(message);
  };

  const value: AdminContextType = {
    isAuthenticated,
    currentUser,
    login,
    logout,
    messages,
    stats,
    addMessage,
    updateMessage,
    deleteMessage,
    isLoading,
    dataLoading,
    error
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};