import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users, Award, Zap, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'الهدف',
      description: 'نسعى لتكون الشريك الأول في التحول الرقمي والابتكار'
    },
    {
      icon: Eye,
      title: 'الرؤية',
      description: 'أن نكون رواد الإبداع والابتكار في المملكة العربية السعودية'
    },
    {
      icon: Heart,
      title: 'القيم',
      description: 'الجودة، الإبداع، الشفافية، والالتزام بتحقيق رضا العملاء'
    }
  ];

  const achievements = [
    {
      icon: Users,
      number: '500+',
      title: 'عميل راضٍ',
      description: 'عملاء يثقون في خدماتنا'
    },
    {
      icon: Award,
      number: '100+',
      title: 'مشروع ناجح',
      description: 'مشاريع تم تنفيذها بنجاح'
    },
    {
      icon: Zap,
      number: '10+',
      title: 'سنوات خبرة',
      description: 'في مجال التكنولوجيا والابتكار'
    }
  ];

  return (
    <section id="about" className="section-padding bg-white">
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
            عن
            <span className="gradient-text"> معمل الإبداع</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نحن فريق من المبدعين والمبتكرين، نعمل على تقديم حلول تقنية متطورة تساعد الشركات على النمو والازدهار
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              قصة نجاحنا
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              بدأت رحلتنا في عام 2014 برؤية واضحة: تقديم حلول تقنية مبتكرة تساعد الشركات السعودية على مواكبة التطور التكنولوجي العالمي. منذ ذلك الحين، نمونا لنصبح واحدة من الشركات الرائدة في مجال التحول الرقمي والابتكار.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              نحن نؤمن بأن الإبداع والابتكار هما مفتاح النجاح في عالم الأعمال اليوم. لذلك، نعمل باستمرار على تطوير خدماتنا وحلولنا لتلبية احتياجات عملائنا المتغيرة.
            </p>

            {/* Values */}
            <div className="space-y-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="flex items-start space-x-4 space-x-reverse"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h4>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Main Image Placeholder */}
              <div className="w-full h-96 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-12 h-12 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">معمل الإبداع</h4>
                  <p className="text-gray-600">Innovation Ladders Jeddah</p>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Lightbulb className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-full flex items-center justify-center shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              className="text-center p-8 bg-gray-50 rounded-2xl card-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <achievement.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">
                {achievement.number}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {achievement.title}
              </h4>
              <p className="text-gray-600">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;