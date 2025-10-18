import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  MessageSquare, 
  FileText, 
  TrendingUp, 
  Eye,
  Calendar,
  Activity
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

const AdminStats: React.FC = () => {
  const { stats, messages } = useAdmin();

  const statCards = [
    {
      title: 'إجمالي الرسائل',
      value: stats.totalMessages,
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600',
      change: '+25%'
    },
    {
      title: 'رسائل جديدة',
      value: stats.newMessages,
      icon: Activity,
      color: 'from-red-500 to-red-600',
      change: '+5'
    }
  ];

  const recentMessages = messages.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold mb-2">مرحباً بك في لوحة التحكم</h2>
        <p className="text-primary-100">إدارة شاملة لموقع معمل الابتكار</p>
        <div className="flex items-center mt-4 text-primary-100">
          <Calendar className="w-4 h-4 ml-2" />
          <span>{new Date().toLocaleDateString('ar-SA', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-600 text-sm font-medium">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">الرسائل الحديثة</h3>
            <MessageSquare className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div key={message.id} className="flex items-start space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{message.name}</p>
                  <p className="text-xs text-gray-500 truncate">{message.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(message.created_at).toLocaleDateString('ar-SA')}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  message.status === 'new' 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-green-100 text-green-600'
                }`}>
                  {message.status === 'new' ? 'جديد' : 'مقروء'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AdminStats;