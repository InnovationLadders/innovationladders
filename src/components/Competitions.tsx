import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Award, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Competition {
  id: string;
  title: string;
  description: string;
  image: string;
  start_date: string;
  end_date: string;
  prize: string;
  requirements: string;
  status: 'active' | 'upcoming' | 'closed';
  registration_link: string;
  is_active: boolean;
  order_index: number;
}

const Competitions: React.FC = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'upcoming' | 'closed'>('all');

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const { data, error } = await supabase
        .from('competitions')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setCompetitions(data || []);
    } catch (error) {
      console.error('Error fetching competitions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCompetitions = competitions.filter(
    (comp) => filter === 'all' || comp.status === filter
  );

  const getStatusBadge = (status: string) => {
    const badges = {
      active: { text: 'جارية الآن', color: 'bg-green-500' },
      upcoming: { text: 'قريباً', color: 'bg-blue-500' },
      closed: { text: 'مغلقة', color: 'bg-gray-500' },
    };
    return badges[status as keyof typeof badges] || badges.upcoming;
  };

  if (loading) {
    return (
      <section id="competitions" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">جاري التحميل...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="competitions" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Trophy className="w-16 h-16 text-teal-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">المسابقات والفعاليات</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            شارك في مسابقاتنا وفعالياتنا واستعرض موهبتك وابتكاراتك
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {['all', 'active', 'upcoming', 'closed'].map((status) => (
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
              {status === 'active' && 'جارية'}
              {status === 'upcoming' && 'قريباً'}
              {status === 'closed' && 'مغلقة'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCompetitions.map((competition, index) => (
            <motion.div
              key={competition.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={competition.image}
                  alt={competition.title}
                  className="w-full h-full object-cover transition-transform hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`${
                      getStatusBadge(competition.status).color
                    } text-white px-4 py-1 rounded-full text-sm font-medium`}
                  >
                    {getStatusBadge(competition.status).text}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{competition.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{competition.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 ml-2 text-teal-600" />
                    <span>
                      {new Date(competition.start_date).toLocaleDateString('ar-SA')} -{' '}
                      {new Date(competition.end_date).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  {competition.prize && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="w-4 h-4 ml-2 text-teal-600" />
                      <span>{competition.prize}</span>
                    </div>
                  )}
                </div>

                {competition.status === 'active' && competition.registration_link && (
                  <a
                    href={competition.registration_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    سجل الآن
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCompetitions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد مسابقات في هذه الفئة حالياً</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Competitions;
