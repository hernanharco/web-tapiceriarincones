'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, CheckCircle2, XCircle, Trash2 } from 'lucide-react';
import type { SectionData, ReviewsContent, ReviewItem } from '@/lib/content-types';

interface ReviewsEditorProps {
  data: SectionData<'reviews'>;
  onChange: (newData: SectionData<'reviews'>) => void;
}

function StarsDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewsEditor({ data, onChange }: ReviewsEditorProps) {
  const content: ReviewsContent = data.content ?? { reviews: [] };
  const reviews: ReviewItem[] = content.reviews ?? [];

  const updateReviewStatus = (id: string, newStatus: 'published' | 'hidden') => {
    const updatedReviews = reviews.map((r) =>
      r.id === id ? { ...r, status: newStatus } : r,
    );
    onChange({ ...data, content: { ...content, reviews: updatedReviews } });
  };

  const deleteReview = (id: string) => {
    const updatedReviews = reviews.filter((r) => r.id !== id);
    onChange({ ...data, content: { ...content, reviews: updatedReviews } });
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <Label htmlFor="reviewsTitle" className="text-xs font-bold uppercase text-muted-foreground">
          Título de la Sección
        </Label>
        <Input
          id="reviewsTitle"
          className="mt-1"
          value={content.title ?? ''}
          onChange={(e) =>
            onChange({ ...data, content: { ...content, title: e.target.value } })
          }
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-bold text-sm uppercase flex items-center gap-2">
          Moderación de Reseñas{' '}
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px]">
            {reviews.length}
          </span>
        </h4>

        <div className="grid gap-4">
          {reviews.map((review: ReviewItem) => (
            <Card
              key={review.id}
              className={`overflow-hidden ${
                review.status === 'published'
                  ? 'border-green-500/30'
                  : 'border-dashed'
              }`}
            >
              <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{review.name}</span>
                    <StarsDisplay rating={review.rating} />
                    {review.status === 'published' && (
                      <span className="text-[10px] bg-green-100 text-green-700 px-2 rounded-full uppercase font-bold">
                        Público
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    &quot;{review.text}&quot;
                  </p>
                  <div className="text-[10px] text-muted-foreground pt-1 flex gap-3">
                    {review.mobile && <span>{review.mobile}</span>}
                    {review.email && <span>{review.email}</span>}
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant={review.status === 'published' ? 'outline' : 'default'}
                    className={
                      review.status !== 'published'
                        ? 'bg-green-600 hover:bg-green-700'
                        : ''
                    }
                    onClick={() =>
                      updateReviewStatus(
                        review.id,
                        review.status === 'published' ? 'hidden' : 'published',
                      )
                    }
                  >
                    {review.status === 'published' ? (
                      <XCircle className="h-4 w-4 mr-1" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                    )}
                    {review.status === 'published' ? 'Ocultar' : 'Publicar'}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteReview(review.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
