// src/hooks/useSlideshow.ts
import { useState, useCallback, useRef, useEffect } from 'react';

import { EFFECTS } from '../utils/constants';
import type { FolderImage } from '../types';

export const useSlideshow = (
  folderImages: FolderImage[],
  onImageChange: (imageData: string) => void
) => {
  const [isActive, setIsActive] = useState(false);
  const [effect, setEffect] = useState('fade');
  const [interval, setInterval] = useState('5');
  const [randomEffect, setRandomEffect] = useState(false);
  const [randomInterval, setRandomInterval] = useState(false);
  const [randomIntervalRange, setRandomIntervalRange] = useState('5,30');
  const [shuffleImages, setShuffleImages] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const stopSlideshow = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
    setIsActive(false);
  }, []);

  const startSlideshow = useCallback(() => {
    if (folderImages.length === 0) {
      alert('Сначала выберите папку с изображениями!');
      return;
    }

    stopSlideshow();

    let images = [...folderImages];
    if (shuffleImages) {
      images = images.sort(() => Math.random() - 0.5);
    }

    setCurrentIndex(0);
    setIsActive(true);

    const showNextImage = () => {
      setCurrentIndex(prev => (prev + 1) % images.length);
      
      const currentEffect = randomEffect 
        ? EFFECTS[Math.floor(Math.random() * EFFECTS.length)]
        : effect;
      
      // Применяем эффект
      document.body.classList.add(`${currentEffect}-bg`);
      setTimeout(() => {
        onImageChange(images[currentIndex].data);
        setTimeout(() => {
          document.body.classList.remove(`${currentEffect}-bg`);
        }, 500);
      }, 50);
    };

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
        showNextImage();
        scheduleNext();
      }, intervalMs);
    };

    scheduleNext();
  }, [folderImages, shuffleImages, randomEffect, effect, randomInterval, randomIntervalRange, interval, onImageChange, stopSlideshow, currentIndex]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
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
    stopSlideshow
  };
};