import React from 'react';
import { ColorPointProps } from './types';
import styles from './GradientEditor.module.css';

export const ColorPoint: React.FC<ColorPointProps> = ({
  id,
  color,
  position,
  onColorChange,
  onPositionChange,
  onRemove,
  canRemove
}) => {
  return (
    <div className={styles.colorPoint}>
      <input
        type="color"
        value={color}
        onChange={(e) => onColorChange(id, e.target.value)}
        className={styles.colorInput}
      />
      <div className={styles.positionControl}>
        <span>{position}%</span>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(e) => onPositionChange(id, Number(e.target.value))}
          className={styles.positionSlider}
        />
      </div>
      {canRemove && (
        <button
          onClick={() => onRemove(id)}
          className={styles.removeBtn}
          title="Удалить"
        >
          ✕
        </button>
      )}
    </div>
  );
};