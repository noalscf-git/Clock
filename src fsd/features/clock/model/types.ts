// src/features/settings/model/types.ts
import type { 
  BackgroundType,
  FolderImage,
  CustomGradient,
  AnimatedBackground,
  ClockSettings,
  SlideshowSettings,
} from '@/shared/types';

export type TabType = 'background' | 'animated' | 'clock' | 'slideshow' | 'system';
export type GradientKey = 'gradient1' | 'gradient2' | 'gradient3' | 'gradient4' | 'gradient5' | 'gradient6';

// ВАЖНО: Экспортируем все типы!
export type { BackgroundType, CustomGradient }; // Экспортируем импортированные типы

// Состояние настроек
export interface SettingsState {
  // UI состояние
  isOpen: boolean;
  activeTab: TabType;
  
  // Фон
  backgroundType: BackgroundType;
  backgroundValue: string;
  customGradients: CustomGradient[];
  folderImages: FolderImage[];
  folderPath: string;
  isLoading: boolean;
  loadingProgress: number;
  
  // Анимированный фон
  animatedSettings: AnimatedBackground;
  
  // Часы
  clockSettings: ClockSettings;
  
  // Слайд-шоу
  slideshowSettings: SlideshowSettings & {
    isActive: boolean;
  };
  
  // Системный монитор
  showSystemMonitor: boolean;
  monitorSize: 'small' | 'medium' | 'large';
}

// Действия с настройками
export interface SettingsActions {
  // UI
  openSettings: () => void;
  closeSettings: () => void;
  setActiveTab: (tab: TabType) => void;
  
  // Фон
  setBackgroundType: (type: BackgroundType) => void;
  setBackgroundValue: (value: string) => void;
  handleFolderSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageSelect: (image: FolderImage) => void;
  handleGradientSelect: (key: GradientKey) => void;
  handleCustomGradientSelect: (gradient: CustomGradient) => void;
  saveCustomGradient: (gradient: CustomGradient) => void;
  deleteCustomGradient: (id: string) => void;
  
  // Анимированный фон
  updateAnimatedSettings: (settings: AnimatedBackground) => void;
  
  // Часы
  updateClockSetting: <K extends keyof ClockSettings>(
    key: K,
    value: ClockSettings[K]
  ) => void;
  
  // Слайд-шоу
  updateSlideshowSetting: <K extends keyof SlideshowSettings>(
    key: K,
    value: SlideshowSettings[K]
  ) => void;
  startSlideshow: () => void;
  stopSlideshow: () => void;
  
  // Системный монитор
  setShowSystemMonitor: (show: boolean) => void;
  setMonitorSize: (size: 'small' | 'medium' | 'large') => void;
}

// Пропсы для компонентов
export interface SettingsPanelProps {
  isOpen: boolean;
  activeTab: TabType;
  onClose: () => void;
  onTabChange: (tab: TabType) => void;
}

export interface TopBarProps {
  onSettingsClick: () => void;
  onFullscreenClick: () => void;
  isFullscreen: boolean;
}