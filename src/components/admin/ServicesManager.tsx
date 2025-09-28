import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  EyeOff,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { Service } from '../../types/admin';

const ServicesManager: React.FC = () => {
  const { services, updateService, deleteService, addService } = useAdmin();
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    description: '',
    features: [''],
    icon: 'Settings',
    color: 'from-blue-500 to-blue-600',
    isActive: true,
    order: services.length + 1
  });

  const iconOptions = [
    'Settings', 'GraduationCap', 'ShoppingCart', 'Lightbulb', 'TrendingUp', 'Globe'
  ];

  const colorOptions = [
    { name: 'أزرق', value: 'from-blue-500 to-blue-600' },
    { name: 'أخضر', value: 'from-green-500 to-green-600' },
    { name: 'بنفسجي', value: 'from-purple-500 to-purple-600' },
    { name: 'أحمر', value: 'from-red-500 to-red-600' },
    { name: 'أصفر', value: 'from-yellow-500 to-orange-500' },
    { name: 'وردي', value: 'from-pink-500 to-pink-600' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingService) {
      updateService(editingService.id, formData);
      setEditingService(null);
    } else {
      addService(formData as Omit<Service, 'id'>);
      setShowAddForm(false);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      features: [''],
      icon: 'Settings',
      color: 'from-blue-500 to-blue-600',
      isActive: true,
      order: services.length + 1
    });
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData(service);
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setEditingService(null);
    setShowAddForm(false);
    resetForm();
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...(prev.features || []), '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.map((feature, i) => i === index ? value : feature) || []
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index) || []
    }));
  };

  const toggleServiceStatus = (id: string, isActive: boolean) => {
    updateService(id, { isActive: !isActive });
  };

  const moveService = (id: string, direction: 'up' | 'down') => {
    const service = services.find(s => s.id === id);
    if (!service) return;

    const newOrder = direction === 'up' ? service.order - 1 : service.order + 1;
    const targetService = services.find(s => s.order === newOrder);

    if (targetService) {
      updateService(id, { order: newOrder });
      updateService(targetService.id, { order: service.order });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">إدارة الخدمات</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 ml-2" />
          إضافة خدمة جديدة
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
                {editingService ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
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
                  <label className="block text-gray-700 font-medium mb-2">عنوان الخدمة</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">الأيقونة</label>
                  <select
                    value={formData.icon || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">وصف الخدمة</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">اللون</label>
                <div className="grid grid-cols-3 gap-3">
                  {colorOptions.map(color => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.color === color.value 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-full h-8 bg-gradient-to-r ${color.value} rounded mb-2`}></div>
                      <span className="text-sm text-gray-700">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-gray-700 font-medium">المميزات</label>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    + إضافة ميزة
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.features?.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 space-x-reverse">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="أدخل الميزة"
                      />
                      {formData.features && formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
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
                    checked={formData.isActive || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="mr-2 text-gray-700">خدمة نشطة</span>
                </label>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="btn-primary flex items-center"
                >
                  <Save className="w-4 h-4 ml-2" />
                  {editingService ? 'حفظ التعديلات' : 'إضافة الخدمة'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-secondary"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Services List */}
      <div className="grid gap-6">
        {services
          .sort((a, b) => a.order - b.order)
          .map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 space-x-reverse flex-1">
                <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-xs">{service.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 space-x-reverse mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      service.isActive 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {service.isActive ? 'نشط' : 'غير نشط'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <button
                  onClick={() => moveService(service.id, 'up')}
                  disabled={index === 0}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveService(service.id, 'down')}
                  disabled={index === services.length - 1}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleServiceStatus(service.id, service.isActive)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  {service.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 text-blue-600 hover:text-blue-700"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteService(service.id)}
                  className="p-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServicesManager;