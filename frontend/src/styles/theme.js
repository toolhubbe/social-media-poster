/**
 * Modern Theme System
 * File Location: frontend/src/styles/theme.js
 * Full Path: C:/Users/DASAP/Documents/social_media_poster/social_media_poster_frontend/src/styles/theme.js
 * 
 * Centralized modern styling system for the entire application
 * Usage: import { colors, gradients, shadows } from '../styles/theme';
 */

// ============================================
// COLOR PALETTE
// ============================================
export const colors = {
  // Primary Colors
  primary: {
    main: '#667eea',
    light: '#8ab4f8',
    dark: '#764ba2',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  
  // Secondary Colors
  secondary: {
    main: '#f093fb',
    light: '#f5a8ff',
    dark: '#f5576c',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  
  // Success Colors
  success: {
    main: '#43e97b',
    light: '#55efc4',
    dark: '#38f9d7',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    bg: 'rgba(67, 233, 123, 0.1)',
    border: '#43e97b',
  },
  
  // Info Colors
  info: {
    main: '#4facfe',
    light: '#74b9ff',
    dark: '#00f2fe',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  
  // Warning Colors
  warning: {
    main: '#ffeaa7',
    light: '#fdcb6e',
    dark: '#fab1a0',
    gradient: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
  },
  
  // Error Colors
  error: {
    main: '#fd79a8',
    light: '#ff7979',
    dark: '#e84393',
    bg: 'rgba(253, 121, 168, 0.1)',
    border: '#fd79a8',
  },
  
  // Neutral Colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // Text Colors
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    disabled: '#94a3b8',
    white: '#ffffff',
  },
  
  // Background Colors
  background: {
    default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    paper: 'rgba(255, 255, 255, 0.95)',
    light: '#f8f9fa',
    dark: '#1e293b',
  },
};

// ============================================
// GRADIENTS
// ============================================
export const gradients = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  success: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  info: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  warning: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
  error: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
  
  // Special gradients for different use cases
  purple: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)',
  orange: 'linear-gradient(135deg, #fab1a0 0%, #e17055 100%)',
  teal: 'linear-gradient(135deg, #81ecec 0%, #00cec9 100%)',
  blue: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
  green: 'linear-gradient(135deg, #55efc4 0%, #00b894 100%)',
  yellow: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
};

// ============================================
// SHADOWS
// ============================================
export const shadows = {
  xs: '0 1px 3px rgba(0, 0, 0, 0.08)',
  sm: '0 4px 12px rgba(0, 0, 0, 0.08)',
  md: '0 8px 24px rgba(0, 0, 0, 0.12)',
  lg: '0 12px 32px rgba(0, 0, 0, 0.15)',
  xl: '0 20px 40px rgba(0, 0, 0, 0.2)',
  
  // Colored shadows
  primary: '0 4px 15px rgba(102, 126, 234, 0.3)',
  secondary: '0 4px 15px rgba(240, 147, 251, 0.3)',
  success: '0 4px 15px rgba(67, 233, 123, 0.3)',
  error: '0 4px 15px rgba(253, 121, 168, 0.3)',
  
  // Hover shadows
  hover: {
    sm: '0 6px 16px rgba(0, 0, 0, 0.12)',
    md: '0 12px 28px rgba(0, 0, 0, 0.15)',
    lg: '0 16px 36px rgba(0, 0, 0, 0.18)',
  },
  
  // Glassmorphism
  glass: '0 8px 32px rgba(0, 0, 0, 0.1)',
};

// ============================================
// BORDER RADIUS
// ============================================
export const borderRadius = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
  full: '9999px',
};

// ============================================
// SPACING
// ============================================
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
  xxxl: '32px',
  huge: '40px',
};

