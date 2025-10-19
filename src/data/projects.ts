import type { Project } from './types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'نظام Odoo ERP متكامل',
    category: 'أنظمة إدارية',
    description: 'نظام إدارة موارد مؤسسية شامل يغطي المحاسبة وإدارة الموارد والمشاريع بتكامل كامل.',
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
    description: 'منصة لإدارة المشاريع الطلابية: بنك أفكار، أدوات تنفيذ، تتبع، تقييم وحفظ الحقوق، تدعم العربية والإنجليزية.',
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
    description: 'تطبيق لاكتشاف وتجربة المنتجات والخدمات محلياً مع خرائط وإشعارات ودعم اجتماعي.',
    image: '/images/tryhub-app.webp',
    tags: ['React Native', 'Firebase', 'Maps API', 'Push Notifications'],
    link: '#',
    is_active: true,
    order_index: 3
  },
  {
    id: '4',
    title: 'منصة خبير',
    category: 'منصات استشارات',
    description: 'منصة ربط بين المستشارين والجهات المستفيدة، تضم قاعدة خبراء وطنية وتؤتمت عمليات الاستشارات مع تركيز على توطين المعرفة والأمن الوطني.',
    image: '/images/project-khabir.jpg',
    tags: ['Marketplace', 'Consulting', 'Authentication', 'Knowledge'],
    link: '#',
    is_active: true,
    order_index: 4
  },
  {
    id: '5',
    title: 'الإعلان التفاعلي PRO ADS',
    category: 'التسويق الرقمي',
    description: 'حل إعلاني يعرض محتوى تفاعلياً على أرضيات المولات بواسطة بروجيكتور ثلاثي الأبعاد قابل لإدارة عن بُعد.',
    image: '/images/project-proads.jpg',
    tags: ['Projection', 'Advertising', 'Interactive', 'Retail'],
    link: '#',
    is_active: true,
    order_index: 5
  },
  {
    id: '6',
    title: 'القبعة الخليجية',
    category: 'تجارة إلكترونية',
    description: 'قبعة خفيفة وعملية تحافظ على المظهر الخليجي التقليدي مع سهولة الارتداء وحماية من الشمس، مثالية للزوار والهدايا.',
    image: '/images/project-gulfhat.jpg',
    tags: ['E-commerce', 'Tourism', 'Gift'],
    link: '#',
    is_active: true,
    order_index: 6
  },
  {
    id: '7',
    title: 'باص مكة السياحي',
    category: 'خدمات سياحية',
    description: 'جولات سياحية موجهة لزوار مكة بتعليقات متعددة اللغات ومحتوى سمعي‑بصري عن المواقع التاريخية والأثرية.',
    image: '/images/project-bus.jpg',
    tags: ['Tourism', 'Guided Tours', 'Audio Guide'],
    link: '#',
    is_active: true,
    order_index: 7
  },
  {
    id: '8',
    title: 'هلا بوينت',
    category: 'تجارة إلكترونية',
    description: 'متجر إلكتروني للمنتجات المحلية والخدمات الرقمية بتجربة شراء بسيطة وسريعة.',
    image: '/images/project-halapoint.jpg',
    tags: ['E-commerce', 'Shopify', 'UX'],
    link: '#',
    is_active: true,
    order_index: 8
  },
  {
    id: '9',
    title: 'ساعة المسجد منارة',
    category: 'حلول للمساجد',
    description: 'شاشة ذكية لعرض أوقات الأذان والإقامة، مؤقتات وأدعية، قابلة للتحكم عن بُعد من هاتف مسؤول المسجد.',
    image: '/images/project-manarah.jpg',
    tags: ['IoT', 'Religious Tech', 'Display'],
    link: '#',
    is_active: true,
    order_index: 9
  },
  {
    id: '10',
    title: 'المظلة المتحركة',
    category: 'حلول ذكية',
    description: 'مظلة منزلية متحركة (تصميم جناحين) تعمل يدوياً أو كهربائياً لتظليل المركبات والمساحات مع تحكم ريموت.',
    image: '/images/project-shades-mov.jpg',
    tags: ['Automation', 'Home'],
    link: '#',
    is_active: true,
    order_index: 10
  },
  {
    id: '11',
    title: 'نظام استقبال الطلبات',
    category: 'حلول أمان و استقبال',
    description: 'صندوق أو رافعة ذكية لاستلام الطرود دون تواصل مباشر، مزود بكاميرات ومستشعرات وتحكم عن بُعد لرفع مستوى الأمان.',
    image: '/images/project-smart-pickup.jpg',
    tags: ['Security', 'IoT', 'Home Delivery'],
    link: '#',
    is_active: true,
    order_index: 11
  },
  {
    id: '12',
    title: 'المطب الذكي',
    category: 'حلول مرور ذكية',
    description: 'مطب متغير الارتفاع يتفاعل مع سرعة المركبة: منخفض للسرعات المسموح بها ويرتفع عند التجاوز، يعمل عبر حساسات ونظام هيدروليكي ذكي.',
    image: '/images/project-smart-street.jpg',
    tags: ['IoT', 'Traffic', 'Safety'],
    link: '#',
    is_active: true,
    order_index: 12
  },
  {
    id: '13',
    title: 'التيفو الإلكتروني',
    category: 'تقنيات عرض',
    description: 'حل إلكتروني لعرض التيفو في الملاعب بدون موارد جماهيرية كبيرة، يدعم عروض ثابتة ومتحركة ويقلل النفايات.',
    image: '/images/project-tifo.jpg',
    tags: ['LED', 'Event Tech', 'Sustainable'],
    link: '#',
    is_active: true,
    order_index: 13
  },
  {
    id: '14',
    title: 'القرية التقنية',
    category: 'مشروعات تطوير',
    description: 'مجمع تكنولوجي متكامل لتسريع الاقتصاد الرقمي: أكاديمية، مكاتب شركات، حاضنات، وبنية تحتية للمدن الذكية وخدمات مبتكرة.',
    image: '/images/project-technopark.jpg',
    tags: ['Smart City', 'Innovation', 'Education'],
    link: '#',
    is_active: true,
    order_index: 14
  },
  {
    id: '15',
    title: 'المظلة المشجرة',
    category: 'حلول بيئية',
    description: 'مظلة على شكل شجرة للظل الجمالي، تتحرك عن بُعد، ويمكن تركيب خلايا شمسية وكاميرات وإضاءات وخدمات إضافية.',
    image: '/images/project-tree-shades.jpg',
    tags: ['Green Tech', 'Solar', 'Urban Furniture'],
    link: '#',
    is_active: true,
    order_index: 15
  },
  {
    id: '16',
    title: 'ساتر الورد',
    category: 'ديكور خارجي',
    description: 'لوح زخرفي يوضع تحت النوافذ لحجب النظر للأسفل مع إضفاء منظر حوض ورد، مصمم بمقاسات مخصصة ومثبت بمسامير خاصة.',
    image: '/images/project-wall-ros.jpg',
    tags: ['Design', 'Privacy', 'Landscape'],
    link: '#',
    is_active: true,
    order_index: 16
  },
  {
    id: '17',
    title: 'العداد الذكي',
    category: 'أنظمة مراقبة',
    description: 'عداد مياه ذكي يعمل بالـIoT مع بطارية طويلة العمر وصمام تحكم عن بُعد وتطبيق لعرض القراءات والرسوم وربط الفواتير.',
    image: '/images/project-water-count.jpg',
    tags: ['IoT', 'Metering', 'Smart Meter'],
    link: '#',
    is_active: true,
    order_index: 17
  },
  {
    id: '18',
    title: 'متجر زيارات',
    category: 'تجارة إلكترونية',
    description: 'متجر مخصص لمنتجات الزيارات (ورد، توزيعات، شوكولا، أطباق) بتغليف احترافي وتوصيل سريع لمختلف مناسبات الزيارة.',
    image: '/images/project-ziarat.jpg',
    tags: ['E-commerce', 'Gifts', 'Delivery'],
    link: '#',
    is_active: true,
    order_index: 18
  },
  {
    id: '19',
    title: 'منصة المكافآت',
    category: 'منصات ولاء',
    description: 'منصة إدارة برامج مكافآت ونقاط للقطاعين التجاري وغير الربحي: ولاء عملاء، تحفيز تطوعي، تتبع نقاط وقابلية إدارة كاملة من العميل.',
    image: '/images/project-rewards.jpg',
    tags: ['Loyalty', 'Points', 'Gamification'],
    link: '#',
    is_active: true,
    order_index: 19
  }
];
