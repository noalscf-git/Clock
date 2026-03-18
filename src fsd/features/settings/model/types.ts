// src/features/settings/model/types.ts
import type { 
  BackgroundType,
  FolderImage,
  GradientKey,
  CustomGradient,
  AnimatedBackground,
  ClockSettings,
  SlideshowSettings,
} from '@/shared/types';

export type TabType = 'background' | 'animated' | 'clock' | 'slideshow' | 'system';

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
  
      // Добавляем поля для фона
  currentBackground: string;
  nextBackground: string | null;
  isTransitioning: boolean;
  transitionEffect: string;
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

    // Добавляем действия для фона
  setCurrentBackground: (bg: string) => void;
  startTransition: (newBg: string, effect: string) => void;
}

// Пропсы для вкладок
export interface BackgroundTabProps {
  backgroundType: BackgroundType;
  backgroundValue: string;
  folderImages: FolderImage[];
  folderPath: string;
  customGradients: CustomGradient[];
  onGradientSelect: (key: GradientKey) => void;
  onCustomGradientSelect: (gradient: CustomGradient) => void;
  onFolderSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageSelect: (image: FolderImage) => void;
  onSaveCustomGradient: (gradient: CustomGradient) => void;
  onDeleteCustomGradient: (id: string) => void;
}

export interface AnimatedTabProps {
  settings: AnimatedBackground;
  onSettingsChange: (settings: AnimatedBackground) => void;
  onSelect: () => void;
}

export interface ClockTabProps {
  settings: ClockSettings;
  onSettingChange: <K extends keyof ClockSettings>(
    key: K,
    value: ClockSettings[K]
  ) => void;
}

export interface SlideshowTabProps {
  settings: SlideshowSettings;
  isActive: boolean;
  imagesCount: number;
  onSettingChange: <K extends keyof SlideshowSettings>(
    key: K,
    value: SlideshowSettings[K]
  ) => void;
  onStart: () => void;
  onStop: () => void;
}

export interface SystemTabProps {
  showSystemMonitor: boolean;
  monitorSize: 'small' | 'medium' | 'large';
  onShowSystemMonitorChange: (show: boolean) => void;
  onMonitorSizeChange: (size: 'small' | 'medium' | 'large') => void;
}

export interface SettingsPanelProps {
  isOpen: boolean;
  activeTab: TabType;
  onClose: () => void;
  onTabChange: (tab: TabType) => void;
  backgroundProps: BackgroundTabProps;
  animatedProps: AnimatedTabProps;
  clockProps: ClockTabProps;
  slideshowProps: SlideshowTabProps;
  systemProps: SystemTabProps;
}

export interface TopBarProps {
  onSettingsClick: () => void;
  onFullscreenClick: () => void;
  isFullscreen: boolean;
}