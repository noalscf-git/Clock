// src/shared/hooks/useFullscreen.ts
import { useState, useEffect, useCallback, RefObject } from 'react';

interface UseFullscreenReturn {
  isFullscreen: boolean;
  showHint: boolean;
  toggleFullscreen: () => void;
  exitFullscreen: () => void;
}

export const useFullscreen = (containerRef: RefObject<HTMLElement>): UseFullscreenReturn => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Проверка поддержки полноэкранного режима
  const isFullscreenSupported = useCallback((): boolean => {
    return !!(
      document.fullscreenEnabled ||
      (document as any).webkitFullscreenEnabled ||
      (document as any).mozFullScreenEnabled ||
      (document as any).msFullscreenEnabled
    );
  }, []);

  // Вход в полноэкранный режим
  const enterFullscreen = useCallback(() => {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).mozRequestFullScreen) {
      (element as any).mozRequestFullScreen();
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
    }
  }, []);

  // Выход из полноэкранного режима
  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  }, []);

  // Переключение режима
  const toggleFullscreen = useCallback(() => {
    if (!isFullscreenSupported()) {
      alert('Ваш браузер не поддерживает полноэкранный режим');
      return;
    }

    if (!isFullscreen) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  }, [isFullscreen, isFullscreenSupported, enterFullscreen, exitFullscreen]);

  // Обработчик изменения полноэкранного режима
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);

      if (isFs) {
        setShowHint(true);
        setTimeout(() => setShowHint(false), 3000);
      } else {
        setShowHint(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  return {
    isFullscreen,
    showHint,
    toggleFullscreen,
    exitFullscreen,
  };
};