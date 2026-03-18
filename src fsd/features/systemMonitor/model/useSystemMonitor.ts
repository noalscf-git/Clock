// src/features/systemMonitor/model/useSystemMonitor.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import type { SystemMetrics, SystemMonitorViewModel } from './types';

// Генерация реалистичных демо-данных
const generateSimulatedMetrics = (): SystemMetrics => {
  // Базовые значения с естественными колебаниями
  const baseCPUUsage = 25 + Math.random() * 30; // 25-55%
  const baseGPUsage = 15 + Math.random() * 40;   // 15-55%
  
  // Температура зависит от загрузки
  const cpuTemp = 45 + baseCPUUsage * 0.5 + Math.random() * 5;
  const gpuTemp = 40 + baseGPUsage * 0.6 + Math.random() * 5;

  return {
    cpu: {
      usage: Math.min(99, Math.round(baseCPUUsage * 10) / 10),
      temperature: Math.round(cpuTemp * 10) / 10,
      cores: 8,
      frequency: 3200 + Math.floor(Math.random() * 400),
    },
    gpu: {
      usage: Math.min(99, Math.round(baseGPUsage * 10) / 10),
      temperature: Math.round(gpuTemp * 10) / 10,
      memory: 20 + Math.floor(Math.random() * 40),
      name: 'NVIDIA RTX 3060',
    },
    timestamp: Date.now(),
  };
};

// Попытка получить реальные данные через API (если доступно)
const getRealMetrics = async (): Promise<SystemMetrics | null> => {
  // В браузере нет прямого доступа к системным метрикам
  // Но можно попробовать использовать experimental API
  if ('getSystemMetrics' in navigator) {
    try {
      // @ts-ignore - experimental API
      const metrics = await navigator.getSystemMetrics();
      return metrics;
    } catch (error) {
      console.warn('Failed to get system metrics:', error);
    }
  }
  return null;
};

export const useSystemMonitor = (
  updateInterval: number = 2000,
  useRealData: boolean = false
): SystemMonitorViewModel => {
  const [metrics, setMetrics] = useState<SystemMetrics>(generateSimulatedMetrics());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const intervalRef = useRef<NodeJS.Timeout>();
  const isMounted = useRef(true);

  const updateMetrics = useCallback(async () => {
    if (!isMounted.current) return;

    try {
      setIsLoading(true);
      
      if (useRealData) {
        const realMetrics = await getRealMetrics();
        if (realMetrics && isMounted.current) {
          setMetrics(realMetrics);
          setError(null);
        } else {
          // Fallback к симулированным данным
          setMetrics(generateSimulatedMetrics());
        }
      } else {
        // Всегда используем симулированные данные для демо
        setMetrics(generateSimulatedMetrics());
        setError(null);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err instanceof Error ? err.message : 'Ошибка получения метрик');
        // Fallback к симулированным данным при ошибке
        setMetrics(generateSimulatedMetrics());
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [useRealData]);

  // Ручное обновление
  const refresh = useCallback(() => {
    updateMetrics();
  }, [updateMetrics]);

  // Автоматическое обновление по интервалу
  useEffect(() => {
    isMounted.current = true;
    
    // Первое обновление
    updateMetrics();

    // Устанавливаем интервал
    intervalRef.current = setInterval(updateMetrics, updateInterval);

    return () => {
      isMounted.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [updateInterval, updateMetrics]);

  return {
    metrics,
    isLoading,
    error,
    refresh,
  };
};