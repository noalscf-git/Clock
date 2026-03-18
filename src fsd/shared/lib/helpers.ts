// src/shared/lib/helpers.ts

/**
 * Форматирует число с ведущим нулем
 */
export const formatNumber = (num: number): string => {
  return num < 10 ? '0' + num : num.toString();
};

/**
 * Форматирует дату на русском языке
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ru-RU', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

/**
 * Перемешивает массив (алгоритм Фишера-Йетса)
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Генерирует уникальный ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Обрезает строку до указанной длины
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
};

/**
 * Форматирует размер файла в человекочитаемый вид
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Задержка (промис)
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Проверяет, является ли значение градиентом CSS
 */
export const isGradient = (value: string): boolean => {
  return value.startsWith('linear-gradient') || value.startsWith('radial-gradient');
};

/**
 * Парсит диапазон из строки вида "min,max"
 */
export const parseRange = (range: string): [number, number] => {
  const [min, max] = range.split(',').map(Number);
  return [min, max];
};

/**
 * Формирует строку диапазона
 */
export const formatRange = (min: number, max: number): string => {
  return `${min},${max}`;
};

/**
 * Получает случайное число из диапазона
 */
export const getRandomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};