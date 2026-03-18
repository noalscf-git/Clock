export const formatNumber = (num: number): string => {
  return num < 10 ? '0' + num : num.toString();
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ru-RU', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};