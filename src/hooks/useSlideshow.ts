// src/hooks/useSlideshow.ts - исправленная версия
import { useState, useCallback, useRef, useEffect } from 'react';
import type { FolderImage } from '../types';
import { EFFECTS } from '../utils/constants';

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
  const [effectClass, setEffectClass] = useState('');

  const stopSlideshow = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
    setIsActive(false);
    setEffectClass('');
  }, []);

  const showNextImage = useCallback((images: FolderImage[], index: number) => {
    const currentEffect = randomEffect 
      ? EFFECTS[Math.floor(Math.random() * EFFECTS.length)]
      : effect;
    
    // Добавляем класс эффекта
    setEffectClass(`${currentEffect}-bg`);
    
    // Меняем изображение через callback
    setTimeout(() => {
      onImageChange(images[index].data);
      
      // Убираем класс эффекта
      setTimeout(() => {
        setEffectClass('');
      }, 500);
    }, 50);
  }, [randomEffect, effect, onImageChange]);

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

    // Показываем первое изображение
    showNextImage(images, 0);

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
          showNextImage(images, nextIndex);
          return nextIndex;
        });
        
        // Если включен случайный интервал, пересоздаем таймер с новым значением
        if (randomInterval) {
          scheduleNext();
        } else {
          timerRef.current = setTimeout(() => {
            scheduleNext();
          }, intervalMs);
        }
      }, intervalMs);
    };

    scheduleNext();
  }, [folderImages, shuffleImages, randomInterval, interval, randomEffect, effect, showNextImage, stopSlideshow]);

  // Очистка при размонтировании
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
    effectClass,
    startSlideshow,
    stopSlideshow
  };
};