
import React, { useRef, useState, useEffect } from 'react';
import { AdjustmentState } from '../../types';

interface AssetCanvasProps {
  imageSrc: string | null;
  adjustments: AdjustmentState;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
  className?: string;
}

const AssetCanvas: React.FC<AssetCanvasProps> = ({ imageSrc, adjustments, onCanvasReady, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => setOriginalImage(img);
  }, [imageSrc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !originalImage) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas dimensions to match image
    canvas.width = originalImage.naturalWidth;
    canvas.height = originalImage.naturalHeight;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Base Layer with Filters
    ctx.save();
    ctx.filter = `hue-rotate(${adjustments.hue}deg) saturate(${adjustments.saturation}%) brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%)`;
    ctx.drawImage(originalImage, 0, 0);
    ctx.filter = 'none';
    ctx.restore();

    // 2. Apply Custom Layers
    if (adjustments.layers && adjustments.layers.length > 0) {
        adjustments.layers.forEach(layer => {
            if (layer.opacity === 0) return;

            ctx.save();
            
            // Step A: Apply the Color Blend
            ctx.globalCompositeOperation = layer.blendMode as GlobalCompositeOperation;
            ctx.globalAlpha = layer.opacity;
            ctx.fillStyle = layer.color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Step B: Clip to Original Alpha
            // This ensures we don't color the transparent background
            ctx.globalCompositeOperation = 'destination-in';
            ctx.globalAlpha = 1; 
            
            // Use original image as mask
            ctx.drawImage(originalImage, 0, 0);

            ctx.restore();
        });
    }

    if (onCanvasReady) {
      onCanvasReady(canvas);
    }
  }, [originalImage, adjustments, onCanvasReady]);

  return (
    <div className={`flex items-center justify-center bg-tiger-black bg-tiger-texture border border-tiger-border overflow-hidden relative ${className}`}>
        {/* Transparent grid background for canvas */}
        <div className="absolute inset-0 z-0 opacity-20" 
            style={{backgroundImage: 'linear-gradient(45deg, #1A1A1A 25%, transparent 25%, transparent 75%, #1A1A1A 75%, #1A1A1A), linear-gradient(45deg, #1A1A1A 25%, transparent 25%, transparent 75%, #1A1A1A 75%, #1A1A1A)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px'}}>
        </div>

        <div className="relative w-full h-full flex items-center justify-center p-8 z-10">
             {!imageSrc && (
                 <div className="text-center text-tiger-gray border-2 border-dashed border-tiger-border p-12 rounded-xl">
                    <p className="mb-2 font-bold text-lg">No asset loaded</p>
                    <p className="text-xs font-mono">Upload an image to start recoloring</p>
                 </div>
             )}
             <canvas 
                ref={canvasRef} 
                className="max-w-full max-h-[70vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)]" 
                style={{ display: imageSrc ? 'block' : 'none' }}
             />
        </div>
    </div>
  );
};

export default AssetCanvas;
