// src/features/slideshow/ui/SlideshowControls.tsx
import React from 'react';
import type { SlideshowControlsProps } from '../model/types';
import styles from './SlideshowControls.module.css';

const INTERVAL_OPTIONS = [
  { value: '3', label: '3 секунды' },
  { value: '5', label: '5 секунд' },
  { value: '10', label: '10 секунд' },
  { value: '30', label: '30 секунд' },
  { value: '60', label: '1 минута' },
  { value: '300', label: '5 минут' },
  { value: '600', label: '10 минут' },
  { value: '1200', label: '20 минут' },
  { value: '1800', label: '30 минут' },
  { value: '3600', label: '1 час' },
];

const EFFECT_OPTIONS = [
  { value: 'fade', label: 'Плавное появление', group: 'Базовые' },
  { value: 'slide', label: 'Скольжение', group: 'Базовые' },
  { value: 'zoom', label: 'Увеличение', group: 'Базовые' },
  { value: 'blur', label: 'Размытие', group: 'Базовые' },
  { value: 'flip', label: 'Переворот', group: 'Базовые' },
  { value: 'rotate', label: 'Вращение', group: 'Базовые' },
  { value: 'bounce', label: 'Подпрыгивание', group: 'Базовые' },
  { value: 'flash', label: 'Вспышка', group: 'Базовые' },
  { value: 'darken', label: 'Затемнение', group: 'Продвинутые' },
  { value: 'desaturate', label: 'Выцветание', group: 'Продвинутые' },
  { value: 'horizontal-blur', label: 'Горизонтальное размытие', group: 'Продвинутые' },
  { value: 'curtain', label: 'Шторка', group: 'Продвинутые' },
  { value: 'xflip', label: 'Переворот по X', group: 'Продвинутые' },
  { value: 'diagonal-rotate', label: 'Диагональное вращение', group: 'Продвинутые' },
  { value: 'wave', label: 'Волна', group: 'Продвинутые' },
  { value: 'lightning', label: 'Молния', group: 'Продвинутые' },
  { value: 'kaleidoscope', label: 'Калейдоскоп', group: 'Продвинутые' },
  { value: 'pulse', label: 'Пульсация', group: 'Продвинутые' },
  { value: 'rainbow', label: 'Радуга', group: 'Продвинутые' },
  { value: 'dissolve', label: 'Растворение', group: 'Продвинутые' },
];

// Группируем эффекты
const groupedEffects = EFFECT_OPTIONS.reduce((acc, effect) => {
  if (!acc[effect.group]) {
    acc[effect.group] = [];
  }
  acc[effect.group].push(effect);
  return acc;
}, {} as Record<string, typeof EFFECT_OPTIONS>);

export const SlideshowControls: React.FC<SlideshowControlsProps> = ({
  isActive,
  effect,
  interval,
  randomEffect,
  randomInterval,
  randomIntervalRange,
  shuffleImages,
  imagesCount,
  onEffectChange,
  onIntervalChange,
  onRandomEffectChange,
  onRandomIntervalChange,
  onRandomIntervalRangeChange,
  onShuffleImagesChange,
  onStartSlideshow,
  onStopSlideshow,
  onNextImage,
  onPrevImage,
}) => {
  const [minInterval, maxInterval] = randomIntervalRange.split(',').map(Number);

  return (
    <div className={styles.controls}>
      {isActive && (
        <div className={styles.activeWarning}>
          ⚡ Слайд-шоу активно. Изменение настроек может повлиять на воспроизведение.
        </div>
      )}

      {/* Эффект перехода */}
      <div className={styles.controlGroup}>
        <label className={styles.label}>
          Эффект перехода:
        </label>
        <select
          className={styles.select}
          value={effect}
          onChange={(e) => onEffectChange(e.target.value as any)}
          disabled={randomEffect || isActive}
        >
          {Object.entries(groupedEffects).map(([group, effects]) => (
            <optgroup key={group} label={group}>
              {effects.map(e => (
                <option key={e.value} value={e.value}>
                  {e.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={randomEffect}
            onChange={(e) => onRandomEffectChange(e.target.checked)}
            disabled={isActive}
          />
          <span>Случайный эффект (из 20)</span>
        </label>
      </div>

      {/* Интервал */}
      <div className={styles.controlGroup}>
        <label className={styles.label}>
          Интервал смены:
        </label>
        <select
          className={styles.select}
          value={interval}
          onChange={(e) => onIntervalChange(e.target.value)}
          disabled={randomInterval || isActive}
        >
          {INTERVAL_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={randomInterval}
            onChange={(e) => onRandomIntervalChange(e.target.checked)}
            disabled={isActive}
          />
          <span>Случайный интервал</span>
        </label>

        {randomInterval && (
          <div className={styles.rangeControl}>
            <span className={styles.rangeValue}>{minInterval}с</span>
            <input
              type="range"
              className={styles.range}
              min="3"
              max="60"
              value={randomIntervalRange}
              onChange={(e) => onRandomIntervalRangeChange(e.target.value)}
              step="1"
              disabled={isActive}
            />
            <span className={styles.rangeValue}>{maxInterval}с</span>
          </div>
        )}
      </div>

      {/* Дополнительные настройки */}
      <div className={styles.controlGroup}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={shuffleImages}
            onChange={(e) => onShuffleImagesChange(e.target.checked)}
            disabled={isActive}
          />
          <span>Случайный порядок изображений</span>
        </label>
      </div>

      {/* Кнопки управления */}
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.button} ${styles.startButton} ${isActive ? styles.active : ''}`}
          onClick={onStartSlideshow}
          disabled={isActive || imagesCount === 0}
        >
          {isActive ? '▶ Активно...' : '▶ Старт'}
        </button>
        
        <button
          className={`${styles.button} ${styles.stopButton}`}
          onClick={onStopSlideshow}
          disabled={!isActive}
        >
          ⏹ Стоп
        </button>

        {onNextImage && onPrevImage && (
          <>
            <button
              className={`${styles.button} ${styles.navButton}`}
              onClick={onPrevImage}
              disabled={!isActive || imagesCount === 0}
              title="Предыдущее"
            >
              ⏪
            </button>
            <button
              className={`${styles.button} ${styles.navButton}`}
              onClick={onNextImage}
              disabled={!isActive || imagesCount === 0}
              title="Следующее"
            >
              ⏩
            </button>
          </>
        )}
      </div>

      {/* Статус */}
      <div className={styles.status}>
        <div className={`${styles.statusIndicator} ${isActive ? styles.active : ''}`} />
        <span>
          Статус: {isActive ? 'активно' : 'остановлено'}
          {imagesCount === 0 && ' (нет изображений)'}
        </span>
      </div>

      {/* Информация о количестве эффектов */}
      <div className={styles.info}>
        <span className={styles.infoIcon}>ℹ️</span>
        <span>Доступно 20 эффектов перехода</span>
      </div>
    </div>
  );
};