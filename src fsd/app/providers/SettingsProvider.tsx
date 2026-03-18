// src/app/providers/SettingsProvider.tsx
import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useSettings } from "@/features/settings/model/useSettings";
import { useClock } from "@/features/clock/model/useClock";
import { useBackground } from "@/features/background/model/useBackground";
import { GRADIENTS } from "@/shared/config/constants";
import type { SettingsContextValue } from "./types";

const SettingsContext = createContext<SettingsContextValue | null>(null);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  const settings = useSettings();
  const clock = useClock();
  const background = useBackground();

  // Мемоизируем значение контекста
  const value = useMemo<SettingsContextValue>(() => {
    // Базовые значения
    const currentBackground =
      background.currentBackground || GRADIENTS.gradient1;

    return {
      // Background state
      backgroundType: settings.backgroundType,
      backgroundValue: settings.backgroundValue,
      currentBackground,
      nextBackground: background.nextBackground,
      isTransitioning: background.isTransitioning,
      transitionEffect: background.transitionEffect,

      // Background actions
      setBackgroundType: settings.setBackgroundType,
      setBackgroundValue: settings.setBackgroundValue,
      setCurrentBackground: background.setCurrentBackground,
      startTransition: background.startTransition,

      // Gradients
      customGradients: settings.customGradients,
      getGradientStyle: (gradient) => gradient.style || "",

      // Images
      folderImages: settings.folderImages,
      folderPath: settings.folderPath,
      isLoading: settings.isLoading,
      loadingProgress: settings.loadingProgress,
      handleFolderSelect: settings.handleFolderSelect,
      handleImageSelect: settings.handleImageSelect,
      handleGradientSelect: settings.handleGradientSelect,
      handleCustomGradientSelect: settings.handleCustomGradientSelect,
      handleAnimatedSelect: () => settings.setBackgroundType("animated"),

      // Animated background
      animatedSettings: settings.animatedSettings,
      updateAnimatedSettings: settings.updateAnimatedSettings,

      // Clock settings
      clockSettings: settings.clockSettings,
      clockStyle: clock.clockStyle,
      dateStyle: clock.dateStyle,
      wrapperStyle: clock.wrapperStyle,
      time: clock.time,
      updateClockSettings: settings.updateClockSetting,

      // Slideshow
      slideshow: {
        ...settings.slideshowSettings,
        startSlideshow: settings.startSlideshow,
        stopSlideshow: settings.stopSlideshow,
        updateSlideshowSettings: (newSettings) => {
          console.log("Updating slideshow settings:", newSettings); // ДОБАВЬТЕ ЭТО
          Object.entries(newSettings).forEach(([key, value]) => {
            settings.updateSlideshowSetting(key as any, value);
          });
        },
      },

      // System monitor
      showSystemMonitor: settings.showSystemMonitor,
      monitorSize: settings.monitorSize,
      setShowSystemMonitor: settings.setShowSystemMonitor,
      setMonitorSize: settings.setMonitorSize,

      // UI state
      isOpen: settings.isOpen,
      activeTab: settings.activeTab,
      setIsOpen: (isOpen: boolean) => {
        if (isOpen) {
          settings.openSettings();
        } else {
          settings.closeSettings();
        }
      },
      setActiveTab: settings.setActiveTab,

      // Convenience aliases
      showSettings: settings.isOpen,
      setShowSettings: (show: boolean) => {
        if (show) {
          settings.openSettings();
        } else {
          settings.closeSettings();
        }
      },
      closeSettings: settings.closeSettings,
      openSettings: settings.openSettings,
    };
  }, [settings, clock, background]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = (): SettingsContextValue => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettingsContext must be used within SettingsProvider");
  }
  return context;
};
