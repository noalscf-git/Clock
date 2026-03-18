// src/entities/image/model/useImageStorage.ts
import { useState, useCallback, useEffect } from 'react';
import { getAllImages, saveImages, clearImages } from '@/shared/lib/indexedDB';
import type { FolderImage } from './types';

export const useImageStorage = () => {
  const [folderImages, setFolderImages] = useState<FolderImage[]>([]);
  const [folderPath, setFolderPath] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Загрузка из IndexedDB при монтировании
  useEffect(() => {
    const loadImages = async () => {
      try {
        const images = await getAllImages();
        if (images.length > 0) {
          setFolderImages(images);
          if (images[0].path) {
            const path = images[0].path.split('/')[0];
            setFolderPath(path || 'Сохраненная папка');
          }
        }
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  // Сохранение в IndexedDB
  const saveToDB = useCallback(async (images: FolderImage[]) => {
    try {
      await clearImages();
      await saveImages(images);
    } catch (error) {
      console.error('Error saving images:', error);
    }
  }, []);

  // Обработка выбора папки
  const handleFolderSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(file => 
      file.type.startsWith('image/')
    );

    if (files.length === 0) return;

    const path = files[0].webkitRelativePath.split('/')[0];
    setFolderPath(path || 'Выбрана папка');
    setIsLoading(true);
    setLoadingProgress(0);

    const newImages: FolderImage[] = [];
    let loadedCount = 0;

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
            path: file.webkitRelativePath,
            size: file.size,
            lastModified: file.lastModified,
          });

          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / files.length) * 100));

          if (loadedCount === files.length) {
            newImages.sort((a, b) => a.name.localeCompare(b.name));
            setFolderImages(newImages);
            saveToDB(newImages);
            setIsLoading(false);
          } else if (loadedCount === endIndex && endIndex < files.length) {
            setTimeout(() => loadNextBatch(endIndex), 0);
          }
        };

        reader.readAsDataURL(file);
      }
    };

    loadNextBatch(0);
  }, [saveToDB]);

  // Очистка
  const clearFolderImages = useCallback(async () => {
    try {
      await clearImages();
      setFolderImages([]);
      setFolderPath('');
    } catch (error) {
      console.error('Error clearing images:', error);
    }
  }, []);

  return {
    folderImages,
    folderPath,
    isLoading,
    loadingProgress,
    handleFolderSelect,
    clearFolderImages,
  };
};