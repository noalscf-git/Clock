// src/features/background/ui/BackgroundLayer.tsx
import React from 'react';
import type { BackgroundLayerProps } from '../model/types';
import styles from './BackgroundLayer.module.css';

// export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({
//   current,
//   next,
//   isTransitioning,
//   effect,
//   className = '',
// }) => {
//   // Безопасная проверка на градиент
//   const isGradient = (bg: string | undefined | null): boolean => {
//     if (!bg) return false;
//     return bg.startsWith('linear-gradient') || bg.startsWith('radial-gradient');
//   };

//   // Безопасное получение стилей
//   const getBackgroundStyle = (bg: string | undefined | null): React.CSSProperties => {
//     if (!bg) {
//       return {
//         background: '#0b0b1f', // цвет по умолчанию
//       };
//     }

//     if (isGradient(bg)) {
//       return { background: bg };
//     }
    
//     return {
//       backgroundImage: `url('${bg}')`,
//       backgroundAttachment: 'fixed',
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'no-repeat',
//     };
//   };

//   // Получаем класс анимации
//   const getTransitionClass = (effect: string): string => {
//     const effectMap: Record<string, string> = {
//       fade: styles.fadeTransition,
//       slide: styles.slideTransition,
//       zoom: styles.zoomTransition,
//       blur: styles.blurTransition,
//       flip: styles.flipTransition,
//       rotate: styles.rotateTransition,
//       bounce: styles.bounceTransition,
//       flash: styles.flashTransition,
//       darken: styles.darkenTransition,
//       desaturate: styles.desaturateTransition,
//       'horizontal-blur': styles.horizontalBlurTransition,
//       curtain: styles.curtainTransition,
//       xflip: styles.xflipTransition,
//       'diagonal-rotate': styles.diagonalRotateTransition,
//       wave: styles.waveTransition,
//       lightning: styles.lightningTransition,
//       kaleidoscope: styles.kaleidoscopeTransition,
//       pulse: styles.pulseTransition,
//       rainbow: styles.rainbowTransition,
//       dissolve: styles.dissolveTransition,
//     };
//     return effectMap[effect] || styles.fadeTransition;
//   };

//   // Если нет текущего фона, показываем заглушку
//   if (!current) {
//     return (
//       <div
//         className={`${styles.layer} ${className}`}
//         style={{ background: '#0b0b1f' }}
//       />
//     );
//   }

//   return (
//     <>
//       {/* Текущий фон */}
//       <div
//         className={`${styles.layer} ${next && isTransitioning ? styles.hidden : ''} ${className}`}
//         style={getBackgroundStyle(current)}
//       />
      
//       {/* Следующий фон (для анимации перехода) */}
//       {next && (
//         <div
//           className={`${styles.layer} ${getTransitionClass(effect)} ${className}`}
//           style={getBackgroundStyle(next)}
//         />
//       )}
//     </>
//   );
// };

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({
  current,
  next,
  isTransitioning,
  effect,
  className = '',
}) => {
  console.log('BackgroundLayer rendering with current:', current?.substring(0, 50) + '...');

  const getBackgroundStyle = (bg: string | undefined | null): React.CSSProperties => {
    if (!bg) {
      return { background: '#0b0b1f' };
    }
    if (bg.startsWith('linear-gradient') || bg.startsWith('radial-gradient')) {
      return { background: bg };
    }
    return {
      backgroundImage: `url('${bg}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  };

  return (
    <div
      className={`${styles.layer} ${className}`}
      style={getBackgroundStyle(current)}
    />
  );
};