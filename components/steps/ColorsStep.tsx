
import React from 'react';
import { WidgetSettings } from '../../types';
import ColorWithAlphaInput from '../common/ColorWithAlphaInput';
import GradientControl from '../common/GradientControl';
import SwitchControl from '../common/SwitchControl';

interface ColorsStepProps {
  settings: WidgetSettings;
  setSettings: React.Dispatch<React.SetStateAction<WidgetSettings>>;
}

const ColorsStep: React.FC<ColorsStepProps> = ({ settings, setSettings }) => {
  const handleSettingChange = (name: keyof WidgetSettings, value: any) => {
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">Colors</h2>
        <div className="h-1 w-20 bg-tiger-green"></div>
      </header>
      
      <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 mb-8 hover:border-tiger-green transition-colors">
        <GradientControl
            label="Widget Background"
            isGradient={settings.backgroundColorIsGradient}
            onToggleGradient={val => handleSettingChange('backgroundColorIsGradient', val)}
            color1={settings.backgroundColor}
            onChangeColor1={val => handleSettingChange('backgroundColor', val)}
            color2={settings.backgroundColor2}
            onChangeColor2={val => handleSettingChange('backgroundColor2', val)}
            angle={settings.backgroundColorAngle}
            onChangeAngle={val => handleSettingChange('backgroundColorAngle', val)}
            helpText="Set a solid color or a gradient for the entire widget."
            idPrefix="bg"
        />
      </div>

      <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 mb-8 hover:border-tiger-green transition-colors">
        <h3 className="text-lg font-bold mb-6 text-white border-b border-tiger-border pb-2 uppercase tracking-widest">Text Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <ColorWithAlphaInput
                label="Message Text Color"
                id="messageColor"
                value={settings.messageColor}
                onChange={val => handleSettingChange('messageColor', val)}
            />
            <ColorWithAlphaInput
                label="Timestamp Color"
                id="timestampColor"
                value={settings.timestampColor}
                onChange={val => handleSettingChange('timestampColor', val)}
            />
        </div>
      </div>

       <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 hover:border-tiger-green transition-colors">
            {/* Flex layout adjusted for mobile: stack vertically on small screens */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 border-b border-tiger-border pb-2 min-h-[3rem]">
                <h3 className="text-lg font-bold text-white uppercase tracking-widest">Role Colors</h3>
                <SwitchControl 
                    id="unifiedUsernameColors"
                    // Toggle OFF (False) = Unified. Toggle ON (True) = Custom.
                    checked={!settings.unifiedUsernameColors}
                    onChange={(checked) => handleSettingChange('unifiedUsernameColors', !checked)}
                    labelLeft="Unified"
                    labelRight="Custom"
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className={settings.unifiedUsernameColors ? "col-span-1 md:col-span-2" : ""}>
                    <ColorWithAlphaInput
                        label={settings.unifiedUsernameColors ? "All Usernames Color" : "Default User Color"}
                        id="usernameColorDefault"
                        value={settings.usernameColorDefault}
                        onChange={val => handleSettingChange('usernameColorDefault', val)}
                    />
                </div>
                
                {!settings.unifiedUsernameColors && (
                    <>
                        <ColorWithAlphaInput
                        label="Broadcaster"
                        id="usernameColorBroadcaster"
                        value={settings.usernameColorBroadcaster}
                        onChange={val => handleSettingChange('usernameColorBroadcaster', val)}
                        />
                        <ColorWithAlphaInput
                        label="Moderator"
                        id="usernameColorMod"
                        value={settings.usernameColorMod}
                        onChange={val => handleSettingChange('usernameColorMod', val)}
                        />
                        <ColorWithAlphaInput
                        label="VIP"
                        id="usernameColorVip"
                        value={settings.usernameColorVip}
                        onChange={val => handleSettingChange('usernameColorVip', val)}
                        />
                        <ColorWithAlphaInput
                        label="Subscriber"
                        id="usernameColorSub"
                        value={settings.usernameColorSub}
                        onChange={val => handleSettingChange('usernameColorSub', val)}
                        />
                    </>
                )}
            </div>
      </div>
    </div>
  );
};

export default ColorsStep;
