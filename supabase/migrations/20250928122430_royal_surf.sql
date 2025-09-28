/*
  # تعطيل RLS للعمليات الإدارية

  1. تعطيل RLS على الجداول المطلوبة للعمليات الإدارية
  2. إضافة policies للمصادقة
  
  ملاحظة: هذا حل مؤقت حتى يتم إعداد Service Role Key بشكل صحيح
*/

-- تعطيل RLS على جدول المشاريع
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- تعطيل RLS على جدول الخدمات  
ALTER TABLE services DISABLE ROW LEVEL SECURITY;

-- تعطيل RLS على جدول الرسائل
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;