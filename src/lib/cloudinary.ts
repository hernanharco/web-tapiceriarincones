// src/lib/cloudinary.ts

export const CLOUDINARY_CONFIG = {
  // NEXT_PUBLIC_ es obligatorio para que el navegador lo lea
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
};

// Esta es la URL que el error dice que no encuentra
export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`;

// Validación en consola para ayudarte a debuguear
if (typeof window !== 'undefined') {
  if (!CLOUDINARY_CONFIG.cloudName || !CLOUDINARY_CONFIG.uploadPreset) {
    console.warn("⚠️ Cloudinary: Faltan variables en .env.local. La subida fallará.");
  }
}