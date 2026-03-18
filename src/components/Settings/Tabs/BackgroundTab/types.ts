import { FolderImage, GradientKey, CustomGradient, BackgroundType } from '../../../../types/background';

export interface BackgroundSettingsProps {
  type: BackgroundType;
  currentValue: string;
  folderImages: FolderImage[];
  folderPath: string;
  onGradientSelect: (gradient: GradientKey) => void;
  onCustomGradientSelect: (gradient: CustomGradient) => void;
  onFolderSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageSelect: (image: FolderImage) => void;
}