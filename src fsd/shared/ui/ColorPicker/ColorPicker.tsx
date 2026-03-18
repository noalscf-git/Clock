// src/shared/ui/ColorPicker/ColorPicker.tsx
import React, { useState } from 'react';
import { COLOR_PRESETS } from '../../config/constants';
import styles from './ColorPicker.module.css';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  className = '',
}) => {
  const [customColor, setCustomColor] = useState(value);

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    onChange(newColor);
  };

  return (
    <div className={`${styles.picker} ${className}`}>
      <div className={styles.presets}>
        {COLOR_PRESETS.map(({ color, name }) => (
          <button
            key={color}
            className={`${styles.preset} ${value === color ? styles.active : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            title={name}
          />
        ))}
      </div>

      <div className={styles.custom}>
        <label className={styles.label}>
          <span>Свой цвет:</span>
          <input
            type="color"
            value={customColor}
            onChange={handleCustomColorChange}
            className={styles.input}
          />
        </label>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  );
};