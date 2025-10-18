/*
  # إنشاء قاعدة بيانات دائمة وثابتة - Innovation Ladders

  ## الجداول الجديدة
  
  ### 1. جدول الخدمات (services)
  - `id` (uuid, primary key) - معرف فريد للخدمة
  - `title` (text) - عنوان الخدمة
  - `description` (text) - وصف الخدمة
  - `features` (text[]) - مميزات الخدمة كمصفوفة
  - `icon` (text) - أيقونة الخدمة
  - `color` (text) - لون الخدمة
  - `image` (text, nullable) - رابط صورة الخدمة
  - `is_active` (boolean) - حالة نشاط الخدمة
  - `order_index` (integer) - ترتيب عرض الخدمة
  - `created_at` (timestamptz) - وقت الإنشاء
  - `updated_at` (timestamptz) - وقت آخر تحديث
  
  ### 2. جدول المشاريع (projects)
  - `id` (uuid, primary key) - معرف فريد للمشروع
  - `title` (text) - عنوان المشروع
  - `category` (text) - تصنيف المشروع
  - `description` (text) - وصف المشروع
  - `image` (text) - صورة المشروع
  - `tags` (text[]) - وسوم المشروع كمصفوفة
  - `link` (text) - رابط المشروع
  - `is_active` (boolean) - حالة نشاط المشروع
  - `order_index` (integer) - ترتيب عرض المشروع
  - `created_at` (timestamptz) - وقت الإنشاء
  - `updated_at` (timestamptz) - وقت آخر تحديث
  
  ### 3. جدول رسائل التواصل (contact_messages)
  - `id` (uuid, primary key) - معرف فريد للرسالة
  - `name` (text) - اسم المرسل
  - `email` (text) - بريد المرسل
  - `company` (text, nullable) - الشركة
  - `phone` (text, nullable) - رقم الهاتف
  - `service` (text, nullable) - الخدمة المطلوبة
  - `message` (text) - نص الرسالة
  - `status` (text) - حالة الرسالة (new/read/replied/archived)
  - `created_at` (timestamptz) - وقت الإنشاء
  - `updated_at` (timestamptz) - وقت آخر تحديث
  
  ### 4. جدول إعدادات الموقع (site_settings)
  - `key` (text, primary key) - مفتاح الإعداد
  - `value` (jsonb) - قيمة الإعداد
  - `updated_at` (timestamptz) - وقت آخر تحديث

  ## الأمان (RLS)
  - تفعيل Row Level Security على جميع الجداول
  - سياسات للقراءة العامة للخدمات والمشاريع والإعدادات
  - سياسات محمية للتعديل والحذف (مخصصة للمسؤولين فقط)
  - حماية كاملة لرسائل التواصل

  ## ملاحظات مهمة
  1. جميع الجداول محمية بـ RLS بشكل افتراضي
  2. البيانات العامة (الخدمات، المشاريع، الإعدادات) قابلة للقراءة فقط
  3. رسائل التواصل محمية بالكامل
  4. جميع عمليات الكتابة تتطلب Service Role Key
*/

-- إنشاء جدول الخدمات
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  icon text NOT NULL,
  color text NOT NULL DEFAULT '#3B82F6',
  image text,
  is_active boolean NOT NULL DEFAULT true,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول المشاريع
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  link text NOT NULL DEFAULT '#',
  is_active boolean NOT NULL DEFAULT true,
  order_index integer NOT NULL DEFAULT 0,
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
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول إعدادات الموقع
CREATE TABLE IF NOT EXISTS site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- إنشاء فهارس للأداء
CREATE INDEX IF NOT EXISTS services_order_idx ON services(order_index);
CREATE INDEX IF NOT EXISTS services_active_idx ON services(is_active);
CREATE INDEX IF NOT EXISTS projects_order_idx ON projects(order_index);
CREATE INDEX IF NOT EXISTS projects_active_idx ON projects(is_active);
CREATE INDEX IF NOT EXISTS messages_status_idx ON contact_messages(status);
CREATE INDEX IF NOT EXISTS messages_created_idx ON contact_messages(created_at DESC);

-- تفعيل RLS على جميع الجداول
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للخدمات
CREATE POLICY "السماح بقراءة الخدمات النشطة للجميع"
  ON services FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "السماح بقراءة جميع الخدمات للمصادقين"
  ON services FOR SELECT
  TO authenticated
  USING (true);

-- سياسات الأمان للمشاريع
CREATE POLICY "السماح بقراءة المشاريع النشطة للجميع"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "السماح بقراءة جميع المشاريع للمصادقين"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

-- سياسات الأمان لرسائل التواصل
CREATE POLICY "السماح بإنشاء رسائل جديدة للجميع"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- سياسات الأمان لإعدادات الموقع
CREATE POLICY "السماح بقراءة الإعدادات للجميع"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

-- إضافة دالة لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- تطبيق الدالة على جميع الجداول
DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_messages_updated_at ON contact_messages;
CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_settings_updated_at ON site_settings;
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();