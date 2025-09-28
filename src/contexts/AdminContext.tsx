import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AdminStats } from '../types/admin';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { supabase } from '../lib/supabase';
import type { DatabaseService, DatabaseProject, DatabaseContactMessage } from '../lib/supabase';

interface AdminContextType {
  // Authentication
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Data
  services: DatabaseService[];
  projects: DatabaseProject[];
  messages: DatabaseContactMessage[];
  siteSettings: any;
  stats: AdminStats;
  
  // Actions
  updateService: (id: string, service: Partial<DatabaseService>) => Promise<void>;
  deleteService: (id: string) => void;
  addService: (service: Omit<DatabaseService, 'id' | 'created_at' | 'updated_at'>) => void;
  
  updateProject: (id: string, project: Partial<DatabaseProject>) => Promise<void>;
  deleteProject: (id: string) => void;
  addProject: (project: Omit<DatabaseProject, 'id' | 'created_at' | 'updated_at'>) => void;
  
  updateMessage: (id: string, message: Partial<DatabaseContactMessage>) => Promise<void>;
  deleteMessage: (id: string) => void;
  addMessage: (message: Omit<DatabaseContactMessage, 'id' | 'created_at' | 'updated_at'>) => void;
  
  updateSiteSettings: (key: string, value: any) => Promise<void>;
  
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

  // Use Supabase data hook
  const {
    services,
    projects,
    messages,
    siteSettings,
    loading: dataLoading,
    error,
    addService: dbAddService,
    updateService: dbUpdateService,
    deleteService: dbDeleteService,
    addProject: dbAddProject,
    updateProject: dbUpdateProject,
    deleteProject: dbDeleteProject,
    addMessage: dbAddMessage,
    updateMessage: dbUpdateMessage,
    deleteMessage: dbDeleteMessage,
    updateSiteSettings: dbUpdateSiteSettings
  } = useSupabaseData();

  const stats: AdminStats = {
    totalProjects: projects.length,
    totalServices: services.length,
    totalMessages: messages.length,
    newMessages: messages.filter(m => m.status === 'new').length,
    activeUsers: 1
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Use Supabase auth for admin login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        // Fallback to mock authentication for demo
        if (email === 'mansour@innovationladders.com' && password === 'IL!ke123') {
          const user: User = {
            id: '1',
            name: 'منصور الشهري',
            email: 'mansour@innovationladders.com',
            role: 'admin',
            lastLogin: new Date().toISOString(),
            isActive: true
          };
          setCurrentUser(user);
          setIsAuthenticated(true);
          setIsLoading(false);
          return true;
        }
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
    
    // Fallback authentication
    if (email === 'mansour@innovationladders.com' && password === 'IL!ke123') {
      const user: User = {
        id: '1',
        name: 'منصور الشهري',
        email: 'mansour@innovationladders.com',
        role: 'admin',
        lastLogin: new Date().toISOString(),
        isActive: true
      };
      setCurrentUser(user);
      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    supabase.auth.signOut();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Service management
  const updateService = async (id: string, serviceUpdate: Partial<DatabaseService>) => {
    await dbUpdateService(id, serviceUpdate);
  };

  const deleteService = async (id: string) => {
    await dbDeleteService(id);
  };

  const addService = async (service: Omit<DatabaseService, 'id' | 'created_at' | 'updated_at'>) => {
    await dbAddService(service);
  };

  // Project management
  const updateProject = async (id: string, projectUpdate: Partial<DatabaseProject>) => {
    await dbUpdateProject(id, projectUpdate);
  };

  const deleteProject = async (id: string) => {
    await dbDeleteProject(id);
  };

  const addProject = async (project: Omit<DatabaseProject, 'id' | 'created_at' | 'updated_at'>) => {
    await dbAddProject(project);
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

  // Site settings
  const updateSiteSettings = async (key: string, value: any) => {
    await dbUpdateSiteSettings(key, value);
  };

  const value: AdminContextType = {
    isAuthenticated,
    currentUser,
    login,
    logout,
    services,
    projects,
    messages,
    siteSettings,
    stats,
    updateService,
    deleteService,
    addService,
    updateProject,
    deleteProject,
    addProject,
    addMessage,
    updateMessage,
    deleteMessage,
    updateSiteSettings,
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