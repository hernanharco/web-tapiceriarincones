'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';
import { ReviewModal } from '@/components/modals/ReviewModal';
import type { SectionData, ReviewsContent, ReviewItem } from '@/lib/content-types';
import { extractContent } from '@/lib/content-types';

interface ReviewsProps {
  data?: SectionData<'reviews'> | null;
}

export function Reviews({ data }: ReviewsProps) {

  const content: ReviewsContent = extractContent(data);

  const reviewsList: ReviewItem[] = (content.reviews ?? []).filter(
    (r) => !r.status || r.status === 'published',
  );

  return (
    <section id="reseñas" className="bg-background py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 gap-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {content.title}
          </h2>
          <ReviewModal />
        </div>

        {reviewsList.length > 0 ? (
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto mt-12"
          >
            <CarouselContent>
              {reviewsList.map((review, index) => (
                <CarouselItem
                  key={review.id || index}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-2 h-full">
                    <Card className="h-full flex flex-col justify-between rounded-2xl shadow-lg border-primary/5 bg-card/50 backdrop-blur-sm transition-all hover:shadow-xl">
                      <CardContent className="p-8 space-y-4">
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-muted-foreground/30'
                              }`}
                            />
                          ))}
                        </div>
                        <blockquote className="text-base text-muted-foreground italic leading-relaxed">
                          &quot;{review.text}&quot;
                        </blockquote>
                        <div className="pt-4 border-t">
                          <p className="font-bold text-right text-xs text-primary uppercase tracking-widest">
                            - {review.name}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        ) : (
          <div className="text-center py-12 border border-dashed rounded-xl bg-muted/20">
            <p className="text-muted-foreground">
              Aún no hay reseñas publicadas. ¡Sé el primero!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
