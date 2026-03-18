import React from 'react';
import { RangeSlider } from '../../common/RangeSlider/RangeSlider';
import { ColorPicker } from '../../common/ColorPicker/ColorPicker';
import { SIZE_PRESETS, FONT_PRESETS } from '../../../../utils/constants';
import { ClockTabProps } from './types';
import styles from './ClockTab.module.css';

export const ClockTab: React.FC<ClockTabProps> = ({
  size,
  color,
  glowIntensity,
  borderOpacity,
  fontFamily,
  onSizeChange,
  onColorChange,
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
            value={size}
            onChange={onSizeChange}
            valueSuffix="rem"
          />
          
          <div className={styles.sizePresets}>
            {SIZE_PRESETS.map(preset => (
              <button
                key={preset.size}
                className={`${styles.sizePreset} ${size === preset.size ? styles.active : ''}`}
                onClick={() => onSizeChange(preset.size)}
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
        <ColorPicker value={color} onChange={onColorChange} />
        
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