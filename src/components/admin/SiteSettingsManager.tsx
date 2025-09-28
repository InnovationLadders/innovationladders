import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Home,
  Info,
  Eye
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

// Default site settings structure
const defaultSiteSettings = {
  siteName: '',
  siteDescription: '',
  contactInfo: {
    phone: [''],
    email: [''],
    address: [''],
    workingHours: ['']
  },
  socialLinks: {
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  },
  heroSection: {
    title: '',
    subtitle: '',
    description: ''
  },
  aboutSection: {
    title: '',
    description: '',
    mission: '',
    vision: '',
    values: ''
  }
};

const SiteSettingsManager: React.FC = () => {
  const { siteSettings, updateSiteSettings } = useAdmin();
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'social' | 'content'>('general');
  const [formData, setFormData] = useState(() => ({
    ...defaultSiteSettings,
    ...siteSettings
  }));
  const [isSaving, setIsSaving] = useState(false);

  // Update formData when siteSettings changes
  useEffect(() => {
    setFormData(prev => ({
      ...defaultSiteSettings,
      ...siteSettings,
      contactInfo: {
        ...defaultSiteSettings.contactInfo,
        ...siteSettings.contactInfo
      },
      socialLinks: {
        ...defaultSiteSettings.socialLinks,
        ...siteSettings.socialLinks
      },
      heroSection: {
        ...defaultSiteSettings.heroSection,
        ...siteSettings.heroSection
      },
      aboutSection: {
        ...defaultSiteSettings.aboutSection,
        ...siteSettings.aboutSection
      }
    }));
  }, [siteSettings]);

  const tabs = [
    { id: 'general', name: 'الإعدادات العامة', icon: Globe },
    { id: 'contact', name: 'معلومات التواصل', icon: Phone },
    { id: 'social', name: 'وسائل التواصل', icon: Facebook },
    { id: 'content', name: 'محتوى الصفحات', icon: Home }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Update each setting individually
      for (const [key, value] of Object.entries(formData)) {
        await updateSiteSettings(key, value);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    }
    setIsSaving(false);
  };

  const updateFormData = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const updateArrayField = (section: string, field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: (prev[section as keyof typeof prev] as any)[field].map((item: string, i: number) => 
          i === index ? value : item
        )
      }
    }));
  };

  const addArrayItem = (section: string, field: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: [...(prev[section as keyof typeof prev] as any)[field], '']
      }
    }));
  };

  const removeArrayItem = (section: string, field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: (prev[section as keyof typeof prev] as any)[field].filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium mb-2">اسم الموقع</label>
        <input
          type="text"
          value={formData.siteName}
          onChange={(e) => setFormData(prev => ({ ...prev, siteName: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">وصف الموقع</label>
        <textarea
          value={formData.siteDescription}
          onChange={(e) => setFormData(prev => ({ ...prev, siteDescription: e.target.value }))}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        />
      </div>
    </div>
  );

  const renderContactSettings = () => (
    <div className="space-y-6">
      {/* Phone Numbers */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-gray-700 font-medium">
            <Phone className="w-4 h-4 inline-block ml-2" />
            أرقام الهاتف
          </label>
          <button
            type="button"
            onClick={() => addArrayItem('contactInfo', 'phone')}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            + إضافة رقم
          </button>
        </div>
        <div className="space-y-3">
          {formData.contactInfo.phone.map((phone, index) => (
            <div key={index} className="flex items-center space-x-3 space-x-reverse">
              <input
                type="tel"
                value={phone}
                onChange={(e) => updateArrayField('contactInfo', 'phone', index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="رقم الهاتف"
              />
              {formData.contactInfo.phone.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('contactInfo', 'phone', index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Email Addresses */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-gray-700 font-medium">
            <Mail className="w-4 h-4 inline-block ml-2" />
            عناوين البريد الإلكتروني
          </label>
          <button
            type="button"
            onClick={() => addArrayItem('contactInfo', 'email')}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            + إضافة بريد
          </button>
        </div>
        <div className="space-y-3">
          {formData.contactInfo.email.map((email, index) => (
            <div key={index} className="flex items-center space-x-3 space-x-reverse">
              <input
                type="email"
                value={email}
                onChange={(e) => updateArrayField('contactInfo', 'email', index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="البريد الإلكتروني"
              />
              {formData.contactInfo.email.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('contactInfo', 'email', index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Addresses */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-gray-700 font-medium">
            <MapPin className="w-4 h-4 inline-block ml-2" />
            العناوين
          </label>
          <button
            type="button"
            onClick={() => addArrayItem('contactInfo', 'address')}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            + إضافة عنوان
          </button>
        </div>
        <div className="space-y-3">
          {formData.contactInfo.address.map((address, index) => (
            <div key={index} className="flex items-center space-x-3 space-x-reverse">
              <input
                type="text"
                value={address}
                onChange={(e) => updateArrayField('contactInfo', 'address', index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="العنوان"
              />
              {formData.contactInfo.address.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('contactInfo', 'address', index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Working Hours */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-gray-700 font-medium">
            <Clock className="w-4 h-4 inline-block ml-2" />
            أوقات العمل
          </label>
          <button
            type="button"
            onClick={() => addArrayItem('contactInfo', 'workingHours')}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            + إضافة وقت
          </button>
        </div>
        <div className="space-y-3">
          {formData.contactInfo.workingHours.map((hours, index) => (
            <div key={index} className="flex items-center space-x-3 space-x-reverse">
              <input
                type="text"
                value={hours}
                onChange={(e) => updateArrayField('contactInfo', 'workingHours', index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="أوقات العمل"
              />
              {formData.contactInfo.workingHours.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('contactInfo', 'workingHours', index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSocialSettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            <Facebook className="w-4 h-4 inline-block ml-2" />
            فيسبوك
          </label>
          <input
            type="url"
            value={formData.socialLinks.facebook || ''}
            onChange={(e) => updateFormData('socialLinks', 'facebook', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="https://facebook.com/..."
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            <Twitter className="w-4 h-4 inline-block ml-2" />
            تويتر
          </label>
          <input
            type="url"
            value={formData.socialLinks.twitter || ''}
            onChange={(e) => updateFormData('socialLinks', 'twitter', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="https://twitter.com/..."
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            <Instagram className="w-4 h-4 inline-block ml-2" />
            إنستغرام
          </label>
          <input
            type="url"
            value={formData.socialLinks.instagram || ''}
            onChange={(e) => updateFormData('socialLinks', 'instagram', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="https://instagram.com/..."
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            <Linkedin className="w-4 h-4 inline-block ml-2" />
            لينكد إن
          </label>
          <input
            type="url"
            value={formData.socialLinks.linkedin || ''}
            onChange={(e) => updateFormData('socialLinks', 'linkedin', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="https://linkedin.com/..."
          />
        </div>
      </div>
    </div>
  );

  const renderContentSettings = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          <Home className="w-5 h-5 inline-block ml-2" />
          قسم البطل (Hero Section)
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">العنوان الرئيسي</label>
            <input
              type="text"
              value={formData.heroSection.title}
              onChange={(e) => updateFormData('heroSection', 'title', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">العنوان الفرعي</label>
            <input
              type="text"
              value={formData.heroSection.subtitle}
              onChange={(e) => updateFormData('heroSection', 'subtitle', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">الوصف</label>
            <textarea
              value={formData.heroSection.description}
              onChange={(e) => updateFormData('heroSection', 'description', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          <Info className="w-5 h-5 inline-block ml-2" />
          قسم عن الشركة
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">العنوان</label>
            <input
              type="text"
              value={formData.aboutSection.title}
              onChange={(e) => updateFormData('aboutSection', 'title', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">الوصف</label>
            <textarea
              value={formData.aboutSection.description}
              onChange={(e) => updateFormData('aboutSection', 'description', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">الرسالة</label>
            <textarea
              value={formData.aboutSection.mission}
              onChange={(e) => updateFormData('aboutSection', 'mission', e.target.value)}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">الرؤية</label>
            <textarea
              value={formData.aboutSection.vision}
              onChange={(e) => updateFormData('aboutSection', 'vision', e.target.value)}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">القيم</label>
            <textarea
              value={formData.aboutSection.values}
              onChange={(e) => updateFormData('aboutSection', 'values', e.target.value)}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'contact': return renderContactSettings();
      case 'social': return renderSocialSettings();
      case 'content': return renderContentSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">إعدادات الموقع</h2>
        <div className="flex items-center space-x-3 space-x-reverse">
          <button className="btn-secondary flex items-center">
            <Eye className="w-4 h-4 ml-2" />
            معاينة الموقع
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary flex items-center disabled:opacity-50"
          >
            <Save className="w-4 h-4 ml-2" />
            {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center px-4 py-3 text-right rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-600 border border-primary-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5 ml-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              {tabs.find(tab => tab.id === activeTab)?.name}
            </h3>
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SiteSettingsManager;