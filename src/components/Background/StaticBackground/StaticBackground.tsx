import React from 'react';
import styles from './StaticBackground.module.css';

interface StaticBackgroundProps {
  background: string;
  isVisible: boolean;
  transitionEffect?: string;
  className?: string;
}

export const StaticBackground: React.FC<StaticBackgroundProps> = ({
  background,
  isVisible,
  transitionEffect,
  className
}) => {
  const isGradient = (bg: string): boolean => {
    return bg.startsWith('linear-gradient') || bg.startsWith('radial-gradient');
  };

  const getStyle = (): React.CSSProperties => {
    if (isGradient(background)) {
      return { background };
    }
    return {
      backgroundImage: `url('${background}')`,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
  };

  const transitionClass = transitionEffect ? `${transitionEffect}Transition` : '';

  return (
    <div
      className={`${styles.backgroundLayer} ${!isVisible ? styles.hidden : ''} 
        ${transitionClass} ${className || ''}`}
      style={getStyle()}
    />
  );
};