import React from 'react';
import { DownloadIcon, ImageIcon } from './Icon';

interface PreviewProps {
  originalImageUrl: string | null;
  enhancedImageUrl: string | null;
}

const ImageCard: React.FC<{ imageUrl: string | null; title: string; isDownloadable?: boolean }> = ({ imageUrl, title, isDownloadable = false }) => (
  <div className="relative w-full h-full bg-slate-900 rounded-xl flex flex-col items-center justify-center p-2 border border-slate-800">
    <div className="absolute top-2 left-2 bg-black/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">{title}</div>
    {isDownloadable && imageUrl && (
      <a
        href={imageUrl}
        download="enhanced-image.png"
        className="absolute top-2 right-2 p-2 bg-slate-900/50 rounded-full text-violet-300 hover:bg-violet-500/20 hover:text-white transition-colors"
        aria-label="Download enhanced image"
      >
        <DownloadIcon className="w-5 h-5" />
      </a>
    )}
    {imageUrl ? (
      <img src={imageUrl} alt={title} className="object-contain max-h-full max-w-full rounded-md" />
    ) : (
      <div className="text-center text-slate-500">
        <ImageIcon className="w-16 h-16 mx-auto mb-2" />
        <p>{title} image will appear here</p>
      </div>
    )}
  </div>
);

const Preview: React.FC<PreviewProps> = ({ originalImageUrl, enhancedImageUrl }) => {
  if (!originalImageUrl && !enhancedImageUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 text-slate-400 p-8 text-center">
        Your enhanced masterpiece awaits. Upload an image to begin.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full h-full">
      <ImageCard imageUrl={originalImageUrl} title="Before" />
      <ImageCard imageUrl={enhancedImageUrl} title="After" isDownloadable={true} />
    </div>
  );
};

export default Preview;