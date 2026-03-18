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

export const EFFECTS = TRANSITION_EFFECTS.map(e => e.value);

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