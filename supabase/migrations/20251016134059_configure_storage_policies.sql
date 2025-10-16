/*
  # Configure Storage Policies for Image Uploads

  1. Storage Policies Setup
    - Configure storage policies for service-images bucket
      - Public read access for all images
      - Authenticated write/update/delete access
    - Configure storage policies for project-images bucket
      - Public read access for all images
      - Authenticated write/update/delete access

  2. Security
    - Public users can view all images (SELECT)
    - Authenticated users can upload new images (INSERT)
    - Authenticated users can update images (UPDATE)
    - Authenticated users can delete images (DELETE)
*/

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public read access for service images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload service images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update service images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete service images" ON storage.objects;
DROP POLICY IF EXISTS "Public read access for project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete project images" ON storage.objects;

-- Storage policies for service-images bucket
CREATE POLICY "Public read access for service images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'service-images');

CREATE POLICY "Authenticated users can upload service images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'service-images');

CREATE POLICY "Authenticated users can update service images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'service-images');

CREATE POLICY "Authenticated users can delete service images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'service-images');

-- Storage policies for project-images bucket
CREATE POLICY "Public read access for project images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can upload project images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can update project images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can delete project images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-images');