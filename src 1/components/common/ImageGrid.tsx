// src/components/common/ImageGrid.tsx - улучшаем обработку кликов
import React from 'react';
import type { FolderImage } from '../../types';
import styles from './ImageGrid.module.css';

interface ImageGridProps {
  images: FolderImage[];
  selectedImage?: string;
  onImageSelect: (image: FolderImage) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images, selectedImage, onImageSelect }) => {
  if (images.length === 0) {
    return <p className={styles.empty}>Нет изображений</p>;
  }

  const handleImageClick = (img: FolderImage) => {
    console.log('Image clicked:', img); // Для отладки
    if (img.data) {
      onImageSelect(img);
    } else {
      console.warn('Cannot select image without data');
    }
  };

  return (
    <div className={styles.grid}>
      {images.map(img => (
        <div
          key={img.id}
          className={`${styles.imageItem} ${selectedImage === img.data ? styles.active : ''}`}
          onClick={() => handleImageClick(img)}
        >
          {img.data ? (
            <img src={img.data} alt={img.name} />
          ) : (
            <div className={styles.placeholder}>
              <span>📷</span>
              <span className={styles.imageName}>{img.name}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};