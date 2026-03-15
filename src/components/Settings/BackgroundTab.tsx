// src/components/Settings/BackgroundTab.tsx
import React, { useRef } from 'react';
import { GRADIENTS } from '../../utils/constants';
import { ImageGrid } from '../common/ImageGrid';

import styles from './SettingsPanel.module.css';
import type { FolderImage, GradientKey } from '../../types';


interface BackgroundTabProps {
  backgroundType: 'gradient' | 'folder';
  currentBackground: string;
  folderImages: FolderImage[];
  folderPath: string;
  onGradientSelect: (gradient: GradientKey) => void;
  onFolderSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageSelect: (image: FolderImage) => void;
}

export const BackgroundTab: React.FC<BackgroundTabProps> = ({
  backgroundType,
  currentBackground,
  folderImages,
  folderPath,
  onGradientSelect,
  onFolderSelect,
  onImageSelect
}) => {
  const folderInputRef = useRef<HTMLInputElement>(null);

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
      </div>
    </div>
  );
};