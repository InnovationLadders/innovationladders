import { supabaseAdmin } from './supabase';

export interface ImageUploadResult {
  url: string;
  path: string;
}

export interface ImageUploadError {
  message: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const validateImage = (file: File): string | null => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return 'يرجى اختيار صورة بصيغة JPG أو PNG أو WebP أو GIF';
  }

  if (file.size > MAX_FILE_SIZE) {
    return 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت';
  }

  return null;
};

export const generateUniqueFileName = (originalName: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${randomString}.${extension}`;
};

export const uploadImage = async (
  file: File,
  bucket: 'service-images' | 'project-images',
  oldImagePath?: string
): Promise<ImageUploadResult> => {
  if (!supabaseAdmin) {
    throw new Error('Supabase admin client is not initialized');
  }

  const validationError = validateImage(file);
  if (validationError) {
    throw new Error(validationError);
  }

  if (oldImagePath) {
    await deleteImage(oldImagePath, bucket);
  }

  const fileName = generateUniqueFileName(file.name);
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`فشل رفع الصورة: ${uploadError.message}`);
  }

  const { data: urlData } = supabaseAdmin.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return {
    url: urlData.publicUrl,
    path: filePath,
  };
};

export const deleteImage = async (
  filePath: string,
  bucket: 'service-images' | 'project-images'
): Promise<void> => {
  if (!supabaseAdmin) {
    throw new Error('Supabase admin client is not initialized');
  }

  if (!filePath) return;

  let pathToDelete = filePath;

  if (filePath.includes('/storage/v1/object/public/')) {
    const parts = filePath.split('/');
    pathToDelete = parts[parts.length - 1];
  }

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .remove([pathToDelete]);

  if (error) {
    console.error('Error deleting image:', error);
  }
};

export const getImageUrl = (path: string, bucket: 'service-images' | 'project-images'): string => {
  if (!supabaseAdmin) {
    return '';
  }

  if (path.startsWith('http')) {
    return path;
  }

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};
