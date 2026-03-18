// src/components/Settings/GradientEditor.tsx - исправленная версия
import React, { useEffect, useRef } from 'react';
import type { CustomGradient } from '../../types';
import { COLOR_PALETTE } from '../../utils/constants';
import styles from './GradientEditor.module.css';

interface GradientEditorProps {
  gradient: CustomGradient;
  onUpdateColor: (id: string, color: string) => void;
  onUpdatePosition: (id: string, position: number) => void;
  onUpdateAngle: (angle: number) => void;
  onUpdateType: (type: 'linear' | 'radial') => void;
  onUpdateName: (name: string) => void;
  onAddColor: () => void;
  onRemoveColor: (id: string) => void;
  onSave: () => void;
}

export const GradientEditor: React.FC<GradientEditorProps> = ({
  gradient,
  onUpdateColor,
  onUpdatePosition,
  onUpdateAngle,
  onUpdateType,
  onUpdateName,
  onAddColor,
  onRemoveColor,
  onSave
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Предпросмотр градиента с проверкой на существование gradient
  useEffect(() => {
    if (!gradient || !gradient.colors || gradient.colors.length === 0) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Очищаем canvas
    ctx.clearRect(0, 0, width, height);

    try {
      // Создаем градиент
      let gradientObj: CanvasGradient;
      
      if (gradient.type === 'radial') {
        gradientObj = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
      } else {
        const angle = (gradient.angle * Math.PI) / 180;
        const x1 = width/2 - Math.cos(angle) * width/2;
        const y1 = height/2 - Math.sin(angle) * height/2;
        const x2 = width/2 + Math.cos(angle) * width/2;
        const y2 = height/2 + Math.sin(angle) * height/2;
        gradientObj = ctx.createLinearGradient(x1, y1, x2, y2);
      }

      // Добавляем цветовые точки
      gradient.colors.forEach(c => {
        if (c && c.color && typeof c.position === 'number') {
          gradientObj.addColorStop(Math.max(0, Math.min(1, c.position / 100)), c.color);
        }
      });

      ctx.fillStyle = gradientObj;
      ctx.fillRect(0, 0, width, height);
    } catch (error) {
      console.error('Error drawing gradient:', error);
    }
  }, [gradient]);

  // Если градиент не определен, показываем заглушку
  if (!gradient) {
    return (
      <div className={styles.editor}>
        <p className={styles.error}>Градиент не загружен</p>
      </div>
    );
  }

  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <input
          type="text"
          value={gradient.name || 'Новый градиент'}
          onChange={(e) => onUpdateName(e.target.value)}
          className={styles.nameInput}
          placeholder="Название градиента"
        />
        <button onClick={onSave} className={styles.saveBtn}>
          💾 Сохранить
        </button>
      </div>

      <div className={styles.preview}>
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={100} 
          className={styles.previewCanvas}
        />
      </div>

      <div className={styles.controls}>
        <div className={styles.typeSelector}>
          <label>
            <input
              type="radio"
              checked={gradient.type === 'linear'}
              onChange={() => onUpdateType('linear')}
            />
            Линейный
          </label>
          <label>
            <input
              type="radio"
              checked={gradient.type === 'radial'}
              onChange={() => onUpdateType('radial')}
            />
            Радиальный
          </label>
        </div>

        {gradient.type === 'linear' && (
          <div className={styles.angleControl}>
            <label>Угол: {gradient.angle || 135}°</label>
            <input
              type="range"
              min="0"
              max="360"
              value={gradient.angle || 135}
              onChange={(e) => onUpdateAngle(Number(e.target.value))}
              className={styles.angleSlider}
            />
          </div>
        )}
      </div>

      <div className={styles.colorPoints}>
        <h4>Цветовые точки</h4>
        <div className={styles.pointsList}>
          {gradient.colors && gradient.colors.map((colorPoint, index) => (
            <div key={`${colorPoint.id}-${index}`} className={styles.colorPoint}>
              <input
                type="color"
                value={colorPoint.color || '#000000'}
                onChange={(e) => onUpdateColor(colorPoint.id, e.target.value)}
                className={styles.colorInput}
              />
              <div className={styles.positionControl}>
                <span>{colorPoint.position || 0}%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={colorPoint.position || 0}
                  onChange={(e) => onUpdatePosition(colorPoint.id, Number(e.target.value))}
                  className={styles.positionSlider}
                />
              </div>
              {gradient.colors.length > 2 && (
                <button
                  onClick={() => onRemoveColor(colorPoint.id)}
                  className={styles.removeBtn}
                  title="Удалить"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        
        {gradient.colors && gradient.colors.length < 8 && (
          <button onClick={onAddColor} className={styles.addBtn}>
            + Добавить цвет
          </button>
        )}
      </div>

      <div className={styles.palette}>
        <h4>Палитра</h4>
        <div className={styles.colorGrid}>
          {COLOR_PALETTE.map((color, index) => (
            <div
              key={`${color}-${index}`} // Уникальный ключ с индексом
              className={styles.paletteColor}
              style={{ backgroundColor: color }}
              onClick={() => {
                if (gradient.colors && gradient.colors.length < 8) {
                  onAddColor();
                  // Обновим последний добавленный цвет
                  setTimeout(() => {
                    const lastColor = gradient.colors[gradient.colors.length - 1];
                    if (lastColor) {
                      onUpdateColor(lastColor.id, color);
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