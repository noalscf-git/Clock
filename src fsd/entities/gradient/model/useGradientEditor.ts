// src/entities/gradient/model/useGradientEditor.ts
import { useState, useCallback, useMemo } from 'react';
import type { GradientColor, CustomGradient } from './types';

const DEFAULT_GRADIENT: CustomGradient = {
  id: '',
  name: 'Новый градиент',
  colors: [
    { id: '1', color: '#0b0b1f', position: 0 },
    { id: '2', color: '#1a1a2f', position: 100 }
  ],
  angle: 135,
  type: 'linear',
};

export const useGradientEditor = (initialGradient?: CustomGradient) => {
  const [gradient, setGradient] = useState<CustomGradient>(
    initialGradient || { ...DEFAULT_GRADIENT, id: crypto.randomUUID() }
  );

  const [customGradients, setCustomGradients] = useState<CustomGradient[]>([]);

  const gradientStyle = useMemo(() => {
    if (!gradient.colors.length) return '';

    const colorStops = gradient.colors
      .sort((a, b) => a.position - b.position)
      .map(c => `${c.color} ${c.position}%`)
      .join(', ');

    if (gradient.type === 'radial') {
      return `radial-gradient(circle at center, ${colorStops})`;
    }
    return `linear-gradient(${gradient.angle}deg, ${colorStops})`;
  }, [gradient]);

  const addColorPoint = useCallback(() => {
    if (gradient.colors.length >= 8) return;

    const positions = gradient.colors.map(c => c.position).sort((a, b) => a - b);
    let newPosition = 50;

    for (let i = 0; i < positions.length - 1; i++) {
      if (positions[i + 1] - positions[i] > 10) {
        newPosition = Math.floor((positions[i] + positions[i + 1]) / 2);
        break;
      }
    }

    const newColor: GradientColor = {
      id: crypto.randomUUID(),
      color: '#667eea',
      position: newPosition,
    };

    setGradient(prev => ({
      ...prev,
      colors: [...prev.colors, newColor].sort((a, b) => a.position - b.position),
    }));
  }, [gradient.colors]);

  const updateColor = useCallback((id: string, color: string) => {
    setGradient(prev => ({
      ...prev,
      colors: prev.colors.map(c => c.id === id ? { ...c, color } : c),
    }));
  }, []);

  const updatePosition = useCallback((id: string, position: number) => {
    setGradient(prev => ({
      ...prev,
      colors: prev.colors.map(c => c.id === id ? { ...c, position } : c).sort((a, b) => a.position - b.position),
    }));
  }, []);

  const removeColorPoint = useCallback((id: string) => {
    if (gradient.colors.length <= 2) return;
    setGradient(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c.id !== id),
    }));
  }, [gradient.colors.length]);

  const updateAngle = useCallback((angle: number) => {
    setGradient(prev => ({ ...prev, angle }));
  }, []);

  const updateType = useCallback((type: 'linear' | 'radial') => {
    setGradient(prev => ({ ...prev, type }));
  }, []);

  const updateName = useCallback((name: string) => {
    setGradient(prev => ({ ...prev, name }));
  }, []);

  const saveGradient = useCallback(() => {
    const savedGradient = {
      ...gradient,
      style: gradientStyle,
    };
    setCustomGradients(prev => [...prev, savedGradient]);
    return savedGradient;
  }, [gradient, gradientStyle]);

  const deleteGradient = useCallback((id: string) => {
    setCustomGradients(prev => prev.filter(g => g.id !== id));
  }, []);

  return {
    gradient,
    gradientStyle,
    customGradients,        // Добавляем
    addColorPoint,
    updateColor,
    updatePosition,
    removeColorPoint,
    updateAngle,
    updateType,
    updateName,
    saveGradient,
    deleteGradient,         // Добавляем
  };
};