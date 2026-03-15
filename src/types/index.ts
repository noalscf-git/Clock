// src/types/index.ts - обновляем типы
export interface FolderImage {
  id: number;
  data: string;
  name: string;
  path?: string;
}

export interface BackgroundState {
  type: 'gradient' | 'folder';
  value: string; // для градиента - ключ, для папки - id изображения
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