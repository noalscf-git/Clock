import React from 'react';
import { formatNumber, formatDate } from '../../../utils/helpers/format';
import { ClockDisplayProps } from './types';
import styles from './ClockDisplay.module.css';

export const ClockDisplay: React.FC<ClockDisplayProps> = ({ 
  time, 
  clockStyle, 
  dateStyle, 
  wrapperStyle 
}) => {
  return (
    <div className={styles.clockWrapper} style={wrapperStyle}>
      <div className={styles.digitalClock} style={clockStyle}>
        <span>{formatNumber(time.getHours())}</span>
        <span className={styles.colon}>:</span>
        <span>{formatNumber(time.getMinutes())}</span>
        <span className={styles.colon}>:</span>
        <span>{formatNumber(time.getSeconds())}</span>
      </div>
      <div className={styles.date} style={dateStyle}>
        {formatDate(time)}
      </div>
    </div>
  );
};