// src/widgets/ClockWidget/ClockWidget.tsx
import React from 'react';
import { ClockDisplay } from '@/features/clock/ui/ClockDisplay';
import { useClock } from '@/features/clock/model/useClock';
import { SystemMonitor } from '@/features/systemMonitor/ui/SystemMonitor';
import { useSettingsContext } from '@/app/providers/SettingsProvider';
import styles from './ClockWidget.module.css';

interface ClockWidgetProps {
  showMonitor?: boolean;
  className?: string;
}

export const ClockWidget: React.FC<ClockWidgetProps> = ({
  showMonitor: propShowMonitor,
  className = '',
}) => {
  const clock = useClock();
  const { showSystemMonitor, monitorSize } = useSettingsContext();

  // Используем проп или глобальную настройку
  const shouldShowMonitor = propShowMonitor !== undefined ? propShowMonitor : showSystemMonitor;

  return (
    <div className={`${styles.widget} ${className}`}>
      <ClockDisplay
        time={clock.time}
        clockStyle={clock.clockStyle}
        dateStyle={clock.dateStyle}
        wrapperStyle={clock.wrapperStyle}
      />

      {shouldShowMonitor && (
        <div className={styles.monitorWrapper}>
          <SystemMonitor
            size={monitorSize}
            fontFamily={clock.settings.fontFamily}
            textColor={clock.settings.color}
            glowIntensity={Number(clock.settings.glowIntensity)}
            borderOpacity={Number(clock.settings.borderOpacity)}
          />
        </div>
      )}
    </div>
  );
};