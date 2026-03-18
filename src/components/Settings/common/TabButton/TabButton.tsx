import React from 'react';
import { TabButtonProps } from './types';
import styles from './TabButton.module.css';

export const TabButton: React.FC<TabButtonProps> = ({ label, icon, isActive, onClick }) => {
  return (
    <button 
      className={`${styles.tabBtn} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {label}
    </button>
  );
};