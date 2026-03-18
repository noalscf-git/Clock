// src/features/background/model/types.ts
export type BackgroundType = 'gradient' | 'folder' | 'custom' | 'animated';
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

export interface BackgroundState {
  type: BackgroundType;
  value: string;
  currentBackground: string;
  nextBackground: string | null;
  isTransitioning: boolean;
  transitionEffect: TransitionEffect | '';
}

export interface BackgroundViewModel extends BackgroundState {
  setBackgroundType: (type: BackgroundType) => void;
  setBackgroundValue: (value: string) => void;
  setCurrentBackground: (bg: string) => void;
  startTransition: (newBg: string, effect: TransitionEffect) => void;
  resetTransition: () => void;
}

export interface BackgroundLayerProps {
  current: string;
  next: string | null;
  isTransitioning: boolean;
  effect: TransitionEffect | '';
  className?: string;
}