import React from 'react';
import styles from './LoadingOverlay.module.css';

interface LoadingOverlayProps {
  progress: number;
  isRestoring?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ progress, isRestoring }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.spinner} />
        <div className={styles.text}>
          {isRestoring ? 'Восстановление слайд-шоу...' : `Загрузка изображений... ${progress}%`}
        </div>
        {!isRestoring && (
          <div className={styles.bar}>
            <div className={styles.progress} style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </div>
  );
};