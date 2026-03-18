// src/hooks/useClock.ts - добавляем шрифт
import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useClock = () => {
  const [time, setTime] = useState(new Date());
  const [clockSize, setClockSize] = useLocalStorage('clockSize', '6');
  const [clockColor, setClockColor] = useLocalStorage('clockColor', '#00ffff');
  const [glowIntensity, setGlowIntensity] = useLocalStorage('glowIntensity', '40');
  const [borderOpacity, setBorderOpacity] = useLocalStorage('borderOpacity', '0.3');
  const [fontFamily, setFontFamily] = useLocalStorage('fontFamily', 'Orbitron'); // новый хук

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const clockStyle = {
    color: clockColor,
    fontSize: `${clockSize}rem`,
    fontFamily: fontFamily, // применяем шрифт
    textShadow: `0 0 ${10 * Number(glowIntensity) / 100}px ${clockColor}, 
                 0 0 ${20 * Number(glowIntensity) / 100}px ${clockColor}, 
                 0 0 ${40 * Number(glowIntensity) / 100}px ${clockColor}`
  };

  const dateStyle = {
    fontSize: `${Number(clockSize) / 4}rem`,
    fontFamily: fontFamily // применяем тот же шрифт для даты
  };

  const wrapperStyle = {
    background: `rgba(0, 0, 0, ${borderOpacity})`
  };

  return {
    time,
    clockSize,
    setClockSize,
    clockColor,
    setClockColor,
    glowIntensity,
    setGlowIntensity,
    borderOpacity,
    setBorderOpacity,
    fontFamily,
    setFontFamily,
    clockStyle,
    dateStyle,
    wrapperStyle,
      // Добавляем числовые значения для монитора
  numericValues: {
    glowIntensity: Number(glowIntensity),
    borderOpacity: Number(borderOpacity)
  }
  };
};