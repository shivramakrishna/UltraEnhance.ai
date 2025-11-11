import { GoogleGenAI, Modality } from "@google/genai";
import { EnhancementSettings } from '../types';

const MODEL_NAME = 'gemini-2.5-flash-image';

export const enhanceImage = async (
  base64ImageData: string,
  mimeType: string,
  settings: EnhancementSettings
): Promise<string> => {
    // Initialize the GoogleGenAI client just before the API call to ensure the latest API key is used.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `Act as an AI Image Enhancement System. Your mission is to transform this image into a bright, clear, and realistic high-quality visual.
    Apply the following enhancement settings:
    - Brightness: Adjust to a level equivalent to ${settings.brightness} out of 100.
    - Denoise Level: ${settings.denoiseLevel}.
    - Enhancement Mode: Optimize for ${settings.enhancementMode}.
    - Super-Resolution: Upscale the resolution by ${settings.superResolution}.
    
    Your goal is to denoise, sharpen textures, restore fine details (especially on faces, edges, and backgrounds), preserve skin tones, and balance colors accurately. The final output should be a professional-grade image. Do not add any watermarks or text. Just return the enhanced image.`;

    const imagePart = {
        inlineData: {
            data: base64ImageData,
            mimeType: mimeType,
        },
    };

    const textPart = {
        text: prompt,
    };

    try {
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: [{
                parts: [imagePart, textPart],
            }],
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        const candidate = response.candidates?.[0];
        if (candidate?.content?.parts) {
            for (const part of candidate.content.parts) {
                if (part.inlineData) {
                    return part.inlineData.data;
                }
            }
        }
        
        throw new Error("No enhanced image was returned from the API.");

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        // Re-throw the error to be handled by the calling component
        throw error;
    }
};
