// src/components/common/ImageGrid.tsx
import React from 'react';

import styles from './ImageGrid.module.css';
import type { FolderImage } from '../../types';

interface ImageGridProps {
  images: FolderImage[];
  selectedImage?: string;
  onImageSelect: (image: FolderImage) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images, selectedImage, onImageSelect }) => {
  if (images.length === 0) {
    return <p className={styles.empty}>Нет изображений</p>;
  }

  return (
    <div className={styles.grid}>
      {images.map(img => (
        <div
          key={img.id}
          className={`${styles.imageItem} ${selectedImage === img.data ? styles.active : ''}`}
          onClick={() => onImageSelect(img)}
        >
          <img src={img.data} alt={img.name} />
        </div>
      ))}
    </div>
  );
};