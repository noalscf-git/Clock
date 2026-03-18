import React from 'react';
import { FullscreenHintProps } from './types';
import styles from './FullscreenHint.module.css';

export const FullscreenHint: React.FC<FullscreenHintProps> = ({ show }) => {
  return (
    <div className={`${styles.hint} ${show ? styles.show : ''}`}>
      Нажмите ESC для выхода из полноэкранного режима
    </div>
  );
};