// src/shared/config/constants.ts
import type { GradientKey } from '../types';

// Градиенты
export const GRADIENTS: Record<GradientKey, string> = {
  gradient1: 'linear-gradient(135deg, #0b0b1f, #1a1a2f)',
  gradient2: 'linear-gradient(135deg, #1e3c72, #2a5298)',
  gradient3: 'linear-gradient(135deg, #23074d, #cc5333)',
  gradient4: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
  gradient5: 'linear-gradient(135deg, #20002c, #cbb4d4)',
  gradient6: 'linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)',
};

// Цвета для палитры
export const COLOR_PALETTE = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
  '#F8C471', '#82E0AA', '#F1948A', '#AED6F1', '#D7BDE2',
  '#F0B27A', '#7DCEA0', '#F5B7B1', '#E8DAEF', '#F9E79F',
  '#A3E4D7', '#FAD7A0', '#A9CCE3', '#D2B4DE', '#E6B0AA',
  '#B2BABB', '#F9E79F', '#A569BD', '#5DADE2', '#48C9B0'
];

// Пресеты цветов
export const COLOR_PRESETS = [
  // Неоновые
  { color: '#00ffff', name: 'Неоновый голубой' },
  { color: '#ff00ff', name: 'Неоновый розовый' },
  { color: '#00ff00', name: 'Неоновый зеленый' },
  { color: '#ffff00', name: 'Неоновый желтый' },
  { color: '#ff9900', name: 'Неоновый оранжевый' },
  { color: '#ff0000', name: 'Неоновый красный' },
  { color: '#aa00ff', name: 'Неоновый фиолетовый' },
  
  // Пастельные
  { color: '#FFB6C1', name: 'Светло-розовый' },
  { color: '#FFD700', name: 'Золотой' },
  { color: '#98FB98', name: 'Бледно-зеленый' },
  { color: '#87CEEB', name: 'Небесно-голубой' },
  { color: '#DDA0DD', name: 'Сливовый' },
  { color: '#F0E68C', name: 'Хаки' },
  { color: '#E6E6FA', name: 'Лавандовый' },
  
  // Яркие
  { color: '#FF1493', name: 'Глубокий розовый' },
  { color: '#00CED1', name: 'Бирюзовый' },
  { color: '#32CD32', name: 'Лаймовый' },
  { color: '#FF8C00', name: 'Темно-оранжевый' },
  { color: '#9370DB', name: 'Средний пурпурный' },
  { color: '#20B2AA', name: 'Светло-морской' },
  { color: '#FF69B4', name: 'Горячий розовый' },
  
  // Металлик
  { color: '#C0C0C0', name: 'Серебряный' },
  { color: '#FFD700', name: 'Золотой' },
  { color: '#B87333', name: 'Медный' },
  { color: '#E5E4E2', name: 'Платиновый' },
  { color: '#8C92AC', name: 'Серо-голубой' },
  
  // Классические
  { color: '#ffffff', name: 'Белый' },
  { color: '#000000', name: 'Черный' },
  { color: '#808080', name: 'Серый' },
  { color: '#800000', name: 'Бордовый' },
  { color: '#008000', name: 'Темно-зеленый' },
  { color: '#000080', name: 'Темно-синий' },
  { color: '#4B0082', name: 'Индиго' },
];

// Анимированные фоны
export const ANIMATED_BACKGROUNDS = [
  { 
    id: 'particles', 
    name: 'Частицы', 
    icon: '✨',
    description: 'Плавающие светящиеся частицы'
  },
  { 
    id: 'waves', 
    name: 'Волны', 
    icon: '🌊',
    description: 'Движущиеся волны энергии'
  },
  { 
    id: 'stars', 
    name: 'Звезды', 
    icon: '⭐',
    description: 'Мерцающее звездное небо'
  },
  { 
    id: 'matrix', 
    name: 'Матрица', 
    icon: '💻',
    description: 'Падающие символы как в фильме'
  },
  { 
    id: 'gradient', 
    name: 'Пульсирующий градиент', 
    icon: '🌈',
    description: 'Плавно меняющийся градиент'
  },
  { 
    id: 'fire', 
    name: 'Огонь', 
    icon: '🔥',
    description: 'Анимированное пламя'
  },
  { 
    id: 'aurora', 
    name: 'Северное сияние', 
    icon: '💚',
    description: 'Плавные переливы света'
  },
  { 
    id: 'bubbles', 
    name: 'Пузырьки', 
    icon: '🫧',
    description: 'Поднимающиеся пузырьки'
  }
];

export const ANIMATION_SPEEDS = [
  { value: 0.5, label: 'Очень медленно' },
  { value: 1, label: 'Медленно' },
  { value: 1.5, label: 'Средне' },
  { value: 2, label: 'Быстро' },
  { value: 2.5, label: 'Очень быстро' },
  { value: 3, label: 'Экстрим' }
];

// Интервалы для слайд-шоу
export const INTERVAL_OPTIONS = [
  { value: '3', label: '3 секунды' },
  { value: '5', label: '5 секунд' },
  { value: '10', label: '10 секунд' },
  { value: '30', label: '30 секунд' },
  { value: '60', label: '1 минута' },
  { value: '300', label: '5 минут' },
  { value: '600', label: '10 минут' },
  { value: '1200', label: '20 минут' },
  { value: '1800', label: '30 минут' },
  { value: '3600', label: '1 час' }
];

// Эффекты перехода
export const TRANSITION_EFFECTS = [
  { value: 'fade', label: 'Плавное появление' },
  { value: 'slide', label: 'Скольжение' },
  { value: 'zoom', label: 'Увеличение' },
  { value: 'blur', label: 'Размытие' },
  { value: 'flip', label: 'Переворот' },
  { value: 'rotate', label: 'Вращение' },
  { value: 'bounce', label: 'Подпрыгивание' },
  { value: 'flash', label: 'Вспышка' },
  { value: 'darken', label: 'Затемнение' },
  { value: 'desaturate', label: 'Выцветание' },
  { value: 'horizontal-blur', label: 'Горизонтальное размытие' },
  { value: 'curtain', label: 'Шторка' },
  { value: 'xflip', label: 'Переворот по X' },
  { value: 'diagonal-rotate', label: 'Диагональное вращение' },
  { value: 'wave', label: 'Волна' },
  { value: 'lightning', label: 'Молния' },
  { value: 'kaleidoscope', label: 'Калейдоскоп' },
  { value: 'pulse', label: 'Пульсация' },
  { value: 'rainbow', label: 'Радуга' },
  { value: 'dissolve', label: 'Растворение' }
];

// Ключи для localStorage
export const STORAGE_KEYS = {
  CLOCK_SIZE: 'clockSize',
  CLOCK_COLOR: 'clockColor',
  GLOW_INTENSITY: 'glowIntensity',
  BORDER_OPACITY: 'borderOpacity',
  FONT_FAMILY: 'fontFamily',
  BACKGROUND_TYPE: 'backgroundType',
  BACKGROUND_VALUE: 'backgroundValue',
  SHOW_SYSTEM_MONITOR: 'showSystemMonitor',
  MONITOR_SIZE: 'monitorSize',
  ANIMATED_BACKGROUND: 'animatedBackground',
  CUSTOM_GRADIENTS: 'customGradients',
  SLIDESHOW_STATE: 'slideshowState',
} as const;