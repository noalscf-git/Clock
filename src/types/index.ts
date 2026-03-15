// src/types/index.ts
export interface FolderImage {
  id: number;
  data: string;
  name: string;
  path?: string;
}

export interface ClockSettings {
  size: string;
  color: string;
  glowIntensity: string;
  borderOpacity: string;
  fontFamily: string; // добавляем поле для шрифта
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

export interface BackgroundSettings {
  type: 'gradient' | 'folder';
  current: string;
  folderImages: FolderImage[];
  folderPath: string;
}

export type GradientKey = 'gradient1' | 'gradient2' | 'gradient3' | 'gradient4' | 'gradient5' | 'gradient6';

