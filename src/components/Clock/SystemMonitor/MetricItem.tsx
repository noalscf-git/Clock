import React from 'react';
import { MetricItemProps } from './types';
import styles from './SystemMonitor.module.css';

export const MetricItem: React.FC<MetricItemProps> = ({
  icon,
  value,
  unit = '%',
  color,
  temperature,
  fontFamily,
  textColor,
  glowIntensity,
  size
}) => {
  const sizes = {
    small: { icon: '16px', value: '12px', barHeight: '2px', gap: '8px' },
    medium: { icon: '18px', value: '14px', barHeight: '3px', gap: '10px' },
    large: { icon: '22px', value: '16px', barHeight: '4px', gap: '14px' }
  }[size];

  return (
    <div className={styles.metricItem} style={{ gap: sizes.gap }}>
      <span 
        className={styles.metricIcon}
        style={{ 
          fontSize: sizes.icon,
          color: textColor,
          textShadow: `0 0 ${5 * glowIntensity / 100}px ${textColor}`,
          minWidth: `calc(${sizes.icon} * 1.5)`,
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
              fontSize: sizes.value,
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
              fontSize: `calc(${sizes.value} - 2px)`,
              color: `rgba(255, 255, 255, ${0.5 + glowIntensity/200})`,
            }}
          >
            {temperature}°C
          </div>
        )}
      </div>
    </div>
  );
};