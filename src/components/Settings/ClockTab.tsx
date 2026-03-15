// src/components/Settings/ClockTab.tsx - добавляем выбор шрифта
import React from 'react';
import { RangeSlider } from '../common/RangeSlider';
import { ColorPicker } from '../common/ColorPicker';
import { SIZE_PRESETS, FONT_PRESETS } from '../../utils/constants';
import styles from './SettingsPanel.module.css';

interface ClockTabProps {
  clockSize: string;
  clockColor: string;
  glowIntensity: string;
  borderOpacity: string;
  fontFamily: string; // новый пропс
  onClockSizeChange: (size: string) => void;
  onClockColorChange: (color: string) => void;
  onGlowIntensityChange: (intensity: string) => void;
  onBorderOpacityChange: (opacity: string) => void;
  onFontFamilyChange: (font: string) => void; // новый пропс
}

export const ClockTab: React.FC<ClockTabProps> = ({
  clockSize,
  clockColor,
  glowIntensity,
  borderOpacity,
  fontFamily,
  onClockSizeChange,
  onClockColorChange,
  onGlowIntensityChange,
  onBorderOpacityChange,
  onFontFamilyChange
}) => {
  return (
    <div className={styles.tabContent}>
      <div className={styles.clockSettings}>
        <h4>Размер часов</h4>
        <div className={styles.clockSize}>
          <RangeSlider
            min={2}
            max={12}
            step={0.5}
            value={clockSize}
            onChange={onClockSizeChange}
            valueSuffix="rem"
          />
          
          <div className={styles.sizePresets}>
            {SIZE_PRESETS.map(preset => (
              <button
                key={preset.size}
                className={`${styles.sizePreset} ${clockSize === preset.size ? styles.active : ''}`}
                onClick={() => onClockSizeChange(preset.size)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
        
        <h4>Шрифт цифр</h4>
        <div className={styles.fontSelector}>
          <select 
            value={fontFamily} 
            onChange={(e) => onFontFamilyChange(e.target.value)}
            className={styles.fontSelect}
          >
            {FONT_PRESETS.map(font => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
          <div className={styles.fontPreview} style={{ fontFamily: fontFamily }}>
            Пример: 12:34:56
          </div>
        </div>
        
        <h4>Цвет часов</h4>
        <ColorPicker value={clockColor} onChange={onClockColorChange} />
        
        <h4>Интенсивность подсветки</h4>
        <RangeSlider
          min={0}
          max={100}
          value={glowIntensity}
          onChange={onGlowIntensityChange}
          valueSuffix="%"
        />
        
        <h4>Прозрачность рамки</h4>
        <RangeSlider
          min={0}
          max={1}
          step={0.1}
          value={borderOpacity}
          onChange={onBorderOpacityChange}
          valueSuffix="%"
        />
      </div>
    </div>
  );
};