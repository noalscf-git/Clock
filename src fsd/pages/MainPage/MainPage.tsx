// src/pages/MainPage/MainPage.tsx
import React, { useEffect, useRef } from 'react';
import { useSettingsContext } from '@/app/providers/SettingsProvider';
import { ClockWidget } from '@/widgets/ClockWidget';
import { SettingsWidget } from '@/widgets/SettingsWidget';
import { BackgroundLayer } from '@/features/background/ui/BackgroundLayer';
import { TopBar } from '@/features/settings/ui/TopBar/TopBar';
import { FullscreenHint } from '@/shared/ui';
import { LoadingOverlay } from '@/shared/ui';
import { useFullscreen } from '@/shared/hooks/useFullscreen';
import styles from './MainPage.module.css';

export const MainPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isFullscreen, showHint, toggleFullscreen } = useFullscreen(containerRef as React.RefObject<HTMLElement>);
  
  const {
    // Background
    currentBackground,
    nextBackground,
    isTransitioning,
    transitionEffect,
    
    // Loading
    isLoading,
    loadingProgress,
    
    // UI state
    isOpen: showSettings,
    activeTab,
    openSettings,
    closeSettings,
    setActiveTab,
  } = useSettingsContext();

// Добавьте этот useEffect после получения контекста
useEffect(() => {
  console.log('🏠 MainPage - currentBackground from context:', currentBackground?.substring(0, 50) + '...');
}, [currentBackground])

  return (
    <div className={styles.page}>
      {/* Фон */}
      {currentBackground && (
        <BackgroundLayer
          current={currentBackground}
          next={nextBackground}
          isTransitioning={isTransitioning}
          effect={transitionEffect}
        />
      )}

      {/* Загрузка */}
      {isLoading && (
        <LoadingOverlay 
          progress={loadingProgress}
          message="Загрузка изображений..."
        />
      )}

      {/* Основной контент */}
      <div className={styles.container} ref={containerRef}>
        <TopBar 
          onSettingsClick={openSettings}  // Используем openSettings
          onFullscreenClick={toggleFullscreen}
          isFullscreen={isFullscreen}
        />
        
        <ClockWidget />
      </div>

      {/* Настройки */}
      <SettingsWidget
        isOpen={showSettings}
        activeTab={activeTab}
        onClose={closeSettings}  // Используем closeSettings
        onTabChange={setActiveTab}
      />

      {/* Подсказка */}
      <FullscreenHint show={showHint} />
    </div>
  );
};