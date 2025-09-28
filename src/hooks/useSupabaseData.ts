import { useState, useEffect } from 'react';
import { supabase, supabaseAdmin } from '../lib/supabase';
import type { DatabaseService, DatabaseProject, DatabaseContactMessage, DatabaseSiteSettings } from '../lib/supabase';

export const useSupabaseData = () => {
  const [services, setServices] = useState<DatabaseService[]>([]);
  const [projects, setProjects] = useState<DatabaseProject[]>([]);
  const [messages, setMessages] = useState<DatabaseContactMessage[]>([]);
  const [siteSettings, setSiteSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Test connection first
      const { data: testData, error: testError } = await supabase
        .from('services')
        .select('count')
        .limit(1);

      if (testError) {
        console.error('Supabase connection test failed:', testError);
        throw new Error(`Connection failed: ${testError.message}`);
      }

      // Fetch services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('order_index');

      if (servicesError) throw servicesError;

      // Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('order_index');

      if (projectsError) throw projectsError;

      // Fetch messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (messagesError) throw messagesError;

      // Fetch site settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('site_settings')
        .select('*');

      if (settingsError) throw settingsError;

      // Transform settings into object
      const settingsObject = settingsData?.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, any>) || {};

      console.log('Loaded site settings:', settingsObject);

      setServices(servicesData || []);
      setProjects(projectsData || []);
      setMessages(messagesData || []);
      setSiteSettings(settingsObject);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ في تحميل البيانات';
      console.error('Error fetching data:', err);
      console.error('Error details:', {
        message: errorMessage,
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
        hasAnonKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY
      });
      setError(`خطأ في الاتصال بقاعدة البيانات: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Services operations
  const addService = async (service: Omit<DatabaseService, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert([service])
        .select()
        .single();

      if (error) throw error;
      
      setServices(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ في إضافة الخدمة');
      throw err;
    }
  };

  const updateService = async (id: string, updates: Partial<DatabaseService>) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setServices(prev => prev.map(service => 
        service.id === id ? { ...service, ...data } : service
      ));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ في تحديث الخدمة');
      throw err;
    }
  };

  const deleteService = async (id: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setServices(prev => prev.filter(service => service.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ في حذف الخدمة');
      throw err;
    }
  };

  // Projects operations
  const addProject = async (project: Omit<DatabaseProject, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select()
        .single();

      if (error) throw error;
      
      setProjects(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ في إضافة المشروع');
      throw err;
    }
  };

  const updateProject = async (id: string, updates: Partial<DatabaseProject>) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setProjects(prev => prev.map(project => 
        project.id === id ? { ...project, ...data } : project
      ));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ في تحديث المشروع');
      throw err;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjects(prev => prev.filter(project => project.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ في حذف المشروع');
      throw err;
    }
  };

  // Messages operations
  const addMessage = async (message: Omit<DatabaseContactMessage, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([message])
        .select()
        .single();

      if (error) throw error;
      
      setMessages(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ في إرسال الرسالة');
      throw err;
    }
  };

  const updateMessage = async (id: string, updates: Partial<DatabaseContactMessage>) => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setMessages(prev => prev.map(message => 
        message.id === id ? { ...message, ...data } : message
      ));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ في تحديث الرسالة');
      throw err;
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMessages(prev => prev.filter(message => message.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ في حذف الرسالة');
      throw err;
    }
  };

  // Site settings operations
  const updateSiteSettings = async (key: string, value: any) => {
    try {
      const { data, error } = await supabaseAdmin
        .from('site_settings')
        .upsert({ key, value }, { onConflict: 'key' })
        .select()
        .single();

      if (error) throw error;

      setSiteSettings(prev => ({ ...prev, [key]: value }));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ في تحديث الإعدادات');
      throw err;
    }
  };

  useEffect(() => {
    fetchData();

    // Set up real-time subscriptions
    const servicesSubscription = supabase
      .channel('services_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, () => {
        fetchData();
      })
      .subscribe();

    const projectsSubscription = supabase
      .channel('projects_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        fetchData();
      })
      .subscribe();

    const messagesSubscription = supabase
      .channel('messages_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, () => {
        fetchData();
      })
      .subscribe();

    const settingsSubscription = supabase
      .channel('settings_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      servicesSubscription.unsubscribe();
      projectsSubscription.unsubscribe();
      messagesSubscription.unsubscribe();
      settingsSubscription.unsubscribe();
    };
  }, []);

  return {
    services,
    projects,
    messages,
    siteSettings,
    loading,
    error,
    addService,
    updateService,
    deleteService,
    addProject,
    updateProject,
    deleteProject,
    addMessage,
    updateMessage,
    deleteMessage,
    updateSiteSettings,
    refetch: fetchData
  };
};