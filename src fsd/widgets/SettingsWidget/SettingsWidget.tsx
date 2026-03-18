// src/widgets/SettingsWidget/SettingsWidget.tsx
import React from 'react';
import { SettingsPanel } from '@/features/settings/ui/SettingsPanel';
import { useSettingsContext } from '@/app/providers/SettingsProvider';
import { useClock } from '@/features/clock/model/useClock';
import type { TabType } from '@/features/settings/model/types';
import styles from './SettingsWidget.module.css';

interface SettingsWidgetProps {
  isOpen: boolean;
  activeTab: TabType;
  onClose: () => void;
  onTabChange: (tab: TabType) => void;
  className?: string;
}

export const SettingsWidget: React.FC<SettingsWidgetProps> = ({
  isOpen,
  activeTab,
  onClose,
  onTabChange,
  className = '',
}) => {
  // Получаем все необходимые данные из контекста
  const context = useSettingsContext();
  
  // Проверяем, что контекст загружен
  if (!context) {
    return null;
  }

  const {
    // Background
    backgroundType,
    backgroundValue,
    folderImages,
    folderPath,
    customGradients,
    
    // Actions
    handleFolderSelect,
    handleImageSelect,
    handleGradientSelect,
    handleCustomGradientSelect,
    saveCustomGradient,
    deleteCustomGradient,
    
    // Animated
    animatedSettings,
    updateAnimatedSettings,
    handleAnimatedSelect,
    
    // Clock
    clockSettings,
    updateClockSettings,
    
    // Slideshow
    slideshow,
    
    // System monitor
    showSystemMonitor,
    monitorSize,
    setShowSystemMonitor,
    setMonitorSize,
  } = context;

  // Получаем данные из часов
  const clock = useClock();

  // Формируем пропсы для вкладок с проверкой на undefined
  const backgroundProps = {
    backgroundType,
    backgroundValue,
    folderImages: folderImages || [],
    folderPath: folderPath || '',
    customGradients: customGradients || [],
    onGradientSelect: handleGradientSelect,
    onCustomGradientSelect: handleCustomGradientSelect,
    onFolderSelect: handleFolderSelect,
    onImageSelect: handleImageSelect,
    onSaveCustomGradient: saveCustomGradient,
    onDeleteCustomGradient: deleteCustomGradient,
  };

  const animatedProps = {
    settings: animatedSettings,
    onSettingsChange: updateAnimatedSettings,
    onSelect: handleAnimatedSelect,
  };

  const clockProps = {
    settings: clockSettings || {
      size: '6',
      color: '#00ffff',
      glowIntensity: '40',
      borderOpacity: '0.3',
      fontFamily: 'Orbitron',
    },
    onSettingChange: updateClockSettings,
  };

  // Безопасное получение значений слайд-шоу
  const slideshowSettings = slideshow || {
    interval: '5',
    effect: 'fade',
    randomEffect: false,
    randomInterval: false,
    randomIntervalRange: '5,30',
    shuffleImages: false,
    isActive: false,
  };


// src/widgets/SettingsWidget/SettingsWidget.tsx
// Полностью исправленный slideshowProps

const slideshowProps = {
  settings: {
    interval: slideshowSettings?.interval || '5',
    effect: slideshowSettings?.effect || 'fade',
    randomEffect: slideshowSettings?.randomEffect || false,
    randomInterval: slideshowSettings?.randomInterval || false,
    randomIntervalRange: slideshowSettings?.randomIntervalRange || '5,30',
    shuffleImages: slideshowSettings?.shuffleImages || false,
  },
  isActive: slideshowSettings?.isActive || false,
  imagesCount: folderImages?.length || 0,
  
  // ИСПРАВЛЕНО: Правильная сигнатура
  onSettingChange: (key: string, value: any) => {
    console.log(`🎛️ SettingsWidget: changing ${key} to`, value);
    
    // Проверяем наличие функции
    if (slideshow?.updateSlideshowSettings) {
      // Создаем объект с одним ключом
      const update = { [key]: value };
      slideshow.updateSlideshowSettings(update);
    } else {
      console.error('❌ updateSlideshowSettings is not available!');
      // Fallback: пробуем напрямую через context
      if (context?.updateSlideshowSetting) {
        context.updateSlideshowSetting(key as any, value);
      }
    }
  },
  
  onStart: () => {
    console.log('▶️ Starting slideshow');
    if (slideshow?.startSlideshow) {
      slideshow.startSlideshow();
    } else {
      console.error('❌ startSlideshow is not available!');
    }
  },
  
  onStop: () => {
    console.log('⏹️ Stopping slideshow');
    if (slideshow?.stopSlideshow) {
      slideshow.stopSlideshow();
    } else {
      console.error('❌ stopSlideshow is not available!');
    }
  },
};

  const systemProps = {
    showSystemMonitor: showSystemMonitor || false,
    monitorSize: monitorSize || 'medium',
    onShowSystemMonitorChange: setShowSystemMonitor,
    onMonitorSizeChange: setMonitorSize,
  };

  return (
    <div className={`${styles.widget} ${className}`}>
      <SettingsPanel
        isOpen={isOpen}
        activeTab={activeTab}
        onClose={onClose}
        onTabChange={onTabChange}
        backgroundProps={backgroundProps}
        animatedProps={animatedProps}
        clockProps={clockProps}
        slideshowProps={slideshowProps}
        systemProps={systemProps}
      />
    </div>
  );
};