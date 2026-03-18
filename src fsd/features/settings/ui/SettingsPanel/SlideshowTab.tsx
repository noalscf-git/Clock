// src/features/settings/ui/SettingsPanel/SlideshowTab.tsx
import React, { useEffect, useState, useRef } from 'react';
import styles from './SettingsPanel.module.css';
export const SlideshowTab: React.FC<SlideshowTabProps> = ({
  settings,
  isActive,
  imagesCount,
  onSettingChange,
  onStart,
  onStop,
}) => {
  // Используем ref для отслеживания исходит ли изменение от нас
  const isLocalChange = useRef(false);
  
  // Локальное состояние для UI
  const [localSettings, setLocalSettings] = useState(settings);

  // Синхронизация с пропсами ТОЛЬКО если изменение не от нас
  useEffect(() => {
    if (!isLocalChange.current) {
      console.log('📥 Received external settings update:', settings);
      setLocalSettings(settings);
    } else {
      console.log('🔄 Ignoring external update - change was local');
      isLocalChange.current = false;
    }
  }, [settings]);

  const handleCheckboxChange = (key: string, checked: boolean) => {
    console.log(`✅ Local checkbox change: ${key} = ${checked}`);
    
    // Помечаем, что изменение от нас
    isLocalChange.current = true;
    
    // Мгновенно обновляем UI
    setLocalSettings(prev => ({
      ...prev,
      [key]: checked
    }));
    
    // Отправляем изменение наверх
    onSettingChange(key, checked);
  };

  const handleSelectChange = (key: string, value: string) => {
    console.log(`✅ Local select change: ${key} = ${value}`);
    
    isLocalChange.current = true;
    
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    onSettingChange(key, value);
  };

  const handleRangeChange = (key: string, value: string) => {
    console.log(`✅ Local range change: ${key} = ${value}`);
    
    isLocalChange.current = true;
    
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    onSettingChange(key, value);
  };

  const handleStart = () => {
    console.log('▶️ Start clicked');
    onStart();
  };

  const handleStop = () => {
    console.log('⏹️ Stop clicked');
    onStop();
  };

  // Безопасное получение значений
  const safeSettings = {
    interval: localSettings?.interval || '5',
    effect: localSettings?.effect || 'fade',
    randomEffect: localSettings?.randomEffect || false,
    randomInterval: localSettings?.randomInterval || false,
    randomIntervalRange: localSettings?.randomIntervalRange || '5,30',
    shuffleImages: localSettings?.shuffleImages || false,
  };

  const [minInterval, maxInterval] = safeSettings.randomIntervalRange.split(',').map(Number);

  return (
    <div className={styles.tabContent}>
      {isActive && (
        <div className={styles.warning}>
          ⚡ Слайд-шоу активно. Изменение настроек может повлиять на воспроизведение.
        </div>
      )}

      {/* Эффект */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Эффект перехода</h4>
        <select
          className={styles.select}
          value={safeSettings.effect}
          onChange={(e) => handleSelectChange('effect', e.target.value)}
          disabled={safeSettings.randomEffect || isActive}
        >
          <optgroup label="Базовые эффекты">
            <option value="fade">Плавное появление</option>
            <option value="slide">Скольжение</option>
            <option value="zoom">Увеличение</option>
            <option value="blur">Размытие</option>
            <option value="flip">Переворот</option>
            <option value="rotate">Вращение</option>
            <option value="bounce">Подпрыгивание</option>
            <option value="flash">Вспышка</option>
          </optgroup>
          <optgroup label="Продвинутые эффекты">
            <option value="darken">Затемнение</option>
            <option value="desaturate">Выцветание</option>
            <option value="horizontal-blur">Горизонтальное размытие</option>
            <option value="curtain">Шторка</option>
            <option value="xflip">Переворот по X</option>
            <option value="diagonal-rotate">Диагональное вращение</option>
            <option value="wave">Волна</option>
            <option value="lightning">Молния</option>
            <option value="kaleidoscope">Калейдоскоп</option>
            <option value="pulse">Пульсация</option>
            <option value="rainbow">Радуга</option>
            <option value="dissolve">Растворение</option>
          </optgroup>
        </select>

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={safeSettings.randomEffect}
            onChange={(e) => handleCheckboxChange('randomEffect', e.target.checked)}
            disabled={isActive}
          />
          <span>Случайный эффект (из 20)</span>
        </label>
      </div>

      {/* Интервал */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Интервал смены</h4>
        <select
          className={styles.select}
          value={safeSettings.interval}
          onChange={(e) => handleSelectChange('interval', e.target.value)}
          disabled={safeSettings.randomInterval || isActive}
        >
          <option value="3">3 секунды</option>
          <option value="5">5 секунд</option>
          <option value="10">10 секунд</option>
          <option value="30">30 секунд</option>
          <option value="60">1 минута</option>
          <option value="300">5 минут</option>
          <option value="600">10 минут</option>
          <option value="1200">20 минут</option>
          <option value="1800">30 минут</option>
          <option value="3600">1 час</option>
        </select>

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={safeSettings.randomInterval}
            onChange={(e) => handleCheckboxChange('randomInterval', e.target.checked)}
            disabled={isActive}
          />
          <span>Случайный интервал</span>
        </label>

        {safeSettings.randomInterval && (
          <div className={styles.rangeControl}>
            <span className={styles.rangeValue}>{minInterval}с</span>
            <input
              type="range"
              className={styles.rangeInput}
              min="3"
              max="60"
              value={safeSettings.randomIntervalRange}
              onChange={(e) => handleRangeChange('randomIntervalRange', e.target.value)}
              step="1"
              disabled={isActive}
            />
            <span className={styles.rangeValue}>{maxInterval}с</span>
          </div>
        )}
      </div>

      {/* Дополнительно */}
      <div className={styles.section}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={safeSettings.shuffleImages}
            onChange={(e) => handleCheckboxChange('shuffleImages', e.target.checked)}
            disabled={isActive}
          />
          <span>Случайный порядок изображений</span>
        </label>
      </div>

      {/* Кнопки управления */}
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.button} ${styles.startButton} ${isActive ? styles.active : ''}`}
          onClick={handleStart}
          disabled={isActive || imagesCount === 0}
        >
          {isActive ? '▶ Активно...' : '▶ Старт'}
        </button>
        <button
          className={`${styles.button} ${styles.stopButton}`}
          onClick={handleStop}
          disabled={!isActive}
        >
          ⏹ Стоп
        </button>
      </div>

      {/* Статус */}
      <div className={styles.status}>
        <div className={`${styles.statusDot} ${isActive ? styles.active : ''}`} />
        <span>
          Статус: {isActive ? 'активно' : 'остановлено'}
          {imagesCount === 0 && ' (нет изображений)'}
        </span>
      </div>
    </div>
  );
};