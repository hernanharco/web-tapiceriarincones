// src/utils/upload-image.ts
import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_CONFIG } from '@/lib/cloudinary';

/**
 * Sube un archivo File a Cloudinary y retorna la URL segura.
 */
export const uploadImage = async (file: File): Promise<string> => {
  if (!CLOUDINARY_CONFIG.cloudName || !CLOUDINARY_CONFIG.uploadPreset) {
    throw new Error("Configuración de Cloudinary incompleta.");
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

  try {
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Error al subir la imagen');
    }

    return data.secure_url;
  } catch (error) {
    console.error('Error en uploadImage utility:', error);
    throw error;
  }
};