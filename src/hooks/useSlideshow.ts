// src/hooks/useSlideshow.ts - обновляем тип колбэка

import { useState, useCallback, useRef, useEffect } from 'react';
import type { FolderImage, SlideshowState, SlideshowSettings } from '../types';
import { EFFECTS } from '../utils/constants';
import { useLocalStorage } from './useLocalStorage';

const DEFAULT_SLIDESHOW_STATE: SlideshowState = {
  isActive: false,
  effect: 'fade',
  interval: '5',
  randomEffect: false,
  randomInterval: false,
  randomIntervalRange: '5,30',
  shuffleImages: false,
  currentIndex: 0,
  playlistIds: [],
  playlistType: 'folder'
};

export const useSlideshow = (
  folderImages: FolderImage[],
  onImageChange: (imageData: string, effect?: string) => void // Обновляем тип
) => {
  const [savedState, setSavedState] = useLocalStorage<SlideshowState>('slideshowState', DEFAULT_SLIDESHOW_STATE);
  
  const [isActive, setIsActive] = useState(savedState.isActive);
  const [effect, setEffect] = useState(savedState.effect);
  const [interval, setInterval] = useState(savedState.interval);
  const [randomEffect, setRandomEffect] = useState(savedState.randomEffect);
  const [randomInterval, setRandomInterval] = useState(savedState.randomInterval);
  const [randomIntervalRange, setRandomIntervalRange] = useState(savedState.randomIntervalRange);
  const [shuffleImages, setShuffleImages] = useState(savedState.shuffleImages);
  const [currentIndex, setCurrentIndex] = useState(savedState.currentIndex);
  
  const timerRef = useRef<NodeJS.Timeout>();
  const [playlist, setPlaylist] = useState<FolderImage[]>([]);
  const [isRestoring, setIsRestoring] = useState(true);

  const validImages = folderImages.filter(img => img.data);

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
        playlistIds: playlist.map(img => img.id.toString()),
        playlistType: 'folder'
      });
    }
  }, [isActive, effect, interval, randomEffect, randomInterval, randomIntervalRange, shuffleImages, currentIndex, playlist, setSavedState, isRestoring]);

  useEffect(() => {
    if (validImages.length > 0 && isRestoring) {
      if (savedState.playlistIds.length > 0) {
        const restoredPlaylist = savedState.playlistIds
          .map(id => validImages.find(img => img.id.toString() === id))
          .filter((img): img is FolderImage => img !== undefined);
        
        if (restoredPlaylist.length > 0) {
          setPlaylist(restoredPlaylist);
          
          if (savedState.isActive) {
            setIsActive(true);
            startSlideshowFromIndex(restoredPlaylist, savedState.currentIndex);
          }
        } else {
          createNewPlaylist();
        }
      } else {
        createNewPlaylist();
      }
      setIsRestoring(false);
    }
  }, [validImages, savedState, isRestoring]);

  const createNewPlaylist = useCallback(() => {
    let newPlaylist = [...validImages];
    if (shuffleImages) {
      newPlaylist = newPlaylist.sort(() => Math.random() - 0.5);
    }
    setPlaylist(newPlaylist);
    return newPlaylist;
  }, [validImages, shuffleImages]);

  const stopSlideshow = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
    setIsActive(false);
  }, []);

  const showNextImage = useCallback((images: FolderImage[], index: number) => {
    if (!images[index]?.data) return;
    
    const currentEffect = randomEffect 
      ? EFFECTS[Math.floor(Math.random() * EFFECTS.length)]
      : effect;
    
    // Передаем эффект в колбэк
    onImageChange(images[index].data, currentEffect);
  }, [randomEffect, effect, onImageChange]);

  const startSlideshowFromIndex = useCallback((images: FolderImage[], startIndex: number) => {
    if (images.length === 0) return;

    stopSlideshow();
    
    setCurrentIndex(startIndex);
    setIsActive(true);

    if (images[startIndex]?.data) {
      showNextImage(images, startIndex);
    }

    const getIntervalMs = () => {
      if (randomInterval) {
        const [min, max] = randomIntervalRange.split(',').map(Number);
        return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
      }
      return parseInt(interval) * 1000;
    };

    const scheduleNext = () => {
      const intervalMs = getIntervalMs();
      
      timerRef.current = setTimeout(() => {
        setCurrentIndex(prev => {
          const nextIndex = (prev + 1) % images.length;
          if (images[nextIndex]?.data) {
            showNextImage(images, nextIndex);
          }
          return nextIndex;
        });
        
        scheduleNext();
      }, intervalMs);
    };

    scheduleNext();
  }, [randomInterval, interval, randomEffect, effect, showNextImage, stopSlideshow]);

  const startSlideshow = useCallback(() => {
    if (validImages.length === 0) {
      alert('Нет изображений для слайд-шоу!');
      return;
    }

    const newPlaylist = createNewPlaylist();
    startSlideshowFromIndex(newPlaylist, 0);
  }, [validImages, createNewPlaylist, startSlideshowFromIndex]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const updateSettings = useCallback((newSettings: Partial<SlideshowSettings>) => {
    if (newSettings.effect !== undefined) setEffect(newSettings.effect);
    if (newSettings.interval !== undefined) setInterval(newSettings.interval);
    if (newSettings.randomEffect !== undefined) setRandomEffect(newSettings.randomEffect);
    if (newSettings.randomInterval !== undefined) setRandomInterval(newSettings.randomInterval);
    if (newSettings.randomIntervalRange !== undefined) setRandomIntervalRange(newSettings.randomIntervalRange);
    if (newSettings.shuffleImages !== undefined) setShuffleImages(newSettings.shuffleImages);
  }, []);

  return {
    isActive,
    effect,
    setEffect,
    interval,
    setInterval,
    randomEffect,
    setRandomEffect,
    randomInterval,
    setRandomInterval,
    randomIntervalRange,
    setRandomIntervalRange,
    shuffleImages,
    setShuffleImages,
    startSlideshow,
    stopSlideshow,
    updateSettings,
    isRestoring
  };
};