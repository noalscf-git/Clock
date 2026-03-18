// src/hooks/useAnimatedBackground.ts
import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { AnimatedBackground } from '../types';

const DEFAULT_ANIMATED: AnimatedBackground = {
  id: 'animated-bg',
  name: 'Анимированный фон',
  type: 'particles',
  speed: 1,
  intensity: 50,
  color1: '#00ffff',
  color2: '#ff00ff',
  color3: '#ffff00',
  density: 50
};

export const useAnimatedBackground = () => {
  const [settings, setSettings] = useLocalStorage<AnimatedBackground>(
    'animatedBackground',
    DEFAULT_ANIMATED
  );

  const updateSettings = useCallback((newSettings: AnimatedBackground) => {
    setSettings(newSettings);
  }, [setSettings]);

  const resetToDefault = useCallback(() => {
    setSettings(DEFAULT_ANIMATED);
  }, [setSettings]);

  return {
    settings,
    updateSettings,
    resetToDefault
  };
};