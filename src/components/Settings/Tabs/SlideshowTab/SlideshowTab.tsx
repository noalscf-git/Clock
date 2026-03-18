import React from 'react';
import { TRANSITION_EFFECTS, INTERVAL_OPTIONS } from '../../../../utils/constants/transitions';
import { SlideshowTabProps } from './types';
import styles from './SlideshowTab.module.css';

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
  onStart,
  onStop
}) => {
  const [minInterval, maxInterval] = randomIntervalRange.split(',').map(Number);
  const basicEffects = TRANSITION_EFFECTS.slice(0, 8);
  const advancedEffects = TRANSITION_EFFECTS.slice(8);

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
            <optgroup label="Базовые эффекты">
              {basicEffects.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </optgroup>
            <optgroup label="Продвинутые эффекты">
              {advancedEffects.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </optgroup>
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
            <span>Случайный эффект перехода (из 20 эффектов)</span>
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
            onClick={onStart}
            disabled={isActive}
          >
            {isActive ? '▶ Активно...' : '▶ Старт'}
          </button>
          <button 
            className={`${styles.slideshowBtn} ${styles.stop}`} 
            onClick={onStop}
            disabled={!isActive}
          >
            ⏹ Стоп
          </button>
        </div>
        
        <div className={styles.currentStatus} style={{color: isActive ? '#4caf50' : 'rgba(255,255,255,0.7)'}}>
          Статус: {isActive ? 'активно' : 'остановлено'}
          {isActive && ' (сохраняется после перезагрузки)'}
        </div>

        <div className={styles.effectsPreview}>
          <h5>Доступные эффекты ({TRANSITION_EFFECTS.length}):</h5>
          <div className={styles.effectsGrid}>
            {TRANSITION_EFFECTS.map(effect => (
              <div key={effect.value} className={styles.effectBadge}>
                {effect.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};