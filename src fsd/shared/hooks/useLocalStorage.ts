// src/shared/hooks/useLocalStorage.ts
import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Функция для чтения из localStorage
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      
      // ИСПРАВЛЕНИЕ: Проверяем на "undefined" строку
      if (item === null || item === 'undefined') {
        return initialValue;
      }
      
      return JSON.parse(item) as T;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  // Состояние
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Функция для сохранения
  const setValue = useCallback((value: T) => {
    if (typeof window === 'undefined') {
      console.warn(`Cannot set localStorage key "${key}" on server`);
      return;
    }

    try {
      // Сохраняем в state
      setStoredValue(value);

      // Сохраняем в localStorage
      window.localStorage.setItem(key, JSON.stringify(value));

      // Вызываем событие для синхронизации между вкладками
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  // Слушаем изменения в других вкладках
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, [readValue]);

  return [storedValue, setValue];
}