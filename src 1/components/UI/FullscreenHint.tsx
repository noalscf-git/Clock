// src/components/UI/FullscreenHint.tsx
import React from 'react';
import styles from './FullscreenHint.module.css';

interface FullscreenHintProps {
  show: boolean;
}

export const FullscreenHint: React.FC<FullscreenHintProps> = ({ show }) => {
  return (
    <div className={`${styles.hint} ${show ? styles.show : ''}`}>
      Нажмите ESC для выхода из полноэкранного режима
    </div>
  );
};