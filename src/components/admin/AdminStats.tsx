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
  const { stats, messages, projects, services } = useAdmin();

  const statCards = [
    {
      title: 'إجمالي المشاريع',
      value: stats.totalProjects,
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    {
      title: 'إجمالي الخدمات',
      value: stats.totalServices,
      icon: Briefcase,
      color: 'from-green-500 to-green-600',
      change: '+8%'
    },
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
  const recentProjects = projects.slice(0, 3);

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

        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">المشاريع الحديثة</h3>
            <FileText className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-start space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{project.title}</p>
                  <p className="text-xs text-gray-500">{project.category}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-primary-100 text-primary-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.is_active
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {project.is_active ? 'نشط' : 'غير نشط'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-6">إجراءات سريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Briefcase className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-blue-600">إضافة خدمة</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <FileText className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-green-600">إضافة مشروع</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <MessageSquare className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-600">عرض الرسائل</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <Eye className="w-8 h-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-orange-600">معاينة الموقع</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminStats;