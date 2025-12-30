
import React from 'react';
import { WidgetSettings } from '../../types';
import FormInput from '../common/FormInput';
import CustomSelect from '../common/CustomSelect';
import GradientControl from '../common/GradientControl';
import ColorWithAlphaInput from '../common/ColorWithAlphaInput';
import SwitchControl from '../common/SwitchControl';

interface MessagesStepProps {
  settings: WidgetSettings;
  setSettings: React.Dispatch<React.SetStateAction<WidgetSettings>>;
}

const MessagesStep: React.FC<MessagesStepProps> = ({ settings, setSettings }) => {
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
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, badgeKey: string) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setSettings(prev => ({
                  ...prev,
                  [badgeKey]: reader.result as string,
              }));
          };
          reader.readAsDataURL(file);
      } else {
           setSettings(prev => ({ ...prev, [badgeKey]: null, }));
      }
  };

  const renderRoleSection = (roleName: string, prefix: string, colorTheme: string) => {
    let bgBaseKey = `${prefix}BackgroundColor`;
    if (prefix === 'username' && roleName === '') {
        bgBaseKey += 'Default';
    } else {
        bgBaseKey += roleName;
    }

    const bgKey = bgBaseKey;
    const bgGradientKey = `${bgBaseKey}IsGradient`;
    const bg2Key = `${bgBaseKey}2`;
    const bgAngleKey = `${bgBaseKey}Angle`;
    
    const borderKey = `${prefix}BorderColor${roleName}`;
    const widthKey = `${prefix}BorderWidth${roleName}`;
    const radiusKey = `${prefix}CornerRadius${roleName}`;
    
    const idPref = `${prefix}-${roleName || 'def'}`;

    return (
        <div className="mt-4 border-l-2 pl-4" style={{ borderColor: colorTheme }}>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: colorTheme }}>{roleName || 'Default'} Style</h4>
             <GradientControl
                label="Background"
                // @ts-ignore
                isGradient={settings[bgGradientKey]}
                onToggleGradient={val => handleSettingChange(bgGradientKey as any, val)}
                // @ts-ignore
                color1={settings[bgKey]}
                onChangeColor1={val => handleSettingChange(bgKey as any, val)}
                // @ts-ignore
                color2={settings[bg2Key]}
                onChangeColor2={val => handleSettingChange(bg2Key as any, val)}
                // @ts-ignore
                angle={settings[bgAngleKey]}
                onChangeAngle={val => handleSettingChange(bgAngleKey as any, val)}
                isNested={true}
                idPrefix={idPref}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-2">
                {/* @ts-ignore */}
                <ColorWithAlphaInput label="Border Color" id={borderKey} value={settings[borderKey]} onChange={val => handleSettingChange(borderKey as any, val)} />
                 {/* @ts-ignore */}
                <FormInput label="Border Width" type="range" id={widthKey} value={settings[widthKey]} onChange={e => handleSettingChange(widthKey as any, parseFloat(e.target.value))} min={0} max={5} />
                 {/* @ts-ignore */}
                <FormInput label="Corner Radius" type="range" id={radiusKey} value={settings[radiusKey]} onChange={e => handleSettingChange(radiusKey as any, parseFloat(e.target.value))} min={0} max={30} className="col-span-1 md:col-span-2"/>
            </div>
        </div>
    );
  }

  return (
    <div>
       <header className="mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">Settings</h2>
        <div className="h-1 w-20 bg-tiger-green"></div>
      </header>
      
      {/* General Settings */}
      <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 mb-8 hover:border-tiger-green transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <CustomSelect
                label="Timestamp Format"
                id="showTimestamp"
                value={settings.showTimestamp}
                onChange={handleChange}
                options={[
                    { value: 'none', label: 'Hidden' },
                    { value: '12h', label: '12-Hour' },
                    { value: '24h', label: '24-Hour' },
                ]}
                className="col-span-1 md:col-span-2"
            />
            <CustomSelect
                label="Message Animation"
                id="messageAnimation"
                value={settings.messageAnimation}
                onChange={handleChange}
                options={[
                    { value: 'none', label: 'None' },
                    { value: 'fadeIn', label: 'Fade In' },
                    { value: 'slideInLeft', label: 'Slide from Left' },
                    { value: 'slideInRight', label: 'Slide from Right' },
                    { value: 'slideInUp', label: 'Slide from Bottom' },
                    { value: 'slideInDown', label: 'Slide from Top' },
                    { value: 'popIn', label: 'Pop In' },
                    { value: 'bounceIn', label: 'Bounce In' },
                ]}
                helpText="Animation for new messages entering the chat."
                className="col-span-1 md:col-span-2"
            />
            
            <div className="col-span-1 md:col-span-2 mt-4 pt-4 border-t border-tiger-border">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between min-h-[3rem]">
                    <span className="text-xs font-bold text-gray-200 uppercase tracking-widest">Hide Messages</span>
                    <SwitchControl
                        id="hideMessages"
                        checked={settings.hideMessages}
                        onChange={(checked) => handleSettingChange('hideMessages', checked)}
                        labelLeft="OFF"
                        labelRight="ON"
                    />
                </div>
            </div>

            {settings.hideMessages && (
            <FormInput
                label={`Hide After (${settings.hideMessagesAfter}s)`}
                type="range"
                id="hideMessagesAfter"
                value={settings.hideMessagesAfter}
                onChange={handleChange}
                min={5}
                max={60}
                step={5}
                className="col-span-1 md:col-span-2 animate-fade-in"
                helpText="Messages fade out after this duration (Max 60s)."
            />
            )}
        </div>
      </div>


      {/* Badges Section */}
      <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 mb-8 hover:border-tiger-green transition-colors">
        <h3 className="text-lg font-bold mb-6 text-white border-b border-tiger-border pb-2 uppercase tracking-widest">Badges</h3>
        <CustomSelect
          label="Badge Style"
          id="badgeStyle"
          value={settings.badgeStyle}
          onChange={handleChange}
          options={[
            { value: 'none', label: 'None' },
            { value: 'default', label: 'Default Twitch Badges' },
            { value: 'custom', label: 'Custom Badges' },
          ]}
        />
        
        {settings.badgeStyle === 'default' && (
             <p className="text-[10px] text-tiger-green font-mono mb-4 border border-tiger-green p-2 bg-tiger-green/10">
                NOTE: Preview might not display default Twitch badges accurately. They will work correctly in StreamElements.
            </p>
        )}

        {settings.badgeStyle === 'custom' && (
            <div className="animate-fade-in">
                 <p className="text-[10px] text-tiger-gray font-mono mb-4">
                    Supported formats: PNG, JPEG, GIF. Recommended Aspect Ratio: 1:1.
                </p>
                <div className="flex flex-col gap-y-4 bg-black p-4 border border-tiger-border mt-4">
                    {[
                        { label: 'Broadcaster', id: 'customBadgeBroadcaster', color: settings.usernameColorBroadcaster },
                        { label: 'Moderator', id: 'customBadgeMod', color: settings.usernameColorMod },
                        { label: 'VIP', id: 'customBadgeVip', color: settings.usernameColorVip },
                        { label: 'Subscriber', id: 'customBadgeSub', color: settings.usernameColorSub },
                    ].map((role) => (
                        <div key={role.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-tiger-border/50 pb-4 last:border-0 last:pb-0">
                            <div className="w-full sm:w-32 flex-shrink-0">
                                <label htmlFor={role.id} className="block text-xs font-bold mb-1 uppercase" style={{color: role.color}}>{role.label}</label>
                            </div>
                            <div className="flex-grow w-full">
                                 <input 
                                    type="file" 
                                    id={role.id} 
                                    accept="image/*" 
                                    onChange={(e) => handleFileChange(e, role.id)}
                                    className="text-xs text-gray-400 file:mr-2 file:py-1 file:px-2 file:border-0 file:text-xs file:font-bold file:bg-tiger-gray file:text-black hover:file:bg-white w-full cursor-pointer"
                                />
                            </div>
                            <div className="w-10 h-10 border border-tiger-border bg-tiger-surface flex items-center justify-center flex-shrink-0">
                                {/* @ts-ignore */}
                                {settings[role.id] ? (
                                    // @ts-ignore
                                    <img src={settings[role.id]} alt={role.label} className="max-w-full max-h-full" />
                                ) : (
                                    <span className="text-[8px] text-gray-600">NONE</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
        {settings.badgeStyle !== 'none' && (
            <div className="mt-4">
                <FormInput
                    label={`Badge Size (${settings.badgeSize}em)`}
                    type="range"
                    id="badgeSize"
                    value={settings.badgeSize}
                    onChange={handleChange}
                    min={0.8}
                    max={2.0}
                    step={0.1}
                    helpText="Controls the size of badges relative to the font size."
                />
            </div>
        )}
      </div>

      {/* Appearance Section */}
      <header className="mb-8 mt-12">
        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">Styling</h2>
        <div className="h-1 w-20 bg-tiger-green"></div>
      </header>
        
      {/* Per-Message Background */}
      {settings.messageLayout === 'block' && (
          <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 mb-8 animate-fade-in hover:border-tiger-green transition-colors">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 min-h-[3rem]">
                   <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                       <h3 className="text-lg font-bold text-white uppercase tracking-widest">Message Box</h3>
                       <SwitchControl
                            id="useMessageBackground"
                            checked={settings.useMessageBackground}
                            onChange={(c) => handleSettingChange('useMessageBackground', c)}
                            labelLeft="OFF"
                            labelRight="ON"
                       />
                   </div>
                   {settings.useMessageBackground && (
                        <SwitchControl
                            id="unifiedMessageBackgrounds"
                            // Checked = Custom (False).
                            checked={!settings.unifiedMessageBackgrounds}
                            onChange={(c) => handleSettingChange('unifiedMessageBackgrounds', !c)}
                            labelLeft="Unified"
                            labelRight="Custom"
                        />
                   )}
              </div>

              {settings.useMessageBackground && (
                  <div className="mt-6 pt-6 border-t border-tiger-border animate-fade-in">
                      {settings.unifiedMessageBackgrounds ? (
                           <div className="mt-4">
                                <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-tiger-green">Unified Style</h4>
                                <GradientControl
                                    label="Background"
                                    isGradient={settings.messageBackgroundColorIsGradient}
                                    onToggleGradient={val => handleSettingChange('messageBackgroundColorIsGradient', val)}
                                    color1={settings.messageBackgroundColor}
                                    onChangeColor1={val => handleSettingChange('messageBackgroundColor', val)}
                                    color2={settings.messageBackgroundColor2}
                                    onChangeColor2={val => handleSettingChange('messageBackgroundColor2', val)}
                                    angle={settings.messageBackgroundColorAngle}
                                    onChangeAngle={val => handleSettingChange('messageBackgroundColorAngle', val)}
                                    isNested={true}
                                    idPrefix="msg-unified"
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-2">
                                    <ColorWithAlphaInput label="Border Color" id="messageBorderColor" value={settings.messageBorderColor} onChange={val => handleSettingChange('messageBorderColor', val)} />
                                    <FormInput label="Border Width" type="range" id="messageBorderWidth" value={settings.messageBorderWidth} onChange={handleChange} min={0} max={5} />
                                    <FormInput label="Corner Radius" type="range" id="messageCornerRadius" value={settings.messageCornerRadius} onChange={handleChange} min={0} max={30} className="col-span-1 md:col-span-2"/>
                                </div>
                            </div>
                      ) : (
                          <div className="space-y-8">
                                {renderRoleSection('', 'message', settings.usernameColorDefault)}
                                {renderRoleSection('Broadcaster', 'message', settings.usernameColorBroadcaster)}
                                {renderRoleSection('Mod', 'message', settings.usernameColorMod)}
                                {renderRoleSection('Vip', 'message', settings.usernameColorVip)}
                                {renderRoleSection('Sub', 'message', settings.usernameColorSub)}
                          </div>
                      )}
                  </div>
              )}
          </div>
      )}
      
      {/* Per-Username Background */}
      <div className="bg-tiger-surface border border-tiger-border p-4 md:p-8 mb-8 hover:border-tiger-green transition-colors">
         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 min-h-[3rem]">
             <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-widest">Username Box</h3>
                 <SwitchControl
                    id="useUsernameBackground"
                    checked={settings.useUsernameBackground}
                    onChange={(c) => handleSettingChange('useUsernameBackground', c)}
                    labelLeft="OFF"
                    labelRight="ON"
                />
             </div>
            {settings.useUsernameBackground && (
                <SwitchControl
                    id="unifiedUsernameBackgrounds"
                    checked={!settings.unifiedUsernameBackgrounds}
                    onChange={(c) => handleSettingChange('unifiedUsernameBackgrounds', !c)}
                    labelLeft="Unified"
                    labelRight="Custom"
                />
            )}
         </div>

          {settings.useUsernameBackground && (
               <div className="mt-6 pt-6 border-t border-tiger-border animate-fade-in">
                   {settings.unifiedUsernameBackgrounds ? (
                        <div className="mt-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-tiger-green">Unified Style</h4>
                            <GradientControl 
                                label="Background" 
                                isGradient={settings.usernameBackgroundColorDefaultIsGradient} 
                                onToggleGradient={v => handleSettingChange('usernameBackgroundColorDefaultIsGradient', v)} 
                                color1={settings.usernameBackgroundColorDefault} 
                                onChangeColor1={v => handleSettingChange('usernameBackgroundColorDefault', v)} 
                                color2={settings.usernameBackgroundColorDefault2} 
                                onChangeColor2={v => handleSettingChange('usernameBackgroundColorDefault2', v)} 
                                angle={settings.usernameBackgroundColorDefaultAngle} 
                                onChangeAngle={v => handleSettingChange('usernameBackgroundColorDefaultAngle', v)} 
                                isNested={true} 
                                idPrefix="user-unified"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-2">
                                <ColorWithAlphaInput label="Border Color" id="usernameBorderColor" value={settings.usernameBorderColor} onChange={val => handleSettingChange('usernameBorderColor', val)} />
                                <FormInput label="Border Width" type="range" id="usernameBorderWidth" value={settings.usernameBorderWidth} onChange={handleChange} min={0} max={5} />
                                <FormInput label="Corner Radius" type="range" id="usernameCornerRadius" value={settings.usernameCornerRadius} onChange={handleChange} min={0} max={20} className="col-span-1 md:col-span-2"/>
                            </div>
                        </div>
                   ) : (
                        <div className="space-y-8">
                            {renderRoleSection('', 'username', settings.usernameColorDefault)}
                            {renderRoleSection('Broadcaster', 'username', settings.usernameColorBroadcaster)}
                            {renderRoleSection('Mod', 'username', settings.usernameColorMod)}
                            {renderRoleSection('Vip', 'username', settings.usernameColorVip)}
                            {renderRoleSection('Sub', 'username', settings.usernameColorSub)}
                        </div>
                   )}
               </div>
          )}
      </div>
    </div>
  );
};

export default MessagesStep;
