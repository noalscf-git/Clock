// src/hooks/useImageStorage.ts - хук для работы с изображениями
import { useState, useEffect, useCallback } from 'react';
import type { FolderImage } from '../types';
import { getAllImages, saveImages, clearImages } from '../utils/indexedDB';

export const useImageStorage = () => {
  const [folderImages, setFolderImages] = useState<FolderImage[]>([]);
  const [folderPath, setFolderPath] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Загрузка изображений из IndexedDB при монтировании
  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoading(true);
        const images = await getAllImages();
        if (images.length > 0) {
          setFolderImages(images);
          // Пытаемся восстановить путь из первого изображения
          if (images[0].path) {
            const path = images[0].path.split('/')[0];
            setFolderPath(path || 'Сохраненная папка');
          }
        }
      } catch (error) {
        console.error('Ошибка загрузки изображений из IndexedDB:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  // Сохранение изображений в IndexedDB
  const saveImagesToDB = useCallback(async (images: FolderImage[]) => {
    try {
      await clearImages(); // Очищаем старые изображения
      await saveImages(images);
      console.log(`Сохранено ${images.length} изображений в IndexedDB`);
    } catch (error) {
      console.error('Ошибка сохранения изображений в IndexedDB:', error);
    }
  }, []);

  // Обработка выбора папки
  const handleFolderSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(file => 
      file.type.startsWith('image/')
    );

    if (files.length === 0) return;

    const path = files[0].webkitRelativePath.split('/')[0];
    setFolderPath(path || 'Выбрана папка с изображениями');
    setIsLoading(true);
    setLoadingProgress(0);

    const newImages: FolderImage[] = [];
    let loadedCount = 0;

    // Загружаем изображения порциями для избежания зависания интерфейса
    const loadNextBatch = (startIndex: number) => {
      const batchSize = 5;
      const endIndex = Math.min(startIndex + batchSize, files.length);
      
      for (let i = startIndex; i < endIndex; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = (e) => {
          newImages.push({
            id: i,
            data: e.target?.result as string,
            name: file.name,
            path: file.webkitRelativePath
          });

          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / files.length) * 100));

          if (loadedCount === files.length) {
            // Все изображения загружены
            newImages.sort((a, b) => a.name.localeCompare(b.name));
            setFolderImages(newImages);
            saveImagesToDB(newImages);
            setIsLoading(false);
            setLoadingProgress(100);
          } else if (loadedCount === endIndex && endIndex < files.length) {
            // Загружаем следующую партию
            setTimeout(() => loadNextBatch(endIndex), 0);
          }
        };

        reader.readAsDataURL(file);
      }
    };

    loadNextBatch(0);
  }, [saveImagesToDB]);

  // Очистка изображений
  const clearFolderImages = useCallback(async () => {
    try {
      await clearImages();
      setFolderImages([]);
      setFolderPath('');
    } catch (error) {
      console.error('Ошибка очистки изображений:', error);
    }
  }, []);

  return {
    folderImages,
    folderPath,
    isLoading,
    loadingProgress,
    handleFolderSelect,
    clearFolderImages,
    setFolderImages // на случай если нужно обновить вручную
  };
};