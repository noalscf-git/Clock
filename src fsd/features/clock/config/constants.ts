// src/features/clock/config/constants.ts
import type { ClockSettings } from '../model/types';

export const DEFAULT_CLOCK_SETTINGS: ClockSettings = {
  size: '6',
  color: '#00ffff',
  glowIntensity: '40',
  borderOpacity: '0.3',
  fontFamily: 'Orbitron',
};

export const SIZE_PRESETS = [
  { size: '3', label: 'Маленький' },
  { size: '6', label: 'Средний' },
  { size: '9', label: 'Большой' },
  { size: '12', label: 'Огромный' },
];

export const FONT_PRESETS = [
  { value: 'Orbitron', label: 'Orbitron (киберпанк)' },
  { value: 'Roboto', label: 'Roboto (классический)' },
  { value: 'Arial', label: 'Arial (простой)' },
  { value: 'Courier New', label: 'Courier New (печатная машинка)' },
  { value: 'Times New Roman', label: 'Times New Roman (антиква)' },
  { value: 'Verdana', label: 'Verdana (современный)' },
  { value: 'Impact', label: 'Impact (жирный)' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS (неформальный)' },
];