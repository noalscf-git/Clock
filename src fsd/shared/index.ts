// src/shared/index.ts
// Конфиг
export * from './config/constants';

// Утилиты
export * from './lib/helpers';
export * from './lib/indexedDB';

// Хуки
export { useLocalStorage } from './hooks/useLocalStorage';
export { useFullscreen } from './hooks/useFullscreen';

// UI компоненты
export * from './ui';