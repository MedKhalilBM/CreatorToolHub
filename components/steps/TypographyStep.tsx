
import React from 'react';
import { WidgetSettings } from '../../types';
import { FONT_OPTIONS } from '../../constants';
import FormInput from '../common/FormInput';
import CustomSelect from '../common/CustomSelect';
import ColorWithAlphaInput from '../common/ColorWithAlphaInput';
import StepSlider from '../common/StepSlider';
import SwitchControl from '../common/SwitchControl';

interface TypographyStepProps {
  settings: WidgetSettings;
  setSettings: React.Dispatch<React.SetStateAction<WidgetSettings>>;
}

const TypographyStep: React.FC<TypographyStepProps> = ({ settings, setSettings }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'range' || type === 'number' ? parseFloat(value) : value,
    }));
  };
  
  const handleSettingChange = (name: keyof WidgetSettings, value: any) => {
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">Typography</h2>
        <div className="h-1 w-20 bg-tiger-green"></div>
      </header>
      
      <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 mb-8 hover:border-tiger-green transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="col-span-1 md:col-span-2">
                <CustomSelect
                label="Font Family"
                id="fontFamily"
                value={settings.fontFamily}
                onChange={handleChange}
                options={FONT_OPTIONS.map(font => ({ value: font, label: font }))}
                helpText="Select a font for all chat text."
                isFontSelect={true}
                />
            </div>
            <FormInput
            label={`Font Size (${settings.fontSize}px)`}
            type="range"
            id="fontSize"
            value={settings.fontSize}
            onChange={handleChange}
            min={8}
            max={32}
            helpText="Controls the size of all text."
            className="col-span-1 md:col-span-2"
            />
            
            <StepSlider
                label="Username Weight"
                value={settings.fontWeight}
                onChange={val => handleSettingChange('fontWeight', val)}
            />
            <StepSlider
                label="Message Weight"
                value={settings.messageFontWeight}
                onChange={val => handleSettingChange('messageFontWeight', val)}
            />
        </div>
      </div>
      
      <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 hover:border-tiger-green transition-colors">
        {/* Mobile Flex Fix */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 border-b border-tiger-border pb-2 min-h-[3rem]">
             <h3 className="text-lg font-bold text-white uppercase tracking-widest">Text Shadow</h3>
             <SwitchControl 
                id="useTextShadow" 
                checked={settings.useTextShadow} 
                onChange={val => handleSettingChange('useTextShadow', val)} 
                labelLeft="OFF"
                labelRight="ON"
            />
        </div>
        
        {settings.useTextShadow && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 animate-fade-in">
            <ColorWithAlphaInput
                label="Shadow Color"
                id="textShadowColor"
                value={settings.textShadowColor}
                onChange={val => handleSettingChange('textShadowColor', val)}
                className="col-span-1 md:col-span-2"
            />
            <FormInput
              label="Shadow X Offset"
              type="range"
              id="textShadowX"
              value={settings.textShadowX}
              onChange={handleChange}
              min={-5}
              max={5}
              step={0.5}
            />
            <FormInput
              label="Shadow Y Offset"
              type="range"
              id="textShadowY"
              value={settings.textShadowY}
              onChange={handleChange}
              min={-5}
              max={5}
              step={0.5}
            />
             <FormInput
              label="Shadow Blur"
              type="range"
              id="textShadowBlur"
              value={settings.textShadowBlur}
              onChange={handleChange}
              min={0}
              max={10}
              step={0.1}
              className="col-span-1 md:col-span-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TypographyStep;
