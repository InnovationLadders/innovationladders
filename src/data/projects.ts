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
    image: '/images/project-khabir.jpg',
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
    image: '/images/project-proads.jpg',
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
    image: '/images/project-gulfhat.jpg',
    tags: ['E-commerce', 'Shopify', 'Payment Integration', 'Shipping'],
    link: '#',
    is_active: true,
    order_index: 6
  },
  {
    id: '7',
    title: 'باص مكة السياحي',
    category: 'تجارة إلكترونية',
    description: 'تطبيق حجز رحلات سياحية في مكة المكرمة بتصميم عصري وتجربة سلسة',
    image: '/images/project-bus.jpg',
    tags: ['E-commerce', 'Shopify', 'Payment Integration', 'Shipping'],
    link: '#',
    is_active: true,
    order_index: 7
  },
  {
    id: '8',
    title: 'هلا بوينت',
    category: 'تجارة إلكترونية',
    description: 'متجر إلكتروني متخصص في المنتجات المحلية والخدمات الرقمية',
    image: '/images/project-halapoint.jpg',
    tags: ['E-commerce', 'Shopify', 'Payment Integration', 'Shipping'],
    link: '#',
    is_active: true,
    order_index: 8
  },
  {
    id: '9',
    title: 'ساعة المسجد منارة',
    category: 'تجارة إلكترونية',
    description: 'نظام ذكي لعرض أوقات الصلاة في المساجد مع تحكم عن بُعد',
    image: '/images/project-manarah.jpg',
    tags: ['IoT', 'Embedded', 'Web Dashboard'],
    link: '#',
    is_active: true,
    order_index: 9
  },
  {
    id: '10',
    title: 'المظلة المتحركة',
    category: 'حلول ذكية',
    description: 'نظام مظلة متحركة ذكي يعمل بالطاقة الشمسية والتحكم الآلي',
    image: '/images/project-shades-mov.jpg',
    tags: ['IoT', 'Automation', 'Smart City'],
    link: '#',
    is_active: true,
    order_index: 10
  },
  {
    id: '11',
    title: 'نظام استقبال الطلبات',
    category: 'أنظمة ذكية',
    description: 'نظام متكامل لإدارة الطلبات الذكية من نقاط البيع وحتى التسليم',
    image: '/images/project-smart-pickup.jpg',
    tags: ['React', 'Node.js', 'POS', 'API Integration'],
    link: '#',
    is_active: true,
    order_index: 11
  },
  {
    id: '12',
    title: 'المطب الذكي',
    category: 'حلول مرورية',
    description: 'نظام مطب ذكي للتحكم في السرعة حسب نوع المركبة',
    image: '/images/project-smart-street.jpg',
    tags: ['IoT', 'Sensors', 'Automation'],
    link: '#',
    is_active: true,
    order_index: 12
  },
  {
    id: '13',
    title: 'التيفو الإلكتروني',
    category: 'تقنيات عرض',
    description: 'نظام عرض إلكتروني مبتكر للملاعب والفعاليات الرياضية',
    image: '/images/project-tifo.jpg',
    tags: ['LED', 'Control System', 'Event Tech'],
    link: '#',
    is_active: true,
    order_index: 13
  },
  {
    id: '14',
    title: 'القرية التقنية',
    category: 'مشروعات تطوير',
    description: 'مجمع ذكي لتطوير حلول المدن الذكية والأنظمة التقنية',
    image: '/images/project-technopark.jpg',
    tags: ['Smart City', 'IoT', 'Innovation'],
    link: '#',
    is_active: true,
    order_index: 14
  },
  {
    id: '15',
    title: 'المظلة المشجرة',
    category: 'حلول بيئية',
    description: 'مظلات ذكية صديقة للبيئة تعمل بالطاقة الشمسية',
    image: '/images/project-tree-shades.jpg',
    tags: ['Green Tech', 'Solar Energy', 'IoT'],
    link: '#',
    is_active: true,
    order_index: 15
  },
  {
    id: '16',
    title: 'ساتر الورد',
    category: 'ديكور خارجي',
    description: 'حلول جمالية للمساحات العامة باستخدام الجدران الخضراء الاصطناعية',
    image: '/images/project-wall-ros.jpg',
    tags: ['Design', 'Sustainability', 'Landscape'],
    link: '#',
    is_active: true,
    order_index: 16
  },
  {
    id: '17',
    title: 'العداد الذكي',
    category: 'أنظمة مراقبة',
    description: 'نظام ذكي لمراقبة استهلاك المياه والطاقة عن بُعد',
    image: '/images/project-water-count.jpg',
    tags: ['IoT', 'Metering', 'Dashboard'],
    link: '#',
    is_active: true,
    order_index: 17
  },
  {
    id: '18',
    title: 'متجر زيارات',
    category: 'تجارة إلكترونية',
    description: 'متجر إلكتروني لمنتجات الحجاج والزوار بتجربة شراء سلسة',
    image: '/images/project-ziarat.jpg',
    tags: ['E-commerce', 'Shopify', 'UX'],
    link: '#',
    is_active: true,
    order_index: 18
  }
];
