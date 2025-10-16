/*
  # إنشاء جداول نظام الإدارة

  1. الجداول الجديدة
    - `services` - جدول الخدمات
      - `id` (uuid, primary key)
      - `title` (text) - عنوان الخدمة
      - `description` (text) - وصف الخدمة
      - `features` (jsonb) - مميزات الخدمة
      - `icon` (text) - اسم الأيقونة
      - `color` (text) - لون الخدمة
      - `image` (text) - رابط صورة الخدمة
      - `is_active` (boolean) - حالة التفعيل
      - `order_index` (integer) - ترتيب العرض
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `projects` - جدول المشاريع
      - `id` (uuid, primary key)
      - `title` (text) - عنوان المشروع
      - `category` (text) - تصنيف المشروع
      - `description` (text) - وصف المشروع
      - `image` (text) - رابط الصورة
      - `tags` (jsonb) - التقنيات المستخدمة
      - `link` (text) - رابط المشروع
      - `is_active` (boolean) - حالة التفعيل
      - `order_index` (integer) - ترتيب العرض
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `contact_messages` - جدول رسائل التواصل
      - `id` (uuid, primary key)
      - `name` (text) - اسم المرسل
      - `email` (text) - بريد المرسل
      - `company` (text) - اسم الشركة
      - `phone` (text) - رقم الهاتف
      - `service` (text) - الخدمة المطلوبة
      - `message` (text) - نص الرسالة
      - `status` (text) - حالة الرسالة
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `site_settings` - جدول إعدادات الموقع
      - `id` (uuid, primary key)
      - `key` (text, unique) - مفتاح الإعداد
      - `value` (jsonb) - قيمة الإعداد
      - `updated_at` (timestamp)

  2. الأمان
    - تفعيل RLS على جميع الجداول
    - إضافة سياسات للمدير فقط
*/

-- إنشاء جدول الخدمات
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  icon text DEFAULT 'Settings',
  color text DEFAULT 'from-blue-500 to-blue-600',
  image text,
  is_active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول المشاريع
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  image text,
  tags jsonb DEFAULT '[]'::jsonb,
  link text,
  is_active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول رسائل التواصل
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  service text,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول إعدادات الموقع
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- تفعيل RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان - السماح للجميع بالقراءة والمدير فقط بالكتابة
CREATE POLICY "Allow public read access on services"
  ON services FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Allow admin full access on services"
  ON services FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access on projects"
  ON projects FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Allow admin full access on projects"
  ON projects FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Allow public insert on contact_messages"
  ON contact_messages FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow admin full access on contact_messages"
  ON contact_messages FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access on site_settings"
  ON site_settings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin full access on site_settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (true);

-- إدراج البيانات الأولية للخدمات
INSERT INTO services (title, description, features, icon, color, is_active, order_index) VALUES
('حلول Odoo ERP', 'نظام إدارة موارد المؤسسات الشامل لتحسين كفاءة العمليات وزيادة الإنتاجية', '["إدارة المبيعات", "إدارة المخزون", "المحاسبة", "الموارد البشرية"]', 'Settings', 'from-blue-500 to-blue-600', true, 1),
('أزياء التخرج', 'تصميم وتوريد أزياء التخرج الأكاديمية بأعلى معايير الجودة والأناقة', '["تصاميم مخصصة", "جودة عالية", "توريد سريع", "أسعار تنافسية"]', 'GraduationCap', 'from-purple-500 to-purple-600', true, 2),
('حلول نقاط البيع', 'أنظمة نقاط البيع الذكية والمتطورة لتحسين تجربة العملاء وإدارة المبيعات', '["واجهة سهلة", "تقارير تفصيلية", "إدارة المخزون", "دعم متعدد الفروع"]', 'ShoppingCart', 'from-green-500 to-green-600', true, 3),
('استشارات الابتكار', 'خدمات استشارية متخصصة لتطوير الأفكار الإبداعية وتحويلها إلى حلول عملية', '["تحليل الأفكار", "دراسة الجدوى", "خطط التنفيذ", "متابعة المشاريع"]', 'Lightbulb', 'from-yellow-500 to-orange-500', true, 4),
('برامج ريادة الأعمال', 'برامج تدريبية وتطويرية لرواد الأعمال لبناء مشاريع ناجحة ومستدامة', '["ورش تدريبية", "إرشاد ومتابعة", "شبكة رواد الأعمال", "دعم التمويل"]', 'TrendingUp', 'from-red-500 to-pink-500', true, 5),
('التجارة الإلكترونية', 'تطوير متاجر إلكترونية احترافية ومتكاملة مع أنظمة الدفع والشحن', '["تصميم متجاوب", "أنظمة دفع آمنة", "إدارة الطلبات", "تحليلات المبيعات"]', 'Globe', 'from-indigo-500 to-blue-500', true, 6);

