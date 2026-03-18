// src/shared/ui/FullscreenHint/FullscreenHint.tsx
import React from 'react';
import styles from './FullscreenHint.module.css';

interface FullscreenHintProps {
  show: boolean;
  message?: string;
  className?: string;
}

export const FullscreenHint: React.FC<FullscreenHintProps> = ({
  show,
  message = 'Нажмите ESC для выхода из полноэкранного режима',
  className = '',
}) => {
  return (
    <div className={`${styles.hint} ${show ? styles.show : ''} ${className}`}>
      <span className={styles.icon}>🔍</span>
      <span className={styles.message}>{message}</span>
    </div>
  );
};