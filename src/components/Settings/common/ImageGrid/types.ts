import { FolderImage } from '../../../../types/background';

export interface ImageGridProps {
  images: FolderImage[];
  selectedImage?: string;
  onImageSelect: (image: FolderImage) => void;
}