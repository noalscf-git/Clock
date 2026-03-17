// src/components/Settings/SettingsPanel.tsx - обновляем, убираем Draggable логику
import React from "react";
import { TabButton } from "../common/TabButton";
import { BackgroundTab } from "./BackgroundTab";
import { ClockTab } from "./ClockTab";
import { SlideshowTab } from "./SlideshowTab";
import { AnimatedBackgroundTab } from "./AnimatedBackgroundTab";
import type {
  FolderImage,
  GradientKey,
  CustomGradient,
  AnimatedBackground,
} from "../../types";
import styles from "./SettingsPanel.module.css";
import { SystemTab } from "./SystemTab";

interface SettingsPanelProps {
  isOpen: boolean;
  activeTab: string;
  onClose: () => void;
  onTabChange: (tab: string) => void;

  // Background props
  backgroundType: "gradient" | "folder" | "custom" | "animated";
  currentBackground: string;
  folderImages: FolderImage[];
  folderPath: string;
  onGradientSelect: (gradient: GradientKey) => void;
  onCustomGradientSelect: (gradient: CustomGradient) => void;
  onFolderSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageSelect: (image: FolderImage) => void;

  // Animated background props
  animatedSettings?: AnimatedBackground;
  onAnimatedSettingsChange?: (settings: AnimatedBackground) => void;
  onAnimatedSelect?: () => void; // Добавляем проп для выбора анимации
  // Clock props
  clockSize: string;
  clockColor: string;
  glowIntensity: string;
  borderOpacity: string;
  fontFamily: string;
  onClockSizeChange: (size: string) => void;
  onClockColorChange: (color: string) => void;
  onGlowIntensityChange: (intensity: string) => void;
  onBorderOpacityChange: (opacity: string) => void;
  onFontFamilyChange: (font: string) => void;

  // Slideshow props
  slideshowActive: boolean;
  slideshowEffect: string;
  slideshowInterval: string;
  randomEffect: boolean;
  randomInterval: boolean;
  randomIntervalRange: string;
  shuffleImages: boolean;
  onEffectChange: (effect: string) => void;
  onIntervalChange: (interval: string) => void;
  onRandomEffectChange: (checked: boolean) => void;
  onRandomIntervalChange: (checked: boolean) => void;
  onRandomIntervalRangeChange: (range: string) => void;
  onShuffleImagesChange: (checked: boolean) => void;
  onStartSlideshow: () => void;
  onStopSlideshow: () => void;

  // System monitor props
  showSystemMonitor: boolean;
  onShowSystemMonitorChange: (show: boolean) => void;
  monitorSize: "small" | "medium" | "large"; // Добавляем
  onMonitorSizeChange: (size: "small" | "medium" | "large") => void; // Добавляем
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  activeTab,
  onClose,
  onTabChange,
  ...props
}) => {
  if (!isOpen) return null;

  const tabs = [
    { id: "background", label: "Фон", icon: "🖼️" },
    { id: "animated", label: "Анимация", icon: "✨" },
    { id: "clock", label: "Часы", icon: "⏰" },
    { id: "slideshow", label: "Слайд-шоу", icon: "📸" },
    { id: "system", label: "Система", icon: "📊" }, // Новая вкладка
  ];

  return (
    <div className={styles.settingsPanel}>
      <div className={styles.settingsHeader}>
        <h3>Настройки</h3>
        <button className={styles.closeSettings} onClick={onClose}>✕</button>
      </div>

      <div className={styles.settingsContent}>
        <div className={styles.settingsTabs}>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.label}
              icon={tab.icon}
              isActive={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
            />
          ))}
        </div>

        {activeTab === "background" && (
          <BackgroundTab
            backgroundType={props.backgroundType}
            currentBackground={props.currentBackground}
            folderImages={props.folderImages}
            folderPath={props.folderPath}
            onGradientSelect={props.onGradientSelect}
            onCustomGradientSelect={props.onCustomGradientSelect}
            onFolderSelect={props.onFolderSelect}
            onImageSelect={props.onImageSelect}
          />
        )}

        {activeTab === "animated" &&
          props.animatedSettings &&
          props.onAnimatedSettingsChange && (
            <AnimatedBackgroundTab
              settings={props.animatedSettings}
              onSettingsChange={props.onAnimatedSettingsChange}
              onSelect={props.onAnimatedSelect}
            />
          )}
        {activeTab === "clock" && (
          <ClockTab
            clockSize={props.clockSize}
            clockColor={props.clockColor}
            glowIntensity={props.glowIntensity}
            borderOpacity={props.borderOpacity}
            fontFamily={props.fontFamily}
            onClockSizeChange={props.onClockSizeChange}
            onClockColorChange={props.onClockColorChange}
            onGlowIntensityChange={props.onGlowIntensityChange}
            onBorderOpacityChange={props.onBorderOpacityChange}
            onFontFamilyChange={props.onFontFamilyChange}
          />
        )}

        {activeTab === "slideshow" && (
          <SlideshowTab
            isActive={props.slideshowActive}
            effect={props.slideshowEffect}
            interval={props.slideshowInterval}
            randomEffect={props.randomEffect}
            randomInterval={props.randomInterval}
            randomIntervalRange={props.randomIntervalRange}
            shuffleImages={props.shuffleImages}
            onEffectChange={props.onEffectChange}
            onIntervalChange={props.onIntervalChange}
            onRandomEffectChange={props.onRandomEffectChange}
            onRandomIntervalChange={props.onRandomIntervalChange}
            onRandomIntervalRangeChange={props.onRandomIntervalRangeChange}
            onShuffleImagesChange={props.onShuffleImagesChange}
            onStartSlideshow={props.onStartSlideshow}
            onStopSlideshow={props.onStopSlideshow}
          />
        )}

        {activeTab === "system" && (
          <SystemTab
            showSystemMonitor={props.showSystemMonitor}
            onShowSystemMonitorChange={props.onShowSystemMonitorChange}
            monitorSize={props.monitorSize} // Добавляем
            onMonitorSizeChange={props.onMonitorSizeChange} // Добавляем
          />
        )}
      </div>
    </div>
  );
};
