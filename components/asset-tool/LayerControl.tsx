
import React from 'react';
import { AdjustmentState, AssetLayer, BlendMode } from '../../types';
import FormInput from '../common/FormInput';
import CustomSelect from '../common/CustomSelect';

interface LayerControlProps {
  adjustments: AdjustmentState;
  setAdjustments: React.Dispatch<React.SetStateAction<AdjustmentState>>;
}

const blendModes: { value: BlendMode; label: string }[] = [
    { value: 'source-over', label: 'Normal' },
    { value: 'multiply', label: 'Multiply' },
    { value: 'screen', label: 'Screen' },
    { value: 'overlay', label: 'Overlay' },
    { value: 'soft-light', label: 'Soft Light' },
    { value: 'hard-light', label: 'Hard Light' },
    { value: 'color', label: 'Color' },
    { value: 'hue', label: 'Hue' },
    { value: 'saturation', label: 'Saturation' },
    { value: 'luminosity', label: 'Luminosity' },
];

const LayerControl: React.FC<LayerControlProps> = ({ adjustments, setAdjustments }) => {
    
  const updateBase = (key: keyof AdjustmentState, val: any) => {
    setAdjustments(prev => ({ ...prev, [key]: val }));
  };

  const addLayer = () => {
    if (adjustments.layers.length >= 5) return;
    const newLayer: AssetLayer = {
        id: crypto.randomUUID(),
        name: `Layer ${adjustments.layers.length + 1}`,
        color: '#2E5CFF',
        blendMode: 'overlay',
        opacity: 0.8
    };
    setAdjustments(prev => ({
        ...prev,
        layers: [...prev.layers, newLayer]
    }));
  };

  const removeLayer = (id: string) => {
    setAdjustments(prev => ({
        ...prev,
        layers: prev.layers.filter(l => l.id !== id)
    }));
  };

  const updateLayer = (id: string, updates: Partial<AssetLayer>) => {
    setAdjustments(prev => ({
        ...prev,
        layers: prev.layers.map(l => l.id === id ? { ...l, ...updates } : l)
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
        {/* Base Adjustments */}
        <section>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 border-b border-tiger-border pb-2">Base Correction</h3>
            <div className="grid grid-cols-1 gap-y-6">
                <FormInput label="Hue Shift" type="range" id="hue" value={adjustments.hue} onChange={(e) => updateBase('hue', parseFloat(e.target.value))} min={-180} max={180} />
                <FormInput label="Saturation" type="range" id="saturation" value={adjustments.saturation} onChange={(e) => updateBase('saturation', parseFloat(e.target.value))} min={0} max={200} />
                <FormInput label="Brightness" type="range" id="brightness" value={adjustments.brightness} onChange={(e) => updateBase('brightness', parseFloat(e.target.value))} min={0} max={200} />
                <FormInput label="Contrast" type="range" id="contrast" value={adjustments.contrast} onChange={(e) => updateBase('contrast', parseFloat(e.target.value))} min={0} max={200} />
            </div>
        </section>

        {/* Layers */}
        <section>
            <div className="flex items-center justify-between mb-4 border-b border-tiger-border pb-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Color Layers</h3>
                <button 
                    onClick={addLayer}
                    disabled={adjustments.layers.length >= 5}
                    className="text-[10px] font-bold uppercase bg-tiger-blue text-white px-3 py-1 hover:bg-white hover:text-tiger-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    + Add Layer
                </button>
            </div>

            <div className="space-y-4">
                {adjustments.layers.map((layer, index) => (
                    <div key={layer.id} className="bg-tiger-surface border border-tiger-border p-4 relative group hover:border-tiger-blue transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-bold text-tiger-gray uppercase tracking-wider">Layer 0{index + 1}</span>
                            <button onClick={() => removeLayer(layer.id)} className="text-tiger-gray hover:text-tiger-red transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Tint</label>
                                <input 
                                    type="color" 
                                    value={layer.color}
                                    onChange={(e) => updateLayer(layer.id, { color: e.target.value })}
                                    className="w-full h-10 bg-black border border-tiger-border cursor-pointer p-0"
                                />
                            </div>
                            <div>
                                <CustomSelect 
                                    label="Blend Mode"
                                    id={`blend-${layer.id}`}
                                    value={layer.blendMode}
                                    onChange={(e) => updateLayer(layer.id, { blendMode: e.target.value as BlendMode })}
                                    options={blendModes}
                                    className="mb-0"
                                />
                            </div>
                        </div>
                        
                        <div className="mb-0">
                             <FormInput 
                                label={`Opacity (${Math.round(layer.opacity * 100)}%)`}
                                type="range"
                                id={`opacity-${layer.id}`}
                                value={layer.opacity}
                                onChange={(e) => updateLayer(layer.id, { opacity: parseFloat(e.target.value) })}
                                min={0}
                                max={1}
                                step={0.01}
                                className="mb-0"
                             />
                        </div>
                    </div>
                ))}
                {adjustments.layers.length === 0 && (
                    <div className="text-center py-8 text-tiger-gray text-xs font-mono border border-dashed border-tiger-border bg-tiger-black/50">
                        No active layers. Add one to start recoloring.
                    </div>
                )}
            </div>
        </section>
        
        <button 
            onClick={() => setAdjustments({ hue: 0, saturation: 100, brightness: 100, contrast: 100, layers: [] })}
            className="w-full py-3 text-xs font-bold text-tiger-gray hover:text-white uppercase tracking-widest border border-transparent hover:border-tiger-border transition-all"
        >
            Reset All
        </button>
    </div>
  );
};

export default LayerControl;
