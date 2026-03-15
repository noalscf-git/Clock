// src/App.tsx - обновленная версия с раздельным хранением
import React, { useRef, useState, useEffect } from 'react';
import { ClockDisplay } from './components/Clock/ClockDisplay';
import { TopBar } from './components/UI/TopBar';
import { FullscreenHint } from './components/UI/FullscreenHint';
import { SettingsPanel } from './components/Settings/SettingsPanel';
import { useFullscreen } from './hooks/useFullscreen';
import { useClock } from './hooks/useClock';
import { useSlideshow } from './hooks/useSlideshow';
import { useLocalStorage } from './hooks/useLocalStorage';
import { GRADIENTS } from './utils/constants';
import type { FolderImage, GradientKey } from './types';
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
  
  // Background state - храним только тип и ключ/id
  const [backgroundType, setBackgroundType] = useLocalStorage<'gradient' | 'folder'>('backgroundType', 'gradient');
  const [backgroundValue, setBackgroundValue] = useLocalStorage<string>('backgroundValue', 'gradient1');
  
  // Folder images - храним сами изображения только в памяти, в localStorage только метаданные
  const [folderImages, setFolderImages] = useState<FolderImage[]>([]);
  const [folderPath, setFolderPath] = useState('');

  // Текущий фон для отображения
  const [currentBackground, setCurrentBackground] = useState<string>(() => {
    if (backgroundType === 'gradient') {
      return GRADIENTS[backgroundValue as GradientKey];
    }
    return '';
  });

  // Загрузка сохраненных метаданных изображений
  useEffect(() => {
    const savedMetadata = localStorage.getItem('folderImages');
    if (savedMetadata) {
      try {
        const metadata = JSON.parse(savedMetadata);
        // Создаем заглушки для изображений, данные загрузим позже
        setFolderImages(metadata.map((item: any) => ({
          id: item.id,
          name: item.name,
          path: item.path,
          data: '' // Пустые данные, будут загружены при выборе папки
        })));
      } catch (e) {
        console.error('Ошибка загрузки метаданных изображений');
      }
    }
  }, []);

  // Обновление текущего фона при изменении типа или значения
  useEffect(() => {
    if (backgroundType === 'gradient') {
      setCurrentBackground(GRADIENTS[backgroundValue as GradientKey]);
    } else if (backgroundType === 'folder' && folderImages.length > 0) {
      const image = folderImages.find(img => img.id.toString() === backgroundValue);
      if (image?.data) {
        setCurrentBackground(image.data);
      }
    }
  }, [backgroundType, backgroundValue, folderImages]);

  // Slideshow
  const slideshow = useSlideshow(
    folderImages.filter(img => img.data), // Только изображения с загруженными данными
    (imageData: string) => {
      const image = folderImages.find(img => img.data === imageData);
      if (image) {
        setBackgroundType('folder');
        setBackgroundValue(image.id.toString());
      }
    }
  );

  // Handle folder selection
  const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(file => 
      file.type.startsWith('image/')
    );

    if (files.length > 0) {
      const path = files[0].webkitRelativePath.split('/')[0];
      setFolderPath(path || 'Выбрана папка с изображениями');

      const newImages: FolderImage[] = [];
      let loadedCount = 0;

      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push({
            id: index,
            data: e.target?.result as string,
            name: file.name,
            path: file.webkitRelativePath
          });

          loadedCount++;
          if (loadedCount === files.length) {
            setFolderImages(newImages);
            
            // Сохраняем только метаданные
            const metadata = newImages.map(img => ({
              id: img.id,
              name: img.name,
              path: img.path
            }));
            localStorage.setItem('folderImages', JSON.stringify(metadata));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Select gradient
  const handleGradientSelect = (gradient: GradientKey) => {
    setBackgroundType('gradient');
    setBackgroundValue(gradient);
    slideshow.stopSlideshow();
  };

  // Select folder image
  const handleImageSelect = (image: FolderImage) => {
    setBackgroundType('folder');
    setBackgroundValue(image.id.toString());
    slideshow.stopSlideshow();
  };

  // Get background style
  const getBackgroundStyle = (): React.CSSProperties => {
    if (backgroundType === 'gradient') {
      return { 
        backgroundImage: currentBackground,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    } else if (backgroundType === 'folder' && currentBackground) {
      return { 
        backgroundImage: `url('${currentBackground}')`,
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