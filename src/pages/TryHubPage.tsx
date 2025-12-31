import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bell, Share2, Heart, Star, Smartphone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TryHubPage: React.FC = () => {
  const features = [
    {
      icon: <MapPin className="w-12 h-12" />,
      title: 'خرائط تفاعلية',
      description: 'اكتشف المنتجات والخدمات القريبة منك بسهولة',
    },
    {
      icon: <Bell className="w-12 h-12" />,
      title: 'إشعارات ذكية',
      description: 'احصل على تنبيهات فورية بالعروض والمنتجات الجديدة',
    },
    {
      icon: <Share2 className="w-12 h-12" />,
      title: 'مشاركة التجارب',
      description: 'شارك تجربتك وآرائك مع المجتمع',
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'قوائم المفضلة',
      description: 'احفظ المنتجات والأماكن المفضلة لديك',
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: 'التقييمات والمراجعات',
      description: 'اقرأ تقييمات حقيقية من مستخدمين آخرين',
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: 'واجهة سهلة',
      description: 'تطبيق بسيط وسلس لتجربة استخدام مريحة',
    },
  ];

  const useCases = [
    {
      title: 'للمستخدمين',
      points: [
        'اكتشف منتجات وخدمات جديدة بسهولة',
        'احصل على عروض وخصومات حصرية',
        'شارك تجربتك واستفد من تجارب الآخرين',
        'وفر الوقت في البحث عن ما تريد',
      ],
    },
    {
      title: 'للتجار والشركات',
      points: [
        'عرض منتجاتك وخدماتك لجمهور واسع',
        'زيادة الوعي بعلامتك التجارية',
        'تحليلات تفصيلية عن العملاء',
        'تواصل مباشر مع العملاء المحتملين',
      ],
    },
  ];

  return (
    <div className="rtl">
      <Header />

      <section className="relative pt-32 pb-20 bg-gradient-to-b from-purple-600 to-purple-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold mb-6">تطبيق TryHub</h1>
              <p className="text-xl mb-8 text-purple-100">
                اكتشف وجرب المنتجات والخدمات المحلية بطريقة جديدة ومبتكرة
              </p>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="#download"
                  className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  حمل التطبيق
                </a>
                <a
                  href="#features"
                  className="border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors"
                >
                  المزيد من المعلومات
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
                src="/images/tryhub-app.webp"
                alt="TryHub App"
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">مميزات التطبيق</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              تجربة فريدة لاكتشاف المنتجات والخدمات المحلية
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
                <div className="text-purple-600 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{useCase.title}</h3>
                <ul className="space-y-4">
                  {useCase.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">TryHub بالأرقام</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-purple-600 mb-2">50K+</div>
                <div className="text-gray-600">مستخدم نشط</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-purple-600 mb-2">2K+</div>
                <div className="text-gray-600">تاجر مسجل</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-purple-600 mb-2">100K+</div>
                <div className="text-gray-600">منتج</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-purple-600 mb-2">4.8</div>
                <div className="text-gray-600">تقييم التطبيق</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="download" className="py-20 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">حمل التطبيق الآن</h2>
            <p className="text-xl text-purple-100 mb-8">
              ابدأ رحلتك في اكتشاف المنتجات والخدمات المحلية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+966554344899"
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                اتصل للاستفسار
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

export default TryHubPage;
