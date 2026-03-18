// src/features/clock/model/useClock.ts
import { useState, useEffect, useMemo } from 'react';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import type { ClockSettings, ClockViewModel } from './types';

const DEFAULT_SETTINGS: ClockSettings = {
  size: '6',
  color: '#00ffff',
  glowIntensity: '40',
  borderOpacity: '0.3',
  fontFamily: 'Orbitron',
};

export const useClock = (): ClockViewModel => {
  const [time, setTime] = useState(new Date());
  
  // Настройки из localStorage
  const [clockSize, setClockSize] = useLocalStorage('clockSize', DEFAULT_SETTINGS.size);
  const [clockColor, setClockColor] = useLocalStorage('clockColor', DEFAULT_SETTINGS.color);
  const [glowIntensity, setGlowIntensity] = useLocalStorage('glowIntensity', DEFAULT_SETTINGS.glowIntensity);
  const [borderOpacity, setBorderOpacity] = useLocalStorage('borderOpacity', DEFAULT_SETTINGS.borderOpacity);
  const [fontFamily, setFontFamily] = useLocalStorage('fontFamily', DEFAULT_SETTINGS.fontFamily);

  // Обновление времени
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Вычисление стилей
  const styles = useMemo(() => {
    const glow = Number(glowIntensity) / 100;
    const opacity = Number(borderOpacity);

    const clockStyle: React.CSSProperties = {
      color: clockColor,
      fontSize: `${clockSize}rem`,
      fontFamily: fontFamily,
      textShadow: `0 0 ${10 * glow}px ${clockColor}, 
                   0 0 ${20 * glow}px ${clockColor}, 
                   0 0 ${40 * glow}px ${clockColor}`,
      transition: 'all 0.3s ease',
    };

    const dateStyle: React.CSSProperties = {
      fontSize: `${Number(clockSize) / 4}rem`,
      fontFamily: fontFamily,
      transition: 'all 0.3s ease',
    };

    const wrapperStyle: React.CSSProperties = {
      background: `rgba(0, 0, 0, ${opacity})`,
      backdropFilter: 'blur(5px)',
      border: `2px solid rgba(255, 255, 255, ${opacity * 0.5})`,
      borderRadius: '30px',
      padding: `${Number(clockSize) * 6}px ${Number(clockSize) * 8}px`,
      transition: 'all 0.3s ease',
    };

    return { clockStyle, dateStyle, wrapperStyle };
  }, [clockSize, clockColor, glowIntensity, borderOpacity, fontFamily]);

  return {
    time,
    ...styles,
    settings: {
      size: clockSize,
      color: clockColor,
      glowIntensity,
      borderOpacity,
      fontFamily,
    },
    setClockSize,
    setClockColor,
    setGlowIntensity,
    setBorderOpacity,
    setFontFamily,
  };
};