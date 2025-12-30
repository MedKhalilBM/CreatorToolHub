

import React from 'react';
import { GoalSettings, GoalItem } from '../../types';
import FormInput from '../common/FormInput';
import CustomSelect from '../common/CustomSelect';
import GradientControl from '../common/GradientControl';

interface GoalGeneralStepProps {
  settings: GoalSettings;
  setSettings: React.Dispatch<React.SetStateAction<GoalSettings>>;
}

const GoalGeneralStep: React.FC<GoalGeneralStepProps> = ({ settings, setSettings }) => {
  
  const handleGlobalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      setSettings(prev => ({
          ...prev,
          [name]: type === 'number' ? parseFloat(value) : value
      }));
  };

  const addGoal = () => {
      // Auto-increment logic
      const lastGoal = settings.goals[settings.goals.length - 1];
      const nextTarget = lastGoal ? lastGoal.targetAmount + 50 : (settings.startAmount + 100);
      
      const newGoal: GoalItem = {
          id: crypto.randomUUID(),
          title: `Goal ${settings.goals.length + 1}`,
          targetAmount: nextTarget,
          // Initialize with global defaults for better UX
          fillColor: settings.fillColor,
          fillColorIsGradient: settings.fillColorIsGradient,
          fillColor2: settings.fillColor2,
          fillColorAngle: settings.fillColorAngle,
      };
      setSettings(prev => ({
          ...prev,
          goals: [...prev.goals, newGoal]
      }));
  };

  const removeGoal = (id: string) => {
      setSettings(prev => ({
          ...prev,
          goals: prev.goals.filter(g => g.id !== id)
      }));
  };

  const updateGoal = (id: string, field: keyof GoalItem, value: any) => {
      setSettings(prev => ({
          ...prev,
          goals: prev.goals.map(g => g.id === id ? { ...g, [field]: value } : g)
      }));
  };
  
  const sortGoalsByTarget = () => {
      setSettings(prev => ({
          ...prev,
          goals: [...prev.goals].sort((a, b) => a.targetAmount - b.targetAmount)
      }));
  };

  return (
    <div className="animate-fade-in">
        <header className="mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">Configuration</h2>
            <div className="h-1 w-20 bg-tiger-yellow"></div>
        </header>

        {/* GLOBAL SETTINGS */}
        <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 mb-8 hover:border-tiger-yellow transition-colors relative z-10">
            <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-6 border-b border-tiger-border pb-2">Global Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <CustomSelect
                    label="Goal Type"
                    id="type"
                    value={settings.type}
                    onChange={handleGlobalChange}
                    options={[
                        { value: 'subscriber', label: 'Subscribers' },
                        { value: 'follower', label: 'Followers' },
                        { value: 'tip', label: 'Tips ($)' },
                        { value: 'cheer', label: 'Bits' },
                    ]}
                />
                <FormInput
                    label="Start Amount (Current Count)"
                    type="number"
                    id="startAmount"
                    value={settings.startAmount}
                    onChange={handleGlobalChange}
                    helpText="Set this to your current sub/follower count for ongoing subathons."
                />
            </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
             <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Goals List</h3>
             <button 
                onClick={sortGoalsByTarget}
                className="text-[10px] font-bold uppercase tracking-widest text-tiger-yellow border border-tiger-yellow px-3 py-1 hover:bg-tiger-yellow hover:text-black transition-colors"
             >
                 Sort by Target Amount
             </button>
        </div>

        <div className="space-y-6">
            {settings.goals.map((goal, index) => (
                <div key={goal.id} className="bg-tiger-surface border border-tiger-border p-4 hover:border-tiger-yellow transition-colors relative group">
                    <div className="flex justify-between items-center mb-4 border-b border-tiger-border/50 pb-2">
                        <span className="text-xs font-bold text-tiger-yellow uppercase tracking-widest">Goal #{index + 1}</span>
                        {settings.goals.length > 1 && (
                            <button onClick={() => removeGoal(goal.id)} className="text-tiger-gray hover:text-tiger-red">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-x-6 gap-y-4">
                        <FormInput 
                            label="Target" 
                            type="number" 
                            id={`target-${goal.id}`} 
                            value={goal.targetAmount} 
                            onChange={(e) => updateGoal(goal.id, 'targetAmount', parseFloat(e.target.value))} 
                            className="mb-0"
                        />
                        <FormInput 
                            label="Title" 
                            type="text" 
                            id={`title-${goal.id}`} 
                            value={goal.title} 
                            onChange={(e) => updateGoal(goal.id, 'title', e.target.value)} 
                            className="mb-0"
                        />
                    </div>
                    
                    {/* Per-Goal Color Settings (Visible if Custom Mode is active or generally available to override) */}
                    <div className="mt-4 pt-4 border-t border-tiger-border/30">
                         <GradientControl 
                            label="Goal Color"
                            isGradient={!!goal.fillColorIsGradient}
                            onToggleGradient={v => updateGoal(goal.id, 'fillColorIsGradient', v)}
                            color1={goal.fillColor || settings.fillColor}
                            onChangeColor1={v => updateGoal(goal.id, 'fillColor', v)}
                            color2={goal.fillColor2 || settings.fillColor2}
                            onChangeColor2={v => updateGoal(goal.id, 'fillColor2', v)}
                            angle={goal.fillColorAngle || settings.fillColorAngle}
                            onChangeAngle={v => updateGoal(goal.id, 'fillColorAngle', v)}
                            isNested={true}
                            idPrefix={`goal-${goal.id}`}
                         />
                         {settings.unifiedColors && (
                             <p className="text-[10px] text-tiger-gray mt-2 font-mono italic">
                                 * Colors managed globally in Style settings (Unified Mode ON)
                             </p>
                         )}
                    </div>

                    {/* Validation Error */}
                    {index > 0 && goal.targetAmount <= settings.goals[index - 1].targetAmount && (
                        <div className="text-[10px] text-tiger-red font-bold mt-2 uppercase tracking-wide">
                            Error: Target must be greater than previous goal ({settings.goals[index-1].targetAmount})
                        </div>
                    )}
                </div>
            ))}
            
            {settings.goals.length < 20 && (
                <button 
                    onClick={addGoal}
                    className="w-full py-4 border-2 border-dashed border-tiger-border text-tiger-gray hover:border-tiger-yellow hover:text-white transition-all font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Add Another Goal
                </button>
            )}
        </div>
    </div>
  );
};

export default GoalGeneralStep;
