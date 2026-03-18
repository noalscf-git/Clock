// src/features/settings/ui/SettingsPanel/BackgroundTab.tsx
import React, { useRef } from 'react';
import { GRADIENTS } from '@/shared/config/constants';
import type { BackgroundTabProps } from '../../model/types';
import styles from './SettingsPanel.module.css';

export const BackgroundTab: React.FC<BackgroundTabProps> = ({
  backgroundType,
  backgroundValue,
  folderImages,
  folderPath,
  customGradients,
  onGradientSelect,
  onCustomGradientSelect,
  onFolderSelect,
  onImageSelect,
  onSaveCustomGradient,
  onDeleteCustomGradient,
}) => {
  const folderInputRef = useRef<HTMLInputElement>(null);
  const gradientKeys = ['gradient1', 'gradient2', 'gradient3', 'gradient4', 'gradient5', 'gradient6'];

  // Обработчик клика по изображению
// Убедитесь что в функции handleImageClick есть console.log
const handleImageClick = (image: any) => {
  console.log('🖼️ BackgroundTab - image clicked:', {
    id: image.id,
    name: image.name,
    hasData: !!image.data,
    dataLength: image.data?.length
  });
  
  if (image?.data) {
    console.log('✅ BackgroundTab - calling onImageSelect');
    onImageSelect(image);
  } else {
    console.warn('❌ BackgroundTab - image has no data');
  }
};

  return (
    <div className={styles.tabContent}>
      {/* Выбор папки */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Изображения из папки</h4>
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
            className={styles.folderButton}
            onClick={() => folderInputRef.current?.click()}
          >
            📁 Выбрать папку
          </button>
          <span className={styles.folderPath}>
            {folderPath || 'Папка не выбрана'}
          </span>
        </div>

        {folderImages.length > 0 && (
          <div className={styles.imageGrid}>
            <h5 className={styles.subTitle}>
              Изображения ({folderImages.length})
            </h5>
            <div className={styles.grid}>
              {folderImages.map((img) => (
                <div
                  key={img.id}
                  className={`${styles.imageItem} ${
                    backgroundType === 'folder' && backgroundValue === img.id.toString() 
                      ? styles.active 
                      : ''
                  }`}
                  onClick={() => handleImageClick(img)}
                >
                  <img 
                    src={img.data} 
                    alt={img.name} 
                    className={styles.image}
                    title={img.name}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Готовые градиенты */}
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Готовые градиенты</h4>
        <div className={styles.gradientGrid}>
          {gradientKeys.map((key) => (
            <div
              key={key}
              className={`${styles.gradientItem} ${
                backgroundType === 'gradient' && backgroundValue === key ? styles.active : ''
              }`}
              onClick={() => onGradientSelect(key as any)}
            >
              <div
                className={styles.gradientPreview}
                style={{ background: GRADIENTS[key as keyof typeof GRADIENTS] }}
              />
              <span className={styles.gradientName}>
                Градиент {key.slice(-1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Свои градиенты */}
      {customGradients.length > 0 && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Свои градиенты</h4>
          <div className={styles.customGradients}>
            {customGradients.map((gradient) => (
              <div
                key={gradient.id}
                className={`${styles.customGradientItem} ${
                  backgroundType === 'custom' && backgroundValue === gradient.id ? styles.active : ''
                }`}
                onClick={() => onCustomGradientSelect(gradient)}
              >
                <div
                  className={styles.customGradientPreview}
                  style={{ background: gradient.style || 'linear-gradient(135deg, #667eea, #764ba2)' }}
                />
                <span className={styles.customGradientName}>{gradient.name}</span>
                <button
                  className={styles.deleteButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCustomGradient(gradient.id);
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};