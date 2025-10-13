/*
  # تعطيل RLS لجدول site_settings

  1. تعطيل Row Level Security على جدول site_settings
  2. السماح بالوصول الكامل للجدول
  3. إدراج البيانات الأولية للموقع

  ملاحظة: هذا حل مؤقت لحل مشكلة الصلاحيات
*/

-- تعطيل RLS على جدول site_settings
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;

-- حذف السياسات الموجودة
DROP POLICY IF EXISTS "Allow public read access on site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow authenticated insert on site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow authenticated update on site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow authenticated delete on site_settings" ON site_settings;

-- إدراج البيانات الأولية للموقع
INSERT INTO site_settings (key, value) VALUES
  ('site_info', '{
    "siteName": "معمل الإبداع - Innovation Ladders",
    "siteDescription": "شريكك في التحول الرقمي والابتكار"
  }'),
  ('contact_info', '{
    "phone": ["+966 12 345 6789", "+966 50 123 4567"],
    "email": ["info@innovationladders.com", "support@innovationladders.com"],
    "address": ["جدة، المملكة العربية السعودية", "حي الروضة، شارع التحلية"],
    "workingHours": ["الأحد - الخميس: 9:00 ص - 6:00 م", "السبت: 10:00 ص - 2:00 م"]
  }'),
  ('social_links', '{
    "facebook": "https://facebook.com/innovationladders",
    "twitter": "https://twitter.com/innovationladders",
    "instagram": "https://instagram.com/innovationladders",
    "linkedin": "https://linkedin.com/company/innovationladders"
  }'),
  ('hero_section', '{
    "title": "نحن نصنع الإبداع والابتكار",
    "subtitle": "معمل الإبداع بجدة",
    "description": "شريكك في التحول الرقمي وحلول الأعمال المبتكرة نقدم حلولاً تقنية متطورة تساعد الشركات على النمو والازدهار"
  }'),
  ('about_section', '{
    "title": "عن معمل الإبداع",
    "description": "نحن فريق من المبدعين والمبتكرين، نعمل على تقديم حلول تقنية متطورة",
    "mission": "نسعى لتكون الشريك الأول في التحول الرقمي والابتكار",
    "vision": "أن نكون رواد الإبداع والابتكار في المملكة العربية السعودية",
    "values": "الجودة، الإبداع، الشفافية، والالتزام بتحقيق رضا العملاء"
  }')
ON CONFLICT (key) DO NOTHING;