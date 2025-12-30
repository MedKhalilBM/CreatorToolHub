
import React from 'react';
import { WidgetSettings } from '../../types';
import FormInput from '../common/FormInput';
import CustomSelect from '../common/CustomSelect';

interface LayoutStepProps {
  settings: WidgetSettings;
  setSettings: React.Dispatch<React.SetStateAction<WidgetSettings>>;
}

const LayoutStep: React.FC<LayoutStepProps> = ({ settings, setSettings }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setSettings(prev => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : (type === 'number' || type === 'range' ? parseFloat(value) : value),
    }));
  };

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">Layout</h2>
        <div className="h-1 w-20 bg-tiger-green"></div>
      </header>
      
      <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 relative hover:border-tiger-green transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
            <CustomSelect
              label="Chat Direction"
              id="chatDirection"
              value={settings.chatDirection}
              onChange={handleChange}
              options={[
                { value: 'up', label: 'Up (Standard)' },
                { value: 'down', label: 'Down (Top-to-Bottom)' },
              ]}
              helpText="Direction new messages appear."
            />
            <CustomSelect
              label="Text Alignment"
              id="textAlign"
              value={settings.textAlign}
              onChange={handleChange}
              options={[
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'right', label: 'Right' },
              ]}
              helpText="Aligns the text within each message."
            />
            <CustomSelect
              label="Message Layout"
              id="messageLayout"
              value={settings.messageLayout}
              onChange={handleChange}
              options={[
                { value: 'inline', label: 'Inline (Single Line)' },
                { value: 'block', label: 'Block (Boxed)' },
              ]}
              helpText="Choose how messages are structured."
              className="col-span-1 md:col-span-2"
            />
            <FormInput
              label={`Max Visible Messages (${settings.maxMessages})`}
              type="range"
              id="maxMessages"
              value={settings.maxMessages}
              onChange={handleChange}
              min={1}
              max={20}
              helpText="Limit the number of messages on screen (Max 20)."
              className="col-span-1 md:col-span-2"
            />
        </div>
      </div>
    </div>
  );
};

export default LayoutStep;
