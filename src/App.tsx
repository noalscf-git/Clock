// src/App.tsx - исправленная версия
import React, { useRef, useState, useEffect } from "react";
import { ClockDisplay } from "./components/Clock/ClockDisplay";
import { TopBar } from "./components/UI/TopBar";
import { FullscreenHint } from "./components/UI/FullscreenHint";
import { SettingsPanel } from "./components/Settings/SettingsPanel";
import { useFullscreen } from "./hooks/useFullscreen";
import { useClock } from "./hooks/useClock";
import { useSlideshow } from "./hooks/useSlideshow";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { GRADIENTS } from "./utils/constants";
import type { FolderImage, GradientKey } from "./types";
import styles from "./App.module.css";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const { isFullscreen, showHint, toggleFullscreen } =
    useFullscreen(containerRef);

  // Clock state
  const clock = useClock();

  // Settings UI state
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("background");

  // Background state
  const [backgroundType, setBackgroundType] = useLocalStorage<
    "gradient" | "folder"
  >("backgroundType", "gradient");
  const [currentBackground, setCurrentBackground] = useLocalStorage(
    "currentBackground",
    "gradient1",
  );
  const [folderImages, setFolderImages] = useLocalStorage<FolderImage[]>(
    "folderImages",
    [],
  );
  const [folderPath, setFolderPath] = useState("");

  // Slideshow
  const slideshow = useSlideshow(folderImages, (imageData: string) => {
    setBackgroundType("folder");
    setCurrentBackground(imageData);
  });

  // Load saved folder images on mount
  useEffect(() => {
    const savedImages = localStorage.getItem("folderImages");
    if (savedImages) {
      try {
        const images = JSON.parse(savedImages);
        setFolderImages(
          images.map((data: string, index: number) => ({
            id: index,
            data: data,
            name: `image${index}.jpg`,
          })),
        );
      } catch (e) {
        console.error("Ошибка загрузки изображений");
      }
    }
  }, []);

  // Handle folder selection
  const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith("image/"),
    );

    if (files.length > 0) {
      const path = files[0].webkitRelativePath.split("/")[0];
      setFolderPath(path || "Выбрана папка с изображениями");

      const newImages: FolderImage[] = [];
      let loadedCount = 0;

      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push({
            id: index,
            data: e.target?.result as string,
            name: file.name,
            path: file.webkitRelativePath,
          });

          loadedCount++;
          if (loadedCount === files.length) {
            setFolderImages(newImages);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Select gradient
  const handleGradientSelect = (gradient: GradientKey) => {
    setBackgroundType("gradient");
    setCurrentBackground(gradient);
    slideshow.stopSlideshow();
  };

  // Select folder image
  const handleImageSelect = (image: FolderImage) => {
    setBackgroundType("folder");
    setCurrentBackground(image.data);
    slideshow.stopSlideshow();
  };

  // Get background style
  const getBackgroundStyle = (): React.CSSProperties => {
    let backgroundValue: string;

    if (backgroundType === "gradient") {
      backgroundValue = GRADIENTS[currentBackground as GradientKey];
    } else if (backgroundType === "folder" && currentBackground) {
      backgroundValue = `url('${currentBackground}') center/cover fixed`;
    } else {
      backgroundValue = GRADIENTS.gradient1;
    }

    return {
      background: backgroundValue,
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  };

  return (
    <div ref={appRef} className={styles.app} style={getBackgroundStyle()}>
      <div className={styles.container} ref={containerRef}>
        <TopBar
          onSettingsClick={() => setShowSettings(true)}
          onFullscreenClick={toggleFullscreen}
          isFullscreen={isFullscreen}
        />

        <SettingsPanel
          isOpen={showSettings}
          activeTab={activeTab}
          onClose={() => setShowSettings(false)}
          onTabChange={setActiveTab}
          // Background props
          backgroundType={backgroundType}
          currentBackground={currentBackground}
          folderImages={folderImages}
          folderPath={folderPath}
          onGradientSelect={handleGradientSelect}
          onFolderSelect={handleFolderSelect}
          onImageSelect={handleImageSelect}
          // Clock props
          clockSize={clock.clockSize}
          clockColor={clock.clockColor}
          glowIntensity={clock.glowIntensity}
          borderOpacity={clock.borderOpacity}
          onClockSizeChange={clock.setClockSize}
          onClockColorChange={clock.setClockColor}
          onGlowIntensityChange={clock.setGlowIntensity}
          onBorderOpacityChange={clock.setBorderOpacity}
          // Slideshow props
          slideshowActive={slideshow.isActive}
          slideshowEffect={slideshow.effect}
          slideshowInterval={slideshow.interval}
          randomEffect={slideshow.randomEffect}
          randomInterval={slideshow.randomInterval}
          randomIntervalRange={slideshow.randomIntervalRange}
          shuffleImages={slideshow.shuffleImages}
          onEffectChange={slideshow.setEffect}
          onIntervalChange={slideshow.setInterval}
          onRandomEffectChange={slideshow.setRandomEffect}
          onRandomIntervalChange={slideshow.setRandomInterval}
          onRandomIntervalRangeChange={slideshow.setRandomIntervalRange}
          onShuffleImagesChange={slideshow.setShuffleImages}
          onStartSlideshow={slideshow.startSlideshow}
          onStopSlideshow={slideshow.stopSlideshow}
          // Clock props additions
          fontFamily={clock.fontFamily}
          onFontFamilyChange={clock.setFontFamily}
        />

        <ClockDisplay
          time={clock.time}
          clockStyle={clock.clockStyle}
          dateStyle={clock.dateStyle}
          wrapperStyle={clock.wrapperStyle}
        />
      </div>

      <FullscreenHint show={showHint} />
    </div>
  );
}

export default App;
