// src/App.tsx - исправленная версия с двойным буфером фона

import React, { useRef, useState, useEffect } from 'react';
import { ClockDisplay } from './components/Clock/ClockDisplay';
import { TopBar } from './components/UI/TopBar';
import { FullscreenHint } from './components/UI/FullscreenHint';
import { SettingsPanel } from './components/Settings/SettingsPanel';
import { AnimatedBackground } from './components/Backgrounds/AnimatedBackground';
import { useFullscreen } from './hooks/useFullscreen';
import { useClock } from './hooks/useClock';
import { useSlideshow } from './hooks/useSlideshow';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useGradientEditor } from './hooks/useGradientEditor';
import { useImageStorage } from './hooks/useImageStorage';
import { useAnimatedBackground } from './hooks/useAnimatedBackground';
import { GRADIENTS } from './utils/constants';
import type { GradientKey, CustomGradient } from './types';
import styles from './App.module.css';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const { isFullscreen, showHint, toggleFullscreen } = useFullscreen(containerRef);
  
  // Clock state
  const clock = useClock();
  
  // Settings UI state
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('background');
  
  // Background state
  const [backgroundType, setBackgroundType] = useLocalStorage<'gradient' | 'folder' | 'custom' | 'animated'>(
    'backgroundType', 
    'gradient'
  );
  const [backgroundValue, setBackgroundValue] = useLocalStorage<string>('backgroundValue', 'gradient1');
  
  // Для двойного буфера анимации
  const [currentBackground, setCurrentBackground] = useState<string>(() => {
    if (backgroundType === 'gradient') {
      return GRADIENTS[backgroundValue as GradientKey];
    } else if (backgroundType === 'custom') {
      // Будет установлено позже через эффект
      return GRADIENTS.gradient1;
    }
    return GRADIENTS.gradient1;
  });
  
  const [nextBackground, setNextBackground] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionEffect, setTransitionEffect] = useState('');
  
  // Custom gradients
  const { customGradients, getGradientStyle } = useGradientEditor();
  
  // Animated backgrounds
  const animatedBg = useAnimatedBackground();
  
  // Image storage with IndexedDB
  const { 
    folderImages, 
    folderPath, 
    isLoading, 
    loadingProgress,
    handleFolderSelect,
  } = useImageStorage();

  // Slideshow
  const slideshow = useSlideshow(
    folderImages.filter(img => img.data),
    (imageData: string, effect?: string) => {
      // Эта функция вызывается при смене изображения в слайд-шоу
      if (effect) {
        startTransition(imageData, effect);
      } else {
        // Прямая смена без анимации
        setBackgroundType('folder');
        setBackgroundValue(getImageIdByData(imageData).toString());
        setCurrentBackground(imageData);
      }
    }
  );

  // Вспомогательная функция для получения ID изображения по data URL
  const getImageIdByData = (data: string): number => {
    const image = folderImages.find(img => img.data === data);
    return image?.id || 0;
  };

  // Функция запуска анимации перехода
  const startTransition = (newBackground: string, effect: string) => {
    setNextBackground(newBackground);
    setTransitionEffect(effect);
    setIsTransitioning(true);
    
    // Через 500ms (длительность анимации) завершаем переход
    setTimeout(() => {
      setCurrentBackground(newBackground);
      setNextBackground(null);
      setIsTransitioning(false);
      setTransitionEffect('');
      
      // Обновляем backgroundValue если это изображение из папки
      const image = folderImages.find(img => img.data === newBackground);
      if (image) {
        setBackgroundType('folder');
        setBackgroundValue(image.id.toString());
      }
    }, 500);
  };

  // Обновление текущего фона при изменении настроек
  useEffect(() => {
    if (backgroundType === 'gradient') {
      setCurrentBackground(GRADIENTS[backgroundValue as GradientKey]);
    } else if (backgroundType === 'custom') {
      const gradient = customGradients.find(g => g.id === backgroundValue);
      if (gradient) {
        setCurrentBackground(getGradientStyle(gradient));
      }
    } else if (backgroundType === 'folder') {
      const image = folderImages.find(img => img.id.toString() === backgroundValue);
      if (image?.data) {
        setCurrentBackground(image.data);
      } else if (folderImages.length > 0 && !backgroundValue) {
        setBackgroundValue(folderImages[0].id.toString());
        setCurrentBackground(folderImages[0].data);
      }
    }
  }, [backgroundType, backgroundValue, folderImages, customGradients, getGradientStyle]);

  // Select gradient
  const handleGradientSelect = (gradient: GradientKey) => {
    setBackgroundType('gradient');
    setBackgroundValue(gradient);
    setCurrentBackground(GRADIENTS[gradient]);
    slideshow.stopSlideshow();
  };

  const handleAnimatedSelect = () => {
    setBackgroundType('animated');
  };

  // Select custom gradient
  const handleCustomGradientSelect = (gradient: CustomGradient) => {
    setBackgroundType('custom');
    setBackgroundValue(gradient.id);
    setCurrentBackground(getGradientStyle(gradient));
    slideshow.stopSlideshow();
  };

  // Select folder image
  const handleImageSelect = (image: FolderImage) => {
    if (image?.data) {
      setBackgroundType('folder');
      setBackgroundValue(image.id.toString());
      setCurrentBackground(image.data);
      slideshow.stopSlideshow();
    }
  };

  // Get background style for non-animated backgrounds
  const getBackgroundStyle = (background: string): React.CSSProperties => {
    return { 
      backgroundImage: `url('${background}')`,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
  };

  // Проверка, является ли фон градиентом
  const isGradient = (bg: string): boolean => {
    return bg.startsWith('linear-gradient') || bg.startsWith('radial-gradient');
  };

  return (
    <div ref={appRef} className={styles.app}>
      {/* Анимированный фон поверх обычного, но под контентом */}
      {backgroundType === 'animated' && (
        <AnimatedBackground settings={animatedBg.settings} />
      )}

      {/* Слой текущего фона */}
      <div 
        className={`${styles.backgroundLayer} ${isTransitioning && !nextBackground ? styles.hidden : ''}`}
        style={
          backgroundType === 'gradient' || backgroundType === 'custom'
            ? { background: currentBackground }
            : getBackgroundStyle(currentBackground)
        }
      />

      {/* Слой следующего фона для анимации перехода */}
      {nextBackground && (
        <div 
          className={`${styles.backgroundLayer} ${styles[`${transitionEffect}Transition`]}`}
          style={
            isGradient(nextBackground)
              ? { background: nextBackground }
              : getBackgroundStyle(nextBackground)
          }
        />
      )}

      {(isLoading || slideshow.isRestoring) && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingContent}>
            <div className={styles.loadingSpinner}></div>
            <div className={styles.loadingText}>
              {isLoading 
                ? `Загрузка изображений... ${loadingProgress}%` 
                : 'Восстановление слайд-шоу...'}
            </div>
            {isLoading && (
              <div className={styles.loadingBar}>
                <div 
                  className={styles.loadingProgress} 
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div className={styles.container} ref={containerRef}>
        <TopBar 
          onSettingsClick={() => setShowSettings(true)}
          onFullscreenClick={toggleFullscreen}
          isFullscreen={isFullscreen}
        />

        <SettingsPanel
          isOpen={showSettings}
          activeTab={activeTab}
          onClose={() => setShowSettings(false)}
          onTabChange={setActiveTab}
          
          // Background props
          backgroundType={backgroundType}
          currentBackground={backgroundType === 'gradient' ? backgroundValue : currentBackground}
          folderImages={folderImages}
          folderPath={folderPath}
          onGradientSelect={handleGradientSelect}
          onCustomGradientSelect={handleCustomGradientSelect}
          onFolderSelect={handleFolderSelect}
          onImageSelect={handleImageSelect}
          
          // Animated background props
          animatedSettings={animatedBg.settings}
          onAnimatedSettingsChange={animatedBg.updateSettings}
          onAnimatedSelect={handleAnimatedSelect}
          
          // Clock props
          clockSize={clock.clockSize}
          clockColor={clock.clockColor}
          glowIntensity={clock.glowIntensity}
          borderOpacity={clock.borderOpacity}
          fontFamily={clock.fontFamily}
          onClockSizeChange={clock.setClockSize}
          onClockColorChange={clock.setClockColor}
          onGlowIntensityChange={clock.setGlowIntensity}
          onBorderOpacityChange={clock.setBorderOpacity}
          onFontFamilyChange={clock.setFontFamily}
          
          // Slideshow props
          slideshowActive={slideshow.isActive}
          slideshowEffect={slideshow.effect}
          slideshowInterval={slideshow.interval}
          randomEffect={slideshow.randomEffect}
          randomInterval={slideshow.randomInterval}
          randomIntervalRange={slideshow.randomIntervalRange}
          shuffleImages={slideshow.shuffleImages}
          onEffectChange={slideshow.setEffect}
          onIntervalChange={slideshow.setInterval}
          onRandomEffectChange={slideshow.setRandomEffect}
          onRandomIntervalChange={slideshow.setRandomInterval}
          onRandomIntervalRangeChange={slideshow.setRandomIntervalRange}
          onShuffleImagesChange={slideshow.setShuffleImages}
          onStartSlideshow={slideshow.startSlideshow}
          onStopSlideshow={slideshow.stopSlideshow}
        />

        <ClockDisplay
          time={clock.time}
          clockStyle={clock.clockStyle}
          dateStyle={clock.dateStyle}
          wrapperStyle={clock.wrapperStyle}
        />
      </div>
      
      <FullscreenHint show={showHint} />
    </div>
  );
}

export default App;