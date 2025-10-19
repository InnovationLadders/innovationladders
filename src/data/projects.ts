import type { Project } from './types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'نظام Odoo ERP متكامل',
    category: 'أنظمة إدارية',
    description:
      'نظام إدارة موارد مؤسسية شامل يغطي المحاسبة وإدارة الموارد والمشاريع بتكامل كامل.',
    image: '/images/odoo-erp-system.webp',
    tags: ['Odoo', 'ERP', 'Python', 'PostgreSQL'],
    link: '#',
    is_active: true,
    order_index: 1
  },
  {
    id: '2',
    title: 'منصة مشروعي',
    category: 'منصات تعليمية',
    description:
      'المنصة الأولى عربيًا لإدارة المشاريع الطلابية: بنك أفكار، أدوات تنفيذ، تتبع، تقييم وعرض المشاريع، دعم اللغة العربية والإنجليزية، وتعزيز مهارات القرن 21.',
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
    description:
      'تطبيق لاكتشاف وتجربة المنتجات والخدمات محلياً مع خرائط، إشعارات، ودعم اجتماعي.',
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
    description:
      'منصة متقدمة لتقديم الاستشارات في جميع المجالات، تربط بين المستشارين والجهات المستفيدة، وتؤتمت الأعمال، مع تعزيز الأمن القومي وتوطين المعرفة.',
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
    description:
      'حل إعلاني يستخدم بروجيكتور ثلاثي الأبعاد لعرض المحتوى التفاعلي في المولات والأسواق، مع تحكم عن بعد ومادة إعلانية جذابة.',
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
    description:
      'قبعة خفيفة وسهلة الارتداء تحافظ على المظهر الخليجي التقليدي، مناسبة للسواح والأطفال، وهدية مثالية.',
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
    description:
      'جولات سياحية لزوار مكة مع محتوى سمعي وبصري متعدد اللغات، تشمل المواقع التاريخية والأثرية، باستخدام باصات الدورين المفتوحة.',
    image: '/images/project-bus.jpg',
    tags: ['Tourism', 'Guided Tours', 'Audio Guide'],
    link: '#',
    is_active: true,
    order_index: 7
  },
  {
    id: '8',
    title: 'هلا بوينت',
    category: 'منصات مكافآت',
    description:
      'منصة لإدارة برامج المكافآت والنقاط في جميع المجالات، تجارية وغير تجارية، تشمل نقاط الولاء، التطوع، والتحفيز الاجتماعي، مع إدارة سهلة للعميل.',
    image: '/images/project-halapoint.jpg',
    tags: ['Loyalty', 'Points', 'Gamification'],
    link: '#',
    is_active: true,
    order_index: 8
  },
  {
    id: '9',
    title: 'ساعة المسجد منارة',
    category: 'حلول للمساجد',
    description:
      'شاشة ذكية للمساجد تعرض أوقات الأذان والإقامة، مؤقتات، أدعية، وتحكم كامل عن بعد عبر تطبيق الجوال.',
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
    description:
      'مظلة منزلية متحركة تعمل يدوياً أو كهربائياً لتظليل المركبات والمساحات، تصميم جناحين مستوحى من الطيور، مع تحكم عن بعد.',
    image: '/images/project-shades-mov.jpg',
    tags: ['Automation', 'Home'],
    link: '#',
    is_active: true,
    order_index: 10
  },
  {
    id: '11',
    title: 'نظام استقبال الطلبات',
    category: 'حلول أمان واستقبال',
    description:
      'منتج ذكي لاستلام الطرود دون تواصل مباشر، يستخدم رافعة أو صندوق ذكي، مع كاميرات ومستشعرات وتحكم عن بعد.',
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
    description:
      'مطب متغير الارتفاع حسب سرعة المركبة، يعمل عبر حساسات ونظام هيدروليكي ذكي، لتعزيز السلامة دون معاقبة الالتزام بالسرعة.',
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
    description:
      'نظام إلكتروني لعرض التيفو في الملاعب والفعاليات الرياضية، يدعم العروض الثابتة والمتحركة، صديق للبيئة وسهل التركيب.',
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
    description:
      'مجمع تكنولوجي متكامل لتسريع الاقتصاد الرقمي: أكاديمية، شركات، حاضنات، بنية تحتية للمدن الذكية، ومسجد ذكي، يدعم رؤية 2030.',
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
    description:
      'مظلة على شكل شجرة لتوفير الظل، تتحرك عن بعد، مع إمكانية تركيب خلايا شمسية وكاميرات وإضاءات.',
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
    description:
      'لوح زخرفي يوضع تحت النوافذ لحجب النظر للأسفل، يوفر منظر حوض ورد جمالي، مصمم حسب المقاسات ويثبت بمسامير خاصة.',
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
    description:
      'عداد مياه ذكي يعمل بتقنية IoT مع بطارية طويلة العمر، صمام تحكم عن بعد وتطبيق لإدارة الاستهلاك والفواتير.',
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
    description:
      'متجر متخصص لمنتجات الزيارات: ورد، توزيعات، شوكولا، أطباق، مع تغليف احترافي وتوصيل سريع.',
    image: '/images/project-ziarat.jpg',
    tags: ['E-commerce', 'Gifts', 'Delivery'],
    link: '#',
    is_active: true,
    order_index: 18
  },
  
];
