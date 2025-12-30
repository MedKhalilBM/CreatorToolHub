
import { WidgetSettings } from './types';

export const FONT_OPTIONS = [
  'Inter',
  'Poppins',
  'Lato',
  'Open Sans',
  'Roboto Mono',
  'Arial',
  'Verdana',
  'Georgia',
  'Times New Roman',
  'Courier New',
];

export const INITIAL_SETTINGS: WidgetSettings = {
  // Layout
  chatDirection: 'up',
  maxMessages: 15,
  textAlign: 'left',
  messageLayout: 'block',

  // Colors
  backgroundColor: '#00000000',
  backgroundColorIsGradient: false,
  backgroundColor2: '#2d374880',
  backgroundColorAngle: 90,
  
  unifiedUsernameColors: true,
  usernameColorDefault: '#58fbb0',
  usernameColorBroadcaster: '#ff4500',
  usernameColorMod: '#34d399',
  usernameColorVip: '#f472b6',
  usernameColorSub: '#a78bfa',
  
  messageColor: '#FFFFFF',
  timestampColor: '#A9A9A9',
  
  // Typography
  fontFamily: 'Inter',
  fontSize: 16,
  fontWeight: 5, // Level 5 (700)
  messageFontWeight: 2, // Level 2 (400)
  useTextShadow: false,
  textShadowColor: '#00000099',
  textShadowX: 1,
  textShadowY: 1,
  textShadowBlur: 2,

  // Messages & Badges
  badgeStyle: 'default',
  badgeSize: 1.2,
  customBadgeBroadcaster: null,
  customBadgeMod: null,
  customBadgeVip: null,
  customBadgeSub: null,
  showTimestamp: '12h',
  messageAnimation: 'slideInUp',
  hideMessages: false,
  hideMessagesAfter: 60,
  
  // Appearance - Message Backgrounds
  useMessageBackground: false,
  unifiedMessageBackgrounds: true,

  // Default / Unified Message
  messageBackgroundColor: '#1a202c80',
  messageBackgroundColorIsGradient: false,
  messageBackgroundColor2: '#2d374880',
  messageBackgroundColorAngle: 90,
  messageBorderColor: '#58fbb0',
  messageBorderWidth: 0,
  messageCornerRadius: 0,

  // Role Specific Message
  messageBackgroundColorBroadcaster: '#58000080',
  messageBackgroundColorBroadcasterIsGradient: false,
  messageBackgroundColorBroadcaster2: '#000000',
  messageBackgroundColorBroadcasterAngle: 90,
  messageBorderColorBroadcaster: '#B3001B',
  messageBorderWidthBroadcaster: 1,
  messageCornerRadiusBroadcaster: 0,

  messageBackgroundColorMod: '#00332280',
  messageBackgroundColorModIsGradient: false,
  messageBackgroundColorMod2: '#000000',
  messageBackgroundColorModAngle: 90,
  messageBorderColorMod: '#00F5D4',
  messageBorderWidthMod: 1,
  messageCornerRadiusMod: 0,

  messageBackgroundColorVip: '#44004480',
  messageBackgroundColorVipIsGradient: false,
  messageBackgroundColorVip2: '#000000',
  messageBackgroundColorVipAngle: 90,
  messageBorderColorVip: '#FF00FF',
  messageBorderWidthVip: 1,
  messageCornerRadiusVip: 0,

  messageBackgroundColorSub: '#22004480',
  messageBackgroundColorSubIsGradient: false,
  messageBackgroundColorSub2: '#000000',
  messageBackgroundColorSubAngle: 90,
  messageBorderColorSub: '#AA00FF',
  messageBorderWidthSub: 1,
  messageCornerRadiusSub: 0,

  // Appearance - Username Backgrounds
  useUsernameBackground: false,
  unifiedUsernameBackgrounds: true,

  // Default / Unified User
  usernameBackgroundColorDefault: '#4a556880',
  usernameBackgroundColorDefaultIsGradient: false,
  usernameBackgroundColorDefault2: '#2d374880',
  usernameBackgroundColorDefaultAngle: 90,
  usernameBorderColor: '#58fbb0',
  usernameBorderWidth: 0,
  usernameCornerRadius: 0,
  
  // Role Specific User
  usernameBackgroundColorBroadcaster: '#eb403480',
  usernameBackgroundColorBroadcasterIsGradient: false,
  usernameBackgroundColorBroadcaster2: '#a3221980',
  usernameBackgroundColorBroadcasterAngle: 90,
  usernameBorderColorBroadcaster: '#B3001B',
  usernameBorderWidthBroadcaster: 0,
  usernameCornerRadiusBroadcaster: 0,

  usernameBackgroundColorMod: '#2f5b4a80',
  usernameBackgroundColorModIsGradient: false,
  usernameBackgroundColorMod2: '#1f3d3180',
  usernameBackgroundColorModAngle: 90,
  usernameBorderColorMod: '#00F5D4',
  usernameBorderWidthMod: 0,
  usernameCornerRadiusMod: 0,

  usernameBackgroundColorVip: '#6b375880',
  usernameBackgroundColorVipIsGradient: false,
  usernameBackgroundColorVip2: '#4a263c80',
  usernameBackgroundColorVipAngle: 90,
  usernameBorderColorVip: '#FF00FF',
  usernameBorderWidthVip: 0,
  usernameCornerRadiusVip: 0,

  usernameBackgroundColorSub: '#4c426b80',
  usernameBackgroundColorSubIsGradient: false,
  usernameBackgroundColorSub2: '#352e4a80',
  usernameBackgroundColorSubAngle: 90,
  usernameBorderColorSub: '#AA00FF',
  usernameBorderWidthSub: 0,
  usernameCornerRadiusSub: 0,
};
