import React, { useRef, useState } from "react";
import { ClockDisplay } from "./components/Clock/ClockDisplay/ClockDisplay";
import { TopBar } from "./components/UI/TopBar/TopBar";
import { FullscreenHint } from "./components/UI/FullscreenHint/FullscreenHint";
import { SettingsPanel } from "./components/Settings/SettingsPanel/SettingsPanel";
import { AnimatedBackground } from "./components/Background/AnimatedBackground/AnimatedBackground";
import { SystemMonitor } from "./components/Clock/SystemMonitor/SystemMonitor";
import { useFullscreen } from "./hooks/useFullscreen";
import { useClock } from "./hooks/useClock";
import { useSlideshow } from "./hooks/useSlideshow";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useGradientEditor } from "./hooks/useGradientEditor";
import { useImageStorage } from "./hooks/useImageStorage";
import { useAnimatedBackground } from "./hooks/useAnimatedBackground";
import { GRADIENTS } from "./utils/constants/gradients";
import type { GradientKey, CustomGradient, BackgroundType, FolderImage } from "./types/background";
import type { ClockSettings } from "./types/clock";
import type { SlideshowState } from "./types/slideshow";
import type { SystemSettings } from "./types/system";
import styles from "./App.module.css";

// Сначала объявляем функцию
const getImageIdByData = (data: string, folderImages: FolderImage[]): number => {
  const image = folderImages.find(img => img.data === data);
  return image?.id || 0;
};

