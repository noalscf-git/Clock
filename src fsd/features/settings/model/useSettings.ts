// src/features/settings/model/useSettings.ts
import { useState, useCallback } from 'react';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { useImageStorage } from '@/entities/image/model/useImageStorage';
import { useGradientEditor } from '@/entities/gradient/model/useGradientEditor';
import { useAnimatedBackground } from '@/entities/animated/model/useAnimatedBackground';
import { useBackground } from '@/features/background/model/useBackground'; // Импортируем useBackground
import { DEFAULT_CLOCK_SETTINGS } from '@/features/clock/config/constants';
import { DEFAULT_SLIDESHOW_SETTINGS } from '../config/constants';
import type { 
  SettingsState, 
  SettingsActions,
  TabType,
  GradientKey,
  BackgroundType,
  CustomGradient,
  MonitorSize,
} from './types';

export const useSettings = (): SettingsState & SettingsActions => {
  // UI состояние
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('background');

  // Фон - используем хук useBackground
  const background = useBackground();
  
  const [backgroundType, setBackgroundType] = useLocalStorage<BackgroundType>(
    'backgroundType',
    'gradient'
  );
  const [backgroundValue, setBackgroundValue] = useLocalStorage<string>(
    'backgroundValue',
    'gradient1'
  );

  // Изображения
  const {
    folderImages,
    folderPath,
    isLoading,
    loadingProgress,
    handleFolderSelect,
  } = useImageStorage();

  // Градиенты
  const {
    customGradients,
    saveGradient,
    deleteGradient,
  } = useGradientEditor();

  // Анимированный фон
  const {
    settings: animatedSettings,
    updateSettings: updateAnimatedSettings,
  } = useAnimatedBackground();

  // Часы
  const [clockSettings, setClockSettings] = useLocalStorage(
    'clockSettings',
    DEFAULT_CLOCK_SETTINGS
  );

  // Слайд-шоу
  const [slideshowSettings, setSlideshowSettings] = useLocalStorage(
    'slideshowSettings',
    {
      interval: '5',
      effect: 'fade',
      randomEffect: false,
      randomInterval: false,
      randomIntervalRange: '5,30',
      shuffleImages: false,
      isActive: false,
    }
  );

  // Системный монитор
  const [showSystemMonitor, setShowSystemMonitor] = useLocalStorage(
    'showSystemMonitor',
    false
  );
  const [monitorSize, setMonitorSize] = useLocalStorage<MonitorSize>(
    'monitorSize',
    'medium'
  );

  // Действия с UI
  const openSettings = useCallback(() => setIsOpen(true), []);
  const closeSettings = useCallback(() => setIsOpen(false), []);

  // Действия с фоном
  const handleGradientSelect = useCallback((key: GradientKey) => {
    setBackgroundType('gradient');
    setBackgroundValue(key);
    // Устанавливаем соответствующий градиент как текущий фон
    const gradientValue = getGradientValue(key);
    background.setCurrentBackground(gradientValue);
  }, [setBackgroundType, setBackgroundValue, background]);

  const handleCustomGradientSelect = useCallback((gradient: CustomGradient) => {
    setBackgroundType('custom');
    setBackgroundValue(gradient.id);
    // Устанавливаем кастомный градиент как текущий фон
    if (gradient.style) {
      background.setCurrentBackground(gradient.style);
    }
  }, [setBackgroundType, setBackgroundValue, background]);

  const handleImageSelect = useCallback((image: any) => {
    console.log('handleImageSelect called with:', image);
    if (image?.data) {
      setBackgroundType('folder');
      setBackgroundValue(image.id.toString());
      // Устанавливаем изображение как текущий фон
      background.setCurrentBackground(image.data);
    }
  }, [setBackgroundType, setBackgroundValue, background]);

  const handleAnimatedSelect = useCallback(() => {
    setBackgroundType('animated');
  }, [setBackgroundType]);

  const handleSaveCustomGradient = useCallback((gradient: CustomGradient) => {
    const saved = saveGradient(gradient);
    if (saved) {
      handleCustomGradientSelect(saved);
    }
  }, [saveGradient, handleCustomGradientSelect]);

  // Вспомогательная функция для получения значения градиента
  const getGradientValue = (key: GradientKey): string => {
    const gradients = {
      gradient1: 'linear-gradient(135deg, #0b0b1f, #1a1a2f)',
      gradient2: 'linear-gradient(135deg, #1e3c72, #2a5298)',
      gradient3: 'linear-gradient(135deg, #23074d, #cc5333)',
      gradient4: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      gradient5: 'linear-gradient(135deg, #20002c, #cbb4d4)',
      gradient6: 'linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)',
    };
    return gradients[key] || gradients.gradient1;
  };

  // Действия с часами
  const updateClockSetting = useCallback(<K extends keyof typeof clockSettings>(
    key: K,
    value: typeof clockSettings[K]
  ) => {
    setClockSettings((prev: typeof clockSettings) => ({
      ...prev,
      [key]: value,
    }));
  }, [setClockSettings]);

  // Действия со слайд-шоу
  const updateSlideshowSetting = useCallback(<K extends keyof typeof slideshowSettings>(
    key: K,
    value: typeof slideshowSettings[K]
  ) => {
    setSlideshowSettings((prev: typeof slideshowSettings) => ({
      ...prev,
      [key]: value,
    }));
  }, [setSlideshowSettings]);

  const startSlideshow = useCallback(() => {
    setSlideshowSettings((prev: typeof slideshowSettings) => ({
      ...prev,
      isActive: true,
    }));
  }, [setSlideshowSettings]);

  const stopSlideshow = useCallback(() => {
    setSlideshowSettings((prev: typeof slideshowSettings) => ({
      ...prev,
      isActive: false,
    }));
  }, [setSlideshowSettings]);

  return {
    // Состояние
    isOpen,
    activeTab,
    backgroundType,
    backgroundValue,
    customGradients,
    folderImages,
    folderPath,
    isLoading,
    loadingProgress,
    animatedSettings,
    clockSettings,
    slideshowSettings,
    showSystemMonitor,
    monitorSize,

    // Действия
    openSettings,
    closeSettings,
    setActiveTab,
    setBackgroundType,
    setBackgroundValue,
    handleFolderSelect,
    handleImageSelect,
    handleGradientSelect,
    handleCustomGradientSelect,
    handleAnimatedSelect,
    saveCustomGradient: handleSaveCustomGradient,
    deleteCustomGradient: deleteGradient,
    updateAnimatedSettings,
    updateClockSetting,
    updateSlideshowSetting,
    startSlideshow,
    stopSlideshow,
    setShowSystemMonitor,
    setMonitorSize,
    
    // Добавляем currentBackground из хука background
    currentBackground: background.currentBackground,
    nextBackground: background.nextBackground,
    isTransitioning: background.isTransitioning,
    transitionEffect: background.transitionEffect,
    setCurrentBackground: background.setCurrentBackground,
    startTransition: background.startTransition,
  };
};