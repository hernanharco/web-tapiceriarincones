'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star } from 'lucide-react';
import { reviews } from '@/lib/data/reviews';

export function Reviews() {
  return (
    <section id="reseñas" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Lo que Opinan Nuestros Clientes</h2>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto mt-12"
        >
          <CarouselContent>
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col justify-between rounded-lg shadow-md">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/50'}`} />
                        ))}
                      </div>
                      <blockquote className="text-base text-muted-foreground italic">
                        "{review.text}"
                      </blockquote>
                      <p className="font-semibold text-right text-sm text-primary">- {review.name}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
