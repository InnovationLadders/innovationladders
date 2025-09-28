/*
  # إصلاح سياسات RLS لجدول إعدادات الموقع

  1. تحديث السياسات
    - إضافة سياسة للسماح بالإدراج للمستخدمين المصادق عليهم
    - إضافة سياسة للسماح بالتحديث للمستخدمين المصادق عليهم
    - الاحتفاظ بسياسة القراءة العامة

  2. إدراج البيانات الأولية
    - إضافة إعدادات الموقع الافتراضية
*/

-- حذف السياسات الموجودة
DROP POLICY IF EXISTS "Allow admin full access on site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow public read access on site_settings" ON site_settings;

-- إضافة سياسات جديدة محسنة
CREATE POLICY "Allow public read access on site_settings"
  ON site_settings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated insert on site_settings"
  ON site_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on site_settings"
  ON site_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on site_settings"
  ON site_settings
  FOR DELETE
  TO authenticated
  USING (true);

-- إدراج البيانات الأولية لإعدادات الموقع
INSERT INTO site_settings (key, value) VALUES
  ('siteName', '"معمل الإبداع للحلول التقنية"'),
  ('siteDescription', '"نحن شركة رائدة في مجال الحلول التقنية والتطوير، نقدم خدمات متميزة في تطوير المواقع والتطبيقات والتسويق الرقمي"'),
  ('contactInfo', '{
    "phone": ["+966501234567", "+966112345678"],
    "email": ["info@innovationladders.com", "support@innovationladders.com"],
    "address": ["الرياض، المملكة العربية السعودية", "شارع الملك فهد، الحي التجاري"],
    "workingHours": ["الأحد - الخميس: 9:00 ص - 6:00 م", "الجمعة - السبت: مغلق"]
  }'),
  ('socialLinks', '{
    "facebook": "https://facebook.com/innovationladders",
    "twitter": "https://twitter.com/innovationladders",
    "instagram": "https://instagram.com/innovationladders",
    "linkedin": "https://linkedin.com/company/innovationladders"
  }'),
  ('heroSection', '{
    "title": "معمل الإبداع للحلول التقنية",
    "subtitle": "نبني المستقبل الرقمي",
    "description": "نحن فريق من المطورين والمصممين المبدعين، نقدم حلولاً تقنية متطورة تساعد عملاءنا على تحقيق أهدافهم الرقمية بأعلى معايير الجودة والإبداع."
  }'),
  ('aboutSection', '{
    "title": "من نحن",
    "description": "معمل الإبداع للحلول التقنية هو شركة رائدة في مجال التكنولوجيا والتطوير، تأسست بهدف تقديم حلول تقنية مبتكرة ومتطورة للشركات والأفراد.",
    "mission": "مساعدة عملائنا على تحقيق التحول الرقمي من خلال حلول تقنية مبتكرة وخدمات عالية الجودة.",
    "vision": "أن نكون الشريك التقني الأول للشركات في المنطقة، ونساهم في بناء مستقبل رقمي متطور.",
    "values": "الإبداع، الجودة، الشفافية، والالتزام بتقديم أفضل الخدمات لعملائنا."
  }')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = now();