// src/components/common/TabButton.tsx
import React from 'react';
import styles from './TabButton.module.css';

interface TabButtonProps {
  label: string;
  icon?: string;
  isActive: boolean;
  onClick: () => void;
}

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