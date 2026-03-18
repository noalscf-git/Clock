// src/entities/image/ui/ImageItem.tsx
import React from 'react';
import type { ImageItemProps } from '../model/types';
import styles from './ImageGrid.module.css';

export const ImageItem: React.FC<ImageItemProps> = ({
  image,
  isSelected,
  onSelect,
  size = 'medium',
}) => {
  const handleClick = () => {
    if (image.data) {
      onSelect();
    }
  };

  const sizeClass = styles[size];

  return (
    <div
      className={`${styles.imageItem} ${sizeClass} ${isSelected ? styles.selected : ''}`}
      onClick={handleClick}
      title={image.name}
    >
      {image.data ? (
        <img src={image.data} alt={image.name} className={styles.image} />
      ) : (
        <div className={styles.placeholder}>
          <span className={styles.placeholderIcon}>📷</span>
          <span className={styles.placeholderText}>{image.name}</span>
        </div>
      )}
    </div>
  );
};