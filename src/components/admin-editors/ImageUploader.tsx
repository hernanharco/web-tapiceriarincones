'use client';

import React, { useState } from 'react';
import { uploadImage } from '@/utils/upload-image';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, X, ImageIcon, CheckCircle2 } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
}

export function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validación básica de tamaño (ej: 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen es muy pesada. Máximo 5MB.");
      return;
    }

    try {
      setIsUploading(true);
      const url = await uploadImage(file);
      onChange(url);
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-3 p-3 border rounded-lg bg-card/50 shadow-sm">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
          <ImageIcon className="h-3 w-3" /> {label}
        </label>
        {value && <CheckCircle2 className="h-3 w-3 text-green-500" />}
      </div>
      
      {value ? (
        <div className="relative aspect-video rounded-md overflow-hidden border shadow-inner group">
          <img src={value} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button 
              variant="destructive" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-full"
              onClick={() => onChange('')}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative aspect-video border-2 border-dashed rounded-md flex flex-col items-center justify-center bg-muted/20 hover:bg-muted/40 transition-all cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          {isUploading ? (
            <div className="text-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto mb-2" />
              <p className="text-[10px] font-medium text-primary animate-pulse">Subiendo...</p>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-[10px] text-muted-foreground">Click para subir foto</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}