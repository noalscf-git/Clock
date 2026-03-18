// src/entities/gradient/ui/GradientPreview.tsx
import React, { useEffect, useRef } from 'react';
import type { GradientPreviewProps } from '../model/types';
import styles from './GradientEditor.module.css';

export const GradientPreview: React.FC<GradientPreviewProps> = ({
  gradient,
  width = 400,
  height = 100,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Очищаем canvas
    ctx.clearRect(0, 0, width, height);

    if (!gradient.colors.length) return;

    try {
      // Создаем градиент
      let gradientObj: CanvasGradient;

      if (gradient.type === 'radial') {
        gradientObj = ctx.createRadialGradient(
          width / 2, height / 2, 0,
          width / 2, height / 2, width / 2
        );
      } else {
        const angle = (gradient.angle * Math.PI) / 180;
        const x1 = width / 2 - Math.cos(angle) * width / 2;
        const y1 = height / 2 - Math.sin(angle) * height / 2;
        const x2 = width / 2 + Math.cos(angle) * width / 2;
        const y2 = height / 2 + Math.sin(angle) * height / 2;
        gradientObj = ctx.createLinearGradient(x1, y1, x2, y2);
      }

      // Добавляем цветовые точки
      gradient.colors
        .sort((a, b) => a.position - b.position)
        .forEach(c => {
          gradientObj.addColorStop(c.position / 100, c.color);
        });

      ctx.fillStyle = gradientObj;
      ctx.fillRect(0, 0, width, height);
    } catch (error) {
      console.error('Error drawing gradient:', error);
    }
  }, [gradient, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`${styles.previewCanvas} ${className}`}
    />
  );
};