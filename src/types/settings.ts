import { BackgroundType, GradientKey, CustomGradient, FolderImage, AnimatedBackground } from './background';
import { ClockSettings } from './clock';
import { SlideshowState } from './slideshow';
import { SystemSettings } from './system';

export interface SettingsPanelProps {
  isOpen: boolean;
  activeTab: string;
  onClose: () => void;
  onTabChange: (tab: string) => void;
  background: BackgroundSettingsProps;
  clock: ClockSettingsProps;
  slideshow: SlideshowSettingsProps;
  system: SystemSettingsProps;
  animated?: AnimatedSettingsProps;
}

export interface BackgroundSettingsProps {
  type: BackgroundType;
  currentValue: string;
  folderImages: FolderImage[];
  folderPath: string;
  onGradientSelect: (gradient: GradientKey) => void;
  onCustomGradientSelect: (gradient: CustomGradient) => void;
  onFolderSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageSelect: (image: FolderImage) => void;
}

export interface ClockSettingsProps {
  size: string;
  color: string;
  glowIntensity: string;
  borderOpacity: string;
  fontFamily: string;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
  onGlowIntensityChange: (intensity: string) => void;
  onBorderOpacityChange: (opacity: string) => void;
  onFontFamilyChange: (font: string) => void;
}

export interface SlideshowSettingsProps {
  isActive: boolean;
  effect: string;
  interval: string;
  randomEffect: boolean;
  randomInterval: boolean;
  randomIntervalRange: string;
  shuffleImages: boolean;
  onEffectChange: (effect: string) => void;
  onIntervalChange: (interval: string) => void;
  onRandomEffectChange: (checked: boolean) => void;
  onRandomIntervalChange: (checked: boolean) => void;
  onRandomIntervalRangeChange: (range: string) => void;
  onShuffleImagesChange: (checked: boolean) => void;
  onStart: () => void;
  onStop: () => void;
}

export interface SystemSettingsProps {
  showMonitor: boolean;
  monitorSize: 'small' | 'medium' | 'large';
  onShowMonitorChange: (show: boolean) => void;
  onMonitorSizeChange: (size: 'small' | 'medium' | 'large') => void;
}

export interface AnimatedSettingsProps {
  settings: AnimatedBackground;
  onSettingsChange: (settings: AnimatedBackground) => void;
  onSelect: () => void;
}

export interface TabConfig {
  id: string;
  label: string;
  icon: string;
}