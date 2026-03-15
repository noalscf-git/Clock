// src/utils/constants.ts

import type { GradientKey } from "../types";


export const GRADIENTS: Record<GradientKey, string> = {
  gradient1: 'linear-gradient(135deg, #0b0b1f, #1a1a2f)',
  gradient2: 'linear-gradient(135deg, #1e3c72, #2a5298)',
  gradient3: 'linear-gradient(135deg, #23074d, #cc5333)',
  gradient4: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
  gradient5: 'linear-gradient(135deg, #20002c, #cbb4d4)',
  gradient6: 'linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)'
};

export const COLOR_PRESETS = [
  { color: '#00ffff', name: 'Голубой' },
  { color: '#ff00ff', name: 'Розовый' },
  { color: '#00ff00', name: 'Зеленый' },
  { color: '#ffff00', name: 'Желтый' },
  { color: '#ff9900', name: 'Оранжевый' },
  { color: '#ff0000', name: 'Красный' },
  { color: '#ffffff', name: 'Белый' },
  { color: '#aa00ff', name: 'Фиолетовый' }
];

export const SIZE_PRESETS = [
  { size: '3', label: 'Маленький' },
  { size: '6', label: 'Средний' },
  { size: '9', label: 'Большой' },
  { size: '12', label: 'Огромный' }
];

export const TRANSITION_EFFECTS = [
  { value: 'fade', label: 'Плавное появление' },
  { value: 'slide', label: 'Скольжение' },
  { value: 'zoom', label: 'Увеличение' },
  { value: 'blur', label: 'Размытие' },
  { value: 'flip', label: 'Переворот' },
  { value: 'rotate', label: 'Вращение' },
  { value: 'bounce', label: 'Подпрыгивание' },
  { value: 'flash', label: 'Вспышка' }
];

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

export const EFFECTS = ['fade', 'slide', 'zoom', 'blur', 'flip', 'rotate', 'bounce', 'flash'];

export const FONT_PRESETS = [
  { value: 'Orbitron', label: 'Orbitron (киберпанк)' },
  { value: 'Roboto', label: 'Roboto (классический)' },
  { value: 'Arial', label: 'Arial (простой)' },
  { value: 'Courier New', label: 'Courier New (печатная машинка)' },
  { value: 'Times New Roman', label: 'Times New Roman (антиква)' },
  { value: 'Verdana', label: 'Verdana (современный)' },
  { value: 'Impact', label: 'Impact (жирный)' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS (неформальный)' }
];