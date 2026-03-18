// src/shared/ui/RangeSlider/RangeSlider.tsx
import React from 'react';
import styles from './RangeSlider.module.css';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: string | number;
  onChange: (value: string) => void;
  label?: string;
  valueSuffix?: string;
  className?: string;
  disabled?: boolean;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  valueSuffix = '',
  className = '',
  disabled = false,
}) => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {label && <span className={styles.label}>{label}</span>}
      
      <div className={styles.control}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={numericValue}
          onChange={handleChange}
          className={styles.slider}
          disabled={disabled}
        />
        
        <span className={styles.value}>
          {numericValue}
          {valueSuffix}
        </span>
      </div>

      <div className={styles.markers}>
        <span>{min}</span>
        <span>{Math.round((min + max) / 2)}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};