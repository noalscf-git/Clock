// src/hooks/useGradientEditor.ts - добавляем начальное состояние
import { useState, useCallback } from 'react';
import type { GradientColor, CustomGradient } from '../types';
import { useLocalStorage } from './useLocalStorage';

const DEFAULT_GRADIENT: CustomGradient = {
  id: '',
  name: 'Новый градиент',
  colors: [
    { id: '1', color: '#0b0b1f', position: 0 },
    { id: '2', color: '#1a1a2f', position: 100 }
  ],
  angle: 135,
  type: 'linear'
};

export const useGradientEditor = () => {
  const [customGradients, setCustomGradients] = useLocalStorage<CustomGradient[]>('customGradients', []);
  const [currentGradient, setCurrentGradient] = useState<CustomGradient>(DEFAULT_GRADIENT);

  const addColorPoint = useCallback(() => {
    if (currentGradient.colors.length >= 8) return;
    
    // Находим среднюю позицию между двумя существующими точками
    const positions = currentGradient.colors.map(c => c.position).sort((a, b) => a - b);
    let newPosition = 50;
    
    for (let i = 0; i < positions.length - 1; i++) {
      if (positions[i + 1] - positions[i] > 10) {
        newPosition = Math.floor((positions[i] + positions[i + 1]) / 2);
        break;
      }
    }
    
    const newColor: GradientColor = {
      id: `color-${Date.now()}-${Math.random()}`,
      color: '#667eea',
      position: newPosition
    };
    
    const newColors = [...currentGradient.colors, newColor].sort((a, b) => a.position - b.position);
    setCurrentGradient({ ...currentGradient, colors: newColors });
  }, [currentGradient]);

  const removeColorPoint = useCallback((id: string) => {
    if (currentGradient.colors.length <= 2) return;
    
    const newColors = currentGradient.colors.filter(c => c.id !== id);
    setCurrentGradient({ ...currentGradient, colors: newColors });
  }, [currentGradient]);

  const updateColor = useCallback((id: string, color: string) => {
    const newColors = currentGradient.colors.map(c => 
      c.id === id ? { ...c, color } : c
    );
    setCurrentGradient({ ...currentGradient, colors: newColors });
  }, [currentGradient]);

  const updatePosition = useCallback((id: string, position: number) => {
    const newColors = currentGradient.colors.map(c => 
      c.id === id ? { ...c, position } : c
    ).sort((a, b) => a.position - b.position);
    setCurrentGradient({ ...currentGradient, colors: newColors });
  }, [currentGradient]);

  const updateAngle = useCallback((angle: number) => {
    setCurrentGradient({ ...currentGradient, angle });
  }, [currentGradient]);

  const updateType = useCallback((type: 'linear' | 'radial') => {
    setCurrentGradient({ ...currentGradient, type });
  }, [currentGradient]);

  const updateName = useCallback((name: string) => {
    setCurrentGradient({ ...currentGradient, name });
  }, [currentGradient]);

  const saveGradient = useCallback(() => {
    const gradientToSave = {
      ...currentGradient,
      id: currentGradient.id || `gradient-${Date.now()}-${Math.random()}`
    };
    
    const existingIndex = customGradients.findIndex(g => g.id === gradientToSave.id);
    
    if (existingIndex >= 0) {
      const newGradients = [...customGradients];
      newGradients[existingIndex] = gradientToSave;
      setCustomGradients(newGradients);
    } else {
      setCustomGradients([...customGradients, gradientToSave]);
    }
    
    return gradientToSave;
  }, [currentGradient, customGradients, setCustomGradients]);

  const loadGradient = useCallback((gradient: CustomGradient) => {
    setCurrentGradient(gradient);
  }, []);

  const deleteGradient = useCallback((id: string) => {
    setCustomGradients(customGradients.filter(g => g.id !== id));
  }, [customGradients, setCustomGradients]);

  const getGradientStyle = useCallback((gradient: CustomGradient): string => {
    if (!gradient || !gradient.colors || gradient.colors.length === 0) {
      return 'linear-gradient(135deg, #0b0b1f, #1a1a2f)';
    }
    
    const colorStops = gradient.colors
      .map(c => `${c.color} ${c.position}%`)
      .join(', ');
    
    if (gradient.type === 'radial') {
      return `radial-gradient(circle at center, ${colorStops})`;
    }
    return `linear-gradient(${gradient.angle}deg, ${colorStops})`;
  }, []);

  return {
    customGradients,
    currentGradient,
    addColorPoint,
    removeColorPoint,
    updateColor,
    updatePosition,
    updateAngle,
    updateType,
    updateName,
    saveGradient,
    loadGradient,
    deleteGradient,
    getGradientStyle
  };
};