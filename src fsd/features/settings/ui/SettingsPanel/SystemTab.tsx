// src/features/settings/ui/SettingsPanel/SystemTab.tsx
import React from 'react';
import type { SystemTabProps } from '../../model/types';
import styles from './SettingsPanel.module.css';

export const SystemTab: React.FC<SystemTabProps> = ({
  showSystemMonitor,
  monitorSize,
  onShowSystemMonitorChange,
  onMonitorSizeChange,
}) => {
  return (
    <div className={styles.tabContent}>
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Системный монитор</h4>
        
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={showSystemMonitor}
            onChange={(e) => onShowSystemMonitorChange(e.target.checked)}
          />
          <span>Показывать системный монитор</span>
        </label>

        {showSystemMonitor && (
          <div className={styles.monitorSizeControl}>
            <span className={styles.label}>Размер:</span>
            <div className={styles.sizeButtons}>
              <button
                className={`${styles.sizeButton} ${monitorSize === 'small' ? styles.active : ''}`}
                onClick={() => onMonitorSizeChange('small')}
              >
                Маленький
              </button>
              <button
                className={`${styles.sizeButton} ${monitorSize === 'medium' ? styles.active : ''}`}
                onClick={() => onMonitorSizeChange('medium')}
              >
                Средний
              </button>
              <button
                className={`${styles.sizeButton} ${monitorSize === 'large' ? styles.active : ''}`}
                onClick={() => onMonitorSizeChange('large')}
              >
                Большой
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.infoBox}>
        <h5 className={styles.infoTitle}>ℹ️ О мониторе</h5>
        <p className={styles.infoText}>
          Показывает основные метрики системы в реальном времени:
        </p>
        <ul className={styles.metricsList}>
          <li>🖥️ Загрузка CPU + температура</li>
          <li>🎮 Загрузка GPU + температура</li>
          <li>⚡ Частота процессора</li>
          <li>💾 Использование памяти GPU</li>
        </ul>
        <p className={styles.note}>
          <strong>Примечание:</strong> В браузере используются симулированные данные.
          Цвета и свечение наследуются от настроек часов.
        </p>
      </div>
    </div>
  );
};