// src/types/index.ts - обновляем типы для слайд-шоу
export interface FolderImage {
  id: number;
  data: string;
  name: string;
  path?: string;
}

export interface GradientColor {
  id: string;
  color: string;
  position: number;
}

export interface CustomGradient {
  id: string;
  name: string;
  colors: GradientColor[];
  angle: number;
  type: 'linear' | 'radial';
}

export interface BackgroundState {
  type: 'gradient' | 'folder' | 'custom' | 'animated';
  value: string;
  animatedSettings?: AnimatedBackground;
}

export interface ClockSettings {
  size: string;
  color: string;
  glowIntensity: string;
  borderOpacity: string;
  fontFamily: string;
}

export interface SlideshowState {
  isActive: boolean;
  effect: string;
  interval: string;
  randomEffect: boolean;
  randomInterval: boolean;
  randomIntervalRange: string;
  shuffleImages: boolean;
  currentIndex: number;
  playlistIds: string[]; // Для восстановления плейлиста
  playlistType: 'folder' | 'mixed'; // Тип плейлиста
}

export interface SlideshowSettings {
  interval: string;
  effect: string;
  randomEffect: boolean;
  randomInterval: boolean;
  randomIntervalRange: string;
  shuffleImages: boolean;
}

export type GradientKey = 'gradient1' | 'gradient2' | 'gradient3' | 'gradient4' | 'gradient5' | 'gradient6';

export interface AnimatedBackground {
  id: string;
  name: string;
  type: 'particles' | 'waves' | 'stars' | 'matrix' | 'gradient' | 'fire' | 'aurora' | 'bubbles';
  speed: number; // 0.5 - 3
  intensity: number; // 0 - 100
  color1: string;
  color2: string;
  color3?: string;
  density: number; // 1 - 100
}

