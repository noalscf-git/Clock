import React, { useEffect, useRef } from 'react';
import { ColorPoint } from './ColorPoint';
import { GradientEditorProps } from './types';
import { COLOR_PALETTE } from '../../../utils/constants/colors';
import styles from './GradientEditor.module.css';

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

  useEffect(() => {
    if (!gradient?.colors?.length) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    try {
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

  if (!gradient) {
    return <div className={styles.editor}>Градиент не загружен</div>;
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
        <canvas ref={canvasRef} width={400} height={100} className={styles.previewCanvas} />
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
          {gradient.colors.map((colorPoint) => (
            <ColorPoint
              key={colorPoint.id}
              id={colorPoint.id}
              color={colorPoint.color}
              position={colorPoint.position}
              onColorChange={onUpdateColor}
              onPositionChange={onUpdatePosition}
              onRemove={onRemoveColor}
              canRemove={gradient.colors.length > 2}
            />
          ))}
        </div>
        
        {gradient.colors.length < 8 && (
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
              key={`${color}-${index}`}
              className={styles.paletteColor}
              style={{ backgroundColor: color }}
              onClick={() => {
                if (gradient.colors.length < 8) {
                  onAddColor();
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