import mongoose, { Schema, Document } from 'mongoose';

export interface ISection extends Document {
  identifier: string;
  title?: string;
  subtitle?: string;
  content: any;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SectionSchema = new Schema<ISection>({
  identifier: {
    type: String,
    required: true,
    unique: true,
    enum: ['hero', 'about', 'projects', 'clients', 'contact', 'reviews']
  },
  title: {
    type: String,
    required: false
  },
  subtitle: {
    type: String,
    required: false
  },
  content: {
    type: Schema.Types.Mixed,
    required: true,
    default: {}
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hero Section Content Schema
const HeroContentSchema = {
  mainTitle: String,
  subtitle: String,
  whatsappLink: String,
  buttonText1: String,
  buttonText2: String,
  backgroundImage: String
};

// About Section Content Schema
const AboutContentSchema = {
  title: String,
  paragraphs: [String],
  teamImage: String,
  historyStartYear: Number,
  spainEstablishmentYear: Number,
  location: String
};

// Projects Section Content Schema
const ProjectsContentSchema = {
  title: String,
  subtitle: String,
  catalogTitle: String,
  projects: [{
    id: String,
    title: String,
    beforeImage: String,
    afterImage: String,
    description: String
  }]
};

// Clients Section Content Schema
const ClientsContentSchema = {
  title: String,
  subtitle: String,
  clientTypes: [{
    id: String,
    title: String,
    description: String,
    icon: String
  }]
};

// Contact Section Content Schema
const ContactContentSchema = {
  title: String,
  subtitle: String,
  whatsappLink: String,
  buttonText: String,
  address: String,
  email: String,
  phone: String
};

// Reviews Section Content Schema
const ReviewsContentSchema = {
  title: String,
  reviews: [{
    id: String,
    name: String,
    rating: Number,
    text: String,
    date: Date
  }]
};

SectionSchema.pre('save', function(next: any) {
  this.updatedAt = new Date();
  next();
});

export default (mongoose.models.Section as mongoose.Model<ISection>) || mongoose.model<ISection>('Section', SectionSchema);
