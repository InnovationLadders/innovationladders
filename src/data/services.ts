import type { Service } from './types';

export const services: Service[] = [
  {
    id: '1',
    title: 'تطوير أنظمة ERP',
    description: 'نقدم حلول Odoo ERP المتكاملة لإدارة جميع جوانب عملك من المحاسبة والمخزون إلى الموارد البشرية والمبيعات',
    features: [
      'تخصيص وتطوير وحدات Odoo',
      'تكامل مع الأنظمة الخارجية',
      'تدريب ودعم فني مستمر',
      'حلول سحابية آمنة'
    ],
    icon: 'Settings',
    color: 'from-blue-500 to-cyan-500',
    is_active: true,
    order_index: 1
  },
  {
    id: '2',
    title: 'تطوير التطبيقات',
    description: 'نبني تطبيقات ويب وموبايل متطورة باستخدام أحدث التقنيات لتلبية احتياجات عملك الفريدة',
    features: [
      'تطبيقات ويب تفاعلية',
      'تطبيقات موبايل أصلية وهجينة',
      'تصميم واجهات مستخدم حديثة',
      'أداء عالي وقابلية توسع'
    ],
    icon: 'GraduationCap',
    color: 'from-purple-500 to-pink-500',
    is_active: true,
    order_index: 2
  },
  {
    id: '3',
    title: 'التجارة الإلكترونية',
    description: 'حلول متكاملة للمتاجر الإلكترونية مع أنظمة دفع آمنة وإدارة متقدمة للمنتجات والطلبات',
    features: [
      'منصات تجارة إلكترونية متكاملة',
      'بوابات دفع متعددة',
      'إدارة المخزون والشحن',
      'تحليلات ومتابعة المبيعات'
    ],
    icon: 'ShoppingCart',
    color: 'from-green-500 to-emerald-500',
    is_active: true,
    order_index: 3
  },
  {
    id: '4',
    title: 'الاستشارات التقنية',
    description: 'نساعدك في اختيار أفضل الحلول التقنية والتخطيط الاستراتيجي للتحول الرقمي في مؤسستك',
    features: [
      'تحليل احتياجات الأعمال',
      'التخطيط الاستراتيجي التقني',
      'تقييم وتحسين الأنظمة الحالية',
      'إدارة المشاريع التقنية'
    ],
    icon: 'Lightbulb',
    color: 'from-yellow-500 to-orange-500',
    is_active: true,
    order_index: 4
  },
  {
    id: '5',
    title: 'التسويق الرقمي',
    description: 'استراتيجيات تسويق رقمي متكاملة لتعزيز حضورك على الإنترنت وزيادة مبيعاتك',
    features: [
      'تحسين محركات البحث SEO',
      'إدارة حملات إعلانية',
      'تسويق عبر وسائل التواصل',
      'تحليل البيانات والأداء'
    ],
    icon: 'TrendingUp',
    color: 'from-red-500 to-pink-500',
    is_active: true,
    order_index: 5
  },
  {
    id: '6',
    title: 'الحلول السحابية',
    description: 'خدمات استضافة وحلول سحابية آمنة وموثوقة مع دعم فني متواصل',
    features: [
      'استضافة سحابية عالية الأداء',
      'نسخ احتياطي آلي',
      'حماية وأمان متقدم',
      'مراقبة وصيانة مستمرة'
    ],
    icon: 'Globe',
    color: 'from-indigo-500 to-purple-500',
    is_active: true,
    order_index: 6
  }
];
