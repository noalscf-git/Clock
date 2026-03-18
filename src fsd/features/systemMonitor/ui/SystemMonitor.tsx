// src/features/systemMonitor/ui/SystemMonitor.tsx
import React, { useMemo } from 'react';
import { useSystemMonitor } from '../model/useSystemMonitor';
import type { SystemMonitorProps, MonitorSize } from '../model/types';
import styles from './SystemMonitor.module.css';

const SIZE_CONFIG: Record<MonitorSize, { 
  padding: string;
  gap: string;
  iconSize: string;
  fontSize: string;
  valueSize: string;
  barHeight: string;
  borderRadius: string;
}> = {
  small: {
    padding: '8px',
    gap: '6px',
    iconSize: '14px',
    fontSize: '9px',
    valueSize: '11px',
    barHeight: '2px',
    borderRadius: '8px',
  },
  medium: {
    padding: '12px',
    gap: '10px',
    iconSize: '18px',
    fontSize: '11px',
    valueSize: '14px',
    barHeight: '3px',
    borderRadius: '12px',
  },
  large: {
    padding: '16px',
    gap: '14px',
    iconSize: '22px',
    fontSize: '13px',
    valueSize: '16px',
    barHeight: '4px',
    borderRadius: '16px',
  },
};

// Функция для определения цвета в зависимости от значения
const getValueColor = (value: number): string => {
  if (value < 30) return '#4CAF50'; // зеленый
  if (value < 60) return '#FFC107'; // желтый
  if (value < 85) return '#FF9800'; // оранжевый
  return '#F44336'; // красный
};

// Форматирование температуры
const formatTemperature = (temp?: number): string => {
  if (temp === undefined) return '--°C';
  return `${Math.round(temp)}°C`;
};

export const SystemMonitor: React.FC<SystemMonitorProps> = ({
  size = 'medium',
  showLabels = false,
  showTemperature = true,
  className = '',
  fontFamily = 'Orbitron',
  textColor = '#00ffff',
  glowIntensity = 40,
  borderOpacity = 0.3,
}) => {
  const { metrics, isLoading, error } = useSystemMonitor(2000);
  const sizes = SIZE_CONFIG[size];

  // Вычисляем стиль свечения
  const glowStyle = useMemo(() => {
    const glow = glowIntensity / 100;
    return {
      textShadow: `0 0 ${5 * glow}px ${textColor}, 0 0 ${10 * glow}px ${textColor}`,
    };
  }, [textColor, glowIntensity]);

  // Компонент метрики
  const MetricItem = ({
    icon,
    label,
    value,
    temperature,
    unit = '%',
  }: {
    icon: string;
    label: string;
    value: number;
    temperature?: number;
    unit?: string;
  }) => {
    const color = getValueColor(value);
    
    return (
      <div className={styles.metricItem} style={{ gap: sizes.gap }}>
        <span 
          className={styles.metricIcon}
          style={{ 
            fontSize: sizes.iconSize,
            color: textColor,
            ...glowStyle,
            minWidth: `calc(${sizes.iconSize} * 1.5)`,
          }}
        >
          {icon}
        </span>
        
        <div className={styles.metricContent}>
          {showLabels && (
            <div 
              className={styles.metricLabel}
              style={{ 
                fontSize: sizes.fontSize,
                color: `rgba(255, 255, 255, 0.7)`,
              }}
            >
              {label}
            </div>
          )}
          
          <div className={styles.metricValueWrapper}>
            <span 
              className={styles.metricValue}
              style={{ 
                color: textColor,
                fontSize: sizes.valueSize,
                fontFamily,
                ...glowStyle,
                minWidth: '45px',
              }}
            >
              {Math.round(value)}{unit}
            </span>
            
            <div 
              className={styles.metricBar} 
              style={{ 
                height: sizes.barHeight,
                background: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <div 
                className={styles.metricFill} 
                style={{ 
                  width: `${value}%`,
                  background: color,
                  boxShadow: `0 0 8px ${color}`,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>

          {showTemperature && temperature !== undefined && (
            <div 
              className={styles.metricTemp}
              style={{ 
                fontSize: `calc(${sizes.fontSize} - 1px)`,
                color: `rgba(255, 255, 255, 0.5)`,
              }}
            >
              🌡️ {formatTemperature(temperature)}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Стили для контейнера
  const containerStyle = {
    background: `rgba(0, 0, 0, ${borderOpacity})`,
    backdropFilter: 'blur(5px)',
    border: `1px solid rgba(255, 255, 255, ${borderOpacity * 0.5})`,
    padding: sizes.padding,
    borderRadius: sizes.borderRadius,
    fontFamily,
  };

  // Если ошибка, показываем упрощенный вариант
  if (error) {
    return (
      <div 
        className={`${styles.monitor} ${styles.error} ${className}`}
        style={containerStyle}
      >
        <span className={styles.errorIcon}>⚠️</span>
        <span className={styles.errorText}>Ошибка мониторинга</span>
      </div>
    );
  }

  return (
    <div 
      className={`${styles.monitor} ${styles[size]} ${className} ${isLoading ? styles.loading : ''}`}
      style={containerStyle}
    >
      <div className={styles.metricsGrid} style={{ gap: sizes.gap }}>
        {/* CPU */}
        <MetricItem
          icon="🖥️"
          label="CPU"
          value={metrics.cpu.usage}
          temperature={metrics.cpu.temperature}
        />

        {/* GPU */}
        <MetricItem
          icon="🎮"
          label="GPU"
          value={metrics.gpu.usage}
          temperature={metrics.gpu.temperature}
        />
      </div>

      {/* Дополнительная информация при большом размере */}
      {size === 'large' && (
        <div className={styles.additionalInfo}>
          {metrics.cpu.cores && (
            <div className={styles.infoChip}>
              <span>⚡ {metrics.cpu.cores} ядер</span>
            </div>
          )}
          {metrics.gpu.name && (
            <div className={styles.infoChip}>
              <span>🎯 {metrics.gpu.name}</span>
            </div>
          )}
        </div>
      )}

      {/* Индикатор загрузки */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner} />
        </div>
      )}
    </div>
  );
};