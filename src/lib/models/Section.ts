import mongoose, { Schema, Document } from 'mongoose';
import type { SectionIdentifier } from '@/lib/content-types';

/**
 * Interfaz base para documentos de Mongoose.
 * content se deja como Mixed en runtime (MongoDB no tiene discriminated unions),
 * pero la capa de aplicación usa SectionData<T> para type safety.
 */
export interface ISection extends Document {
  identifier: SectionIdentifier;
  title?: string;
  subtitle?: string;
  content: any;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SectionSchema = new Schema<ISection>(
  {
    identifier: {
      type: String,
      required: true,
      unique: true,
      enum: ['hero', 'about', 'projects', 'clients', 'contact', 'reviews'] as SectionIdentifier[],
    },
    title: { type: String, required: false },
    subtitle: { type: String, required: false },
    content: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

SectionSchema.pre('save', function (next: any) {
  this.updatedAt = new Date();
  next();
});

const SectionModel =
  (mongoose.models.Section as mongoose.Model<ISection>) ||
  mongoose.model<ISection>('Section', SectionSchema);

export default SectionModel;
