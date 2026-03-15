// src/components/Settings/SettingsPanel.tsx - обновляем интерфейс
import React from 'react';
import { TabButton } from '../common/TabButton';
import { BackgroundTab } from './BackgroundTab';
import { ClockTab } from './ClockTab';
import { SlideshowTab } from './SlideshowTab';
import type { FolderImage, GradientKey, CustomGradient } from '../../types';
import styles from './SettingsPanel.module.css';

interface SettingsPanelProps {
  isOpen: boolean;
  activeTab: string;
  onClose: () => void;
  onTabChange: (tab: string) => void;
  
  // Background props
  backgroundType: 'gradient' | 'folder' | 'custom';
  currentBackground: string;
  folderImages: FolderImage[];
  folderPath: string;
  onGradientSelect: (gradient: GradientKey) => void;
  onCustomGradientSelect: (gradient: CustomGradient) => void; // Добавляем этот проп
  onFolderSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageSelect: (image: FolderImage) => void;
  
  // Clock props
  clockSize: string;
  clockColor: string;
  glowIntensity: string;
  borderOpacity: string;
  fontFamily: string;
  onClockSizeChange: (size: string) => void;
  onClockColorChange: (color: string) => void;
  onGlowIntensityChange: (intensity: string) => void;
  onBorderOpacityChange: (opacity: string) => void;
  onFontFamilyChange: (font: string) => void;
  
  // Slideshow props
  slideshowActive: boolean;
  slideshowEffect: string;
  slideshowInterval: string;
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
  onStartSlideshow: () => void;
  onStopSlideshow: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  activeTab,
  onClose,
  onTabChange,
  ...props
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.settingsPanel}>
      <div className={styles.settingsHeader}>
        <h3>Настройки</h3>
        <button className={styles.closeSettings} onClick={onClose}>✕</button>
      </div>
      
      <div className={styles.settingsContent}>
        <div className={styles.settingsTabs}>
          <TabButton
            label="Фон"
            icon="🖼️"
            isActive={activeTab === 'background'}
            onClick={() => onTabChange('background')}
          />
          <TabButton
            label="Часы"
            icon="⏰"
            isActive={activeTab === 'clock'}
            onClick={() => onTabChange('clock')}
          />
          <TabButton
            label="Слайд-шоу"
            icon="📸"
            isActive={activeTab === 'slideshow'}
            onClick={() => onTabChange('slideshow')}
          />
        </div>
        
        {activeTab === 'background' && (
          <BackgroundTab
            backgroundType={props.backgroundType}
            currentBackground={props.currentBackground}
            folderImages={props.folderImages}
            folderPath={props.folderPath}
            onGradientSelect={props.onGradientSelect}
            onCustomGradientSelect={props.onCustomGradientSelect} // Передаем проп дальше
            onFolderSelect={props.onFolderSelect}
            onImageSelect={props.onImageSelect}
          />
        )}
        
        {activeTab === 'clock' && (
          <ClockTab
            clockSize={props.clockSize}
            clockColor={props.clockColor}
            glowIntensity={props.glowIntensity}
            borderOpacity={props.borderOpacity}
            fontFamily={props.fontFamily}
            onClockSizeChange={props.onClockSizeChange}
            onClockColorChange={props.onClockColorChange}
            onGlowIntensityChange={props.onGlowIntensityChange}
            onBorderOpacityChange={props.onBorderOpacityChange}
            onFontFamilyChange={props.onFontFamilyChange}
          />
        )}
        
        {activeTab === 'slideshow' && (
          <SlideshowTab
            isActive={props.slideshowActive}
            effect={props.slideshowEffect}
            interval={props.slideshowInterval}
            randomEffect={props.randomEffect}
            randomInterval={props.randomInterval}
            randomIntervalRange={props.randomIntervalRange}
            shuffleImages={props.shuffleImages}
            onEffectChange={props.onEffectChange}
            onIntervalChange={props.onIntervalChange}
            onRandomEffectChange={props.onRandomEffectChange}
            onRandomIntervalChange={props.onRandomIntervalChange}
            onRandomIntervalRangeChange={props.onRandomIntervalRangeChange}
            onShuffleImagesChange={props.onShuffleImagesChange}
            onStartSlideshow={props.onStartSlideshow}
            onStopSlideshow={props.onStopSlideshow}
          />
        )}
      </div>
    </div>
  );
};