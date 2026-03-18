// src/entities/gradient/model/types.ts
export interface GradientColor {
  id: string;
  color: string;
  position: number; // 0-100
}

export interface CustomGradient {
  id: string;
  name: string;
  colors: GradientColor[];
  angle: number; // 0-360
  type: 'linear' | 'radial';
  style?: string; // computed CSS style
}

export interface GradientEditorProps {
  initialGradient?: CustomGradient;
  onSave: (gradient: CustomGradient) => void;
  onCancel?: () => void;
}

export interface GradientPreviewProps {
  gradient: CustomGradient;
  width?: number;
  height?: number;
  className?: string;
}

export interface GradientColorPointProps {
  color: GradientColor;
  index: number;
  total: number;
  onUpdate: (id: string, updates: Partial<GradientColor>) => void;
  onRemove: (id: string) => void;
  isRemovable: boolean;
}