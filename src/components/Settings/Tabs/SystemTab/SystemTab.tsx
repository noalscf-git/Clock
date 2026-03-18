import React from 'react';
import { SystemTabProps } from './types';
import styles from './SystemTab.module.css';

export const SystemTab: React.FC<SystemTabProps> = ({
  showMonitor,
  monitorSize,
  onShowMonitorChange,
  onMonitorSizeChange,
}) => {
  return (
    <div className={styles.tabContent}>
      <div className={styles.systemSettings}>
        <h4>Системный монитор</h4>
        
        <div className={`${styles.settingItem} ${styles.checkbox}`}>
          <label>
            <input 
              type="checkbox" 
              checked={showMonitor}
              onChange={(e) => onShowMonitorChange(e.target.checked)}
            /> 
            <span>Показывать системный монитор</span>
          </label>
        </div>

        {showMonitor && (
          <div className={styles.settingItem}>
            <span>Размер монитора:</span>
            <div className={styles.sizePresets}>
              <button
                className={`${styles.sizePreset} ${monitorSize === 'small' ? styles.active : ''}`}
                onClick={() => onMonitorSizeChange('small')}
              >
                Маленький
              </button>
              <button
                className={`${styles.sizePreset} ${monitorSize === 'medium' ? styles.active : ''}`}
                onClick={() => onMonitorSizeChange('medium')}
              >
                Средний
              </button>
              <button
                className={`${styles.sizePreset} ${monitorSize === 'large' ? styles.active : ''}`}
                onClick={() => onMonitorSizeChange('large')}
              >
                Большой
              </button>
            </div>
          </div>
        )}

        <div className={styles.infoBox}>
          <h5>ℹ️ О мониторе</h5>
          <p>Показывает 4 основные метрики:</p>
          <ul className={styles.metricList}>
            <li>🖥️ Загрузка CPU + температура</li>
            <li>🌡️ Температура CPU</li>
            <li>🎮 Загрузка GPU + температура</li>
            <li>🔥 Температура GPU</li>
          </ul>
          <p className={styles.note}>
            <strong>Настройки:</strong> Шрифт, цвет и свечение наследуются от часов.
            Позиция фиксирована под часами.
          </p>
        </div>
      </div>
    </div>
  );
};