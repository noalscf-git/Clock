// src/features/settings/ui/SettingsPanel/AnimatedTab.tsx
import React from 'react';
import { ANIMATED_BACKGROUNDS, ANIMATION_SPEEDS } from '@/shared/config/constants';
import type { AnimatedTabProps } from '../../model/types';
import styles from './SettingsPanel.module.css';

export const AnimatedTab: React.FC<AnimatedTabProps> = ({
  settings,
  onSettingsChange,
  onSelect,
}) => {
  const updateSetting = <K extends keyof typeof settings>(
    key: K,
    value: typeof settings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className={styles.tabContent}>
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Тип анимации</h4>
        <div className={styles.animationGrid}>
          {ANIMATED_BACKGROUNDS.map((anim) => (
            <div
              key={anim.id}
              className={`${styles.animationCard} ${
                settings.type === anim.id ? styles.active : ''
              }`}
              onClick={() => {
                updateSetting('type', anim.id as any);
                onSelect();
              }}
            >
              <div className={styles.animationIcon}>{anim.icon}</div>
              <div className={styles.animationName}>{anim.name}</div>
              <div className={styles.animationDesc}>{anim.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Скорость анимации</h4>
        <div className={styles.speedControl}>
          <input
            type="range"
            className={styles.rangeInput}
            min="0.5"
            max="3"
            step="0.1"
            value={settings.speed}
            onChange={(e) => {
              updateSetting('speed', parseFloat(e.target.value));
              onSelect();
            }}
          />
          <div className={styles.speedLabels}>
            {ANIMATION_SPEEDS.map((s) => (
              <span
                key={s.value}
                className={settings.speed >= s.value - 0.25 && settings.speed <= s.value + 0.25 ? styles.activeSpeed : ''}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Интенсивность</h4>
        <div className={styles.intensityControl}>
          <input
            type="range"
            className={styles.rangeInput}
            min="0"
            max="100"
            value={settings.intensity}
            onChange={(e) => {
              updateSetting('intensity', parseInt(e.target.value));
              onSelect();
            }}
          />
          <span className={styles.value}>{settings.intensity}%</span>
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Плотность</h4>
        <div className={styles.densityControl}>
          <input
            type="range"
            className={styles.rangeInput}
            min="1"
            max="100"
            value={settings.density}
            onChange={(e) => {
              updateSetting('density', parseInt(e.target.value));
              onSelect();
            }}
          />
          <span className={styles.value}>{settings.density}%</span>
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Цвета</h4>
        <div className={styles.colorControls}>
          <div className={styles.colorPicker}>
            <label>Основной</label>
            <input
              type="color"
              value={settings.color1}
              onChange={(e) => {
                updateSetting('color1', e.target.value);
                onSelect();
              }}
            />
          </div>
          <div className={styles.colorPicker}>
            <label>Вторичный</label>
            <input
              type="color"
              value={settings.color2}
              onChange={(e) => {
                updateSetting('color2', e.target.value);
                onSelect();
              }}
            />
          </div>
          {(settings.type === 'aurora' || settings.type === 'gradient') && (
            <div className={styles.colorPicker}>
              <label>Третичный</label>
              <input
                type="color"
                value={settings.color3 || settings.color1}
                onChange={(e) => {
                  updateSetting('color3', e.target.value);
                  onSelect();
                }}
              />
            </div>
          )}
        </div>
      </div>

      <button className={styles.applyButton} onClick={onSelect}>
        ✅ Применить анимацию
      </button>
    </div>
  );
};