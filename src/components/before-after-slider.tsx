'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { ImagePlaceholder } from '@/lib/types';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  before: ImagePlaceholder;
  after: ImagePlaceholder;
}

export function BeforeAfterSlider({ before, after }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative w-full aspect-[4/3] group rounded-lg overflow-hidden shadow-[-10px_10px_15px_-3px_rgba(0,0,0,0.2)] select-none">
      <div className="absolute inset-0">
        <Image
          src={after.imageUrl}
          alt={after.description}
          fill
          priority
          className="object-cover border border-black/20"
          data-ai-hint={after.imageHint}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <Image
          src={before.imageUrl}
          alt={before.description}
          fill
          priority
          className="object-cover border border-black/20"
          data-ai-hint={before.imageHint}
        />
      </div>
      
      <div
        className="absolute top-0 bottom-0 w-1 bg-background pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm shadow-md grid place-items-center">
            <MoveHorizontal className="text-primary w-6 h-6" />
        </div>
      </div>

      <div className="absolute inset-0 cursor-ew-resize">
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="w-full h-full m-0 appearance-none bg-transparent focus:outline-none 
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-12 [&::-webkit-slider-thumb]:w-12 [&::-webkit-slider-thumb]:cursor-ew-resize [&::-webkit-slider-thumb]:bg-transparent
          [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-12 [&::-moz-range-thumb]:w-12 [&::-moz-range-thumb]:cursor-ew-resize [&::-moz-range-thumb]:bg-transparent [&::-moz-range-thumb]:border-none"
          aria-label="Image comparison slider"
        />
      </div>

      <div className="absolute top-2 left-2 px-3 py-1 rounded-md bg-black/60 text-white font-bold text-sm pointer-events-none">ANTES</div>
      <div className="absolute top-2 right-2 px-3 py-1 rounded-md bg-black/60 text-white font-bold text-sm pointer-events-none">DESPUÉS</div>
    </div>
  );
}
