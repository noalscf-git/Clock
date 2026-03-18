// src/features/settings/ui/SettingsPanel/index.tsx
import React from 'react';
import { BackgroundTab } from './BackgroundTab';
import { AnimatedTab } from './AnimatedTab';

import { SystemTab } from './SystemTab';
import type { SettingsPanelProps, TabType } from '../../model/types';
import styles from './SettingsPanel.module.css';
import { SlideshowTab } from './SlideshowTab';
import { ClockTab } from './ClockTab';

const TABS: { id: TabType; label: string; icon: string }[] = [
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
  backgroundProps,
  animatedProps,
  clockProps,
  slideshowProps,
  systemProps,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Настройки</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.tabs}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.content}>
          {activeTab === 'background' && <BackgroundTab {...backgroundProps} />}
          {activeTab === 'animated' && <AnimatedTab {...animatedProps} />}
          {activeTab === 'clock' && <ClockTab {...clockProps} />}
          {activeTab === 'slideshow' && (
            <SlideshowTab {...slideshowProps} />
          )}
          {activeTab === 'system' && <SystemTab {...systemProps} />}
        </div>
      </div>
    </div>
  );
};