// src/shared/ui/TabButton/TabButton.tsx
import React from 'react';
import styles from './TabButton.module.css';

interface TabButtonProps {
  label: string;
  icon?: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const TabButton: React.FC<TabButtonProps> = ({
  label,
  icon,
  isActive,
  onClick,
  className = '',
  disabled = false,
}) => {
  return (
    <button
      className={`
        ${styles.tab}
        ${isActive ? styles.active : ''}
        ${disabled ? styles.disabled : ''}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{label}</span>
    </button>
  );
};