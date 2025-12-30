
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzeModelPalette = async (modelFile: File): Promise<AnalysisResult> => {
  // Always create a fresh instance to ensure the latest process.env.API_KEY is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const base64Data = await fileToGenerativePart(modelFile);

    const response = await ai.models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: {
        parts: [
          { inlineData: { mimeType: modelFile.type, data: base64Data } },
          { text: "Analyze this VTuber model image. Extract the key color palette including skin tone, hair color, main outfit colors, and accent colors. Return a JSON object with a list of colors, where each color has a 'hex' code, a short 'name', and a 'category' (skin, hair, outfit, accent, other)." },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            colors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  hex: { type: Type.STRING },
                  name: { type: Type.STRING },
                  category: { type: Type.STRING, enum: ['skin', 'hair', 'outfit', 'accent', 'other'] }
                },
                required: ['hex', 'name', 'category']
              }
            },
            description: { type: Type.STRING }
          },
          required: ['colors']
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("The model returned an empty response.");
    
    return JSON.parse(text) as AnalysisResult;
  } catch (error: any) {
    console.error("Gemini Analysis Error Details:", error);
    // Extract meaningful error message if available
    const errorMessage = error?.message || "An unknown error occurred during AI analysis.";
    throw new Error(errorMessage);
  }
};
