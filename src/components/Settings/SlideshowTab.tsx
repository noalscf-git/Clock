// src/components/Settings/SlideshowTab.tsx - добавляем индикатор активного слайд-шоу
import React from 'react';
import { TRANSITION_EFFECTS, INTERVAL_OPTIONS } from '../../utils/constants';
import styles from './SettingsPanel.module.css';

interface SlideshowTabProps {
  isActive: boolean;
  effect: string;
  interval: string;
  randomEffect: boolean;
  randomInterval: boolean;
  randomIntervalRange: string;
  shuffleImages: boolean;
  onEffectChange: (effect: string) => void;
  onIntervalChange: (interval: string) => void;
  onRandomEffectChange: (checked: boolean) => void;
  onRandomIntervalChange: (checked: boolean) => void;
  onRandomIntervalRangeChange: (range: string) => void;
  onShuffleImagesChange: (checked: boolean) => void;
  onStartSlideshow: () => void;
  onStopSlideshow: () => void;
}

export const SlideshowTab: React.FC<SlideshowTabProps> = ({
  isActive,
  effect,
  interval,
  randomEffect,
  randomInterval,
  randomIntervalRange,
  shuffleImages,
  onEffectChange,
  onIntervalChange,
  onRandomEffectChange,
  onRandomIntervalChange,
  onRandomIntervalRangeChange,
  onShuffleImagesChange,
  onStartSlideshow,
  onStopSlideshow
}) => {
  const [minInterval, maxInterval] = randomIntervalRange.split(',').map(Number);

  return (
    <div className={styles.tabContent}>
      <div className={styles.slideshowSettings}>
        {isActive && (
          <div className={styles.activeWarning}>
            ⚡ Слайд-шоу активно. Изменение настроек может повлиять на воспроизведение.
          </div>
        )}

        <label className={styles.settingItem}>
          <span>Эффект перехода:</span>
          <select 
            value={effect}
            onChange={(e) => onEffectChange(e.target.value)}
            disabled={randomEffect}
          >
            {TRANSITION_EFFECTS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
        
        <label className={styles.settingItem}>
          <span>Интервал смены:</span>
          <select 
            value={interval}
            onChange={(e) => onIntervalChange(e.target.value)}
            disabled={randomInterval}
          >
            {INTERVAL_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
        
        <div className={styles.randomOptions}>
          <label>
            <input 
              type="checkbox" 
              checked={randomEffect}
              onChange={(e) => onRandomEffectChange(e.target.checked)}
            /> 
            <span>Случайный эффект перехода</span>
          </label>
          
          <label>
            <input 
              type="checkbox" 
              checked={randomInterval}
              onChange={(e) => onRandomIntervalChange(e.target.checked)}
            /> 
            <span>Случайный интервал</span>
          </label>
          
          {randomInterval && (
            <>
              <div className={styles.randomIntervalControl}>
                <span>{minInterval}</span>
                <input 
                  type="range" 
                  min="3" 
                  max="60" 
                  value={randomIntervalRange}
                  onChange={(e) => onRandomIntervalRangeChange(e.target.value)}
                  step="1"
                />
                <span>{maxInterval}</span>
              </div>
              <div className={styles.hint}>
                Диапазон случайного интервала (секунд)
              </div>
            </>
          )}
        </div>
        
        <div className={`${styles.settingItem} ${styles.checkbox}`}>
          <label>
            <input 
              type="checkbox" 
              checked={shuffleImages}
              onChange={(e) => onShuffleImagesChange(e.target.checked)}
            /> 
            <span>Случайный порядок изображений</span>
          </label>
        </div>
        
        <div className={styles.slideshowControls}>
          <button 
            className={`${styles.slideshowBtn} ${isActive ? styles.active : ''}`} 
            onClick={onStartSlideshow}
            disabled={isActive}
          >
            {isActive ? '▶ Активно...' : '▶ Старт'}
          </button>
          <button 
            className={`${styles.slideshowBtn} ${styles.stop}`} 
            onClick={onStopSlideshow}
            disabled={!isActive}
          >
            ⏹ Стоп
          </button>
        </div>
        
        <div className={styles.currentStatus} style={{color: isActive ? '#4caf50' : 'rgba(255,255,255,0.7)'}}>
          Статус: {isActive ? 'активно' : 'остановлено'}
          {isActive && ' (сохраняется после перезагрузки)'}
        </div>
      </div>
    </div>
  );
};