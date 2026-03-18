// src/entities/image/ui/ImageGrid.tsx
import React from 'react';
import { ImageItem } from './ImageItem';
import type { ImageGridProps } from '../model/types';
import styles from './ImageGrid.module.css';

export const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  selectedImageId,
  onImageSelect,
  className = '',
}) => {
  if (images.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Нет изображений</p>
        <p className={styles.emptyHint}>Выберите папку с изображениями</p>
      </div>
    );
  }

  return (
    <div className={`${styles.grid} ${className}`}>
      {images.map((image) => (
        <ImageItem
          key={image.id}
          image={image}
          isSelected={selectedImageId === image.id.toString()}
          onSelect={() => onImageSelect(image)}
        />
      ))}
    </div>
  );
};