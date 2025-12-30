
export type Step = 'layout' | 'typography' | 'colors' | 'messages' | 'code';

export type AnimationStyle = 'none' | 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'slideInUp' | 'slideInDown' | 'popIn' | 'bounceIn';
export type ChatDirection = 'up' | 'down';
export type TimestampFormat = 'none' | '12h' | '24h';
export type BadgeStyle = 'none' | 'default' | 'custom';
export type MessageLayout = 'inline' | 'block';
export type TextAlign = 'left' | 'center' | 'right';

export interface MockMessage {
  id: number;
  user: string;
  message: string;
  tags: {
    color: string | null;
    badges: string;
  };
}

export interface WidgetSettings {
  // Layout
  chatDirection: ChatDirection;
  maxMessages: number;
  textAlign: TextAlign;
  messageLayout: MessageLayout;

  // Colors
  backgroundColor: string;
  backgroundColorIsGradient: boolean;
  backgroundColor2: string;
  backgroundColorAngle: number;

  unifiedUsernameColors: boolean;
  usernameColorDefault: string;
  usernameColorBroadcaster: string;
  usernameColorMod: string;
  usernameColorVip: string;
  usernameColorSub: string;
  
  messageColor: string;
  timestampColor: string;
  
  // Typography
  fontFamily: string;
  fontSize: number; // in px
  fontWeight: number; // Username weight
  messageFontWeight: number; // Message text weight
  useTextShadow: boolean;
  textShadowColor: string;
  textShadowX: number;
  textShadowY: number;
  textShadowBlur: number;

  // Messages & Badges
  badgeStyle: BadgeStyle;
  badgeSize: number; // in em
  customBadgeBroadcaster: string | null;
  customBadgeMod: string | null;
  customBadgeVip: string | null;
  customBadgeSub: string | null;
  showTimestamp: TimestampFormat;
  messageAnimation: AnimationStyle;
  hideMessages: boolean;
  hideMessagesAfter: number; // in seconds
  
  // Appearance - Message Backgrounds
  useMessageBackground: boolean;
  unifiedMessageBackgrounds: boolean; // New: Toggle for unified vs role specific

  // Unified / Default
  messageBackgroundColor: string;
  messageBackgroundColorIsGradient: boolean;
  messageBackgroundColor2: string;
  messageBackgroundColorAngle: number;
  messageBorderColor: string;
  messageBorderWidth: number;
  messageCornerRadius: number;

  // Role Specific Message BGs
  messageBackgroundColorBroadcaster: string;
  messageBackgroundColorBroadcasterIsGradient: boolean;
  messageBackgroundColorBroadcaster2: string;
  messageBackgroundColorBroadcasterAngle: number;
  messageBorderColorBroadcaster: string;
  messageBorderWidthBroadcaster: number;
  messageCornerRadiusBroadcaster: number;

  messageBackgroundColorMod: string;
  messageBackgroundColorModIsGradient: boolean;
  messageBackgroundColorMod2: string;
  messageBackgroundColorModAngle: number;
  messageBorderColorMod: string;
  messageBorderWidthMod: number;
  messageCornerRadiusMod: number;

  messageBackgroundColorVip: string;
  messageBackgroundColorVipIsGradient: boolean;
  messageBackgroundColorVip2: string;
  messageBackgroundColorVipAngle: number;
  messageBorderColorVip: string;
  messageBorderWidthVip: number;
  messageCornerRadiusVip: number;

  messageBackgroundColorSub: string;
  messageBackgroundColorSubIsGradient: boolean;
  messageBackgroundColorSub2: string;
  messageBackgroundColorSubAngle: number;
  messageBorderColorSub: string;
  messageBorderWidthSub: number;
  messageCornerRadiusSub: number;

  // Appearance - Username Backgrounds
  useUsernameBackground: boolean;
  unifiedUsernameBackgrounds: boolean; // New toggle

  // Default / Unified User
  usernameBackgroundColorDefault: string;
  usernameBackgroundColorDefaultIsGradient: boolean;
  usernameBackgroundColorDefault2: string;
  usernameBackgroundColorDefaultAngle: number;
  usernameBorderColor: string;
  usernameBorderWidth: number;
  usernameCornerRadius: number;
  
  // Role Specific User
  usernameBackgroundColorBroadcaster: string;
  usernameBackgroundColorBroadcasterIsGradient: boolean;
  usernameBackgroundColorBroadcaster2: string;
  usernameBackgroundColorBroadcasterAngle: number;
  usernameBorderColorBroadcaster: string;
  usernameBorderWidthBroadcaster: number;
  usernameCornerRadiusBroadcaster: number;

