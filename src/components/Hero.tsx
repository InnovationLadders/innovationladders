import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Award, Zap, TrendingUp } from 'lucide-react';
import { useSupabaseData } from '../hooks/useSupabaseData';

const Hero: React.FC = () => {
  const { siteSettings, projects, error } = useSupabaseData();

  const stats = [
    { icon: Users, number: '500+', label: 'عميل راضٍ' },
    { icon: Award, number: `${projects.length}+`, label: 'مشروع ناجح' },
    { icon: Zap, number: '10+', label: 'سنوات خبرة' },
    { icon: TrendingUp, number: '95%', label: 'معدل النجاح' },
  ];

  // Get hero content from settings or use defaults
  const heroContent = siteSettings.heroSection || siteSettings.hero_section || {
    title: 'نحن نصنع الإبداع والابتكار',
    subtitle: 'معمل الإبداع بجدة',
    description: 'شريكك في التحول الرقمي وحلول الأعمال المبتكرة'
  };

  if (error) {
    console.error('Hero error:', error);
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center gradient-bg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {heroContent.title.split('\n').map((line: string, index: number) => (
                <span key={index} className={index > 0 ? "block text-yellow-300" : ""}>
                  {line}
                </span>
              ))}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {heroContent.subtitle && <><strong>{heroContent.subtitle}</strong><br /></>}
              {heroContent.description.split('\n').map((line: string, index: number) => (
                <span key={index}>
                  {line}
                  {index < heroContent.description.split('\n').length - 1 && <br />}
                </span>
              ))}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button className="btn-primary group">
                ابدأ مشروعك الآن
                <ArrowLeft className="inline-block mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary bg-white/10 border-white text-white hover:bg-white hover:text-gray-900">
                تعرف على خدماتنا
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-300">{stat.number}</div>
                  <div className="text-sm text-gray-200">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* Floating Cards */}
              <motion.div
                className="absolute top-0 right-0 w-48 h-32 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-8 h-8 bg-yellow-400 rounded-lg mb-2"></div>
                <h3 className="text-white font-semibold text-sm">حلول Odoo ERP</h3>
                <p className="text-gray-200 text-xs">نظام إدارة شامل</p>
              </motion.div>

              <motion.div
                className="absolute top-20 left-0 w-48 h-32 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <div className="w-8 h-8 bg-pink-400 rounded-lg mb-2"></div>
                <h3 className="text-white font-semibold text-sm">أزياء التخرج</h3>
                <p className="text-gray-200 text-xs">تصاميم مميزة</p>
              </motion.div>

              <motion.div
                className="absolute bottom-20 right-8 w-48 h-32 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              >
                <div className="w-8 h-8 bg-blue-400 rounded-lg mb-2"></div>
                <h3 className="text-white font-semibold text-sm">نقاط البيع</h3>
                <p className="text-gray-200 text-xs">حلول ذكية</p>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-8 w-48 h-32 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <div className="w-8 h-8 bg-green-400 rounded-lg mb-2"></div>
                <h3 className="text-white font-semibold text-sm">التجارة الإلكترونية</h3>
                <p className="text-gray-200 text-xs">متاجر احترافية</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;