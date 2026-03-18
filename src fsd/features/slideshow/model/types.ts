// src/features/slideshow/model/types.ts
export type TransitionEffect = 
  | 'fade' 
  | 'slide' 
  | 'zoom' 
  | 'blur' 
  | 'flip' 
  | 'rotate' 
  | 'bounce' 
  | 'flash'
  | 'darken'
  | 'desaturate'
  | 'horizontal-blur'
  | 'curtain'
  | 'xflip'
  | 'diagonal-rotate'
  | 'wave'
  | 'lightning'
  | 'kaleidoscope'
  | 'pulse'
  | 'rainbow'
  | 'dissolve';

export interface SlideshowSettings {
  interval: string;           // интервал в секундах
  effect: TransitionEffect;    // эффект перехода
  randomEffect: boolean;       // случайный эффект
  randomInterval: boolean;     // случайный интервал
  randomIntervalRange: string; // диапазон для случайного интервала (min,max)
  shuffleImages: boolean;      // перемешивать изображения
}

export interface SlideshowState extends SlideshowSettings {
  isActive: boolean;           // активно ли слайд-шоу
  currentIndex: number;        // текущий индекс в плейлисте
  playlistIds: string[];       // ID изображений в плейлисте
  imagesCount: number;         // общее количество изображений
}

export interface SlideshowViewModel {
  // Состояние
  isActive: boolean;
  effect: TransitionEffect;
  interval: string;
  randomEffect: boolean;
  randomInterval: boolean;
  randomIntervalRange: string;
  shuffleImages: boolean;
  isRestoring: boolean;
  
  // Действия
  setEffect: (effect: TransitionEffect) => void;
  setInterval: (interval: string) => void;
  setRandomEffect: (checked: boolean) => void;
  setRandomInterval: (checked: boolean) => void;
  setRandomIntervalRange: (range: string) => void;
  setShuffleImages: (checked: boolean) => void;
  startSlideshow: () => void;
  stopSlideshow: () => void;
  nextImage: () => void;
  prevImage: () => void;
}

export interface SlideshowControlsProps {
  isActive: boolean;
  effect: TransitionEffect;
  interval: string;
  randomEffect: boolean;
  randomInterval: boolean;
  randomIntervalRange: string;
  shuffleImages: boolean;
  imagesCount: number;
  onEffectChange: (effect: TransitionEffect) => void;
  onIntervalChange: (interval: string) => void;
  onRandomEffectChange: (checked: boolean) => void;
  onRandomIntervalChange: (checked: boolean) => void;
  onRandomIntervalRangeChange: (range: string) => void;
  onShuffleImagesChange: (checked: boolean) => void;
  onStartSlideshow: () => void;
  onStopSlideshow: () => void;
  onNextImage?: () => void;
  onPrevImage?: () => void;
}