  usernameBackgroundColorMod: string;
  usernameBackgroundColorModIsGradient: boolean;
  usernameBackgroundColorMod2: string;
  usernameBackgroundColorModAngle: number;
  usernameBorderColorMod: string;
  usernameBorderWidthMod: number;
  usernameCornerRadiusMod: number;

  usernameBackgroundColorVip: string;
  usernameBackgroundColorVipIsGradient: boolean;
  usernameBackgroundColorVip2: string;
  usernameBackgroundColorVipAngle: number;
  usernameBorderColorVip: string;
  usernameBorderWidthVip: number;
  usernameCornerRadiusVip: number;

  usernameBackgroundColorSub: string;
  usernameBackgroundColorSubIsGradient: boolean;
  usernameBackgroundColorSub2: string;
  usernameBackgroundColorSubAngle: number;
  usernameBorderColorSub: string;
  usernameBorderWidthSub: number;
  usernameCornerRadiusSub: number;
}

// ==========================================
// ASSET RECOLOR TOOL TYPES
// ==========================================

export type BlendMode = 'source-over' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';

export interface AssetLayer {
  id: string;
  color: string;
  opacity: number; // 0 to 1
  blendMode: BlendMode;
  name: string;
}

export interface AdjustmentState {
  hue: number;        // -180 to 180
  saturation: number; // 0 to 200 (100 default)
  brightness: number; // 0 to 200 (100 default)
  contrast: number;   // 0 to 200 (100 default)
  layers: AssetLayer[];
}

export interface PaletteColor {
  hex: string;
  name: string;
  category: 'skin' | 'hair' | 'outfit' | 'accent' | 'other';
}

export interface AnalysisResult {
  colors: PaletteColor[];
  description?: string;
}

// ==========================================
// GOAL TRACKER TOOL TYPES
// ==========================================

export type GoalType = 'subscriber' | 'tip' | 'cheer' | 'follower';
export type GoalLayout = 'bar';
export type GoalDisplayMode = 'single' | 'stack';

export interface GoalItem {
  id: string;
  title: string;
  targetAmount: number;
  // Per-goal styling
  fillColor?: string;
  fillColorIsGradient?: boolean;
  fillColor2?: string;
  fillColorAngle?: number;
}

export interface GoalSettings {
  // Global Goal Config
  type: GoalType;
  startAmount: number; // Global start amount
  goals: GoalItem[];
  
  // Appearance
  layout: GoalLayout;
  fontFamily: string;
  goalDisplayMode: GoalDisplayMode;
  goalsToDisplay: number; 
  
  // Colors (Bar / Circle Fill)
  unifiedColors: boolean; // If true, ignore goal-specific colors
  fillColor: string;
  fillColorIsGradient: boolean;
  fillColor2: string;
  fillColorAngle: number;
  useStripes: boolean; // Diagonal stripes pattern
  
  // Colors (Background Track)
  trackColor: string;
  
  // Colors (Text)
  textColor: string;
  
  // Dimensions
  barHeight: number; // For bar layout
  circleSize: number; // For circle layout
  borderWidth: number;
  borderColor: string;
  cornerRadius: number; // For bar
  
  // Text
  showTitle: boolean;
  showAmount: boolean; // "10 / 100"
  showPercentage: boolean; // "10%"
}

// ==========================================
// TIMER TOOL TYPES
// ==========================================

export type TimerMode = 'countdown_add' | 'countdown_sub';
export type TimerLayout = 'digital' | 'box';
export type TimerPlatform = 'twitch' | 'youtube';

export interface TimerSettings {
  // Logic
  platform: TimerPlatform;
  mode: TimerMode;
  startTimeHours: number;
  startTimeMinutes: number;
  startTimeSeconds: number;
  capHours: number; // Max time limit (0 for unlimited)
  
  // Event Values (in seconds)
  // Twitch
  secondsPerSub: number; // Also used for YouTube Subscriber if needed, but we separate naming for clarity in logic
  secondsPerTip: number; // Universal
  secondsPerCheer: number; // Twitch Bits
  secondsPerFollow: number; // Twitch Follow
  
  // YouTube
  secondsPerMember: number; // Paid
  secondsPerSuperChat: number; // Per 1 Currency
  
  // Appearance
  layout: TimerLayout;
  fontFamily: string;
  fontSize: number;
  
  // Colors
  textColor: string;
  backgroundColor: string;
  backgroundColorIsGradient: boolean;
  backgroundColor2: string;
  backgroundColorAngle: number;
  
  borderColor: string;
  borderWidth: number;
  cornerRadius: number;
  
  // Extra
  showEndTime: boolean; // "Ends at 10:30 PM"
  endTimeColor: string;
  textShadow: boolean;
}
