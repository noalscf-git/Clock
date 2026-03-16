// src/components/Settings/AnimatedBackgroundTab.tsx - добавляем кнопки выбора
import React from 'react';
import { ANIMATED_BACKGROUNDS, ANIMATION_SPEEDS } from '../../utils/constants';
import type { AnimatedBackground } from '../../types';
import styles from './SettingsPanel.module.css';

interface AnimatedBackgroundTabProps {
  settings: AnimatedBackground;
  onSettingsChange: (settings: AnimatedBackground) => void;
  onSelect?: () => void; // Добавляем проп для выбора анимации
}

export const AnimatedBackgroundTab: React.FC<AnimatedBackgroundTabProps> = ({
  settings,
  onSettingsChange,
  onSelect
}) => {
  const updateSetting = <K extends keyof AnimatedBackground>(
    key: K,
    value: AnimatedBackground[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const handleTypeSelect = (type: string) => {
    updateSetting('type', type as any);
    // При выборе типа автоматически применяем анимацию
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div className={styles.tabContent}>
      <div className={styles.animatedSettings}>
        <h4>Тип анимации</h4>
        <div className={styles.animationGrid}>
          {ANIMATED_BACKGROUNDS.map(anim => (
            <div
              key={anim.id}
              className={`${styles.animationCard} ${settings.type === anim.id ? styles.active : ''}`}
              onClick={() => handleTypeSelect(anim.id)}
            >
              <div className={styles.animationIcon}>{anim.icon}</div>
              <div className={styles.animationName}>{anim.name}</div>
              <div className={styles.animationDesc}>{anim.description}</div>
            </div>
          ))}
        </div>

        <h4>Скорость анимации</h4>
        <div className={styles.speedControl}>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={settings.speed}
            onChange={(e) => {
              updateSetting('speed', parseFloat(e.target.value));
              if (onSelect) onSelect();
            }}
            className={styles.speedSlider}
          />
          <div className={styles.speedLabels}>
            {ANIMATION_SPEEDS.map(s => (
              <span 
                key={s.value}
                className={settings.speed >= s.value - 0.25 && settings.speed <= s.value + 0.25 ? styles.activeSpeed : ''}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>

        <h4>Интенсивность</h4>
        <div className={styles.intensityControl}>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.intensity}
            onChange={(e) => {
              updateSetting('intensity', parseInt(e.target.value));
              if (onSelect) onSelect();
            }}
            className={styles.intensitySlider}
          />
          <span className={styles.intensityValue}>{settings.intensity}%</span>
        </div>

        <h4>Плотность</h4>
        <div className={styles.densityControl}>
          <input
            type="range"
            min="1"
            max="100"
            value={settings.density}
            onChange={(e) => {
              updateSetting('density', parseInt(e.target.value));
              if (onSelect) onSelect();
            }}
            className={styles.densitySlider}
          />
          <span className={styles.densityValue}>{settings.density}%</span>
        </div>

        <h4>Цветовая схема</h4>
        <div className={styles.colorControls}>
          <div className={styles.colorPicker}>
            <label>Основной цвет</label>
            <input
              type="color"
              value={settings.color1}
              onChange={(e) => {
                updateSetting('color1', e.target.value);
                if (onSelect) onSelect();
              }}
            />
          </div>
          
          <div className={styles.colorPicker}>
            <label>Вторичный цвет</label>
            <input
              type="color"
              value={settings.color2}
              onChange={(e) => {
                updateSetting('color2', e.target.value);
                if (onSelect) onSelect();
              }}
            />
          </div>

          {(settings.type === 'aurora' || settings.type === 'gradient') && (
            <div className={styles.colorPicker}>
              <label>Третичный цвет</label>
              <input
                type="color"
                value={settings.color3 || settings.color1}
                onChange={(e) => {
                  updateSetting('color3', e.target.value);
                  if (onSelect) onSelect();
                }}
              />
            </div>
          )}
        </div>

        <button 
          className={styles.applyButton}
          onClick={onSelect}
        >
          ✅ Применить анимацию
        </button>

        <div className={styles.previewNote}>
          🎨 Анимация отображается в реальном времени
        </div>
      </div>
    </div>
  );
};