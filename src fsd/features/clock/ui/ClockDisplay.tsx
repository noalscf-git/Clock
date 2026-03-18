// src/features/clock/ui/ClockDisplay.tsx
import React from 'react';
import { formatNumber, formatDate } from '@/shared/lib/helpers';
import styles from './ClockDisplay.module.css';

interface ClockDisplayProps {
  time: Date;
  clockStyle: React.CSSProperties;
  dateStyle: React.CSSProperties;
  wrapperStyle: React.CSSProperties;
}

export const ClockDisplay: React.FC<ClockDisplayProps> = ({
  time,
  clockStyle,
  dateStyle,
  wrapperStyle,
}) => {
  const hours = formatNumber(time.getHours());
  const minutes = formatNumber(time.getMinutes());
  const seconds = formatNumber(time.getSeconds());

  return (
    <div className={styles.wrapper} style={wrapperStyle}>
      <div className={styles.clock} style={clockStyle}>
        <span className={styles.digit}>{hours}</span>
        <span className={styles.colon}>:</span>
        <span className={styles.digit}>{minutes}</span>
        <span className={styles.colon}>:</span>
        <span className={styles.digit}>{seconds}</span>
      </div>
      <div className={styles.date} style={dateStyle}>
        {formatDate(time)}
      </div>
    </div>
  );
};