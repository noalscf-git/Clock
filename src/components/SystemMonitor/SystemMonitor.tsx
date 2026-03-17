import React, { useEffect } from 'react';
import { useSystemMonitor } from '../../hooks/useSystemMonitor';
import styles from './SystemMonitor.module.css';

interface SystemMonitorProps {
  className?: string;
  // Настройки от часов
  fontFamily: string;
  textColor: string;
  glowIntensity: number;
  borderOpacity: number;
  size: 'small' | 'medium' | 'large';
}

export const SystemMonitor: React.FC<SystemMonitorProps> = ({
  className,
  fontFamily,
  textColor,
  glowIntensity,
  borderOpacity,
  size
}) => {
  const { metrics } = useSystemMonitor(2000);

  // Отладка
  useEffect(() => {
    console.log('SystemMonitor size changed:', size);
  }, [size]);

  // Определяем размеры в зависимости от выбранного размера
  const getSizes = () => {
    switch(size) {
      case 'small':
        return {
          padding: '10px',
          gap: '8px',
          iconSize: '16px',
          fontSize: '10px',
          valueSize: '12px',
          barHeight: '2px',
          borderRadius: '12px',
        };
      case 'large':
        return {
          padding: '16px',
          gap: '14px',
          iconSize: '22px',
          fontSize: '12px',
          valueSize: '16px',
          barHeight: '4px',
          borderRadius: '16px',
        };
      default: // medium
        return {
          padding: '12px',
          gap: '10px',
          iconSize: '18px',
          fontSize: '11px',
          valueSize: '14px',
          barHeight: '3px',
          borderRadius: '14px',
        };
    }
  };

  const sizes = getSizes();

  // Компонент метрики (упрощенный)
  const MetricItem = ({ 
    icon, 
    value, 
    unit = '%',
    color,
    temperature
  }: { 
    icon: string; 
    value: number; 
    unit?: string;
    color: string;
    temperature?: number;
  }) => (
    <div className={styles.metricItem} style={{ gap: sizes.gap }}>
      <span 
        className={styles.metricIcon}
        style={{ 
          fontSize: sizes.iconSize,
          color: textColor,
          textShadow: `0 0 ${5 * glowIntensity / 100}px ${textColor}`,
          minWidth: `calc(${sizes.iconSize} * 1.5)`,
        }}
      >
        {icon}
      </span>
      
      <div className={styles.metricContent}>
        <div className={styles.metricValueWrapper}>
          <span 
            className={styles.metricValue}
            style={{ 
              color: textColor,
              fontSize: sizes.valueSize,
              fontFamily,
              textShadow: `0 0 ${8 * glowIntensity / 100}px ${textColor}`,
            }}
          >
            {value.toFixed(0)}{unit}
          </span>
          
          <div className={styles.metricBar} style={{ height: sizes.barHeight }}>
            <div 
              className={styles.metricFill} 
              style={{ 
                width: `${value}%`,
                background: color,
                boxShadow: `0 0 8px ${color}`,
              }}
            />
          </div>
        </div>

        {temperature !== undefined && (
          <div 
            className={styles.metricTemp}
            style={{ 
              fontSize: `calc(${sizes.fontSize} - 1px)`,
              color: `rgba(255, 255, 255, ${0.5 + glowIntensity/200})`,
            }}
          >
            {temperature}°C
          </div>
        )}
      </div>
    </div>
  );

  // Стили для контейнера
  const wrapperStyle = {
    background: `rgba(0, 0, 0, ${borderOpacity})`,
    backdropFilter: 'blur(5px)',
    border: `1px solid rgba(255, 255, 255, ${borderOpacity * 0.5})`,
    padding: sizes.padding,
    borderRadius: sizes.borderRadius,
  };

  return (
    <div 
      className={`${styles.systemMonitor} ${className || ''} ${styles[size]}`}
      style={wrapperStyle}
    >
      <div className={styles.metricsGrid} style={{ gap: sizes.gap }}>
        {/* CPU Usage + Temp */}
        <MetricItem 
          icon="🖥️"
          value={metrics.cpu.usage}
          color="#4CAF50"
          temperature={metrics.cpu.temperature}
        />

        {/* GPU Usage + Temp */}
        <MetricItem 
          icon="🎮"
          value={metrics.gpu.usage}
          color="#9C27B0"
          temperature={metrics.gpu.temperature}
        />
      </div>
    </div>
  );
};