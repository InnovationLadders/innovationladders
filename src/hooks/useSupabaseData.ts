import { useState, useEffect } from 'react';
import { supabase, supabaseAdmin } from '../lib/supabase';
import type { DatabaseContactMessage } from '../lib/supabase';

export const useSupabaseData = () => {
  const [messages, setMessages] = useState<DatabaseContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!supabase) {
      console.error('Supabase client not initialized');
      setError('Database connection not available');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data: messagesData, error: messagesError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (messagesError) {
        console.error('Messages fetch error:', messagesError);
        throw messagesError;
      }

      setMessages(messagesData || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ في تحميل البيانات';
      console.error('Error fetching data:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Messages operations
  const addMessage = async (message: Omit<DatabaseContactMessage, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (!supabaseAdmin) {
        throw new Error('Service Role Key is required for admin operations. Please set VITE_SUPABASE_SERVICE_ROLE_KEY in your .env file.');
      }
      
      const { data, error } = await supabaseAdmin
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
      if (!supabaseAdmin) {
        throw new Error('Service Role Key is required for admin operations. Please set VITE_SUPABASE_SERVICE_ROLE_KEY in your .env file.');
      }
      
      const { data, error } = await supabaseAdmin
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
      if (!supabaseAdmin) {
        throw new Error('Service Role Key is required for admin operations. Please set VITE_SUPABASE_SERVICE_ROLE_KEY in your .env file.');
      }
      
      const { error } = await supabaseAdmin
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

  useEffect(() => {
    fetchData();

    if (!supabase) return;

    const messagesSubscription = supabase
      .channel('messages_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      messagesSubscription.unsubscribe();
    };
  }, []);

  return {
    messages,
    loading,
    error,
    addMessage,
    updateMessage,
    deleteMessage,
    refetch: fetchData
  };
};