'use client';

import { ImageUpload } from '@/components/ImageUpload';

export default function Home() {
  const handleImageUpload = (file: File) => {
    console.log('File uploaded:', file.name);
    // Here you can add your image processing logic
  };

  return (
    <main className="min-h-screen p-8 bg-beige-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-medium text-smoke-800 mb-8 text-center">
          Outfit Generator
        </h1>
        <ImageUpload onImageUpload={handleImageUpload} />
      </div>
    </main>
  );
} 