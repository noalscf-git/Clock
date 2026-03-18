// src/entities/animated/model/useAnimatedBackground.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import type { AnimatedBackgroundSettings, AnimatedBackgroundType } from './types';

const DEFAULT_SETTINGS: AnimatedBackgroundSettings = {
  id: 'animated-bg',
  name: 'Анимированный фон',
  type: 'particles',
  speed: 1,
  intensity: 50,
  density: 50,
  color1: '#00ffff',
  color2: '#ff00ff',
  color3: '#ffff00',
};

export const useAnimatedBackground = () => {
  const [settings, setSettings] = useLocalStorage<AnimatedBackgroundSettings>(
    'animatedBackground',
    DEFAULT_SETTINGS
  );

  const animationRef = useRef<number>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timeRef = useRef(0);

  const updateSettings = useCallback((newSettings: AnimatedBackgroundSettings) => {
    setSettings(newSettings);
  }, [setSettings]);

  const updateSetting = useCallback(<K extends keyof AnimatedBackgroundSettings>(
    key: K,
    value: AnimatedBackgroundSettings[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  }, [setSettings]);

  const setCanvas = useCallback((canvas: HTMLCanvasElement | null) => {
    canvasRef.current = canvas;
  }, []);

  // Сброс времени при изменении настроек
  useEffect(() => {
    timeRef.current = 0;
  }, [settings.type]);

  return {
    settings,
    updateSettings,
    updateSetting,
    setCanvas,
    animationRef,
    timeRef,
  };
};