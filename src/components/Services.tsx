import React from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  GraduationCap, 
  ShoppingCart, 
  Lightbulb, 
  TrendingUp, 
  Globe,
  ArrowLeft
} from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Settings,
      title: 'حلول Odoo ERP',
      description: 'نظام إدارة موارد المؤسسات الشامل لتحسين كفاءة العمليات وزيادة الإنتاجية',
      features: ['إدارة المبيعات', 'إدارة المخزون', 'المحاسبة', 'الموارد البشرية'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: GraduationCap,
      title: 'أزياء التخرج',
      description: 'تصميم وتوريد أزياء التخرج الأكاديمية بأعلى معايير الجودة والأناقة',
      features: ['تصاميم مخصصة', 'جودة عالية', 'توريد سريع', 'أسعار تنافسية'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: ShoppingCart,
      title: 'حلول نقاط البيع',
      description: 'أنظمة نقاط البيع الذكية والمتطورة لتحسين تجربة العملاء وإدارة المبيعات',
      features: ['واجهة سهلة', 'تقارير تفصيلية', 'إدارة المخزون', 'دعم متعدد الفروع'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Lightbulb,
      title: 'استشارات الابتكار',
      description: 'خدمات استشارية متخصصة لتطوير الأفكار الإبداعية وتحويلها إلى حلول عملية',
      features: ['تحليل الأفكار', 'دراسة الجدوى', 'خطط التنفيذ', 'متابعة المشاريع'],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: TrendingUp,
      title: 'برامج ريادة الأعمال',
      description: 'برامج تدريبية وتطويرية لرواد الأعمال لبناء مشاريع ناجحة ومستدامة',
      features: ['ورش تدريبية', 'إرشاد ومتابعة', 'شبكة رواد الأعمال', 'دعم التمويل'],
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Globe,
      title: 'التجارة الإلكترونية',
      description: 'تطوير متاجر إلكترونية احترافية ومتكاملة مع أنظمة الدفع والشحن',
      features: ['تصميم متجاوب', 'أنظمة دفع آمنة', 'إدارة الطلبات', 'تحليلات المبيعات'],
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            خدماتنا
            <span className="gradient-text block">المتميزة</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نقدم مجموعة شاملة من الخدمات المبتكرة التي تلبي احتياجات عملائنا وتساعدهم على تحقيق أهدافهم
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-white rounded-2xl p-8 shadow-lg card-hover group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full ml-3`}></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button className="flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors group">
                اعرف المزيد
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              هل تحتاج خدمة مخصصة؟
            </h3>
            <p className="text-xl mb-8 text-gray-100">
              نحن نقدم حلولاً مخصصة تماماً لاحتياجاتك الخاصة
            </p>
            <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
              تواصل معنا الآن
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;