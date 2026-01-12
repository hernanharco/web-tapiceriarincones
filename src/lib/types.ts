export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type Project = {
  id: string;
  title: string;
  beforeImage: ImagePlaceholder | undefined;
  afterImage: ImagePlaceholder | undefined;
  contentForAI: string;
};

export type Review = {
  name: string;
  rating: number;
  text: string;
};

export type ClientType = {
  icon: string;
  title: string;
  description: string;
};
