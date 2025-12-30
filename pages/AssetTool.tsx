
import React, { useState, useEffect } from 'react';
import { AdjustmentState } from '../types';
import ToolHeader from '../components/asset-tool/ToolHeader';
import AssetCanvas from '../components/asset-tool/AssetCanvas';
import LayerControl from '../components/asset-tool/LayerControl';
import AutoMatchPanel from '../components/asset-tool/AutoMatchPanel';

const DEFAULT_ADJUSTMENTS: AdjustmentState = {
  hue: 0,
  saturation: 100,
  brightness: 100,
  contrast: 100,
  layers: []
};

const AssetTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'manual' | 'auto'>('manual');
  const [assetImage, setAssetImage] = useState<string | null>(null);
  const [adjustments, setAdjustments] = useState<AdjustmentState>(DEFAULT_ADJUSTMENTS);
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);

  // Set the BLUE accent color for this tool
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', '#2E5CFF');
  }, []);

  const handleAssetUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setAssetImage(url);
      // Reset adjustments when new image loads
      setAdjustments(DEFAULT_ADJUSTMENTS);
    }
  };

  const handleDownload = () => {
    if (canvasRef) {
      const link = document.createElement('a');
      link.download = 'vtuber-asset-edited.png';
      link.href = canvasRef.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="h-screen font-sans bg-tiger-black text-tiger-white overflow-hidden flex flex-col">
        <ToolHeader 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onDownload={handleDownload}
            hasAsset={!!assetImage}
        />

        <div className="flex-1 flex overflow-hidden">
            {/* Left: Canvas Area */}
            <div className="flex-1 bg-tiger-black relative flex flex-col">
                 <div className="absolute top-4 left-4 z-20">
                     <label className="cursor-pointer bg-tiger-black border border-tiger-border px-4 py-2 flex items-center gap-2 hover:border-tiger-blue transition-colors shadow-lg">
                        <svg className="w-4 h-4 text-tiger-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        <span className="text-xs font-bold uppercase tracking-widest">Upload Asset</span>
                        <input type="file" accept="image/png, image/jpeg" onChange={handleAssetUpload} className="hidden" />
                     </label>
                 </div>

                 <AssetCanvas 
                    imageSrc={assetImage}
                    adjustments={adjustments}
                    onCanvasReady={setCanvasRef}
                    className="w-full h-full"
                 />
            </div>

            {/* Right: Controls */}
            <aside className="w-[400px] bg-tiger-black border-l border-tiger-border flex flex-col z-20 shadow-2xl">
                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    {activeTab === 'manual' ? (
                        <LayerControl adjustments={adjustments} setAdjustments={setAdjustments} />
                    ) : (
                        <AutoMatchPanel adjustments={adjustments} setAdjustments={setAdjustments} hasAsset={!!assetImage} />
                    )}
                </div>
            </aside>
        </div>
    </div>
  );
};

export default AssetTool;
