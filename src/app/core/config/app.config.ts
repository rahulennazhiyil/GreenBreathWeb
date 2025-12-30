/**
 * Global application configuration
 * Centralized settings for 3D, audio, performance, and experience
 */

export const APP_CONFIG = {
  // Performance settings
  performance: {
    targetFPS: 60,
    enableStats: false, // Set to true for development
    pixelRatio: Math.min(window.devicePixelRatio, 2),
    antialias: true,
    powerPreference: 'high-performance' as WebGLPowerPreference,
  },

  // Three.js renderer settings
  renderer: {
    alpha: true,
    preserveDrawingBuffer: false,
    failIfMajorPerformanceCaveat: false,
  },

  // Camera settings
  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    initialPosition: { x: 0, y: 0, z: 5 },
  },

  // Audio settings
  audio: {
    enabled: false, // Disabled by default for accessibility
    masterVolume: 0.5,
    ambientVolume: 0.3,
    effectsVolume: 0.7,
    fadeInDuration: 2000,
    fadeOutDuration: 1000,
  },

  // Animation settings
  animation: {
    scrollSmoothness: 0.1,
    transitionDuration: 1.2,
    easing: 'power2.inOut',
  },

  // Accessibility
  accessibility: {
    respectReducedMotion: true,
    keyboardNavigation: true,
    ariaLabels: true,
  },

  // Development
  dev: {
    enableDebugMode: false,
    showFPS: false,
    enableGUI: false,
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
