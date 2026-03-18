import { CustomGradient, GradientColor } from '../../../types/background';

export interface GradientEditorProps {
  gradient: CustomGradient;
  onUpdateColor: (id: string, color: string) => void;
  onUpdatePosition: (id: string, position: number) => void;
  onUpdateAngle: (angle: number) => void;
  onUpdateType: (type: 'linear' | 'radial') => void;
  onUpdateName: (name: string) => void;
  onAddColor: () => void;
  onRemoveColor: (id: string) => void;
  onSave: () => void;
}

export interface ColorPointProps {
  id: string;
  color: string;
  position: number;
  onColorChange: (id: string, color: string) => void;
  onPositionChange: (id: string, position: number) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}