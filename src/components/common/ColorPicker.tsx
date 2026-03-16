// src/components/common/ColorPicker.tsx - обновляем для поддержки большого списка
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
            style={{ 
              background: color,
              color: color === '#ffffff' || color === '#F0FFF0' || color === '#E0FFFF' || color === '#F0E68C' ? '#000' : '#fff',
              border: color === '#ffffff' ? '1px solid #ccc' : 'none'
            }}
            onClick={() => onChange(color)}
            title={name}
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