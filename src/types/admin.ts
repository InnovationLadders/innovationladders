export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  lastLogin: string;
  isActive: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
  is_active: boolean;
  order_index: number;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  is_active: boolean;
  order_index: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactInfo: {
    phone: string[];
    email: string[];
    address: string[];
    workingHours: string[];
  };
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  heroSection: {
    title: string;
    subtitle: string;
    description: string;
  };
  aboutSection: {
    title: string;
    description: string;
    mission: string;
    vision: string;
    values: string;
  };
}

export interface AdminStats {
  totalProjects: number;
  totalServices: number;
  totalMessages: number;
  newMessages: number;
  activeUsers: number;
}