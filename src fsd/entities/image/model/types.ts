// src/entities/image/model/types.ts
export interface FolderImage {
  id: number;
  data: string;
  name: string;
  path?: string;
  size?: number;
  lastModified?: number;
}

export interface ImageStorageState {
  images: FolderImage[];
  folderPath: string;
  isLoading: boolean;
  loadingProgress: number;
}

export interface ImageGridProps {
  images: FolderImage[];
  selectedImageId?: string;
  onImageSelect: (image: FolderImage) => void;
  className?: string;
}

export interface ImageItemProps {
  image: FolderImage;
  isSelected: boolean;
  onSelect: () => void;
  size?: 'small' | 'medium' | 'large';
}