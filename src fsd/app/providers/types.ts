// src/app/providers/types.ts
import type { 
  BackgroundType, 
  FolderImage, 
  CustomGradient,
  AnimatedBackground,
  ClockSettings,
  SlideshowSettings,
  MonitorSize
} from '@/shared/types';

export interface SettingsContextValue {
  // Background state
  backgroundType: BackgroundType;
  backgroundValue: string;
  currentBackground: string;
  nextBackground: string | null;
  isTransitioning: boolean;
  transitionEffect: string;
  
  // Background actions
  setBackgroundType: (type: BackgroundType) => void;
  setBackgroundValue: (value: string) => void;
  setCurrentBackground: (bg: string) => void;
  startTransition: (newBg: string, effect: string) => void;
  
  // Gradients
  customGradients: CustomGradient[];
  getGradientStyle: (gradient: CustomGradient) => string;
  
  // Images
  folderImages: FolderImage[];
  folderPath: string;
  isLoading: boolean;
  loadingProgress: number;
  handleFolderSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageSelect: (image: FolderImage) => void;
  handleGradientSelect: (gradient: string) => void;
  handleCustomGradientSelect: (gradient: CustomGradient) => void;
  handleAnimatedSelect: () => void;
  
  // Animated background
  animatedSettings: AnimatedBackground;
  updateAnimatedSettings: (settings: AnimatedBackground) => void;
  
  // Clock settings
  clockSettings: ClockSettings;
  clockStyle: React.CSSProperties;
  dateStyle: React.CSSProperties;
  wrapperStyle: React.CSSProperties;
  time: Date;
  updateClockSettings: <K extends keyof ClockSettings>(
    key: K, 
    value: ClockSettings[K]
  ) => void;
  
  // Slideshow
  slideshow: {
    interval: string;
    effect: string;
    randomEffect: boolean;
    randomInterval: boolean;
    randomIntervalRange: string;
    shuffleImages: boolean;
    isActive: boolean;
    startSlideshow: () => void;
    stopSlideshow: () => void;
    updateSlideshowSettings: (settings: Partial<{
      interval: string;
      effect: string;
      randomEffect: boolean;
      randomInterval: boolean;
      randomIntervalRange: string;
      shuffleImages: boolean;
    }>) => void;
  };
  
  // System monitor
  showSystemMonitor: boolean;
  monitorSize: MonitorSize;
  setShowSystemMonitor: (show: boolean) => void;
  setMonitorSize: (size: MonitorSize) => void;
  
  // UI state
  isOpen: boolean;  // переименовано с showSettings для ясности
  activeTab: string;
  setIsOpen: (isOpen: boolean) => void;  // функция для открытия/закрытия
  setActiveTab: (tab: string) => void;
  
  // Convenience aliases (для обратной совместимости)
  showSettings: boolean;  // алиас для isOpen
  setShowSettings: (show: boolean) => void;  // алиас для setIsOpen
  closeSettings: () => void;  // удобная функция для закрытия
  openSettings: () => void;  // удобная функция для открытия
}