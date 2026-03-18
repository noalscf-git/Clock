import React, { useRef, useState } from 'react';
import { ImageGrid } from '../../common/ImageGrid/ImageGrid';
import { GradientEditor } from '../../GradientEditor/GradientEditor';
import { useGradientEditor } from '../../../../hooks/useGradientEditor';
import { GRADIENTS } from '../../../../utils/constants/gradients';
import { BackgroundTabProps } from './types';
import { GradientKey } from '../../../../types/background';
import styles from './BackgroundTab.module.css';

export const BackgroundTab: React.FC<BackgroundTabProps> = ({
  type,
  currentValue,
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
    deleteGradient,
    getGradientStyle
  } = useGradientEditor();

  const handleSaveGradient = () => {
    const saved = saveGradient();
    onCustomGradientSelect(saved);
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
              selectedImage={type === 'folder' ? currentValue : undefined}
              onImageSelect={onImageSelect}
            />
          </div>
        )}
        
        <h4>Готовые градиенты</h4>
        <div className={styles.presetGrid}>
          {(Object.keys(GRADIENTS) as GradientKey[]).map(key => (
            <div
              key={key}
              className={`${styles.presetItem} ${type === 'gradient' && currentValue === key ? styles.active : ''}`}
              onClick={() => onGradientSelect(key)}
            >
              <div className={`${styles.presetPreview} ${styles[`gradient-${key.slice(-1)}`]}`} />
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
                className={`${styles.customGradientItem} ${type === 'custom' && currentValue === gradient.id ? styles.active : ''}`}
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