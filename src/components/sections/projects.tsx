'use client';

import React, { useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { projects as staticProjects } from '@/lib/data/projects';
import { BeforeAfterSlider } from '@/components/before-after-slider';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import Image from 'next/image';
import type { SectionData, ProjectsContent, ProjectItem } from '@/lib/content-types';
import { extractContent } from '@/lib/content-types';

/**
 * react-pageflip se carga LAZY — pesa ~30KB y solo se necesita
 * si el usuario scrollea hasta proyectos y abre el catálogo.
 */
const FlipBook = dynamic(
  () => import('react-pageflip').then((mod) => mod.default || mod),
  { ssr: false },
) as any;

interface ProjectsProps {
  data?: SectionData<'projects'> | null;
  globalWhatsapp?: string;
}

export function Projects({ data, globalWhatsapp }: ProjectsProps) {

  const content: ProjectsContent = extractContent(data);

  const projectsList: ProjectItem[] =
    content.projects && content.projects.length > 0
      ? content.projects
      : (staticProjects as unknown as ProjectItem[]);

  const title = content.title || 'Transformamos lo Antiguo en Nuevo';
  const subtitle =
    content.subtitle ||
    'Nuestro trabajo habla por nosotros. Hojea nuestro catálogo para ver la magia.';
  const catalogTitle = content.catalogTitle || 'Catálogo de Proyectos';
  const finalWhatsappLink =
    globalWhatsapp ||
    content.whatsappLink ||
    'https://wa.me/34000000000';

  const bookRef = useRef<any>(null);

  const fireConfetti = useCallback(async () => {
    const confetti = (await import('canvas-confetti')).default;
    const end = Date.now() + 3 * 1000;
    const colors = ['#a855f7', '#ffffff', '#000000'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const onFlip = useCallback(
    (e: any) => {
      const totalPages = projectsList.length * 2 + 2;
      if (e.data === totalPages - 1) {
        fireConfetti();
      }
    },
    [projectsList.length],
  );

  const onNextPage = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext();
  }, []);

  const onPrevPage = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev();
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
                  <p className="font-serif italic text-2xl opacity-80">
                    Tapicería Rincón
                  </p>
                  <p className="absolute bottom-10 text-[10px] opacity-40 uppercase tracking-widest">
                    Establecido en Asturias
                  </p>
                </div>
              </div>

              {/* DOBLE PÁGINA POR PROYECTO */}
              {projectsList.map((project: ProjectItem, index: number) => [
                <div
                  key={`before-${index}`}
                  className="bg-white p-8 border-r shadow-inner page"
                  data-density="soft"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-black/5 to-transparent z-10" />
                  <div className="flex flex-col h-full">
                    <h3 className="text-xl font-bold text-primary mb-4 italic text-center uppercase tracking-widest">
                      {project.title}{' '}
                      <span className="text-muted-foreground block text-xs mt-1">
                        (Estado Inicial)
                      </span>
                    </h3>
                    <div className="flex-grow relative rounded-lg overflow-hidden border-2 border-slate-100">
                      <Image
                        src={project.beforeImage}
                        alt="Antes"
                        fill
                        className="object-cover"
                        sizes="500px"
                      />
                      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 text-xs font-bold rounded">
                        ANTES
                      </div>
                    </div>
                    <p className="mt-4 text-[10px] text-center text-muted-foreground uppercase tracking-[0.3em]">
                      Hoja {index * 2 + 1}
                    </p>
                  </div>
                </div>,

                <div
                  key={`after-${index}`}
                  className="bg-white p-8 border-l shadow-inner page"
                  data-density="soft"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-black/10 to-transparent z-10" />
                  <div className="flex flex-col h-full">
                    <h3 className="text-xl font-bold text-primary mb-4 italic text-center uppercase tracking-widest">
                      {project.title}{' '}
                      <span className="text-green-600 block text-xs mt-1">
                        (Resultado Final)
                      </span>
                    </h3>
                    <div className="flex-grow relative rounded-lg overflow-hidden border-2 border-slate-100">
                      <Image
                        src={project.afterImage}
                        alt="Después"
                        fill
                        className="object-cover"
                        sizes="500px"
                      />
                      <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 text-xs font-bold rounded">
                        DESPUÉS
                      </div>
                    </div>
                    <p className="mt-4 text-[10px] text-center text-muted-foreground uppercase tracking-[0.3em]">
                      Hoja {index * 2 + 2}
                    </p>
                  </div>
                </div>,
              ])}

              {/* CONTRAPORTADA */}
              <div className="flex items-center justify-center bg-slate-950 text-white shadow-2xl page">
                <div className="text-center p-10 border border-white/5 m-6 h-[92%] flex flex-col justify-center items-center bg-gradient-to-b from-transparent to-white/5">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                    <MessageCircle className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">¿Te ha gustado?</h3>
                  <p className="text-slate-400 text-sm mb-10 max-w-[250px] mx-auto leading-relaxed">
                    Tu mueble también puede lucir como nuevo. Pregúntanos sin
                    compromiso.
                  </p>

                  <Button
                    onClick={() => window.open(finalWhatsappLink, '_blank')}
                    className="bg-green-600 hover:bg-green-500 text-white font-bold gap-3 py-7 px-10 rounded-full shadow-[0_0_20px_rgba(22,163,74,0.4)] transition-all hover:scale-105 active:scale-95"
                  >
                    <MessageCircle className="h-6 w-6" />
                    Pedir Presupuesto
                  </Button>

                  <div className="mt-12 flex flex-col items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s} className="text-accent text-lg">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em]">
                      Calidad Artesanal 5 Estrellas
                    </p>
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
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-1">
                Hojear Catálogo
              </span>
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
