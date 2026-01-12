'use client';

import React, { useRef, useCallback } from 'react';
import { projects } from '@/lib/data/projects';
import { BeforeAfterSlider } from '@/components/before-after-slider';
import HTMLFlipBook from 'react-pageflip';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function Projects() {
  const bookRef = useRef<any>(null);

  const onNextPage = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext();
  }, []);

  const onPrevPage = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev();
  }, []);

  return (
    <section id="proyectos" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Transformamos lo Antiguo en Nuevo</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nuestro trabajo habla por nosotros. Hojea nuestro catálogo para ver la magia.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center">
          <div className="w-full max-w-4xl flex justify-center">
            <HTMLFlipBook
              width={550}
              height={600}
              size="stretch"
              minWidth={315}
              maxWidth={1000}
              minHeight={400}
              maxHeight={1533}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              className="album-catalog"
              ref={bookRef}
            >
              {/* Page Cover */}
              <div className="flex items-center justify-center bg-card shadow-md">
                <div className="text-center p-8">
                  <h3 className="text-3xl font-bold text-primary">Catálogo de Proyectos</h3>
                  <p className="text-muted-foreground mt-2">Tapicería Rincón</p>
                </div>
              </div>
              
              {/* Project Pages */}
              {projects.map((project, index) => (
                <div key={project.id} className="bg-card p-4 shadow-inner">
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <h3 className="text-xl font-bold text-center">{project.title}</h3>
                    {project.beforeImage && project.afterImage && (
                      <div className="w-full">
                          <BeforeAfterSlider before={project.beforeImage} after={project.afterImage} />
                      </div>
                    )}
                     <p className="text-sm text-center text-muted-foreground">Página {index + 1}</p>
                  </div>
                </div>
              ))}

              {/* Page Back Cover */}
              <div className="flex items-center justify-center bg-card shadow-md">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-primary">¿Te gusta lo que ves?</h3>
                    <p className="text-muted-foreground mt-2">Contacta con nosotros</p>
                </div>
              </div>
            </HTMLFlipBook>
          </div>
          
          <div className="flex justify-center items-center mt-8 gap-4">
            <Button variant="outline" size="icon" onClick={onPrevPage} aria-label="Página anterior">
              <ArrowLeft />
            </Button>
            <span className="text-sm text-muted-foreground">Pasar página</span>
            <Button variant="outline" size="icon" onClick={onNextPage} aria-label="Siguiente página">
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}