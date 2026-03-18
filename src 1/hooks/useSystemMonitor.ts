import { useState, useEffect, useCallback } from 'react';

export interface SystemMetrics {
  cpu: {
    usage: number; // 0-100
    temperature?: number;
  };
  gpu: {
    usage: number; // 0-100
    temperature?: number;
  };
}

// Генерация реалистичных данных (для демо)
const generateSimulatedMetrics = (): SystemMetrics => {
  return {
    cpu: {
      usage: Math.floor(Math.random() * 40 + 20), // 20-60%
      temperature: Math.floor(Math.random() * 30 + 50), // 50-80°C
    },
    gpu: {
      usage: Math.floor(Math.random() * 50 + 10), // 10-60%
      temperature: Math.floor(Math.random() * 25 + 55), // 55-80°C
    },
  };
};

export const useSystemMonitor = (updateInterval: number = 2000) => {
  const [metrics, setMetrics] = useState<SystemMetrics>(generateSimulatedMetrics());

  const updateMetrics = useCallback(() => {
    setMetrics(generateSimulatedMetrics());
  }, []);

  useEffect(() => {
    const interval = setInterval(updateMetrics, updateInterval);
    return () => clearInterval(interval);
  }, [updateInterval, updateMetrics]);

  return {
    metrics,
  };
};