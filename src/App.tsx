// src/App.tsx - исправляем выбор изображения
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
import { GRADIENTS } from './utils/constants';
import type { FolderImage, GradientKey, CustomGradient } from './types';
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
  
  // Folder images
  const [folderImages, setFolderImages] = useState<FolderImage[]>([]);
  const [folderPath, setFolderPath] = useState('');

  // Текущий фон для отображения
  const [currentBackground, setCurrentBackground] = useState<string>(() => {
    if (backgroundType === 'gradient') {
      return GRADIENTS[backgroundValue as GradientKey];
    } else if (backgroundType === 'custom') {
      const gradient = customGradients.find(g => g.id === backgroundValue);
      return gradient ? getGradientStyle(gradient) : GRADIENTS.gradient1;
    } else if (backgroundType === 'folder') {
      // Для папки возвращаем пустую строку, потом обновим через useEffect
      return '';
    }
    return GRADIENTS.gradient1;
  });

  // Загрузка сохраненных метаданных изображений
  useEffect(() => {
    const savedMetadata = localStorage.getItem('folderImages');
    if (savedMetadata) {
      try {
        const metadata = JSON.parse(savedMetadata);
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

  // Обновление текущего фона
  useEffect(() => {
    if (backgroundType === 'gradient') {
      setCurrentBackground(GRADIENTS[backgroundValue as GradientKey]);
    } else if (backgroundType === 'custom') {
      const gradient = customGradients.find(g => g.id === backgroundValue);
      setCurrentBackground(gradient ? getGradientStyle(gradient) : GRADIENTS.gradient1);
    } else if (backgroundType === 'folder') {
      // Ищем изображение по ID (backgroundValue хранит ID)
      const image = folderImages.find(img => img.id.toString() === backgroundValue);
      if (image?.data) {
        setCurrentBackground(image.data);
      } else if (folderImages.length > 0 && !backgroundValue) {
        // Если нет выбранного изображения, но есть изображения в папке
        setBackgroundValue(folderImages[0].id.toString());
        setCurrentBackground(folderImages[0].data);
      }
    }
  }, [backgroundType, backgroundValue, folderImages, customGradients, getGradientStyle]);

  // Slideshow
  const slideshow = useSlideshow(
    folderImages.filter(img => img.data), // Только изображения с данными
    (imageData: string) => {
      const image = folderImages.find(img => img.data === imageData);
      if (image) {
        setBackgroundType('folder');
        setBackgroundValue(image.id.toString()); // Сохраняем ID, а не data URL
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
            // Сортируем изображения по имени
            newImages.sort((a, b) => a.name.localeCompare(b.name));
            setFolderImages(newImages);
            
            // Автоматически выбираем первое изображение
            if (newImages.length > 0) {
              setBackgroundType('folder');
              setBackgroundValue(newImages[0].id.toString());
              setCurrentBackground(newImages[0].data);
            }
            
            // Сохраняем метаданные
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

  // Select custom gradient
  const handleCustomGradientSelect = (gradient: CustomGradient) => {
    setBackgroundType('custom');
    setBackgroundValue(gradient.id);
    slideshow.stopSlideshow();
  };

  // Select folder image - ИСПРАВЛЕНО!
  const handleImageSelect = (image: FolderImage) => {
    if (image?.data) {
      setBackgroundType('folder');
      setBackgroundValue(image.id.toString()); // Сохраняем ID
      setCurrentBackground(image.data); // Сразу устанавливаем фон
      slideshow.stopSlideshow();
    } else {
      console.warn('Selected image has no data:', image);
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
    } else if (backgroundType === 'gradient' && currentBackground) {
      return { 
        backgroundImage: currentBackground,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    } else if (backgroundType === 'custom' && currentBackground) {
      return { 
        backgroundImage: currentBackground,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    
    // По умолчанию
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