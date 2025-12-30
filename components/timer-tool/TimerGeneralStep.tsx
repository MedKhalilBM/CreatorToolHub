

import React from 'react';
import { TimerSettings } from '../../types';
import FormInput from '../common/FormInput';
import CustomSelect from '../common/CustomSelect';

interface TimerGeneralStepProps {
  settings: TimerSettings;
  setSettings: React.Dispatch<React.SetStateAction<TimerSettings>>;
}

const TimerGeneralStep: React.FC<TimerGeneralStepProps> = ({ settings, setSettings }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      setSettings(prev => ({
          ...prev,
          [name]: type === 'number' || type === 'range' ? parseFloat(value) : value
      }));
  };

  return (
    <div className="animate-fade-in">
        <header className="mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">Timer Logic</h2>
            <div className="h-1 w-20 bg-tiger-purple"></div>
        </header>

        {/* Mode & Start Time */}
        <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 mb-8 hover:border-tiger-purple transition-colors">
            <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-6 border-b border-tiger-border pb-2">Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <CustomSelect
                    label="Platform"
                    id="platform"
                    value={settings.platform}
                    onChange={handleChange}
                    options={[
                        { value: 'twitch', label: 'Twitch' },
                        { value: 'youtube', label: 'YouTube' },
                    ]}
                />
                
                <CustomSelect
                    label="Timer Mode"
                    id="mode"
                    value={settings.mode}
                    onChange={handleChange}
                    options={[
                        { value: 'countdown_add', label: 'Countdown (Events Add Time)' },
                        { value: 'countdown_sub', label: 'Countdown (Events Chip Away)' },
                    ]}
                />
                
                <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-bold text-gray-200 uppercase tracking-widest mb-3">Starting Time</label>
                    <div className="grid grid-cols-3 gap-4">
                        <FormInput label="Hours" type="number" id="startTimeHours" value={settings.startTimeHours} onChange={handleChange} min={0} />
                        <FormInput label="Minutes" type="number" id="startTimeMinutes" value={settings.startTimeMinutes} onChange={handleChange} min={0} max={59} />
                        <FormInput label="Seconds" type="number" id="startTimeSeconds" value={settings.startTimeSeconds} onChange={handleChange} min={0} max={59} />
                    </div>
                </div>
                
                <FormInput 
                    label="Time Cap (Hours)" 
                    type="number" 
                    id="capHours" 
                    value={settings.capHours} 
                    onChange={handleChange} 
                    min={0}
                    helpText="Max time the timer can reach. 0 for unlimited."
                    className="col-span-1 md:col-span-2"
                />
            </div>
        </div>

        {/* Event Logic - Dynamic based on Platform */}
        <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 hover:border-tiger-purple transition-colors">
            <div className="flex justify-between items-center mb-6 border-b border-tiger-border pb-2">
                <h3 className="text-lg font-bold text-white uppercase tracking-widest">Rewards ({settings.platform === 'twitch' ? 'Twitch' : 'YouTube'})</h3>
                <span className="text-[10px] text-tiger-purple font-mono uppercase border border-tiger-purple px-2 py-1">Seconds Added</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                 {/* TWITCH INPUTS */}
                 {settings.platform === 'twitch' && (
                     <>
                        <FormInput 
                            label="Per Subscriber" 
                            type="number" 
                            id="secondsPerSub" 
                            value={settings.secondsPerSub} 
                            onChange={handleChange} 
                            min={0}
                        />
                        <FormInput 
                            label="Per 100 Bits" 
                            type="number" 
                            id="secondsPerCheer" 
                            value={settings.secondsPerCheer} 
                            onChange={handleChange} 
                            min={0}
                        />
                        <FormInput 
                            label="Per Tip ($1)" 
                            type="number" 
                            id="secondsPerTip" 
                            value={settings.secondsPerTip} 
                            onChange={handleChange} 
                            min={0}
                        />
                        <FormInput 
                            label="Per Follow" 
                            type="number" 
                            id="secondsPerFollow" 
                            value={settings.secondsPerFollow} 
                            onChange={handleChange} 
                            min={0}
                        />
                     </>
                 )}

                 {/* YOUTUBE INPUTS */}
                 {settings.platform === 'youtube' && (
                     <>
                        <FormInput 
                            label="Per Member (Paid)" 
                            type="number" 
                            id="secondsPerMember" 
                            value={settings.secondsPerMember} 
                            onChange={handleChange} 
                            min={0}
                        />
                        <FormInput 
                            label="Per Super Chat (1 Currency)" 
                            type="number" 
                            id="secondsPerSuperChat" 
                            value={settings.secondsPerSuperChat} 
                            onChange={handleChange} 
                            min={0}
                        />
                        <FormInput 
                            label="Per Tip ($1)" 
                            type="number" 
                            id="secondsPerTip" 
                            value={settings.secondsPerTip} 
                            onChange={handleChange} 
                            min={0}
                        />
                        <FormInput 
                            label="Per Subscriber (Free)" 
                            type="number" 
                            id="secondsPerSub" 
                            value={settings.secondsPerSub} 
                            onChange={handleChange} 
                            min={0}
                            helpText="Note: On YouTube, 'Subscriber' is the free follow action."
                        />
                     </>
                 )}
            </div>
        </div>
    </div>
  );
};

export default TimerGeneralStep;