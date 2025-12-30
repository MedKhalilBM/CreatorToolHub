
import React, { useState, useEffect, useRef } from 'react';
import { WidgetSettings, MockMessage } from '../types';

interface PreviewProps {
  settings: WidgetSettings;
  messages: MockMessage[];
}

interface DisplayMessage extends MockMessage {
  displayId: string;
  hiding?: boolean;
}

const emoteMap: Record<string, string> = {
  PogChamp: 'https://static-cdn.jtvnw.net/emoticons/v2/84608/default/dark/1.0',
  Kappa: 'https://static-cdn.jtvnw.net/emoticons/v2/25/default/dark/1.0',
  LUL: 'https://static-cdn.jtvnw.net/emoticons/v2/425618/default/dark/1.0',
};

const getBackgroundStyle = (
    isGradient: boolean, 
    color1: string, 
    color2: string, 
    angle: number
) => {
    return isGradient ? `linear-gradient(${angle}deg, ${color1}, ${color2})` : color1;
};

// Map slider 1-5 to weights
const getWeight = (val: number) => {
    const map = [300, 400, 500, 600, 700];
    return map[Math.max(0, Math.min(4, val - 1))] || 400;
}


const Preview: React.FC<PreviewProps> = ({ settings, messages }) => {
  const [displayMessages, setDisplayMessages] = useState<DisplayMessage[]>([]);
  const hiddenMessagesRef = useRef(new Set<number>());
  const prevHideMessagesRef = useRef(settings.hideMessages);
  const containerRef = useRef<HTMLDivElement>(null);

  // Clear chat if hideMessages is toggled on
  useEffect(() => {
    if (settings.hideMessages && !prevHideMessagesRef.current) {
        setDisplayMessages([]);
    }
    prevHideMessagesRef.current = settings.hideMessages;
  }, [settings.hideMessages]);

  // Auto-scroll logic
  useEffect(() => {
    if (containerRef.current) {
        if (settings.chatDirection === 'up') {
             // Standard chat: Newest at bottom. Scroll to bottom.
             containerRef.current.scrollTop = containerRef.current.scrollHeight;
        } else {
             // Reverse chat: Newest at top.
             // We want to see the top (newest).
             containerRef.current.scrollTop = 0;
        }
    }
  }, [displayMessages, settings.chatDirection]);

  useEffect(() => {
    const newMessages = messages
      .filter(m => !displayMessages.some(dm => dm.id === m.id))
      .filter(m => !hiddenMessagesRef.current.has(m.id))
      .map(m => ({ ...m, displayId: `${m.id}-${Date.now()}` }));

    if (newMessages.length > 0) {
      let updatedMessages = [...displayMessages, ...newMessages];
      
      updatedMessages.sort((a, b) => a.id - b.id);

      while (updatedMessages.length > settings.maxMessages) {
          updatedMessages.shift();
      }

      setDisplayMessages(updatedMessages);

      if (settings.hideMessages) {
        newMessages.forEach(msg => {
          setTimeout(() => {
            setDisplayMessages(current =>
              current.map(m => (m.displayId === msg.displayId ? { ...m, hiding: true } : m))
            );
            setTimeout(() => {
              hiddenMessagesRef.current.add(msg.id);
              setDisplayMessages(current => current.filter(m => m.displayId !== msg.displayId));
            }, 500); 
          }, settings.hideMessagesAfter * 1000);
        });
      }
    } else if (messages.length < displayMessages.length) {
       setDisplayMessages(current => {
           const messageIds = new Set(messages.map(m => m.id));
           const currentIds = current.map(cm => cm.id);
           const idsToRemove = new Set(currentIds.filter(id => !messageIds.has(id)));
           return current.filter(cm => !idsToRemove.has(cm.id));
       });
    }

  }, [messages, settings.hideMessages, settings.hideMessagesAfter, settings.maxMessages]);


  const getTimestamp = () => {
    if (settings.showTimestamp === 'none') return '';
    const date = new Date();
    if (settings.showTimestamp === '12h') {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const parseMessage = (text: string) => {
    const parts = text.split(/(\s+)/);
    return parts.map((part, i) => {
      if (emoteMap[part]) {
        return <img key={i} src={emoteMap[part]} alt={part} className="inline-block h-[1.2em] mx-px align-middle" />;
      }
      return part;
    });
  };
  
  const textShadow = settings.useTextShadow 
    ? `${settings.textShadowX}px ${settings.textShadowY}px ${settings.textShadowBlur}px ${settings.textShadowColor}`
    : 'none';

  const containerStyles: React.CSSProperties = {
    fontFamily: `${settings.fontFamily}, sans-serif`,
    fontSize: `${settings.fontSize}px`,
    background: getBackgroundStyle(settings.backgroundColorIsGradient, settings.backgroundColor, settings.backgroundColor2, settings.backgroundColorAngle),
  };

  const getStylesForRole = (tags: MockMessage['tags']) => {
    let role: 'broadcaster' | 'mod' | 'vip' | 'sub' | 'default' = 'default';
    if (tags.badges.includes('broadcaster')) role = 'broadcaster';
    else if (tags.badges.includes('moderator')) role = 'mod';
    else if (tags.badges.includes('vip')) role = 'vip';
    else if (tags.badges.includes('subscriber')) role = 'sub';

    let usernameColor = settings.usernameColorDefault;
    if (!settings.unifiedUsernameColors) {
         if (role === 'broadcaster') usernameColor = settings.usernameColorBroadcaster;
         else if (role === 'mod') usernameColor = settings.usernameColorMod;
         else if (role === 'vip') usernameColor = settings.usernameColorVip;
         else if (role === 'sub') usernameColor = settings.usernameColorSub;
    }

    let usernameBg = getBackgroundStyle(settings.usernameBackgroundColorDefaultIsGradient, settings.usernameBackgroundColorDefault, settings.usernameBackgroundColorDefault2, settings.usernameBackgroundColorDefaultAngle);
    let usernameBorderColor = settings.usernameBorderColor;
    let usernameBorderWidth = settings.usernameBorderWidth;
    let usernameCornerRadius = settings.usernameCornerRadius;

    if (!settings.unifiedUsernameBackgrounds) {
        if (role === 'broadcaster') {
            usernameBg = getBackgroundStyle(settings.usernameBackgroundColorBroadcasterIsGradient, settings.usernameBackgroundColorBroadcaster, settings.usernameBackgroundColorBroadcaster2, settings.usernameBackgroundColorBroadcasterAngle);
            usernameBorderColor = settings.usernameBorderColorBroadcaster;
            usernameBorderWidth = settings.usernameBorderWidthBroadcaster;
            usernameCornerRadius = settings.usernameCornerRadiusBroadcaster;
        } else if (role === 'mod') {
            usernameBg = getBackgroundStyle(settings.usernameBackgroundColorModIsGradient, settings.usernameBackgroundColorMod, settings.usernameBackgroundColorMod2, settings.usernameBackgroundColorModAngle);
            usernameBorderColor = settings.usernameBorderColorMod;
            usernameBorderWidth = settings.usernameBorderWidthMod;
            usernameCornerRadius = settings.usernameCornerRadiusMod;
        } else if (role === 'vip') {
            usernameBg = getBackgroundStyle(settings.usernameBackgroundColorVipIsGradient, settings.usernameBackgroundColorVip, settings.usernameBackgroundColorVip2, settings.usernameBackgroundColorVipAngle);
            usernameBorderColor = settings.usernameBorderColorVip;
            usernameBorderWidth = settings.usernameBorderWidthVip;
            usernameCornerRadius = settings.usernameCornerRadiusVip;
        } else if (role === 'sub') {
            usernameBg = getBackgroundStyle(settings.usernameBackgroundColorSubIsGradient, settings.usernameBackgroundColorSub, settings.usernameBackgroundColorSub2, settings.usernameBackgroundColorSubAngle);
            usernameBorderColor = settings.usernameBorderColorSub;
            usernameBorderWidth = settings.usernameBorderWidthSub;
            usernameCornerRadius = settings.usernameCornerRadiusSub;
        }
    }

    let messageBg = getBackgroundStyle(settings.messageBackgroundColorIsGradient, settings.messageBackgroundColor, settings.messageBackgroundColor2, settings.messageBackgroundColorAngle);
    let messageBorderColor = settings.messageBorderColor;
    let messageBorderWidth = settings.messageBorderWidth;
    let messageCornerRadius = settings.messageCornerRadius;

    if (!settings.unifiedMessageBackgrounds) {
        if (role === 'broadcaster') {
            messageBg = getBackgroundStyle(settings.messageBackgroundColorBroadcasterIsGradient, settings.messageBackgroundColorBroadcaster, settings.messageBackgroundColorBroadcaster2, settings.messageBackgroundColorBroadcasterAngle);
            messageBorderColor = settings.messageBorderColorBroadcaster;
            messageBorderWidth = settings.messageBorderWidthBroadcaster;
            messageCornerRadius = settings.messageCornerRadiusBroadcaster;
        } else if (role === 'mod') {
            messageBg = getBackgroundStyle(settings.messageBackgroundColorModIsGradient, settings.messageBackgroundColorMod, settings.messageBackgroundColorMod2, settings.messageBackgroundColorModAngle);
            messageBorderColor = settings.messageBorderColorMod;
            messageBorderWidth = settings.messageBorderWidthMod;
            messageCornerRadius = settings.messageCornerRadiusMod;
        } else if (role === 'vip') {
            messageBg = getBackgroundStyle(settings.messageBackgroundColorVipIsGradient, settings.messageBackgroundColorVip, settings.messageBackgroundColorVip2, settings.messageBackgroundColorVipAngle);
            messageBorderColor = settings.messageBorderColorVip;
            messageBorderWidth = settings.messageBorderWidthVip;
            messageCornerRadius = settings.messageCornerRadiusVip;
        } else if (role === 'sub') {
             messageBg = getBackgroundStyle(settings.messageBackgroundColorSubIsGradient, settings.messageBackgroundColorSub, settings.messageBackgroundColorSub2, settings.messageBackgroundColorSubAngle);
             messageBorderColor = settings.messageBorderColorSub;
             messageBorderWidth = settings.messageBorderWidthSub;
             messageCornerRadius = settings.messageCornerRadiusSub;
        }
    }

    return {
        role,
        usernameColor,
        usernameBg,
        usernameBorderColor,
        usernameBorderWidth,
        usernameCornerRadius,
        messageBg,
        messageBorderColor,
        messageBorderWidth,
        messageCornerRadius
    };
  }

  const renderBadges = (tags: MockMessage['tags']) => {
    if (settings.badgeStyle === 'none') return null;
    const badges = tags.badges.split(',').filter(b => b);
    
    return badges.map(badgeStr => {
        const [badge] = badgeStr.split('/');
        let badgeSrc = '';

        if (settings.badgeStyle === 'custom') {
            if (badge === 'broadcaster' && settings.customBadgeBroadcaster) badgeSrc = settings.customBadgeBroadcaster;
            else if (badge === 'moderator' && settings.customBadgeMod) badgeSrc = settings.customBadgeMod;
            else if (badge === 'vip' && settings.customBadgeVip) badgeSrc = settings.customBadgeVip;
            else if (badge === 'subscriber' && settings.customBadgeSub) badgeSrc = settings.customBadgeSub;
        } else {
             if (badge === 'broadcaster') badgeSrc = 'https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f349d43c2af2/1';
             if (badge === 'moderator') badgeSrc = 'https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/1';
             if (badge === 'vip') badgeSrc = 'https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744fcfc1d/1';
             if (badge === 'subscriber') badgeSrc = 'https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/1';
        }
        
        if (!badgeSrc) return null;
        return <img key={badge} src={badgeSrc} alt={badge} className="inline-block mx-1 align-middle" style={{ height: `${settings.badgeSize}em`}} />;
    });
  }

  const renderInlineMessage = (msg: DisplayMessage) => {
    const styles = getStylesForRole(msg.tags);
    const messageItemStyle: React.CSSProperties = {
        textAlign: settings.textAlign,
        textShadow,
    };
    const usernameStyle: React.CSSProperties = {
      color: styles.usernameColor,
      fontWeight: getWeight(settings.fontWeight),
      background: settings.useUsernameBackground ? styles.usernameBg : 'transparent',
      border: settings.useUsernameBackground ? `${styles.usernameBorderWidth}px solid ${styles.usernameBorderColor}` : 'none',
      borderRadius: `${styles.usernameCornerRadius}px`,
      padding: settings.useUsernameBackground ? '0.1em 0.3em' : '0',
      display: 'inline-block',
    };
    const messageTextStyle: React.CSSProperties = {
        color: settings.messageColor,
        fontWeight: getWeight(settings.messageFontWeight),
    };

    return (
      <div key={msg.displayId} className={`p-1 mb-1 break-words message-item ${msg.hiding ? 'hiding' : ''}`} style={messageItemStyle}>
        {settings.showTimestamp !== 'none' && (
          <span style={{ color: settings.timestampColor, marginRight: '6px', fontSize: '0.9em' }}>
            {getTimestamp()}
          </span>
        )}
        <span className="badges inline-flex items-center align-middle">
            {renderBadges(msg.tags)}
        </span>
        <span style={usernameStyle}>
          {msg.user}
        </span>
        <span style={{color: settings.messageColor}}>: </span>
        <span style={messageTextStyle}>
            {parseMessage(msg.message)}
        </span>
      </div>
    );
  };

  const renderBlockMessage = (msg: DisplayMessage) => {
    const styles = getStylesForRole(msg.tags);
     const messageItemStyle: React.CSSProperties = {
        textShadow,
    };
    const contentWrapperStyle: React.CSSProperties = {
        alignItems: settings.textAlign === 'left' ? 'flex-start' : settings.textAlign === 'right' ? 'flex-end' : 'center',
    };
    const userInfoContainerStyle: React.CSSProperties = {
        flexDirection: settings.textAlign === 'right' ? 'row-reverse' : 'row',
        padding: '2px 0',
    };
    const usernameStyle: React.CSSProperties = {
      color: styles.usernameColor,
      fontWeight: getWeight(settings.fontWeight),
      background: settings.useUsernameBackground ? styles.usernameBg : 'transparent',
      border: settings.useUsernameBackground ? `${styles.usernameBorderWidth}px solid ${styles.usernameBorderColor}` : 'none',
      borderRadius: `${styles.usernameCornerRadius}px`,
      padding: settings.useUsernameBackground ? '0.1em 0.3em' : '0',
    };
    const messageTextWrapperStyle: React.CSSProperties = {
        background: settings.useMessageBackground ? styles.messageBg : 'transparent',
        border: settings.useMessageBackground ? `${styles.messageBorderWidth}px solid ${styles.messageBorderColor}` : 'none',
        borderRadius: `${styles.messageCornerRadius}px`,
        padding: settings.useMessageBackground ? '0.2em 0.4em' : '0',
        display: 'inline-block',
        maxWidth: '100%',
    };
    const messageTextStyle: React.CSSProperties = {
        color: settings.messageColor,
        fontWeight: getWeight(settings.messageFontWeight),
        textAlign: settings.textAlign
    };

    return (
        <div key={msg.displayId} className={`p-1 mb-1 break-words message-item ${msg.hiding ? 'hiding' : ''}`} style={messageItemStyle}>
            <div className="message-content-wrapper flex flex-col" style={contentWrapperStyle}>
                
                <div className="user-info-container inline-flex items-center" style={userInfoContainerStyle}>
                    <span className="badges inline-flex items-center align-middle">
                        {renderBadges(msg.tags)}
                    </span>
                    <span style={usernameStyle}>
                        {msg.user}
                    </span>
                </div>

                <div className="message-text-wrapper" style={messageTextWrapperStyle}>
                    <span style={messageTextStyle}>
                        {parseMessage(msg.message)}
                    </span>
                </div>

                {settings.showTimestamp !== 'none' && (
                    <div className="timestamp-wrapper mt-1">
                        <span style={{ color: settings.timestampColor, fontSize: '0.85em' }}>
                            {getTimestamp()}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
  };

  const messagesToRender = settings.chatDirection === 'down' 
    ? [...displayMessages].reverse() 
    : displayMessages;

  return (
    <div className={`w-full h-full flex flex-col`} style={containerStyles}>
      {/* Dynamic Font Style Injection for Correct Weight Loading */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(/ /g, '+')}:wght@300;400;500;600;700&display=swap');`}
        {`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes slideInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes slideInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes popIn { 0% { opacity: 0; transform: scale(0.5); } 100% { opacity: 1; transform: scale(1); } }
          @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.3); } 50% { opacity: 1; transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { transform: scale(1); } }
          @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }

          .message-item {
              --animation-name: ${settings.messageAnimation === 'none' ? 'none' : settings.messageAnimation};
              animation: var(--animation-name, fadeIn) 0.5s ease-out;
          }
          .message-item.hiding {
              animation: fadeOut 0.5s ease-out forwards;
          }
        `}
      </style>
      <div 
        ref={containerRef}
        className={`overflow-y-auto overflow-x-hidden w-full h-full flex flex-col scroll-smooth`}
        style={{ justifyContent: 'flex-start' }}
      >
        {messagesToRender.map(msg => settings.messageLayout === 'block' ? renderBlockMessage(msg) : renderInlineMessage(msg))}
        <div className="min-h-[1px]"></div>
      </div>
    </div>
  );
};

export default Preview;