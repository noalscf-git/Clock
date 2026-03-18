import React from 'react';
import { MetricItem } from './MetricItem';
import { useSystemMonitor } from '../../../hooks/useSystemMonitor';
import { SystemMonitorProps } from './types';
import styles from './SystemMonitor.module.css';

export const SystemMonitor: React.FC<SystemMonitorProps> = ({
  className,
  fontFamily,
  textColor,
  glowIntensity,
  borderOpacity,
  size = 'medium'
}) => {
  const { metrics } = useSystemMonitor(2000);

  const sizes = {
    small: { padding: '10px', borderRadius: '12px', gap: '8px' },
    medium: { padding: '12px', borderRadius: '14px', gap: '10px' },
    large: { padding: '16px', borderRadius: '16px', gap: '14px' }
  }[size];

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
        <MetricItem 
          icon="🖥️"
          value={metrics.cpu.usage}
          color="#4CAF50"
          temperature={metrics.cpu.temperature}
          fontFamily={fontFamily}
          textColor={textColor}
          glowIntensity={glowIntensity}
          size={size}
        />
        <MetricItem 
          icon="🎮"
          value={metrics.gpu.usage}
          color="#9C27B0"
          temperature={metrics.gpu.temperature}
          fontFamily={fontFamily}
          textColor={textColor}
          glowIntensity={glowIntensity}
          size={size}
        />
      </div>
    </div>
  );
};