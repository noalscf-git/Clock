export * from './colors';
export * from './animations';
export * from './gradients';
export * from './transitions';

export const SIZE_PRESETS = [
  { size: '3', label: 'Маленький' },
  { size: '6', label: 'Средний' },
  { size: '9', label: 'Большой' },
  { size: '12', label: 'Огромный' }
];

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