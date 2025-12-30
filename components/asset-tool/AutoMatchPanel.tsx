
import React, { useState } from 'react';
import { AdjustmentState, AnalysisResult, PaletteColor } from '../../types';
import { analyzeModelPalette } from '../../services/gemini';

interface AutoMatchPanelProps {
  adjustments: AdjustmentState;
  setAdjustments: React.Dispatch<React.SetStateAction<AdjustmentState>>;
  hasAsset: boolean;
}

const AutoMatchPanel: React.FC<AutoMatchPanelProps> = ({ adjustments, setAdjustments, hasAsset }) => {
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleModelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setModelImage(url);
    setIsLoading(true);
    setError(null);

    try {
      const result = await analyzeModelPalette(file);
      setAnalysis(result);
    } catch (err) {
      setError("Failed to analyze. Ensure API key is configured.");
    } finally {
      setIsLoading(false);
    }
  };

  const applySmartRecolor = (color: PaletteColor) => {
    setAdjustments({
        hue: 0,
        saturation: 0,  // Desaturate base to act as canvas
        brightness: 100,
        contrast: 110,  // Slight contrast boost
        layers: [
            {
                id: crypto.randomUUID(),
                name: `Match: ${color.name}`,
                color: color.hex,
                blendMode: 'color', 
                opacity: 1
            },
            {
                id: crypto.randomUUID(),
                name: `Tint: ${color.name}`,
                color: color.hex,
                blendMode: 'soft-light',
                opacity: 0.5
            }
        ]
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
        <div className="bg-tiger-blue/10 border border-tiger-blue p-4">
            <h3 className="text-tiger-blue font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                 AI Palette Matcher
            </h3>
            <p className="text-[10px] text-tiger-gray leading-relaxed font-mono">
                Upload your VTuber model reference. Gemini AI will extract your palette. Click a color to instantly recolor your uploaded asset to match.
            </p>
        </div>

        {/* Step 1 */}
        <div className="space-y-4">
            <label className="block text-xs font-bold text-white uppercase tracking-widest">1. Upload Model Reference</label>
            <div className="relative group cursor-pointer border border-dashed border-tiger-border hover:border-tiger-blue h-48 flex flex-col items-center justify-center bg-tiger-surface transition-colors">
                <input type="file" accept="image/*" onChange={handleModelUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                
                {isLoading ? (
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-tiger-blue border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs text-tiger-blue font-bold uppercase tracking-widest animate-pulse">Analyzing...</span>
                    </div>
                ) : modelImage ? (
                    <img src={modelImage} alt="Model Ref" className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-tiger-gray">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Drop Image Here</span>
                    </div>
                )}
            </div>
            {error && (
                <div className="text-tiger-red text-xs font-mono p-2 border border-tiger-red bg-tiger-red/10">
                    ERROR: {error}
                </div>
            )}
        </div>

        {/* Step 2 */}
        {analysis && (
            <div className="space-y-6 pt-6 border-t border-tiger-border">
                 <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white uppercase tracking-widest">2. Apply Colors</label>
                    {!hasAsset && <span className="text-[10px] text-tiger-red font-bold animate-pulse">UPLOAD ASSET FIRST!</span>}
                 </div>

                 {/* Palette Grid */}
                 <div className="space-y-4">
                     {['skin', 'hair', 'outfit', 'accent'].map(cat => {
                         const colors = analysis.colors.filter(c => c.category === cat || (cat === 'outfit' && c.category === 'other'));
                         if (colors.length === 0) return null;

                         return (
                            <div key={cat}>
                                <span className="text-[10px] font-bold text-tiger-gray uppercase tracking-wider mb-2 block">{cat}</span>
                                <div className="grid grid-cols-4 gap-2">
                                    {colors.map((c, i) => (
                                        <button
                                            key={i}
                                            onClick={() => applySmartRecolor(c)}
                                            disabled={!hasAsset}
                                            className="group relative h-10 w-full border border-tiger-border hover:scale-105 active:scale-95 transition-transform disabled:opacity-30 disabled:cursor-not-allowed"
                                            title={`${c.name} (${c.hex})`}
                                        >
                                            <span className="absolute inset-0" style={{ backgroundColor: c.hex }}></span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                         );
                     })}
                 </div>
            </div>
        )}
    </div>
  );
};

export default AutoMatchPanel;