// ============================================
// TYPOGRAPHY
// ============================================
export const typography = {
  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'Fira Code', 'Courier New', monospace",
  },
  
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '32px',
    '5xl': '36px',
    '6xl': '42px',
  },
  
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// ============================================
// TRANSITIONS
// ============================================
export const transitions = {
  fast: 'all 0.15s ease',
  base: 'all 0.2s ease',
  slow: 'all 0.3s ease',
  verySlow: 'all 0.5s ease',
  
  spring: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

// ============================================
// COMMON COMPONENT STYLES
// ============================================
export const components = {
  // Modern Card
  card: {
    base: {
      background: colors.background.paper,
      backdropFilter: 'blur(10px)',
      borderRadius: borderRadius.xl,
      boxShadow: shadows.md,
      transition: transitions.base,
    },
    hover: {
      transform: 'translateY(-4px)',
      boxShadow: shadows.hover.md,
    },
  },
  
  // Modern Button
  button: {
    primary: {
      background: gradients.primary,
      color: colors.text.white,
      border: 'none',
      borderRadius: borderRadius.md,
      padding: '12px 28px',
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semibold,
      cursor: 'pointer',
      transition: transitions.base,
      boxShadow: shadows.primary,
    },
    secondary: {
      background: colors.background.paper,
      color: colors.text.primary,
      border: `2px solid ${colors.neutral[300]}`,
      borderRadius: borderRadius.md,
      padding: '12px 28px',
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semibold,
      cursor: 'pointer',
      transition: transitions.base,
      boxShadow: shadows.sm,
    },
  },
  
  // Modern Input
  input: {
    base: {
      background: 'white',
      border: `2px solid ${colors.neutral[300]}`,
      borderRadius: borderRadius.md,
      padding: '14px 16px',
      fontSize: typography.fontSize.base,
      color: colors.text.primary,
      transition: transitions.base,
      outline: 'none',
    },
    focus: {
      borderColor: colors.primary.main,
      boxShadow: `0 0 0 3px ${colors.primary.main}20`,
    },
  },
  
  // Container
  container: {
    base: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: spacing.xl,
    },
  },
  
  // Header
  header: {
    base: {
      background: colors.background.paper,
      backdropFilter: 'blur(10px)',
      borderRadius: borderRadius.xl,
      padding: `${spacing.xl} ${spacing.xxxl}`,
      marginBottom: spacing.xxxl,
      boxShadow: shadows.md,
    },
  },
  
  // Stat Card
  statCard: {
    base: {
      background: colors.background.paper,
      backdropFilter: 'blur(10px)',
      borderRadius: borderRadius.xl,
      padding: spacing.xxxl,
      boxShadow: shadows.md,
      transition: transitions.base,
      position: 'relative',
      overflow: 'hidden',
    },
    topBorder: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: gradients.primary,
    },
  },
  
  // Success Message
  successBox: {
    base: {
      background: colors.success.gradient,
      color: 'white',
      borderRadius: borderRadius.lg,
      padding: `${spacing.xl} ${spacing.xxxl}`,
      display: 'flex',
      alignItems: 'center',
      gap: spacing.lg,
      boxShadow: shadows.success,
    },
  },
  
  // Error Message
  errorBox: {
    base: {
      background: colors.error.bg,
      border: `2px solid ${colors.error.border}`,
      borderRadius: borderRadius.lg,
      padding: `${spacing.lg} ${spacing.xl}`,
      display: 'flex',
      alignItems: 'center',
      gap: spacing.md,
      color: colors.error.dark,
    },
  },
};

// ============================================
// ANIMATIONS
// ============================================
export const animations = {
  fadeIn: {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  
  slideIn: {
    from: {
      transform: 'translateX(-100%)',
    },
    to: {
      transform: 'translateX(0)',
    },
  },
  
  scaleIn: {
    from: {
      transform: 'scale(0.9)',
      opacity: 0,
    },
    to: {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
  
  spin: {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
};

// ============================================
// BREAKPOINTS (for responsive design)
// ============================================
export const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px',
};

// ============================================
// Z-INDEX SYSTEM
// ============================================
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

export default {
  colors,
  gradients,
  shadows,
  borderRadius,
  spacing,
  typography,
  transitions,
  components,
  animations,
  breakpoints,
  zIndex,
};
