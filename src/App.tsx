// src/App.tsx - обновляем для отображения состояния восстановления
import React, { useRef, useState, useEffect } from 'react';
import { ClockDisplay } from './components/Clock/ClockDisplay';
import { TopBar } from './components/UI/TopBar';
import { FullscreenHint } from './components/UI/FullscreenHint';
import { SettingsPanel } from './components/Settings/SettingsPanel';
import { useFullscreen } from './hooks/useFullscreen';
import { useClock } from './hooks/useClock';
import { useSlideshow } from './hooks/useSlideshow';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useGradientEditor } from './hooks/useGradientEditor';
import { useImageStorage } from './hooks/useImageStorage';
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
  const [backgroundType, setBackgroundType] = useLocalStorage<'gradient' | 'folder' | 'custom'>('backgroundType', 'gradient');
  const [backgroundValue, setBackgroundValue] = useLocalStorage<string>('backgroundValue', 'gradient1');
  
  // Custom gradients
  const { customGradients, getGradientStyle } = useGradientEditor();
  
  // Image storage with IndexedDB
  const { 
    folderImages, 
    folderPath, 
    isLoading, 
    loadingProgress,
    handleFolderSelect,
    clearFolderImages 
  } = useImageStorage();

  // Slideshow
  const slideshow = useSlideshow(
    folderImages.filter(img => img.data),
    (imageData: string) => {
      const image = folderImages.find(img => img.data === imageData);
      if (image) {
        setBackgroundType('folder');
        setBackgroundValue(image.id.toString());
      }
    }
  );

  // Текущий фон для отображения
  const [currentBackground, setCurrentBackground] = useState<string>(() => {
    if (backgroundType === 'gradient') {
      return GRADIENTS[backgroundValue as GradientKey];
    } else if (backgroundType === 'custom') {
      const gradient = customGradients.find(g => g.id === backgroundValue);
      return gradient ? getGradientStyle(gradient) : GRADIENTS.gradient1;
    }
    return GRADIENTS.gradient1;
  });

  // Обновление текущего фона при изменении типа или значения
  useEffect(() => {
    if (backgroundType === 'gradient') {
      setCurrentBackground(GRADIENTS[backgroundValue as GradientKey]);
    } else if (backgroundType === 'custom') {
      const gradient = customGradients.find(g => g.id === backgroundValue);
      setCurrentBackground(gradient ? getGradientStyle(gradient) : GRADIENTS.gradient1);
    } else if (backgroundType === 'folder') {
      const image = folderImages.find(img => img.id.toString() === backgroundValue);
      if (image?.data) {
        setCurrentBackground(image.data);
      } else if (folderImages.length > 0 && !backgroundValue) {
        // Если есть изображения, но не выбрано, выбираем первое
        setBackgroundValue(folderImages[0].id.toString());
        setCurrentBackground(folderImages[0].data);
      }
    }
  }, [backgroundType, backgroundValue, folderImages, customGradients, getGradientStyle]);

  // Select gradient
  const handleGradientSelect = (gradient: GradientKey) => {
    setBackgroundType('gradient');
    setBackgroundValue(gradient);
    slideshow.stopSlideshow();
  };

  // Select custom gradient
  const handleCustomGradientSelect = (gradient: CustomGradient) => {
    setBackgroundType('custom');
    setBackgroundValue(gradient.id);
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

  // Get background style
  const getBackgroundStyle = (): React.CSSProperties => {
    if (backgroundType === 'folder' && currentBackground) {
      return { 
        backgroundImage: `url('${currentBackground}')`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    } else if (currentBackground) {
      return { 
        backgroundImage: currentBackground,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    
    return { 
      backgroundImage: GRADIENTS.gradient1,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
  };

  return (
    <div 
      ref={appRef}
      className={`${styles.app} ${slideshow.effectClass}`} 
      style={getBackgroundStyle()}
    >
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