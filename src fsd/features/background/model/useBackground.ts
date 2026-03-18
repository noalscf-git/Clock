// src/features/background/model/useBackground.ts
import { useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import type { 
  BackgroundType, 
  BackgroundViewModel,
  TransitionEffect 
} from './types';

const DEFAULT_BACKGROUND = 'linear-gradient(135deg, #0b0b1f, #1a1a2f)';
const DEFAULT_BG_VALUE = 'gradient1';

export const useBackground = (): BackgroundViewModel => {
  const [backgroundType, setBackgroundType] = useLocalStorage<BackgroundType>(
    'backgroundType',
    'gradient'
  );
  
  const [backgroundValue, setBackgroundValue] = useLocalStorage<string>(
    'backgroundValue',
    DEFAULT_BG_VALUE
  );

  const [currentBackground, setCurrentBackground] = useState<string>(DEFAULT_BACKGROUND);
  const [nextBackground, setNextBackground] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionEffect, setTransitionEffect] = useState<TransitionEffect | ''>('');

  // Следим за изменением типа фона и значения
  useEffect(() => {
    console.log('Background type changed:', backgroundType, backgroundValue);
  }, [backgroundType, backgroundValue]);

  const startTransition = useCallback((newBackground: string, effect: TransitionEffect) => {
    console.log('Starting transition to:', newBackground, 'with effect:', effect);
    setNextBackground(newBackground);
    setTransitionEffect(effect);
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentBackground(newBackground);
      setNextBackground(null);
      setIsTransitioning(false);
      setTransitionEffect('');
      console.log('Transition completed, new background:', newBackground);
    }, 500);
  }, []);

  const resetTransition = useCallback(() => {
    setNextBackground(null);
    setIsTransitioning(false);
    setTransitionEffect('');
  }, []);

  // Функция для прямой установки фона
  const setBackground = useCallback((newBackground: string, effect?: TransitionEffect) => {
    console.log('Setting background to:', newBackground);
    if (effect) {
      startTransition(newBackground, effect);
    } else {
      setCurrentBackground(newBackground);
      setNextBackground(null);
      setIsTransitioning(false);
    }
  }, [startTransition]);

  return {
    type: backgroundType,
    value: backgroundValue,
    currentBackground,
    nextBackground,
    isTransitioning,
    transitionEffect,
    setBackgroundType,
    setBackgroundValue,
    setCurrentBackground: setBackground, // Используем обернутую функцию
    startTransition,
    resetTransition,
  };
};