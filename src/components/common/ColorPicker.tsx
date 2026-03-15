// src/components/common/ColorPicker.tsx
import React from 'react';
import { COLOR_PRESETS } from '../../utils/constants';
import styles from './ColorPicker.module.css';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  return (
    <div className={styles.colorPicker}>
      <div className={styles.presets}>
        {COLOR_PRESETS.map(({ color, name }) => (
          <div
            key={color}
            className={`${styles.colorPreset} ${value === color ? styles.active : ''}`}
            style={{ background: color, color: color === '#ffffff' ? '#000' : '#fff' }}
            onClick={() => onChange(color)}
          >
            {name}
          </div>
        ))}
      </div>
      
      <div className={styles.customColor}>
        <label>Свой цвет:</label>
        <input 
          type="color" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};