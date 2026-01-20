'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  // Aceptamos el objeto completo o solo el string de la URL
  before: any; 
  after: any;
}

export function BeforeAfterSlider({ before, after }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  // Extraemos la URL de forma segura (si es string lo usa, si es objeto busca .imageUrl)
  const beforeUrl = typeof before === 'string' ? before : before?.imageUrl;
  const afterUrl = typeof after === 'string' ? after : after?.imageUrl;
  const beforeAlt = typeof before === 'object' ? before?.description : "Estado Inicial";
  const afterAlt = typeof after === 'object' ? after?.description : "Resultado Final";

  // Si no hay URLs válidas, no renderizamos para evitar el error de src=""
  if (!beforeUrl || !afterUrl) return null;

  return (
    <div className="relative w-full h-full aspect-[4/3] group rounded-lg overflow-hidden shadow-[-10px_10px_15px_-3px_rgba(0,0,0,0.2)] select-none">
      {/* IMAGEN DESPUÉS (Fondo) */}
      <div className="absolute inset-0">
        <Image
          src={afterUrl}
          alt={afterAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* IMAGEN ANTES (Capa superior con recorte) */}
      <div
        className="absolute inset-0 z-10"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <Image
          src={beforeUrl}
          alt={beforeAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover border-r border-white/20"
        />
      </div>
      
      {/* LÍNEA DIVISORA Y TIRADOR */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-xl grid place-items-center">
            <MoveHorizontal className="text-primary w-5 h-5" />
        </div>
      </div>

      {/* CONTROL DESLIZANTE (INPUT) */}
      <div className="absolute inset-0 z-30 cursor-ew-resize">
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="w-full h-full m-0 appearance-none bg-transparent focus:outline-none 
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-12 [&::-webkit-slider-thumb]:cursor-ew-resize 
          [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-full [&::-moz-range-thumb]:w-12 [&::-moz-range-thumb]:cursor-ew-resize [&::-moz-range-thumb]:bg-transparent [&::-moz-range-thumb]:border-none"
          aria-label="Image comparison slider"
        />
      </div>

      {/* ETIQUETAS */}
      <div className="absolute top-4 left-4 z-40 px-3 py-1 rounded-md bg-black/50 backdrop-blur-sm text-white font-bold text-[10px] tracking-widest pointer-events-none uppercase">
        Antes
      </div>
      <div className="absolute top-4 right-4 z-40 px-3 py-1 rounded-md bg-primary/80 backdrop-blur-sm text-white font-bold text-[10px] tracking-widest pointer-events-none uppercase">
        Después
      </div>
    </div>
  );
}