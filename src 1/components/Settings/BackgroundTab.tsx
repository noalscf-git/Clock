// src/components/Settings/BackgroundTab.tsx - убеждаемся что функция определена
import React, { useRef, useState } from 'react';
import { GRADIENTS } from '../../utils/constants';
import { ImageGrid } from '../common/ImageGrid';
import { GradientEditor } from './GradientEditor';
import { useGradientEditor } from '../../hooks/useGradientEditor';
import type { FolderImage, GradientKey, CustomGradient } from '../../types';
import styles from './SettingsPanel.module.css';

interface BackgroundTabProps {
  backgroundType: 'gradient' | 'folder' | 'custom';
  currentBackground: string;
  folderImages: FolderImage[];
  folderPath: string;
  onGradientSelect: (gradient: GradientKey) => void;
  onCustomGradientSelect: (gradient: CustomGradient) => void; // Обязательный проп
  onFolderSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageSelect: (image: FolderImage) => void;
}

export const BackgroundTab: React.FC<BackgroundTabProps> = ({
  backgroundType,
  currentBackground,
  folderImages,
  folderPath,
  onGradientSelect,
  onCustomGradientSelect,
  onFolderSelect,
  onImageSelect
}) => {
  const folderInputRef = useRef<HTMLInputElement>(null);
  const [showEditor, setShowEditor] = useState(false);
  
  const {
    customGradients,
    currentGradient,
    addColorPoint,
    removeColorPoint,
    updateColor,
    updatePosition,
    updateAngle,
    updateType,
    updateName,
    saveGradient,
    loadGradient,
    deleteGradient,
    getGradientStyle
  } = useGradientEditor();

  const handleSaveGradient = () => {
    const saved = saveGradient();
    if (onCustomGradientSelect) { // Проверяем что функция существует
      onCustomGradientSelect(saved);
    } else {
      console.error('onCustomGradientSelect is not defined');
    }
    setShowEditor(false);
  };

  return (
    <div className={styles.tabContent}>
      <div className={styles.backgroundSettings}>
        <h4>Выбор папки с изображениями</h4>
        <div className={styles.folderSelector}>
          <input 
            type="file" 
            ref={folderInputRef}
            webkitdirectory="true" 
            directory="true" 
            multiple 
            style={{ display: 'none' }}
            onChange={onFolderSelect}
          />
          <button 
            className={styles.folderBtn} 
            onClick={() => folderInputRef.current?.click()}
          >
            📁 Выбрать папку
          </button>
          <span className={styles.folderPath}>{folderPath || 'Папка не выбрана'}</span>
        </div>
        
        {folderImages.length > 0 && (
          <div className={styles.folderImages}>
            <h5>Изображения в папке:</h5>
            <ImageGrid 
              images={folderImages}
              selectedImage={backgroundType === 'folder' ? currentBackground : undefined}
              onImageSelect={onImageSelect}
            />
          </div>
        )}
        
        <h4>Готовые градиенты</h4>
        <div className={styles.presetGrid}>
          {(Object.keys(GRADIENTS) as GradientKey[]).map(key => (
            <div
              key={key}
              className={`${styles.presetItem} ${backgroundType === 'gradient' && currentBackground === key ? styles.active : ''}`}
              onClick={() => onGradientSelect(key)}
            >
              <div className={`${styles.presetPreview} ${styles[`gradient-${key.slice(-1)}`]}`}></div>
              <span>Градиент {key.slice(-1)}</span>
            </div>
          ))}
        </div>

        <h4>Свои градиенты</h4>
        {customGradients.length > 0 && (
          <div className={styles.customGradients}>
            {customGradients.map(gradient => (
              <div
                key={gradient.id}
                className={`${styles.customGradientItem} ${backgroundType === 'custom' && currentBackground === gradient.id ? styles.active : ''}`}
                onClick={() => onCustomGradientSelect(gradient)}
              >
                <div 
                  className={styles.customGradientPreview}
                  style={{ background: getGradientStyle(gradient) }}
                />
                <span>{gradient.name}</span>
                <button 
                  className={styles.deleteGradient}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteGradient(gradient.id);
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <button 
          className={styles.createGradientBtn}
          onClick={() => setShowEditor(!showEditor)}
        >
          {showEditor ? '✕ Закрыть редактор' : '🎨 Создать свой градиент'}
        </button>

        {showEditor && (
          <GradientEditor
            gradient={currentGradient}
            onUpdateColor={updateColor}
            onUpdatePosition={updatePosition}
            onUpdateAngle={updateAngle}
            onUpdateType={updateType}
            onUpdateName={updateName}
            onAddColor={addColorPoint}
            onRemoveColor={removeColorPoint}
            onSave={handleSaveGradient}
          />
        )}
      </div>
    </div>
  );
};