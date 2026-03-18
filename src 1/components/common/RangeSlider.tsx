// src/components/common/RangeSlider.tsx
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
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  valueSuffix = ''
}) => {
  return (
    <div className={styles.sliderContainer}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.control}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.slider}
        />
        <span className={styles.value}>
          {value}{valueSuffix}
        </span>
      </div>
    </div>
  );
};