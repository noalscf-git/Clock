// src/features/slideshow/model/useSlideshow.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import type { 
  SlideshowViewModel, 
  SlideshowState, 
  TransitionEffect 
} from './types';

const DEFAULT_STATE: SlideshowState = {
  isActive: false,
  effect: 'fade',
  interval: '5',
  randomEffect: false,
  randomInterval: false,
  randomIntervalRange: '5,30',
  shuffleImages: false,
  currentIndex: 0,
  playlistIds: [],
  imagesCount: 0,
};

interface UseSlideshowProps {
  imagesCount: number;
  onImageChange: (index: number, effect?: TransitionEffect) => void;
}

export const useSlideshow = ({ 
  imagesCount, 
  onImageChange 
}: UseSlideshowProps): SlideshowViewModel => {
  // Загружаем сохраненное состояние
  const [savedState, setSavedState] = useLocalStorage<SlideshowState>(
    'slideshowState',
    DEFAULT_STATE
  );
  
  // Локальное состояние
  const [isActive, setIsActive] = useState(savedState.isActive);
  const [effect, setEffect] = useState<TransitionEffect>(savedState.effect);
  const [interval, setInterval] = useState(savedState.interval);
  const [randomEffect, setRandomEffect] = useState(savedState.randomEffect);
  const [randomInterval, setRandomInterval] = useState(savedState.randomInterval);
  const [randomIntervalRange, setRandomIntervalRange] = useState(savedState.randomIntervalRange);
  const [shuffleImages, setShuffleImages] = useState(savedState.shuffleImages);
  const [currentIndex, setCurrentIndex] = useState(savedState.currentIndex);
  const [isRestoring, setIsRestoring] = useState(true);
  
  const timerRef = useRef<NodeJS.Timeout>();
  const [playlist, setPlaylist] = useState<number[]>([]);

  // Создание плейлиста
  const createPlaylist = useCallback(() => {
    let indices = Array.from({ length: imagesCount }, (_, i) => i);
    if (shuffleImages) {
      indices = indices.sort(() => Math.random() - 0.5);
    }
    return indices;
  }, [imagesCount, shuffleImages]);

  // Восстановление состояния при загрузке
  useEffect(() => {
    if (imagesCount > 0 && isRestoring) {
      // Восстанавливаем плейлист из сохраненных ID
      if (savedState.playlistIds.length > 0) {
        const restoredPlaylist = savedState.playlistIds
          .map(id => parseInt(id))
          .filter(index => index < imagesCount);
        
        if (restoredPlaylist.length > 0) {
          setPlaylist(restoredPlaylist);
          
          if (savedState.isActive) {
            setIsActive(true);
            startSlideshowFromIndex(restoredPlaylist, savedState.currentIndex);
          }
        } else {
          setPlaylist(createPlaylist());
        }
      } else {
        setPlaylist(createPlaylist());
      }
      setIsRestoring(false);
    }
  }, [imagesCount, savedState, isRestoring, createPlaylist]);

  // Сохранение состояния
  useEffect(() => {
    if (!isRestoring) {
      setSavedState({
        isActive,
        effect,
        interval,
        randomEffect,
        randomInterval,
        randomIntervalRange,
        shuffleImages,
        currentIndex,
        playlistIds: playlist.map(i => i.toString()),
        imagesCount,
      });
    }
  }, [
    isActive, effect, interval, randomEffect, 
    randomInterval, randomIntervalRange, shuffleImages, 
    currentIndex, playlist, imagesCount, setSavedState, isRestoring
  ]);

  // Очистка таймера при размонтировании
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Получение случайного эффекта
  const getRandomEffect = useCallback((): TransitionEffect => {
    const effects: TransitionEffect[] = [
      'fade', 'slide', 'zoom', 'blur', 'flip', 'rotate', 'bounce', 'flash',
      'darken', 'desaturate', 'horizontal-blur', 'curtain', 'xflip',
      'diagonal-rotate', 'wave', 'lightning', 'kaleidoscope', 'pulse',
      'rainbow', 'dissolve'
    ];
    return effects[Math.floor(Math.random() * effects.length)];
  }, []);

  // Получение текущего эффекта
  const getCurrentEffect = useCallback((): TransitionEffect => {
    return randomEffect ? getRandomEffect() : effect;
  }, [randomEffect, effect, getRandomEffect]);

  // Получение интервала в миллисекундах
  const getIntervalMs = useCallback((): number => {
    if (randomInterval) {
      const [min, max] = randomIntervalRange.split(',').map(Number);
      return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
    }
    return parseInt(interval) * 1000;
  }, [randomInterval, randomIntervalRange, interval]);

  // Показ следующего изображения
  const showNextImage = useCallback((currentPlaylist: number[], index: number) => {
    if (currentPlaylist[index] !== undefined) {
      const currentEffect = getCurrentEffect();
      onImageChange(currentPlaylist[index], currentEffect);
    }
  }, [getCurrentEffect, onImageChange]);

  // Запуск слайд-шоу с указанного индекса
  const startSlideshowFromIndex = useCallback((
    currentPlaylist: number[],
    startIndex: number
  ) => {
    if (currentPlaylist.length === 0) return;

    stopSlideshow();
    
    setCurrentIndex(startIndex);
    setIsActive(true);

    showNextImage(currentPlaylist, startIndex);

    const scheduleNext = () => {
      const intervalMs = getIntervalMs();
      
      timerRef.current = setTimeout(() => {
        setCurrentIndex(prev => {
          const nextIndex = (prev + 1) % currentPlaylist.length;
          showNextImage(currentPlaylist, nextIndex);
          return nextIndex;
        });
        
        scheduleNext();
      }, intervalMs);
    };

    scheduleNext();
  }, [getIntervalMs, showNextImage]);

  // Запуск слайд-шоу
  const startSlideshow = useCallback(() => {
    if (imagesCount === 0) return;

    const newPlaylist = createPlaylist();
    setPlaylist(newPlaylist);
    startSlideshowFromIndex(newPlaylist, 0);
  }, [imagesCount, createPlaylist, startSlideshowFromIndex]);

  // Остановка слайд-шоу
  const stopSlideshow = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
    setIsActive(false);
  }, []);

  // Следующее изображение вручную
  const nextImage = useCallback(() => {
    if (playlist.length === 0) return;
    
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIndex);
    showNextImage(playlist, nextIndex);
  }, [playlist, currentIndex, showNextImage]);

  // Предыдущее изображение вручную
  const prevImage = useCallback(() => {
    if (playlist.length === 0) return;
    
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentIndex(prevIndex);
    showNextImage(playlist, prevIndex);
  }, [playlist, currentIndex, showNextImage]);

  return {
    isActive,
    effect,
    interval,
    randomEffect,
    randomInterval,
    randomIntervalRange,
    shuffleImages,
    isRestoring,
    setEffect,
    setInterval,
    setRandomEffect,
    setRandomInterval,
    setRandomIntervalRange,
    setShuffleImages,
    startSlideshow,
    stopSlideshow,
    nextImage,
    prevImage,
  };
};