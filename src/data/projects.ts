import type { Project } from './types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'نظام Odoo ERP متكامل',
    category: 'أنظمة إدارية',
    description: 'نظام إدارة موارد مؤسسية شامل يغطي جميع جوانب العمل من المحاسبة إلى إدارة المشاريع',
    image: '/images/odoo-erp-system.webp',
    tags: ['Odoo', 'ERP', 'Python', 'PostgreSQL'],
    link: '#',
    is_active: true,
    order_index: 1
  },
  {
    id: '2',
    title: 'منصة مشروعي',
    category: 'تطبيقات ويب',
    description: 'منصة متكاملة لإدارة المشاريع الصغيرة والمتوسطة مع أدوات تخطيط ومتابعة متقدمة',
    image: '/images/mashrooi-platform.webp',
    tags: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    link: '#',
    is_active: true,
    order_index: 2
  },
  {
    id: '3',
    title: 'تطبيق TryHub',
    category: 'تطبيقات موبايل',
    description: 'تطبيق موبايل مبتكر لاكتشاف وتجربة المنتجات والخدمات الجديدة في منطقتك',
    image: '/images/tryhub-app.webp',
    tags: ['React Native', 'Firebase', 'Maps API', 'Push Notifications'],
    link: '#',
    is_active: true,
    order_index: 3
  },
  {
    id: '4',
    title: 'منصة خبير',
    category: 'منصات تعليمية',
    description: 'منصة تعليمية تفاعلية تربط المتعلمين بالخبراء في مختلف المجالات',
    image: '/images/منصة خبير.jpg',
    tags: ['Vue.js', 'Laravel', 'WebRTC', 'Payment Gateway'],
    link: '#',
    is_active: true,
    order_index: 4
  },
  {
    id: '5',
    title: 'الإعلان التفاعلي PRO ADS',
    category: 'التسويق الرقمي',
    description: 'نظام إعلانات تفاعلي متطور يوفر تحليلات دقيقة وإدارة فعالة للحملات الإعلانية',
    image: '/images/الاعلان التفاعلي PRO ADS.jpg',
    tags: ['React', 'Analytics', 'Advertising', 'Dashboard'],
    link: '#',
    is_active: true,
    order_index: 5
  },
  {
    id: '6',
    title: 'القبعة الخليجية',
    category: 'تجارة إلكترونية',
    description: 'متجر إلكتروني متخصص في بيع المنتجات التراثية الخليجية بتصميم عصري وتجربة مستخدم سلسة',
    image: '/images/القبعة الخليجية.jpg',
    tags: ['E-commerce', 'Shopify', 'Payment Integration', 'Shipping'],
    link: '#',
    is_active: true,
    order_index: 6
  }
];
