import { BackgroundSettingsProps } from '../Tabs/BackgroundTab/types';
import { AnimatedSettingsProps } from '../Tabs/AnimatedTab/types';
import { ClockSettingsProps } from '../Tabs/ClockTab/types';
import { SlideshowSettingsProps } from '../Tabs/SlideshowTab/types';
import { SystemSettingsProps } from '../Tabs/SystemTab/types';

export interface SettingsPanelProps {
  isOpen: boolean;
  activeTab: string;
  onClose: () => void;
  onTabChange: (tab: string) => void;
  background: BackgroundSettingsProps;
  clock: ClockSettingsProps;
  slideshow: SlideshowSettingsProps;
  system: SystemSettingsProps;
  animated?: AnimatedSettingsProps;
}

export interface TabConfig {
  id: string;
  label: string;
  icon: string;
}