import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Package,
  DollarSign,
  Users,
  BarChart,
  ShoppingCart,
  FileText,
  Truck,
  Calendar,
  Settings,
  Zap,
  Shield,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OdooPage: React.FC = () => {
  const features = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'المحاسبة والمالية',
      description: 'إدارة شاملة للحسابات، الفواتير، والتقارير المالية',
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'المبيعات وإدارة العملاء',
      description: 'نظام CRM متكامل لإدارة علاقات العملاء والمبيعات',
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: 'إدارة المخزون',
      description: 'تتبع المخزون، الشحن، والإمداد بكفاءة عالية',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'الموارد البشرية',
      description: 'إدارة الموظفين، الرواتب، والحضور والانصراف',
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'الشراء والموردين',
      description: 'أتمتة عمليات الشراء وإدارة العلاقات مع الموردين',
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: 'التقارير والتحليلات',
      description: 'لوحات معلومات تفاعلية وتقارير مفصلة',
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'إدارة المشاريع',
      description: 'تخطيط وتنفيذ ومتابعة المشاريع بسهولة',
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'التصنيع والإنتاج',
      description: 'إدارة العمليات الإنتاجية من الطلب إلى التسليم',
    },
  ];

  const benefits = [
    'نظام متكامل يغطي جميع احتياجات العمل',
    'واجهة سهلة الاستخدام باللغة العربية',
    'قابل للتخصيص حسب احتياجات شركتك',
    'تحديثات مستمرة ودعم فني محلي',
    'تكلفة أقل مقارنة بالأنظمة الأخرى',
    'تكامل سلس مع التطبيقات الأخرى',
  ];

  const packages = [
    {
      name: 'الباقة الأساسية',
      price: 'تبدأ من 2,500 ريال/شهرياً',
      features: [
        'المحاسبة والمالية',
        'إدارة المبيعات',
        'إدارة المخزون',
        'إدارة العملاء (CRM)',
        '5 مستخدمين',
        'دعم فني عبر البريد',
      ],
    },
    {
      name: 'الباقة المتقدمة',
      price: 'تبدأ من 5,000 ريال/شهرياً',
      features: [
        'كل مميزات الباقة الأساسية',
        'إدارة الموارد البشرية',
        'إدارة المشاريع',
        'نقاط البيع (POS)',
        '15 مستخدم',
        'دعم فني هاتفي',
        'تدريب مجاني',
      ],
      recommended: true,
    },
    {
      name: 'الباقة الاحترافية',
      price: 'حسب الطلب',
      features: [
        'كل مميزات الباقة المتقدمة',
        'التصنيع والإنتاج',
        'إدارة الأصول',
        'تطبيق موبايل مخصص',
        'مستخدمين غير محدودين',
        'دعم فني 24/7',
        'تطوير مخصص',
        'استضافة خاصة',
      ],
    },
  ];

  const stats = [
    { number: '500+', label: 'عميل راضٍ' },
    { number: '50+', label: 'مشروع Odoo منفذ' },
    { number: '10+', label: 'سنوات خبرة' },
    { number: '99%', label: 'نسبة رضا العملاء' },
  ];

  return (
    <div className="rtl">
      <Header />

      <section className="relative pt-32 pb-20 bg-gradient-to-b from-teal-600 to-teal-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold mb-6">نظام Odoo ERP المتكامل</h1>
              <p className="text-xl mb-8 text-teal-100">
                حول شركتك رقمياً مع نظام Odoo ERP - الحل الشامل لإدارة جميع عمليات الأعمال من منصة
                واحدة
              </p>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="#contact"
                  className="bg-white text-teal-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  احصل على عرض سعر
                </a>
                <a
                  href="#demo"
                  className="border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors"
                >
                  طلب عرض توضيحي
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
                src="/images/odoo-erp-system.webp"
                alt="Odoo ERP System"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">لماذا تختار Odoo؟</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نظام إدارة موارد مؤسسية شامل يساعدك على إدارة كل جوانب عملك بكفاءة وفعالية
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <div className="text-4xl font-bold text-teal-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="text-teal-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">المميزات الرئيسية</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-lg text-gray-700">{benefit}</span>
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
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">باقات الأسعار</h2>
            <p className="text-xl text-gray-600">اختر الباقة المناسبة لاحتياجات شركتك</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  pkg.recommended ? 'ring-4 ring-teal-600 scale-105' : ''
                }`}
              >
                {pkg.recommended && (
                  <div className="bg-teal-600 text-white text-center py-2 font-bold">
                    الأكثر طلباً
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-teal-600 mb-6">{pkg.price}</div>
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`block text-center py-3 px-6 rounded-lg font-bold transition-colors ${
                      pkg.recommended
                        ? 'bg-teal-600 text-white hover:bg-teal-700'
                        : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                    }`}
                  >
                    اطلب الآن
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">جاهز لتحويل شركتك رقمياً؟</h2>
            <p className="text-xl text-teal-100 mb-8">
              تواصل معنا اليوم للحصول على استشارة مجانية وعرض أسعار مخصص
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+966554344899"
                className="bg-white text-teal-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
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

export default OdooPage;
