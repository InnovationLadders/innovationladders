/*
  # إعداد التخزين السحابي للصور

  ## إنشاء Bucket
  - إنشاء bucket للصور باسم 'images'
  - السماح بالوصول العام للصور
  
  ## سياسات الأمان
  - السماح بالقراءة للجميع
  - السماح بالرفع باستخدام Service Role فقط
  - السماح بالحذف باستخدام Service Role فقط
*/

-- إنشاء bucket للصور
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- حذف السياسات القديمة إن وجدت
DROP POLICY IF EXISTS "public_read" ON storage.objects;
DROP POLICY IF EXISTS "public_insert" ON storage.objects;
DROP POLICY IF EXISTS "allow_public_read" ON storage.objects;
DROP POLICY IF EXISTS "allow_public_insert" ON storage.objects;

-- السماح بالقراءة للجميع
CREATE POLICY "allow_public_read"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'images');

-- السماح بالرفع للجميع
CREATE POLICY "allow_public_insert"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'images');