-- إدراج البيانات الأولية للمشاريع
INSERT INTO projects (title, category, description, image, tags, link, is_active, order_index) VALUES
('نظام Odoo ERP', 'أنظمة ERP', 'الحل الأمثل لإدارة أعمال منشأتك التعليمية بالكامل نظام الموارد المؤسسية المتكامل (ERP)', '/images/odoo-erp-system.webp', '["Odoo", "POS", "إدارة المخزون"]', '#', true, 1),
('متجر زيارات', 'التجارة الإلكترونية', 'متجر إلكتروني متكامل متخصص لمنتجات وهدايا الزيارات', 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg', '["React", "E-commerce", "Payment Gateway"]', '#', true, 2),
('تطبيق TryHub', 'تطبيقات الجوال', 'تطبيق تواصل اجتماعي لمشاركة التجارب الشخصية الناجحة', '/images/tryhub-app.webp', '["React Native", "GPS", "Real-time"]', '#', true, 3),
('موقع شركة استشارات', 'تطوير المواقع', 'موقع إلكتروني احترافي لشركة استشارات مع نظام إدارة المحتوى', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg', '["WordPress", "SEO", "Responsive"]', '#', true, 4),
('نظام إدارة المدارس', 'أنظمة ERP', 'نظام شامل لإدارة المدارس والطلاب والمعلمين والمناهج', 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg', '["Odoo", "Education", "Management"]', '#', true, 5),
('منصة مشروعي لإدارة المشاريع الطلابية', 'تطوير المواقع', 'منصة لادارة المشاريع الطلابية وتعزيز التعلم القائم على المشاريع', '/images/mashrooi-platform.webp', '["React", "LMS", "Interactive"]', '#', true, 6);

-- إدراج إعدادات الموقع الأولية
INSERT INTO site_settings (key, value) VALUES
('site_info', '{
  "siteName": "معمل الإبداع - Innovation Ladders",
  "siteDescription": "شريكك في التحول الرقمي والابتكار"
}'),
('contact_info', '{
  "phone": ["+966 12 345 6789", "+966 50 123 4567"],
  "email": ["info@innovationladders.com", "support@innovationladders.com"],
  "address": ["جدة، المملكة العربية السعودية", "حي الشاطئ، برج الهيد كوارتر"],
  "workingHours": ["الأحد - الخميس: 9:00 ص - 6:00 م", "الجمعة - السبت: مغلق"]
}'),
('social_links', '{
  "facebook": "#",
  "twitter": "#",
  "instagram": "#",
  "linkedin": "#"
}'),
('hero_section', '{
  "title": "نحن نصنع الإبداع والابتكار",
  "subtitle": "معمل الإبداع بجدة",
  "description": "شريكك في التحول الرقمي وحلول الأعمال المبتكرة نقدم خدمات متكاملة من استشارات الابتكار إلى حلول التجارة الإلكترونية"
}'),
('about_section', '{
  "title": "عن معمل الإبداع",
  "description": "نحن فريق من المبدعين والمبتكرين، نعمل على تقديم حلول تقنية متطورة تساعد الشركات على النمو والازدهار",
  "mission": "نسعى لتكون الشريك الأول في التحول الرقمي والابتكار",
  "vision": "أن نكون رواد الإبداع والابتكار في المملكة العربية السعودية",
  "values": "الجودة، الإبداع، الشفافية، والالتزام بتحقيق رضا العملاء"
}');

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_services_active_order ON services(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_projects_active_order ON projects(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);

-- إنشاء دالة لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- إنشاء المحفزات لتحديث updated_at
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();