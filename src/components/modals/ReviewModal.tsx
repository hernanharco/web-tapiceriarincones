'use client';

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, MessageSquarePlus, Loader2, CheckCircle2 } from 'lucide-react';

export function ReviewModal() {
  const [rating, setRating] = useState(5);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    // Estructura de la reseña
    const newReview = {
      id: crypto.randomUUID(),
      name: formData.get('name'),
      mobile: formData.get('mobile'),
      email: formData.get('email'),
      text: formData.get('text'),
      rating: rating,
      status: 'pending', // Siempre entra como pendiente para tu moderación
      date: new Date().toISOString()
    };

    try {
      // LLAMADA A LA API PARA GUARDAR EN MONGODB
      // Esta ruta debe coincidir con el archivo: src/app/api/sections/reviews/add/route.ts
      const response = await fetch('/api/sections/reviews/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error('Error al guardar en la base de datos');
      }

      // Notificamos al resto de la aplicación que hay una actualización
      const channel = new BroadcastChannel('site_update');
      channel.postMessage('refresh_home');

      // Feedback visual de éxito
      setShowSuccess(true);
      
      // Cerramos el modal tras unos segundos
      setTimeout(() => {
        setOpen(false);
        setShowSuccess(false);
        setRating(5);
      }, 3000);

    } catch (error) {
      console.error("Error al guardar la reseña:", error);
      alert("Lo sentimos, no pudimos guardar tu reseña en este momento.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-lg hover:scale-105 transition-all bg-primary font-bold px-8 py-7 rounded-full text-xl shadow-primary/20">
          <MessageSquarePlus className="h-6 w-6" /> Dejar mi Reseña
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[450px] rounded-3xl">
        {showSuccess ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">¡Recibida correctamente!</h3>
            <p className="text-muted-foreground px-8 leading-relaxed">
              Muchas gracias por compartir tu experiencia. Revisaremos tu comentario y lo publicaremos muy pronto.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center text-primary pt-4">
                Cuéntanos tu Experiencia
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-5 pt-4">
              {/* SELECTOR DE ESTRELLAS PROFESIONAL */}
              <div className="flex flex-col items-center gap-3 bg-muted/30 py-4 rounded-2xl border border-primary/5">
                <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Tu Calificación</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none transition-all active:scale-90 hover:scale-125"
                    >
                      <Star
                        className={`h-10 w-10 transition-colors ${
                          star <= rating 
                            ? 'text-yellow-500 fill-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]' 
                            : 'text-muted-foreground/20'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-bold uppercase ml-1">Nombre y Apellidos</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Juan Manuel Rincón" 
                  required 
                  disabled={isSubmitting}
                  className="rounded-xl h-12 bg-muted/20 border-transparent focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-xs font-bold uppercase ml-1">Móvil</Label>
                  <Input 
                    id="mobile" 
                    name="mobile" 
                    type="tel" 
                    placeholder="600 000 000" 
                    disabled={isSubmitting}
                    className="rounded-xl h-12 bg-muted/20 border-transparent focus:bg-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase ml-1">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="ejemplo@correo.com" 
                    required 
                    disabled={isSubmitting}
                    className="rounded-xl h-12 bg-muted/20 border-transparent focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="text" className="text-xs font-bold uppercase ml-1">Tu Comentario</Label>
                <Textarea 
                  id="text" 
                  name="text" 
                  placeholder="Describe cómo quedó el trabajo de tapicería..." 
                  rows={4} 
                  required 
                  disabled={isSubmitting}
                  className="rounded-xl bg-muted/20 border-transparent focus:bg-white transition-all resize-none"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white py-8 text-xl font-bold rounded-2xl shadow-xl transition-all active:scale-[0.98]" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Enviando Reseña...
                  </>
                ) : (
                  "Publicar Comentario"
                )}
              </Button>
              <p className="text-[10px] text-center text-muted-foreground italic px-4">
                * Tu información personal nunca será compartida con terceros.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}