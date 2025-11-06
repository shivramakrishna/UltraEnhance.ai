import React, { useState, useCallback } from 'react';
import { DenoiseLevel, EnhancementMode, SuperResolution, EnhancementSettings } from './types';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ControlsPanel from './components/ControlsPanel';
import Preview from './components/Preview';
import Loader from './components/Loader';
import { enhanceImage } from './services/geminiService';

const App: React.FC = () => {
  const [settings, setSettings] = useState<EnhancementSettings>({
    brightness: 50,
    denoiseLevel: DenoiseLevel.Medium,
    enhancementMode: EnhancementMode.Auto,
    superResolution: SuperResolution.TwoX,
  });

  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [enhancedImageUrl, setEnhancedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setEnhancedImageUrl(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleEnhance = useCallback(async () => {
    if (!originalImage) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEnhancedImageUrl(null);

    try {
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(originalImage);
        reader.onload = () => {
            const result = reader.result as string;
            if (result.includes(',')) {
                resolve(result.split(',')[1]);
            } else {
                reject(new Error("Invalid file data format."));
            }
        };
        reader.onerror = () => reject(new Error("Failed to read the image file."));
      });
      
      const mimeType = originalImage.type;
      const enhancedImageBase64 = await enhanceImage(base64Data, mimeType, settings);
      setEnhancedImageUrl(`data:image/png;base64,${enhancedImageBase64}`);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during enhancement.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, settings]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950 text-white p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <Header />
        
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-8">
            <ImageUploader onImageUpload={handleImageUpload} imageUrl={originalImageUrl} />
            <ControlsPanel settings={settings} setSettings={setSettings} onEnhance={handleEnhance} isLoading={isLoading} disabled={!originalImage}/>
          </div>
          
          <div className="relative min-h-[300px] lg:min-h-0">
            {isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800">
                <Loader />
                <p className="mt-4 text-lg text-violet-300 animate-pulse">Enhancing your image...</p>
                <p className="text-sm text-slate-400 mt-1">This may take a moment.</p>
              </div>
            ) : (
              <Preview 
                originalImageUrl={originalImageUrl}
                enhancedImageUrl={enhancedImageUrl} 
              />
            )}
          </div>
        </main>

        {error && (
          <div className="mt-8 text-center p-4 bg-red-500/20 text-red-300 border border-red-500/50 rounded-lg">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;