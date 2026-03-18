export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      const serialized = JSON.stringify(valueToStore);
      
      if (serialized.length > 4 * 1024 * 1024) {
        console.warn(`Data for key "${key}" is too large (${(serialized.length / 1024 / 1024).toFixed(2)}MB). Skipping save.`);
        
        if (key === 'folderImages' && Array.isArray(valueToStore)) {
          const metadata = valueToStore.map(img => ({
            id: img.id,
            name: img.name,
            path: img.path
          }));
          localStorage.setItem(key, JSON.stringify(metadata));
        }
        
        setStoredValue(valueToStore);
        return;
      }
      
      localStorage.setItem(key, serialized);
      setStoredValue(valueToStore);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        if (key === 'folderImages' && Array.isArray(value)) {
          const metadata = value.map(img => ({
            id: img.id,
            name: img.name,
            path: img.path
          }));
          try {
            localStorage.setItem(key, JSON.stringify(metadata));
            alert('Изображения слишком большие для сохранения. При следующем запуске выберите папку заново.');
          } catch (e) {
            console.error('Failed to save even metadata:', e);
          }
        }
      }
    }
  };

  return [storedValue, setValue];
}