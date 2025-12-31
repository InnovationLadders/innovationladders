import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Users, Target, Award, BookOpen, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MashroiPage: React.FC = () => {
  const features = [
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: 'بنك الأفكار',
      description: 'مكتبة ضخمة من أفكار المشاريع في مختلف المجالات لإلهام الطلاب',
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: 'أدوات التنفيذ',
      description: 'أدوات تخطيط وتنظيم متقدمة لإدارة المشاريع بكفاءة',
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'التعاون والمشاركة',
      description: 'بيئة تفاعلية للعمل الجماعي ومشاركة الأفكار',
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'التقييم الذكي',
      description: 'نظام تقييم شامل يتتبع التقدم ويقيم الأداء',
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: 'معرض المشاريع',
      description: 'منصة لعرض ومشاركة المشاريع المتميزة',
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'مهارات القرن 21',
      description: 'تطوير مهارات التفكير النقدي والإبداع والتعاون',
    },
  ];

  const benefits = [
    'منصة عربية بالكامل مع دعم اللغة الإنجليزية',
    'متوافقة مع معايير التعليم السعودية',
    'سهلة الاستخدام للمعلمين والطلاب',
    'تقارير تفصيلية عن أداء الطلاب',
    'قابلة للتخصيص حسب احتياجات المدرسة',
    'دعم فني مستمر وتدريب شامل',
  ];

  return (
    <div className="rtl">
      <Header />

      <section className="relative pt-32 pb-20 bg-gradient-to-b from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold mb-6">منصة مشروعي</h1>
              <p className="text-xl mb-8 text-blue-100">
                المنصة التعليمية الأولى عربياً لإدارة المشاريع الطلابية - من الفكرة إلى التنفيذ
              </p>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="#contact"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  ابدأ الآن
                </a>
                <a
                  href="#features"
                  className="border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors"
                >
                  اكتشف المزيد
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="/images/mashrooi-platform.webp"
                alt="Mashroi Platform"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">مميزات المنصة</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              كل ما تحتاجه لإدارة المشاريع الطلابية بفعالية
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow text-center"
              >
                <div className="text-blue-600 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">لماذا تختار مشروعي؟</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-8 rounded-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
                    <div className="text-gray-600">طالب مستخدم</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                    <div className="text-gray-600">مدرسة</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">25,000+</div>
                    <div className="text-gray-600">مشروع منجز</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                    <div className="text-gray-600">نسبة الرضا</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">ابدأ مع مشروعي اليوم</h2>
            <p className="text-xl text-blue-100 mb-8">
              انضم إلى مئات المدارس التي تستخدم منصة مشروعي لتطوير مهارات طلابها
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+966554344899"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                اتصل الآن: 055 434 4899
              </a>
              <a
                href="mailto:sales@innovationladders.com"
                className="border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors"
              >
                أرسل بريد إلكتروني
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MashroiPage;
