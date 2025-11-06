import React, { useState, useCallback } from 'react';
import { UploadIcon } from './Icon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imageUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imageUrl }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageUpload(event.target.files[0]);
    }
  };

  const handleDragEvents = useCallback((event: React.DragEvent<HTMLLabelElement>, dragging: boolean) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(dragging);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    handleDragEvents(event, false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      onImageUpload(event.dataTransfer.files[0]);
    }
  }, [handleDragEvents, onImageUpload]);

  const uploaderClasses = `
    relative flex flex-col items-center justify-center w-full min-h-[250px] p-4 
    border border-solid rounded-2xl cursor-pointer transition-all duration-300
    ${isDragging ? 'border-violet-500 bg-violet-900/20' : 'border-slate-700 hover:border-violet-600 hover:bg-slate-800/30'}
  `;

  return (
    <div className="w-full">
      <label
        htmlFor="image-upload"
        className={uploaderClasses}
        onDragEnter={(e) => handleDragEvents(e, true)}
        onDragOver={(e) => handleDragEvents(e, true)}
        onDragLeave={(e) => handleDragEvents(e, false)}
        onDrop={handleDrop}
      >
        <input
          id="image-upload"
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
        />
        {imageUrl ? (
          <img src={imageUrl} alt="Uploaded preview" className="object-contain max-h-[400px] w-full h-full rounded-lg" />
        ) : (
          <div className="text-center text-slate-400">
            <UploadIcon className="w-12 h-12 mx-auto mb-4" />
            <p className="font-semibold">
              <span className="text-violet-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm">PNG, JPG or WEBP</p>
          </div>
        )}
      </label>
    </div>
  );
};

export default ImageUploader;