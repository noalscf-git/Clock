// src/utils/constants.ts - добавляем цвета для палитры
export const GRADIENTS: Record<GradientKey, string> = {
  gradient1: 'linear-gradient(135deg, #0b0b1f, #1a1a2f)',
  gradient2: 'linear-gradient(135deg, #1e3c72, #2a5298)',
  gradient3: 'linear-gradient(135deg, #23074d, #cc5333)',
  gradient4: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
  gradient5: 'linear-gradient(135deg, #20002c, #cbb4d4)',
  gradient6: 'linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)'
};

export const COLOR_PALETTE = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
  '#F8C471', '#82E0AA', '#F1948A', '#AED6F1', '#D7BDE2',
  '#F0B27A', '#7DCEA0', '#F5B7B1', '#E8DAEF', '#F9E79F',
  '#A3E4D7', '#FAD7A0', '#A9CCE3', '#D2B4DE', '#E6B0AA',
  '#B2BABB', '#F9E79F', '#A569BD', '#5DADE2', '#48C9B0'
]; // Убраны дубликаты, добавлены новые цвета

export const COLOR_PRESETS = [
  // Неоновые цвета
  { color: '#00ffff', name: 'Неоновый голубой' },
  { color: '#ff00ff', name: 'Неоновый розовый' },
  { color: '#00ff00', name: 'Неоновый зеленый' },
  { color: '#ffff00', name: 'Неоновый желтый' },
  { color: '#ff9900', name: 'Неоновый оранжевый' },
  { color: '#ff0000', name: 'Неоновый красный' },
  { color: '#aa00ff', name: 'Неоновый фиолетовый' },
  
  // Пастельные тона
  { color: '#FFB6C1', name: 'Светло-розовый' },
  { color: '#FFD700', name: 'Золотой' },
  { color: '#98FB98', name: 'Бледно-зеленый' },
  { color: '#87CEEB', name: 'Небесно-голубой' },
  { color: '#DDA0DD', name: 'Сливовый' },
  { color: '#F0E68C', name: 'Хаки' },
  { color: '#E6E6FA', name: 'Лавандовый' },
  
  // Яркие цвета
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
  
  // Огненные
  { color: '#FF4500', name: 'Оранжево-красный' },
  { color: '#DC143C', name: 'Малиновый' },
  { color: '#FF6347', name: 'Томатный' },
  { color: '#FF7F50', name: 'Коралловый' },
  { color: '#FFA07A', name: 'Светлый лосось' },
  
  // Холодные
  { color: '#4682B4', name: 'Стальной голубой' },
  { color: '#5F9EA0', name: 'Кадетский синий' },
  { color: '#6495ED', name: 'Васильковый' },
  { color: '#7B68EE', name: 'Средний пурпурный' },
  { color: '#6A5ACD', name: 'Шиферный синий' },
  
  // Тропические
  { color: '#40E0D0', name: 'Бирюзовый' },
  { color: '#48D1CC', name: 'Средний бирюзовый' },
  { color: '#7FFFD4', name: 'Аквамариновый' },
  { color: '#66CDAA', name: 'Средний аквамарин' },
  { color: '#9ACD32', name: 'Желто-зеленый' },
  
  // Вечерние
  { color: '#483D8B', name: 'Темный шиферный' },
  { color: '#4B0082', name: 'Индиго' },
  { color: '#8B008B', name: 'Темный пурпурный' },
  { color: '#9400D3', name: 'Темный фиолетовый' },
  { color: '#9932CC', name: 'Темный орхидейный' },
  
  // Рассветные
  { color: '#FFB6C1', name: 'Розовый' },
  { color: '#FFA07A', name: 'Светлый лосось' },
  { color: '#FFDAB9', name: 'Персиковый' },
  { color: '#E0FFFF', name: 'Светлый голубой' },
  { color: '#F0FFF0', name: 'Медовая роса' },
  
  // Закатные
  { color: '#FF4500', name: 'Оранжевый' },
  { color: '#DA70D6', name: 'Орхидейный' },
  { color: '#FF69B4', name: 'Розовый' },
  { color: '#FF1493', name: 'Глубокий розовый' },
  { color: '#C71585', name: 'Средний фиолетовый' }
];

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