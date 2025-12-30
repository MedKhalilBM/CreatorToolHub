
import React from 'react';
import { GoalSettings } from '../../types';
import FormInput from '../common/FormInput';
import CustomSelect from '../common/CustomSelect';
import GradientControl from '../common/GradientControl';
import ColorWithAlphaInput from '../common/ColorWithAlphaInput';
import SwitchControl from '../common/SwitchControl';
import { FONT_OPTIONS } from '../../constants';

interface GoalStyleStepProps {
  settings: GoalSettings;
  setSettings: React.Dispatch<React.SetStateAction<GoalSettings>>;
}

const GoalStyleStep: React.FC<GoalStyleStepProps> = ({ settings, setSettings }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'range' || type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSettingChange = (name: keyof GoalSettings, value: any) => {
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="animate-fade-in">
        <header className="mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">Styling</h2>
            <div className="h-1 w-20 bg-tiger-yellow"></div>
        </header>

        {/* Layout & Font */}
        <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 mb-8 hover:border-tiger-yellow transition-colors">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <CustomSelect
                    label="Font Family"
                    id="fontFamily"
                    value={settings.fontFamily}
                    onChange={handleChange}
                    options={FONT_OPTIONS.map(font => ({ value: font, label: font }))}
                    isFontSelect={true}
                    className="col-span-1 md:col-span-2"
                />
                
                {/* Multi-Goal Settings */}
                <div className="col-span-1 md:col-span-2 border-t border-tiger-border pt-6 mt-2">
                    <h3 className="text-xs font-bold text-tiger-yellow uppercase tracking-widest mb-4">Display Mode</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <CustomSelect
                            label="Mode"
                            id="goalDisplayMode"
                            value={settings.goalDisplayMode}
                            onChange={handleChange}
                            options={[
                                { value: 'single', label: 'Single Goal (Active Only)' },
                                { value: 'stack', label: 'Vertical Stack (Multi)' },
                            ]}
                        />
                        {settings.goalDisplayMode === 'stack' && (
                            <FormInput 
                                label="Goals Visible" 
                                type="range" 
                                id="goalsToDisplay" 
                                value={settings.goalsToDisplay} 
                                onChange={handleChange} 
                                min={2} 
                                max={5} 
                                step={1}
                                helpText="How many future goals to show in the list."
                            />
                        )}
                    </div>
                </div>
             </div>
        </div>

        {/* Colors */}
        <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 mb-8 hover:border-tiger-yellow transition-colors">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 border-b border-tiger-border pb-2">
                 <h3 className="text-lg font-bold text-white uppercase tracking-widest">Colors</h3>
                 <SwitchControl 
                    id="unifiedColors"
                    checked={!settings.unifiedColors} // Toggle ON = Custom (checked). OFF = Unified.
                    onChange={v => handleSettingChange('unifiedColors', !v)}
                    labelLeft="Unified"
                    labelRight="Custom"
                 />
            </div>
            
            {settings.unifiedColors && (
                <div className="animate-fade-in">
                    <h4 className="text-xs font-bold text-tiger-yellow uppercase tracking-widest mb-4">Unified Style (All Goals)</h4>
                    <GradientControl 
                        label="Fill Color" 
                        isGradient={settings.fillColorIsGradient} 
                        onToggleGradient={v => handleSettingChange('fillColorIsGradient', v)} 
                        color1={settings.fillColor} 
                        onChangeColor1={v => handleSettingChange('fillColor', v)} 
                        color2={settings.fillColor2} 
                        onChangeColor2={v => handleSettingChange('fillColor2', v)} 
                        angle={settings.fillColorAngle} 
                        onChangeAngle={v => handleSettingChange('fillColorAngle', v)} 
                        idPrefix="goal-fill-unified"
                    />
                </div>
            )}
            
            {!settings.unifiedColors && (
                 <div className="p-4 border border-dashed border-tiger-border bg-black/30 mb-6">
                     <p className="text-xs text-tiger-gray font-mono">
                         Custom Color Mode Active. Configure colors individually in the <strong>General</strong> tab for each goal.
                     </p>
                 </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-6 pt-6 border-t border-tiger-border">
                <div className="col-span-1 md:col-span-2 flex items-center justify-between border-b border-tiger-border pb-4 mb-2">
                     <span className="text-xs font-bold text-gray-200 uppercase tracking-widest">Striped Fill Pattern</span>
                     <SwitchControl id="useStripes" checked={settings.useStripes} onChange={v => handleSettingChange('useStripes', v)} labelLeft="OFF" labelRight="ON" />
                </div>

                <ColorWithAlphaInput 
                    label="Track (Background) Color" 
                    id="trackColor" 
                    value={settings.trackColor} 
                    onChange={v => handleSettingChange('trackColor', v)} 
                />
                <ColorWithAlphaInput 
                    label="Text Color" 
                    id="textColor" 
                    value={settings.textColor} 
                    onChange={v => handleSettingChange('textColor', v)} 
                />
            </div>
        </div>

        {/* Dimensions */}
        <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 mb-8 hover:border-tiger-yellow transition-colors">
             <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-6 border-b border-tiger-border pb-2">Dimensions</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                 <FormInput label="Bar Height" type="range" id="barHeight" value={settings.barHeight} onChange={handleChange} min={10} max={100} />
                 <ColorWithAlphaInput label="Border Color" id="borderColor" value={settings.borderColor} onChange={v => handleSettingChange('borderColor', v)} />
                 <FormInput label="Border Width" type="range" id="borderWidth" value={settings.borderWidth} onChange={handleChange} min={0} max={10} />
                 <FormInput label="Corner Radius" type="range" id="cornerRadius" value={settings.cornerRadius} onChange={handleChange} min={0} max={50} />
             </div>
        </div>

        {/* Display Options */}
        <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 hover:border-tiger-yellow transition-colors">
             <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-6 border-b border-tiger-border pb-2">Text Options</h3>
             <div className="space-y-4">
                 <div className="flex justify-between items-center">
                     <span className="text-xs font-bold text-gray-200 uppercase tracking-widest">Show Title</span>
                     <SwitchControl id="showTitle" checked={settings.showTitle} onChange={v => handleSettingChange('showTitle', v)} labelLeft="Hidden" labelRight="Shown" />
                 </div>
                 <div className="flex justify-between items-center">
                     <span className="text-xs font-bold text-gray-200 uppercase tracking-widest">Show Amount (10/100)</span>
                     <SwitchControl id="showAmount" checked={settings.showAmount} onChange={v => handleSettingChange('showAmount', v)} labelLeft="Hidden" labelRight="Shown" />
                 </div>
                 <div className="flex justify-between items-center">
                     <span className="text-xs font-bold text-gray-200 uppercase tracking-widest">Show Percentage (10%)</span>
                     <SwitchControl id="showPercentage" checked={settings.showPercentage} onChange={v => handleSettingChange('showPercentage', v)} labelLeft="Hidden" labelRight="Shown" />
                 </div>
             </div>
        </div>
    </div>
  );
};

export default GoalStyleStep;
