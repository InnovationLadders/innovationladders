import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FileEdit as Edit, Trash2, Save, X, Eye, EyeOff, ArrowUp, ArrowDown, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { Project } from '../../types/admin';
import ImageUpload from './ImageUpload';
import { uploadImage } from '../../lib/imageUpload';

const ProjectsManager: React.FC = () => {
  const { projects, updateProject, deleteProject, addProject } = useAdmin();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    category: '',
    description: '',
    image: '',
    tags: [''],
    link: '',
    is_active: true,
    order_index: projects.length + 1
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const categories = [
    'تطوير المواقع',
    'أنظمة ERP',
    'التجارة الإلكترونية',
    'تطبيقات الجوال',
    'أنظمة إدارة',
    'مواقع تعليمية'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = formData.image;

      if (selectedImage) {
        const result = await uploadImage(
          selectedImage,
          'project-images',
          editingProject?.image
        );
        imageUrl = result.url;
      }

      const dataToSubmit = {
        ...formData,
        image: imageUrl
      };

      if (editingProject) {
        await updateProject(editingProject.id, dataToSubmit);
        setEditingProject(null);
      } else {
        await addProject(dataToSubmit as Omit<Project, 'id'>);
        setShowAddForm(false);
      }

      resetForm();
      setSelectedImage(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error instanceof Error ? error.message : 'حدث خطأ أثناء حفظ البيانات');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      image: '',
      tags: [''],
      link: '',
      is_active: true,
      order_index: projects.length + 1
    });
    setSelectedImage(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setEditingProject(null);
    setShowAddForm(false);
    resetForm();
  };

  const addTag = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...(prev.tags || []), '']
    }));
  };

  const updateTag = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.map((tag, i) => i === index ? value : tag) || []
    }));
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== index) || []
    }));
  };

  const toggleProjectStatus = (id: string, is_active: boolean) => {
    updateProject(id, { is_active: !is_active });
  };

  const moveProject = (id: string, direction: 'up' | 'down') => {
    const project = projects.find(p => p.id === id);
    if (!project) return;

    const newOrder = direction === 'up' ? project.order_index - 1 : project.order_index + 1;
    const targetProject = projects.find(p => p.order_index === newOrder);

    if (targetProject) {
      updateProject(id, { order_index: newOrder });
      updateProject(targetProject.id, { order_index: project.order_index });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">إدارة المشاريع</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 ml-2" />
          إضافة مشروع جديد
        </button>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">
                {editingProject ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
              </h3>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">عنوان المشروع</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">التصنيف</label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">اختر التصنيف</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">وصف المشروع</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              <ImageUpload
                currentImage={formData.image}
                onImageSelect={(file) => setSelectedImage(file)}
                onImageRemove={() => {
                  setSelectedImage(null);
                  setFormData(prev => ({ ...prev, image: '' }));
                }}
                label="صورة المشروع"
                disabled={uploading}
              />

              <div>
                <label className="block text-gray-700 font-medium mb-2">رابط المشروع</label>
                <input
                  type="url"
                  value={formData.link || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-gray-700 font-medium">التقنيات المستخدمة</label>
                  <button
                    type="button"
                    onClick={addTag}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    + إضافة تقنية
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.tags?.map((tag, index) => (
                    <div key={index} className="flex items-center space-x-3 space-x-reverse">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => updateTag(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="أدخل التقنية"
                      />
                      {formData.tags && formData.tags.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_active || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="mr-2 text-gray-700">مشروع نشط</span>
                </label>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="btn-primary flex items-center"
                  disabled={uploading}
                >
                  <Save className="w-4 h-4 ml-2" />
                  {uploading ? 'جاري الحفظ...' : (editingProject ? 'حفظ التعديلات' : 'إضافة المشروع')}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-secondary"
                  disabled={uploading}
                >
                  إلغاء
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects
          .sort((a, b) => a.order_index - b.order_index)
          .map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200"
          >
            {/* Image */}
            <div className="relative h-48">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex items-center space-x-2 space-x-reverse">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  project.is_active 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {project.is_active ? 'نشط' : 'غير نشط'}
                </span>
              </div>
              {project.link && (
                <div className="absolute bottom-3 left-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/90 rounded-lg text-gray-700 hover:bg-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-sm text-primary-600 font-medium">{project.category}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">{project.title}</h3>
                </div>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <button
                    onClick={() => moveProject(project.id, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => moveProject(project.id, 'down')}
                    disabled={index === projects.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => toggleProjectStatus(project.id, project.is_active)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    {project.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 text-blue-600 hover:text-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-500">ترتيب: {project.order_index}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsManager;