import { AnimatedBackground } from '../../../../types/background';

export interface AnimatedSettingsProps {
  settings: AnimatedBackground;
  onSettingsChange: (settings: AnimatedBackground) => void;
  onSelect: () => void;
}