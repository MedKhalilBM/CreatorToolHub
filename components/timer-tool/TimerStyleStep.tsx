

import React from 'react';
import { TimerSettings } from '../../types';
import FormInput from '../common/FormInput';
import CustomSelect from '../common/CustomSelect';
import GradientControl from '../common/GradientControl';
import ColorWithAlphaInput from '../common/ColorWithAlphaInput';
import SwitchControl from '../common/SwitchControl';
import { FONT_OPTIONS } from '../../constants';

interface TimerStyleStepProps {
  settings: TimerSettings;
  setSettings: React.Dispatch<React.SetStateAction<TimerSettings>>;
}

const TimerStyleStep: React.FC<TimerStyleStepProps> = ({ settings, setSettings }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'range' || type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSettingChange = (name: keyof TimerSettings, value: any) => {
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="animate-fade-in">
        <header className="mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">Styling</h2>
            <div className="h-1 w-20 bg-tiger-purple"></div>
        </header>

        {/* Layout & Font */}
        <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 mb-8 hover:border-tiger-purple transition-colors">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <CustomSelect
                    label="Layout Shape"
                    id="layout"
                    value={settings.layout}
                    onChange={handleChange}
                    options={[
                        { value: 'digital', label: 'Minimal (Text Only)' },
                        { value: 'box', label: 'Boxed (Rectangle)' },
                    ]}
                />
                <CustomSelect
                    label="Font Family"
                    id="fontFamily"
                    value={settings.fontFamily}
                    onChange={handleChange}
                    options={FONT_OPTIONS.map(font => ({ value: font, label: font }))}
                    isFontSelect={true}
                />
                
                <FormInput 
                    label="Font Size" 
                    type="range" 
                    id="fontSize" 
                    value={settings.fontSize} 
                    onChange={handleChange} 
                    min={24} max={120} 
                />
                
                <div className="col-span-1 md:col-span-2 flex items-center justify-between border-t border-tiger-border pt-4">
                     <span className="text-xs font-bold text-gray-200 uppercase tracking-widest">Text Shadow</span>
                     <SwitchControl id="textShadow" checked={settings.textShadow} onChange={v => handleSettingChange('textShadow', v)} labelLeft="OFF" labelRight="ON" />
                </div>
             </div>
        </div>

        {/* Colors */}
        <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 mb-8 hover:border-tiger-purple transition-colors">
            <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-6 border-b border-tiger-border pb-2">Colors</h3>
            
            <ColorWithAlphaInput 
                label="Timer Text Color" 
                id="textColor" 
                value={settings.textColor} 
                onChange={v => handleSettingChange('textColor', v)} 
            />

            {settings.layout !== 'digital' && (
                <div className="animate-fade-in mt-6">
                     <GradientControl 
                        label="Background Color"
                        isGradient={settings.backgroundColorIsGradient}
                        onToggleGradient={v => handleSettingChange('backgroundColorIsGradient', v)}
                        color1={settings.backgroundColor}
                        onChangeColor1={v => handleSettingChange('backgroundColor', v)}
                        color2={settings.backgroundColor2}
                        onChangeColor2={v => handleSettingChange('backgroundColor2', v)}
                        angle={settings.backgroundColorAngle}
                        onChangeAngle={v => handleSettingChange('backgroundColorAngle', v)}
                        idPrefix="timer-bg"
                     />
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-6">
                        <ColorWithAlphaInput label="Border Color" id="borderColor" value={settings.borderColor} onChange={v => handleSettingChange('borderColor', v)} />
                        <FormInput label="Border Width" type="range" id="borderWidth" value={settings.borderWidth} onChange={handleChange} min={0} max={10} />
                        {settings.layout === 'box' && (
                            <FormInput label="Corner Radius" type="range" id="cornerRadius" value={settings.cornerRadius} onChange={handleChange} min={0} max={50} />
                        )}
                     </div>
                </div>
            )}
        </div>

        {/* End Time Display */}
        <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 hover:border-tiger-purple transition-colors">
             <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-white uppercase tracking-widest">Prediction Display</h3>
                 <SwitchControl id="showEndTime" checked={settings.showEndTime} onChange={v => handleSettingChange('showEndTime', v)} labelLeft="Hidden" labelRight="Show" />
             </div>
             
             {settings.showEndTime && (
                 <div className="animate-fade-in">
                    <p className="text-xs text-tiger-gray mb-4 font-mono">Shows calculated end time below the timer (e.g. "ENDS 10:30 PM")</p>
                    <ColorWithAlphaInput label="Label Color" id="endTimeColor" value={settings.endTimeColor} onChange={v => handleSettingChange('endTimeColor', v)} />
                 </div>
             )}
        </div>
    </div>
  );
};

export default TimerStyleStep;