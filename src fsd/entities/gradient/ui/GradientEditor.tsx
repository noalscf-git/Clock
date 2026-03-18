// src/entities/gradient/ui/GradientEditor.tsx
import React from 'react';
import { GradientPreview } from './GradientPreview';
import { useGradientEditor } from '../model/useGradientEditor';
import type { GradientEditorProps } from '../model/types';
import styles from './GradientEditor.module.css';

const COLOR_PALETTE = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
  '#F8C471', '#82E0AA', '#F1948A', '#AED6F1', '#D7BDE2',
  '#F0B27A', '#7DCEA0', '#F5B7B1', '#E8DAEF', '#F9E79F',
];

export const GradientEditor: React.FC<GradientEditorProps> = ({
  initialGradient,
  onSave,
  onCancel,
}) => {
  const {
    gradient,
    gradientStyle,
    addColorPoint,
    updateColor,
    updatePosition,
    removeColorPoint,
    updateAngle,
    updateType,
    updateName,
    saveGradient,
  } = useGradientEditor(initialGradient);

  const handleSave = () => {
    const saved = saveGradient();
    onSave(saved);
  };

  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <input
          type="text"
          className={styles.nameInput}
          value={gradient.name}
          onChange={(e) => updateName(e.target.value)}
          placeholder="Название градиента"
        />
        <div className={styles.actions}>
          {onCancel && (
            <button className={styles.cancelButton} onClick={onCancel}>
              Отмена
            </button>
          )}
          <button className={styles.saveButton} onClick={handleSave}>
            Сохранить
          </button>
        </div>
      </div>

      <GradientPreview gradient={gradient} className={styles.preview} />

      <div className={styles.controls}>
        <div className={styles.typeSelector}>
          <label className={styles.radio}>
            <input
              type="radio"
              checked={gradient.type === 'linear'}
              onChange={() => updateType('linear')}
            />
            <span>Линейный</span>
          </label>
          <label className={styles.radio}>
            <input
              type="radio"
              checked={gradient.type === 'radial'}
              onChange={() => updateType('radial')}
            />
            <span>Радиальный</span>
          </label>
        </div>

        {gradient.type === 'linear' && (
          <div className={styles.angleControl}>
            <label>Угол: {gradient.angle}°</label>
            <input
              type="range"
              min="0"
              max="360"
              value={gradient.angle}
              onChange={(e) => updateAngle(Number(e.target.value))}
              className={styles.angleSlider}
            />
          </div>
        )}
      </div>

      <div className={styles.colorPoints}>
        <h4 className={styles.subtitle}>Цветовые точки</h4>
        <div className={styles.pointsList}>
          {gradient.colors.map((color, index) => (
            <div key={color.id} className={styles.colorPoint}>
              <input
                type="color"
                value={color.color}
                onChange={(e) => updateColor(color.id, e.target.value)}
                className={styles.colorInput}
              />
              <div className={styles.positionControl}>
                <span>{color.position}%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={color.position}
                  onChange={(e) => updatePosition(color.id, Number(e.target.value))}
                  className={styles.positionSlider}
                />
              </div>
              {gradient.colors.length > 2 && (
                <button
                  className={styles.removeButton}
                  onClick={() => removeColorPoint(color.id)}
                  title="Удалить"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {gradient.colors.length < 8 && (
          <button className={styles.addButton} onClick={addColorPoint}>
            + Добавить цвет
          </button>
        )}
      </div>

      <div className={styles.palette}>
        <h4 className={styles.subtitle}>Палитра</h4>
        <div className={styles.colorGrid}>
          {COLOR_PALETTE.map((color, index) => (
            <div
              key={`${color}-${index}`}
              className={styles.paletteColor}
              style={{ backgroundColor: color }}
              onClick={() => {
                if (gradient.colors.length < 8) {
                  addColorPoint();
                  setTimeout(() => {
                    const lastColor = gradient.colors[gradient.colors.length - 1];
                    if (lastColor) {
                      updateColor(lastColor.id, color);
                    }
                  }, 0);
                }
              }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};