'use client';

import React, { useRef, useCallback, useEffect, useState } from 'react';
import { projects as staticProjects } from '@/lib/data/projects';
import { BeforeAfterSlider } from '@/components/before-after-slider';
import HTMLFlipBook from 'react-pageflip';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

// Forzamos el tipo para el componente FlipBook ya que sus tipos de @types suelen fallar
const FlipBook = HTMLFlipBook as any;

export function Projects({ data }: { data?: any }) {
  // 1. Prioridad a datos dinámicos de MongoDB/Neon
  const dynamicProjects = data?.content?.projects || data?.projects;  
  const projectsList = (dynamicProjects && dynamicProjects.length > 0) 
    ? dynamicProjects 
    : staticProjects;   
  
  // 2. Textos dinámicos
  const title = data?.content?.title || data?.title || "Transformamos lo Antiguo en Nuevo";
  const subtitle = data?.content?.subtitle || data?.subtitle || "Nuestro trabajo habla por nosotros. Hojea nuestro catálogo para ver la magia.";
  const catalogTitle = data?.content?.catalogTitle || data?.catalogTitle || "Catálogo de Proyectos";

  const bookRef = useRef<any>(null);

  // Función para disparar el Confetti con los colores de la marca
  const fireConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ['#a855f7', '#ffffff', '#000000']; // Puedes ajustar a tus colores

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  // Detectar cuando se llega a la última página (Contraportada)
  const onFlip = useCallback((e: any) => {
    const totalPages = projectsList.length + 2; // + Portada y Contraportada
    if (e.data === totalPages - 1) {
      fireConfetti();
    }
  }, [projectsList.length]);

  const onNextPage = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext();
  }, []);

  const onPrevPage = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev();
  }, []);

  useEffect(() => {
    const channel = new BroadcastChannel('site_update');
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'refresh_home') window.location.reload();
    };
    channel.addEventListener('message', handleMessage);
    return () => {
      channel.removeEventListener('message', handleMessage);
      channel.close();
    };
  }, []);

  return (
    <section id="proyectos" className="bg-background py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col items-center">
          {/* Contenedor del Libro con Sombra Realista */}
          <div className="w-full max-w-5xl flex justify-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden bg-slate-100/30 p-2 md:p-6 border border-white/20 backdrop-blur-sm">
            <FlipBook
              width={550}
              height={650}
              size="stretch"
              minWidth={315}
              maxWidth={1000}
              minHeight={400}
              maxHeight={1533}
              maxShadowOpacity={0.6}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={onFlip}
              className="album-catalog"
              ref={bookRef}
            >
              {/* PORTADA */}
              <div className="flex items-center justify-center bg-primary text-primary-foreground shadow-2xl page">
                <div className="text-center p-10 border-[10px] border-primary-foreground/10 m-6 h-[92%] flex flex-col justify-center items-center relative">
                  <div className="absolute top-10 flex items-center gap-2 opacity-50 uppercase tracking-[0.3em] text-[10px]">
                    <Sparkles className="h-3 w-3" /> Trabajo Artesanal
                  </div>
                  <h3 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4">
                    {catalogTitle}
                  </h3>
                  <div className="h-1.5 w-32 bg-accent my-6" />
                  <p className="font-serif italic text-2xl opacity-80">Tapicería Rincón</p>
                  <p className="absolute bottom-10 text-[10px] opacity-40 uppercase tracking-widest">Establecido en Asturias</p>
                </div>
              </div>
              
              {/* PÁGINAS DE PROYECTOS */}
              {projectsList.map((project: any, index: number) => (
                <div key={project.id || index} className="bg-card p-6 md:p-12 shadow-inner border-l page">
                  <div className="flex flex-col h-full">
                    <div className="mb-6 flex items-center justify-between">
                       <span className="h-[1px] flex-grow bg-border"></span>
                       <h3 className="px-4 text-xl font-bold text-center text-primary uppercase tracking-widest italic">
                        {project.title || `Proyecto ${index + 1}`}
                      </h3>
                      <span className="h-[1px] flex-grow bg-border"></span>
                    </div>
                    
                    <div className="flex-grow flex items-center justify-center bg-muted/20 rounded-xl overflow-hidden border-4 border-white shadow-md relative group">
                      {project.beforeImage && project.afterImage ? (
                        <div className="w-full h-full scale-[1.01]">
                          <BeforeAfterSlider 
                            before={project.beforeImage} 
                            after={project.afterImage} 
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                           <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                           <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Cargando Restauración...</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 flex justify-between items-center text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em]">
                      <span className="opacity-50 tracking-normal">#TapiceríaProfesional</span>
                      <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full shadow-sm">
                        Hoja {index + 1}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* CONTRAPORTADA (CTA) */}
              <div className="flex items-center justify-center bg-slate-950 text-white shadow-2xl page">
                <div className="text-center p-10 border border-white/5 m-6 h-[92%] flex flex-col justify-center items-center bg-gradient-to-b from-transparent to-white/5">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                       <MessageCircle className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">¿Te ha gustado?</h3>
                    <p className="text-slate-400 text-sm mb-10 max-w-[250px] mx-auto leading-relaxed">
                      Tu mueble también puede lucir como nuevo. Pregúntanos sin compromiso.
                    </p>
                    
                    <Button 
                      onClick={() => window.open('https://wa.me/tu_numero_aqui', '_blank')}
                      className="bg-green-600 hover:bg-green-500 text-white font-bold gap-3 py-7 px-10 rounded-full shadow-[0_0_20px_rgba(22,163,74,0.4)] transition-all hover:scale-105 active:scale-95"
                    >
                      <MessageCircle className="h-6 w-6" />
                      Pedir Presupuesto
                    </Button>

                    <div className="mt-12 flex flex-col items-center gap-2">
                       <div className="flex gap-1">
                          {[1,2,3,4,5].map(s => <span key={s} className="text-accent text-lg">★</span>)}
                       </div>
                       <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em]">Calidad Artesanal 5 Estrellas</p>
                    </div>
                </div>
              </div>
            </FlipBook>
          </div>
          
          {/* Controles del Libro */}
          <div className="flex justify-center items-center mt-12 gap-8">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-14 w-14 border-2 hover:bg-primary hover:text-white transition-all shadow-lg active:scale-90" 
              onClick={onPrevPage}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            
            <div className="hidden md:flex flex-col items-center">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-1">Hojear Catálogo</span>
               <div className="h-1 w-20 bg-primary/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary/40 w-1/2 animate-pulse" />
               </div>
            </div>

            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-14 w-14 border-2 hover:bg-primary hover:text-white transition-all shadow-lg active:scale-90" 
              onClick={onNextPage}
            >
              <ArrowRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}