// src/features/settings/ui/SettingsPanel/ClockTab.tsx
import React from 'react';
import { ColorPicker } from '@/shared/ui';
import { RangeSlider } from '@/shared/ui';
import { SIZE_PRESETS, FONT_PRESETS } from '@/features/clock/config/constants';
import type { ClockTabProps } from '../../model/types';
import styles from './SettingsPanel.module.css';

export const ClockTab: React.FC<ClockTabProps> = ({
  settings,
  onSettingChange,
}) => {
  return (
    <div className={styles.tabContent}>
      {/* Размер часов */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Размер часов</h4>
        <RangeSlider
          min={2}
          max={12}
          step={0.5}
          value={settings.size}
          onChange={(value) => onSettingChange('size', value)}
          valueSuffix="rem"
        />
        <div className={styles.presetButtons}>
          {SIZE_PRESETS.map((preset) => (
            <button
              key={preset.size}
              className={`${styles.presetButton} ${settings.size === preset.size ? styles.active : ''}`}
              onClick={() => onSettingChange('size', preset.size)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Шрифт */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Шрифт</h4>
        <select
          className={styles.select}
          value={settings.fontFamily}
          onChange={(e) => onSettingChange('fontFamily', e.target.value)}
        >
          {FONT_PRESETS.map((font) => (
            <option key={font.value} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>
        <div className={styles.fontPreview} style={{ fontFamily: settings.fontFamily }}>
          Пример: 12:34:56
        </div>
      </div>

      {/* Цвет */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Цвет часов</h4>
        <ColorPicker
          value={settings.color}
          onChange={(color) => onSettingChange('color', color)}
        />
      </div>

      {/* Интенсивность свечения */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Интенсивность свечения</h4>
        <RangeSlider
          min={0}
          max={100}
          value={settings.glowIntensity}
          onChange={(value) => onSettingChange('glowIntensity', value)}
          valueSuffix="%"
        />
      </div>

      {/* Прозрачность рамки */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Прозрачность рамки</h4>
        <RangeSlider
          min={0}
          max={1}
          step={0.1}
          value={settings.borderOpacity}
          onChange={(value) => onSettingChange('borderOpacity', value)}
          valueSuffix="%"
        />
      </div>

      {/* Предпросмотр текущих настроек */}
      <div className={styles.previewBox}>
        <h5 className={styles.previewTitle}>Текущие настройки</h5>
        <div className={styles.previewGrid}>
          <div className={styles.previewItem}>
            <span>Размер:</span>
            <span className={styles.previewValue}>{settings.size}rem</span>
          </div>
          <div className={styles.previewItem}>
            <span>Шрифт:</span>
            <span className={styles.previewValue}>{settings.fontFamily}</span>
          </div>
          <div className={styles.previewItem}>
            <span>Свечение:</span>
            <span className={styles.previewValue}>{settings.glowIntensity}%</span>
          </div>
          <div className={styles.previewItem}>
            <span>Рамка:</span>
            <span className={styles.previewValue}>{Number(settings.borderOpacity) * 100}%</span>
          </div>
        </div>
        <div 
          className={styles.previewColor}
          style={{ backgroundColor: settings.color }}
        />
      </div>
    </div>
  );
};