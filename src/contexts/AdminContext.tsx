import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Service, Project, ContactMessage, SiteSettings, AdminStats } from '../types/admin';

interface AdminContextType {
  // Authentication
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Data
  services: Service[];
  projects: Project[];
  messages: ContactMessage[];
  siteSettings: SiteSettings;
  stats: AdminStats;
  
  // Actions
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addService: (service: Omit<Service, 'id'>) => void;
  
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  
  updateMessage: (id: string, message: Partial<ContactMessage>) => void;
  deleteMessage: (id: string) => void;
  
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  
  // Loading states
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mock data
const mockServices: Service[] = [
  {
    id: '1',
    title: 'حلول Odoo ERP',
    description: 'نظام إدارة موارد المؤسسات الشامل لتحسين كفاءة العمليات وزيادة الإنتاجية',
    features: ['إدارة المبيعات', 'إدارة المخزون', 'المحاسبة', 'الموارد البشرية'],
    icon: 'Settings',
    color: 'from-blue-500 to-blue-600',
    isActive: true,
    order: 1
  },
  {
    id: '2',
    title: 'أزياء التخرج',
    description: 'تصميم وتوريد أزياء التخرج الأكاديمية بأعلى معايير الجودة والأناقة',
    features: ['تصاميم مخصصة', 'جودة عالية', 'توريد سريع', 'أسعار تنافسية'],
    icon: 'GraduationCap',
    color: 'from-purple-500 to-purple-600',
    isActive: true,
    order: 2
  }
];

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'نظام Odoo ERP',
    category: 'أنظمة ERP',
    description: 'الحل الأمثل لإدارة أعمال منشأتك التعليمية بالكامل',
    image: '/images/portfolio/odoo-erp-system.webp',
    tags: ['Odoo', 'POS', 'إدارة المخزون'],
    link: '#',
    isActive: true,
    order: 1
  }
];

const mockMessages: ContactMessage[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    company: 'شركة التقنية المتقدمة',
    phone: '+966501234567',
    service: 'حلول Odoo ERP',
    message: 'أرغب في الحصول على عرض سعر لنظام ERP لشركتي',
    status: 'new',
    createdAt: '2024-01-15T10:30:00Z'
  }
];

const mockSiteSettings: SiteSettings = {
  siteName: 'معمل الإبداع - Innovation Ladders',
  siteDescription: 'شريكك في التحول الرقمي والابتكار',
  contactInfo: {
    phone: ['+966 12 345 6789', '+966 50 123 4567'],
    email: ['info@innovationladders.com', 'support@innovationladders.com'],
    address: ['جدة، المملكة العربية السعودية', 'حي الروضة، شارع الأمير سلطان'],
    workingHours: ['الأحد - الخميس: 9:00 ص - 6:00 م', 'الجمعة - السبت: مغلق']
  },
  socialLinks: {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    linkedin: '#'
  },
  heroSection: {
    title: 'نحن نصنع الإبداع والابتكار',
    subtitle: 'معمل الإبداع بجدة',
    description: 'شريكك في التحول الرقمي وحلول الأعمال المبتكرة'
  },
  aboutSection: {
    title: 'عن معمل الإبداع',
    description: 'نحن فريق من المبدعين والمبتكرين، نعمل على تقديم حلول تقنية متطورة',
    mission: 'نسعى لتكون الشريك الأول في التحول الرقمي والابتكار',
    vision: 'أن نكون رواد الإبداع والابتكار في المملكة العربية السعودية',
    values: 'الجودة، الإبداع، الشفافية، والالتزام بتحقيق رضا العملاء'
  }
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [services, setServices] = useState<Service[]>(mockServices);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [messages, setMessages] = useState<ContactMessage[]>(mockMessages);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(mockSiteSettings);
  const [isLoading, setIsLoading] = useState(false);

  const stats: AdminStats = {
    totalProjects: projects.length,
    totalServices: services.length,
    totalMessages: messages.length,
    newMessages: messages.filter(m => m.status === 'new').length,
    activeUsers: 1
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Mock authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@innovationladders.com' && password === 'admin123') {
      const user: User = {
        id: '1',
        name: 'مدير النظام',
        email: 'admin@innovationladders.com',
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
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Service management
  const updateService = (id: string, serviceUpdate: Partial<Service>) => {
    setServices(prev => prev.map(service => 
      service.id === id ? { ...service, ...serviceUpdate } : service
    ));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  const addService = (service: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...service,
      id: Date.now().toString()
    };
    setServices(prev => [...prev, newService]);
  };

  // Project management
  const updateProject = (id: string, projectUpdate: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...projectUpdate } : project
    ));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString()
    };
    setProjects(prev => [...prev, newProject]);
  };

  // Message management
  const updateMessage = (id: string, messageUpdate: Partial<ContactMessage>) => {
    setMessages(prev => prev.map(message => 
      message.id === id ? { ...message, ...messageUpdate } : message
    ));
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(message => message.id !== id));
  };

  // Site settings
  const updateSiteSettings = (settingsUpdate: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...settingsUpdate }));
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
    updateMessage,
    deleteMessage,
    updateSiteSettings,
    isLoading
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