import { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  className?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setError('Please select a valid image file (JPG, PNG, or WebP)');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('Image size must be less than 5MB');
      return false;
    }
    return true;
  };

  const handleFile = useCallback((file: File) => {
    setError(null);
    if (!validateFile(file)) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onImageUpload(file);
  }, [onImageUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div
      className={`relative w-full max-w-2xl mx-auto ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8
          transition-all duration-300 ease-in-out
          ${isDragging ? 'border-smoke-400 bg-beige-200' : 'border-smoke-200 bg-beige-100'}
          ${error ? 'border-red-300' : ''}
          hover:border-smoke-400 hover:bg-beige-200
        `}
      >
        <input
          type="file"
          accept={ACCEPTED_FILE_TYPES.join(',')}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {!previewUrl ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Upload className="w-12 h-12 text-smoke-400" />
            <div className="text-center">
              <h3 className="text-lg font-medium text-smoke-800">
                Select your item
              </h3>
              <p className="mt-2 text-sm text-smoke-600">
                Choose an image of your clothing piece
              </p>
              <p className="mt-1 text-xs text-smoke-500">
                Supports JPG, PNG, WebP • Maximum 5MB
              </p>
            </div>
          </div>
        ) : (
          <div className="relative aspect-square w-full max-w-md mx-auto">
            <Image
              src={previewUrl}
              alt="Selected item preview"
              fill
              className="object-contain rounded-lg"
            />
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute top-2 right-2 px-3 py-1 text-sm bg-smoke-800 text-beige-100 rounded-md hover:bg-smoke-700 transition-colors"
            >
              Change
            </button>
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-500 text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}; 