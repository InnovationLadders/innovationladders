import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowUp
} from 'lucide-react';
import { useSupabaseData } from '../hooks/useSupabaseData';

const Footer: React.FC = () => {
  const { services, siteSettings } = useSupabaseData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeServices = services.filter(service => service.is_active);

  const quickLinks = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'خدماتنا', href: '#services' },
    { name: 'عن معمل الإبداع', href: '#about' },
    { name: 'معرض الأعمال', href: '#portfolio' },
    { name: 'اتصل بنا', href: '#contact' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-700' }
  ];

  // Get contact info from settings
  const contactInfo = siteSettings.contact_info || {
    phone: ['+966 12 345 6789'],
    email: ['info@innovationladders.com'],
    address: ['جدة، المملكة العربية السعودية']
  };

  const siteInfo = siteSettings.site_info || {
    siteName: 'معمل الإبداع - Innovation Ladders',
    siteDescription: 'شريكك في التحول الرقمي والابتكار'
  };

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Main Footer */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 space-x-reverse mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">معمل الإبداع</h3>
                  <p className="text-sm text-gray-400">Innovation Ladders</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {siteInfo.siteDescription}. نقدم حلولاً تقنية متطورة تساعد الشركات على النمو والازدهار في العصر الرقمي.
              </p>
              <div className="flex space-x-4 space-x-reverse">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 transition-colors ${social.color}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-bold mb-6">خدماتنا</h4>
              <ul className="space-y-3">
                {activeServices.map((service, index) => (
                  <li key={index}>
                    <a
                      href="#services"
                      className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg font-bold mb-6">معلومات التواصل</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                  <div>
                    {contactInfo.address.map((addr, idx) => (
                      <p key={idx} className={idx === 0 ? "text-gray-300" : "text-gray-400 text-sm"}>
                        {addr}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <div>
                    {contactInfo.phone.map((phone, idx) => (
                      <p key={idx} className={idx === 0 ? "text-gray-300" : "text-gray-400 text-sm"}>
                        {phone}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <div>
                    {contactInfo.email.map((email, idx) => (
                      <p key={idx} className={idx === 0 ? "text-gray-300" : "text-gray-400 text-sm"}>
                        {email}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-gray-400 text-sm mb-4 md:mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              © 2024 {siteInfo.siteName}. جميع الحقوق محفوظة.
            </motion.p>
            <motion.div
              className="flex items-center space-x-6 space-x-reverse text-sm text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
              <a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a>
              <a href="#" className="hover:text-white transition-colors">ملفات تعريف الارتباط</a>
              <a href="/admin" className="hover:text-white transition-colors">لوحة الإدارة</a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 left-8 w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;