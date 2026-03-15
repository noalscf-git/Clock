// src/types/index.ts - добавляем новые типы
export interface FolderImage {
  id: number;
  data: string;
  name: string;
  path?: string;
}

export interface GradientColor {
  id: string;
  color: string;
  position: number; // 0-100
}

export interface CustomGradient {
  id: string;
  name: string;
  colors: GradientColor[];
  angle: number; // 0-360
  type: 'linear' | 'radial';
}

export interface BackgroundState {
  type: 'gradient' | 'folder' | 'custom';
  value: string; // для градиента - ключ, для папки - id изображения, для custom - id градиента
}

export interface ClockSettings {
  size: string;
  color: string;
  glowIntensity: string;
  borderOpacity: string;
  fontFamily: string;
}

export interface SlideshowSettings {
  interval: string;
  effect: string;
  randomEffect: boolean;
  randomInterval: boolean;
  randomIntervalRange: string;
  shuffleImages: boolean;
  isActive: boolean;
}

export type GradientKey = 'gradient1' | 'gradient2' | 'gradient3' | 'gradient4' | 'gradient5' | 'gradient6';