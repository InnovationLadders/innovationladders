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
import { services } from '../data';

const Services: React.FC = () => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    Settings,
    GraduationCap,
    ShoppingCart,
    Lightbulb,
    TrendingUp,
    Globe
  };

  const activeServices = services.filter(service => service.is_active);

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
          {activeServices.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Settings;
            return (
            <motion.div
              key={service.title}
              className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Image or Icon */}
              {service.image ? (
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className={`h-32 bg-gradient-to-r ${service.color} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                  <IconComponent className="w-16 h-16 text-white" />
                </div>
              )}

              {/* Content */}
              <div className="p-8">
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
              </div>
            </motion.div>
          );
          })}
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