// src/features/settings/index.ts
export { useSettings } from './model/useSettings';
export { SettingsPanel } from './ui/SettingsPanel';
export { TopBar } from './ui/TopBar/TopBar';
export type { 
  SettingsState,
  SettingsActions,
  TabType,
  BackgroundTabProps,
  ClockTabProps,
  SlideshowTabProps,
  SystemTabProps,
  AnimatedTabProps,
} from './model/types';