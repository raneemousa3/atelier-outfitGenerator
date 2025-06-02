/**
 * Represents a curated outfit suggestion with a title, description, items, styling tips, and associated images.
 */
export interface OutfitSuggestion {
  title: string;
  description: string;
  items: string[];
  tips: string;
  images: Array<{ url: string; alt: string }>;
}

/**
 * Represents an uploaded image with its file, preview URL, and optional analysis.
 */
export interface UploadedImage {
  file: File;
  preview: string;
  analysis?: string;
}

/**
 * Union type for input methods: 'image' or 'text'.
 */
export type InputMethod = 'image' | 'text';

/**
 * Represents user input that can be either an image upload or a text prompt.
 * For image uploads, imageData is provided; for text prompts, textPrompt is provided.
 */
export interface UserInput {
  method: InputMethod;
  imageData?: UploadedImage;
  textPrompt?: string;
} 