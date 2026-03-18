import React from 'react';
import { TabButton } from '../common/TabButton/TabButton';
import { BackgroundTab } from '../Tabs/BackgroundTab/BackgroundTab';
import { AnimatedTab } from '../Tabs/AnimatedTab/AnimatedTab';
import { ClockTab } from '../Tabs/ClockTab/ClockTab';
import { SlideshowTab } from '../Tabs/SlideshowTab/SlideshowTab';
import { SystemTab } from '../Tabs/SystemTab/SystemTab';
import { SettingsPanelProps, TabConfig } from './types';
import styles from './SettingsPanel.module.css';

const TABS: TabConfig[] = [
  { id: 'background', label: 'Фон', icon: '🖼️' },
  { id: 'animated', label: 'Анимация', icon: '✨' },
  { id: 'clock', label: 'Часы', icon: '⏰' },
  { id: 'slideshow', label: 'Слайд-шоу', icon: '📸' },
  { id: 'system', label: 'Система', icon: '📊' },
];

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  activeTab,
  onClose,
  onTabChange,
  background,
  clock,
  slideshow,
  system,
  animated,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.settingsPanel}>
      <div className={styles.settingsHeader}>
        <h3>Настройки</h3>
        <button className={styles.closeSettings} onClick={onClose}>✕</button>
      </div>

      <div className={styles.settingsContent}>
        <div className={styles.settingsTabs}>
          {TABS.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.label}
              icon={tab.icon}
              isActive={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
            />
          ))}
        </div>

        {activeTab === 'background' && <BackgroundTab {...background} />}
        {activeTab === 'animated' && animated && <AnimatedTab {...animated} />}
        {activeTab === 'clock' && <ClockTab {...clock} />}
        {activeTab === 'slideshow' && <SlideshowTab {...slideshow} />}
        {activeTab === 'system' && <SystemTab {...system} />}
      </div>
    </div>
  );
};