import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Clock, Mail, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Opportunity {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  investment_amount: number;
  roi_percentage: number;
  duration_months: number;
  status: 'available' | 'funded' | 'closed';
  highlights: string[];
  documents: Array<{ name: string; url: string }>;
  contact_email: string;
  is_active: boolean;
  order_index: number;
}

const Opportunities: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'available' | 'funded' | 'closed'>('all');

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const { data, error } = await supabase
        .from('investment_opportunities')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setOpportunities(data || []);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOpportunities = opportunities.filter(
    (opp) => filter === 'all' || opp.status === filter
  );

  const getStatusBadge = (status: string) => {
    const badges = {
      available: { text: 'متاحة', color: 'bg-green-500' },
      funded: { text: 'ممولة', color: 'bg-blue-500' },
      closed: { text: 'مغلقة', color: 'bg-gray-500' },
    };
    return badges[status as keyof typeof badges] || badges.available;
  };

  if (loading) {
    return (
      <section id="opportunities" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">جاري التحميل...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="opportunities" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <TrendingUp className="w-16 h-16 text-teal-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">الفرص الاستثمارية</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            استثمر في مشاريع واعدة مع عوائد مجزية وفرص نمو مستدامة
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {['all', 'available', 'funded', 'closed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as typeof filter)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === status
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {status === 'all' && 'الكل'}
              {status === 'available' && 'متاحة'}
              {status === 'funded' && 'ممولة'}
              {status === 'closed' && 'مغلقة'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredOpportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={opportunity.image}
                  alt={opportunity.title}
                  className="w-full h-full object-cover transition-transform hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`${
                      getStatusBadge(opportunity.status).color
                    } text-white px-4 py-2 rounded-full text-sm font-medium`}
                  >
                    {getStatusBadge(opportunity.status).text}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {opportunity.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{opportunity.title}</h3>
                <p className="text-gray-600 mb-6">{opportunity.description}</p>

                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <DollarSign className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">المبلغ المطلوب</div>
                    <div className="text-lg font-bold text-gray-900">
                      {opportunity.investment_amount?.toLocaleString('ar-SA')} ريال
                    </div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">العائد المتوقع</div>
                    <div className="text-lg font-bold text-green-600">
                      {opportunity.roi_percentage}%
                    </div>
                  </div>
                  <div className="text-center">
                    <Clock className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">المدة</div>
                    <div className="text-lg font-bold text-gray-900">
                      {opportunity.duration_months} شهر
                    </div>
                  </div>
                </div>

                {opportunity.highlights && opportunity.highlights.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-3">المميزات الرئيسية:</h4>
                    <ul className="space-y-2">
                      {opportunity.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {opportunity.status === 'available' && (
                  <a
                    href={`mailto:${opportunity.contact_email}?subject=استفسار عن ${opportunity.title}`}
                    className="flex items-center justify-center gap-2 w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    استفسر الآن
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد فرص استثمارية في هذه الفئة حالياً</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Opportunities;
