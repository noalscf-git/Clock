export interface ClockSettingsProps {
  size: string;
  color: string;
  glowIntensity: string;
  borderOpacity: string;
  fontFamily: string;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
  onGlowIntensityChange: (intensity: string) => void;
  onBorderOpacityChange: (opacity: string) => void;
  onFontFamilyChange: (font: string) => void;
}