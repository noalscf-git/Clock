// src/shared/ui/LoadingOverlay/LoadingOverlay.tsx
import React from 'react';
import styles from './LoadingOverlay.module.css';

interface LoadingOverlayProps {
  progress?: number;
  message?: string;
  className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  progress,
  message = 'Загрузка...',
  className = '',
}) => {
  return (
    <div className={`${styles.overlay} ${className}`}>
      <div className={styles.content}>
        <div className={styles.spinner} />
        
        {message && <p className={styles.message}>{message}</p>}
        
        {progress !== undefined && (
          <>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className={styles.progressText}>{progress}%</span>
          </>
        )}
      </div>
    </div>
  );
};