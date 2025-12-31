/*
  # إضافة جداول المسابقات والفرص الاستثمارية

  ## الجداول الجديدة
  
  ### competitions (المسابقات)
  - `id` (uuid, primary key)
  - `title` (text) - عنوان المسابقة
  - `description` (text) - وصف المسابقة
  - `image` (text) - رابط صورة المسابقة
  - `start_date` (timestamptz) - تاريخ البداية
  - `end_date` (timestamptz) - تاريخ النهاية
  - `prize` (text) - الجائزة
  - `requirements` (text) - المتطلبات
  - `status` (text) - الحالة (active, upcoming, closed)
  - `registration_link` (text) - رابط التسجيل
  - `is_active` (boolean) - نشط/غير نشط
  - `order_index` (integer) - ترتيب العرض
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### investment_opportunities (الفرص الاستثمارية)
  - `id` (uuid, primary key)
  - `title` (text) - عنوان الفرصة
  - `description` (text) - الوصف
  - `category` (text) - التصنيف
  - `image` (text) - رابط الصورة
  - `investment_amount` (numeric) - المبلغ المطلوب
  - `roi_percentage` (numeric) - نسبة العائد المتوقعة
  - `duration_months` (integer) - مدة الاستثمار بالأشهر
  - `status` (text) - الحالة (available, funded, closed)
  - `highlights` (jsonb) - النقاط المميزة (array)
  - `documents` (jsonb) - المستندات المرفقة
  - `contact_email` (text) - بريد التواصل
  - `is_active` (boolean) - نشط/غير نشط
  - `order_index` (integer) - ترتيب العرض
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### competition_submissions (تقديمات المسابقات)
  - `id` (uuid, primary key)
  - `competition_id` (uuid, foreign key)
  - `name` (text) - اسم المشارك
  - `email` (text) - البريد
  - `phone` (text) - الهاتف
  - `submission_data` (jsonb) - بيانات التقديم
  - `status` (text) - حالة التقديم
  - `created_at` (timestamptz)

  ## الأمان
  - تفعيل RLS على جميع الجداول
  - سياسات القراءة للجميع للجداول العامة
  - سياسات الكتابة للمصادقين فقط
*/

-- جدول المسابقات
CREATE TABLE IF NOT EXISTS competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image text,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  prize text,
  requirements text,
  status text DEFAULT 'upcoming' CHECK (status IN ('active', 'upcoming', 'closed')),
  registration_link text,
  is_active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active competitions"
  ON competitions
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert competitions"
  ON competitions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update competitions"
  ON competitions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete competitions"
  ON competitions
  FOR DELETE
  TO authenticated
  USING (true);

-- جدول الفرص الاستثمارية
CREATE TABLE IF NOT EXISTS investment_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  image text,
  investment_amount numeric,
  roi_percentage numeric,
  duration_months integer,
  status text DEFAULT 'available' CHECK (status IN ('available', 'funded', 'closed')),
  highlights jsonb DEFAULT '[]'::jsonb,
  documents jsonb DEFAULT '[]'::jsonb,
  contact_email text,
  is_active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE investment_opportunities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active opportunities"
  ON investment_opportunities
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert opportunities"
  ON investment_opportunities
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update opportunities"
  ON investment_opportunities
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete opportunities"
  ON investment_opportunities
  FOR DELETE
  TO authenticated
  USING (true);

-- جدول تقديمات المسابقات
CREATE TABLE IF NOT EXISTS competition_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id uuid NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  submission_data jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE competition_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit to competitions"
  ON competition_submissions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all submissions"
  ON competition_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update submissions"
  ON competition_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- إضافة فهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_competitions_status ON competitions(status);
CREATE INDEX IF NOT EXISTS idx_competitions_dates ON competitions(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_opportunities_status ON investment_opportunities(status);
CREATE INDEX IF NOT EXISTS idx_submissions_competition ON competition_submissions(competition_id);

-- دالة لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- تطبيق الدالة على الجداول
DROP TRIGGER IF EXISTS update_competitions_updated_at ON competitions;
CREATE TRIGGER update_competitions_updated_at
  BEFORE UPDATE ON competitions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_opportunities_updated_at ON investment_opportunities;
CREATE TRIGGER update_opportunities_updated_at
  BEFORE UPDATE ON investment_opportunities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();