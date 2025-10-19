import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react'; // حذفنا ExternalLink لأنه لم يعد مستخدمًا
import { projects } from '../data';

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('الكل');

  const activeProjects = projects.filter((project) => project.is_active);
  const categories = Array.from(new Set(activeProjects.map((p) => p.category)));
  const filters = ['الكل', ...categories];

  const filteredProjects =
    activeFilter === 'الكل'
      ? activeProjects
      : activeProjects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="section-padding bg-gray-50">
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
            معرض
            <span className="gradient-text"> أعمالنا</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نفخر بعرض مجموعة من مشاريعنا الناجحة التي حققت نتائج مميزة لعملائنا
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Filter className="w-4 h-4 inline-block ml-2" />
              {filter} (
              {filter === 'الكل'
                ? activeProjects.length
                : activeProjects.filter((p) => p.category === filter).length}
              )
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* تم إخفاء زر عرض المشروع */}
                  {/* 
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <button className="w-full bg-white/20 backdrop-blur-md text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                        <ExternalLink className="w-4 h-4 ml-2" />
                        عرض المشروع
                      </button>
                    </div>
                  </div>
                  */}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-sm text-primary-600 font-medium mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            هل لديك مشروع في ذهنك؟
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            دعنا نساعدك في تحويل فكرتك إلى واقع
          </p>
          <button className="btn-primary text-lg px-8 py-4">
            ابدأ مشروعك الآن
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