const getBackgroundStyle = (background: string): React.CSSProperties => {
  if (background.startsWith('linear-gradient') || background.startsWith('radial-gradient')) {
    return { background };
  }
  return {
    backgroundImage: `url('${background}')`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
};

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isFullscreen, showHint, toggleFullscreen } = useFullscreen(containerRef as React.RefObject<HTMLElement>);

  const clock = useClock();
  const animatedBg = useAnimatedBackground();
  const { customGradients, getGradientStyle } = useGradientEditor();
  const { folderImages, folderPath, isLoading, loadingProgress, handleFolderSelect } = useImageStorage();
  
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('background');
  const [backgroundType, setBackgroundType] = useLocalStorage<BackgroundType>('backgroundType', 'gradient');
  const [backgroundValue, setBackgroundValue] = useLocalStorage<string>('backgroundValue', 'gradient1');
  const [showSystemMonitor, setShowSystemMonitor] = useLocalStorage('showSystemMonitor', false);
  const [monitorSize, setMonitorSize] = useLocalStorage<'small' | 'medium' | 'large'>('monitorSize', 'medium');
  
  const [currentBackground, setCurrentBackground] = useState<string>(() => {
    if (backgroundType === 'gradient') {
      return GRADIENTS[backgroundValue as GradientKey];
    }
    return GRADIENTS.gradient1;
  });

  const [nextBackground, setNextBackground] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionEffect, setTransitionEffect] = useState('');

  React.useEffect(() => {
    if (backgroundType === 'animated') return;

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
        setCurrentBackground(folderImages[0].data);
      }
    }
  }, [backgroundType, backgroundValue, folderImages, customGradients, getGradientStyle]);

  const slideshow = useSlideshow(
    folderImages.filter(img => img.data),
    (imageData: string, effect?: string) => {
      if (backgroundType === 'animated') return;
      if (effect) {
        startTransition(imageData, effect);
      } else {
        setBackgroundType('folder');
        setBackgroundValue(getImageIdByData(imageData, folderImages).toString());
      }
    }
  );

  const startTransition = (newBackground: string, effect: string) => {
    setNextBackground(newBackground);
    setTransitionEffect(effect);
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentBackground(newBackground);
      setNextBackground(null);
      setIsTransitioning(false);
      setTransitionEffect('');
    }, 500);
  };

  const handleGradientSelect = (gradient: GradientKey) => {
    setBackgroundType('gradient');
    setBackgroundValue(gradient);
    slideshow.stopSlideshow();
  };

  const handleCustomGradientSelect = (gradient: CustomGradient) => {
    setBackgroundType('custom');
    setBackgroundValue(gradient.id);
    slideshow.stopSlideshow();
  };

  const handleImageSelect = (image: FolderImage) => {
    if (image?.data) {
      setBackgroundType('folder');
      setBackgroundValue(image.id.toString());
      slideshow.stopSlideshow();
    }
  };

  const handleAnimatedSelect = () => {
    setBackgroundType('animated');
    slideshow.stopSlideshow();
  };

  const shouldShowBackgroundLayers = () => backgroundType !== 'animated';

  // Компонент LoadingOverlay прямо в файле
  const LoadingOverlay: React.FC<{ progress: number; isRestoring?: boolean }> = ({ progress, isRestoring }) => (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingContent}>
        <div className={styles.loadingSpinner} />
        <div className={styles.loadingText}>
          {isRestoring ? 'Восстановление слайд-шоу...' : `Загрузка изображений... ${progress}%`}
        </div>
        {!isRestoring && (
          <div className={styles.loadingBar}>
            <div className={styles.loadingProgress} style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.app}>
      {backgroundType === 'animated' && <AnimatedBackground settings={animatedBg.settings} />}

      {shouldShowBackgroundLayers() && (
        <>
          <div
            className={`${styles.backgroundLayer} ${isTransitioning && !nextBackground ? styles.hidden : ''}`}
            style={getBackgroundStyle(currentBackground)}
          />
          {nextBackground && (
            <div
              className={`${styles.backgroundLayer} ${styles[`${transitionEffect}Transition`]}`}
              style={getBackgroundStyle(nextBackground)}
            />
          )}
        </>
      )}

      {(isLoading || slideshow.isRestoring) && (
        <LoadingOverlay progress={loadingProgress} isRestoring={slideshow.isRestoring} />
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
          background={{
            type: backgroundType,
            currentValue: backgroundType === 'gradient' ? backgroundValue : currentBackground,
            folderImages,
            folderPath,
            onGradientSelect: handleGradientSelect,
            onCustomGradientSelect: handleCustomGradientSelect,
            onFolderSelect: handleFolderSelect,
            onImageSelect: handleImageSelect,
          }}
          clock={{
            size: clock.clockSize,
            color: clock.clockColor,
            glowIntensity: clock.glowIntensity,
            borderOpacity: clock.borderOpacity,
            fontFamily: clock.fontFamily,
            onSizeChange: clock.setClockSize,
            onColorChange: clock.setClockColor,
            onGlowIntensityChange: clock.setGlowIntensity,
            onBorderOpacityChange: clock.setBorderOpacity,
            onFontFamilyChange: clock.setFontFamily,
          }}
          slideshow={{
            isActive: slideshow.isActive,
            effect: slideshow.effect,
            interval: slideshow.interval,
            randomEffect: slideshow.randomEffect,
            randomInterval: slideshow.randomInterval,
            randomIntervalRange: slideshow.randomIntervalRange,
            shuffleImages: slideshow.shuffleImages,
            onEffectChange: slideshow.setEffect,
            onIntervalChange: slideshow.setInterval,
            onRandomEffectChange: slideshow.setRandomEffect,
            onRandomIntervalChange: slideshow.setRandomInterval,
            onRandomIntervalRangeChange: slideshow.setRandomIntervalRange,
            onShuffleImagesChange: slideshow.setShuffleImages,
            onStart: slideshow.startSlideshow,
            onStop: slideshow.stopSlideshow,
          }}
          system={{
            showMonitor: showSystemMonitor,
            monitorSize,
            onShowMonitorChange: setShowSystemMonitor,
            onMonitorSizeChange: setMonitorSize,
          }}
          animated={{
            settings: animatedBg.settings,
            onSettingsChange: animatedBg.updateSettings,
            onSelect: handleAnimatedSelect,
          }}
        />

        <ClockDisplay
          time={clock.time}
          clockStyle={clock.clockStyle}
          dateStyle={clock.dateStyle}
          wrapperStyle={clock.wrapperStyle}
        />

        {showSystemMonitor && (
          <SystemMonitor
            fontFamily={clock.fontFamily}
            textColor={clock.clockColor}
            glowIntensity={parseInt(clock.glowIntensity)}
            borderOpacity={parseFloat(clock.borderOpacity)}
            size={monitorSize}
          />
        )}
      </div>

      <FullscreenHint show={showHint} />
    </div>
  );
}

export default App;