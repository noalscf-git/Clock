// App.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

const App = () => {
  // Состояния
  const [time, setTime] = useState(new Date());
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('background');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenHint, setShowFullscreenHint] = useState(false);
  
  // Настройки часов
  const [clockSize, setClockSize] = useState(() => localStorage.getItem('clockSize') || '6');
  const [clockColor, setClockColor] = useState(() => localStorage.getItem('clockColor') || '#00ffff');
  const [glowIntensity, setGlowIntensity] = useState(() => localStorage.getItem('glowIntensity') || '40');
  const [borderOpacity, setBorderOpacity] = useState(() => localStorage.getItem('borderOpacity') || '0.3');
  
  // Настройки фона
  const [backgroundType, setBackgroundType] = useState(() => localStorage.getItem('backgroundType') || 'gradient');
  const [currentBackground, setCurrentBackground] = useState(() => {
    const saved = localStorage.getItem('currentBackground');
    return saved || 'gradient1';
  });
  const [folderImages, setFolderImages] = useState([]);
  const [folderPath, setFolderPath] = useState('');
  
  // Настройки слайд-шоу
  const [slideshowActive, setSlideshowActive] = useState(false);
  const [slideshowInterval, setSlideshowInterval] = useState('5');
  const [transitionEffect, setTransitionEffect] = useState('fade');
  const [shuffleImages, setShuffleImages] = useState(false);
  const [randomEffect, setRandomEffect] = useState(() => localStorage.getItem('randomEffect') === 'true');
  const [randomInterval, setRandomInterval] = useState(() => localStorage.getItem('randomInterval') === 'true');
  const [randomIntervalRange, setRandomIntervalRange] = useState(() => localStorage.getItem('randomIntervalRange') || '5,30');
  
  const containerRef = useRef(null);
  const slideshowTimerRef = useRef(null);
  const hintTimerRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const effects = ['fade', 'slide', 'zoom', 'blur', 'flip', 'rotate', 'bounce', 'flash'];

  // Градиенты
  const gradients = {
    gradient1: 'linear-gradient(135deg, #0b0b1f, #1a1a2f)',
    gradient2: 'linear-gradient(135deg, #1e3c72, #2a5298)',
    gradient3: 'linear-gradient(135deg, #23074d, #cc5333)',
    gradient4: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    gradient5: 'linear-gradient(135deg, #20002c, #cbb4d4)',
    gradient6: 'linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)'
  };

  // Форматирование времени
  const formatNumber = (num) => num < 10 ? '0' + num : num;

  // Обновление времени
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Загрузка сохраненных изображений
  useEffect(() => {
    const savedImages = localStorage.getItem('folderImages');
    if (savedImages) {
      try {
        const images = JSON.parse(savedImages);
        setFolderImages(images.map((data, index) => ({
          id: index,
          data: data,
          name: `image${index}.jpg`
        })));
      } catch (e) {
        console.error('Ошибка загрузки изображений');
      }
    }
  }, []);

  // Сохранение настроек
  useEffect(() => {
    localStorage.setItem('clockSize', clockSize);
  }, [clockSize]);

  useEffect(() => {
    localStorage.setItem('clockColor', clockColor);
  }, [clockColor]);

  useEffect(() => {
    localStorage.setItem('glowIntensity', glowIntensity);
  }, [glowIntensity]);

  useEffect(() => {
    localStorage.setItem('borderOpacity', borderOpacity);
  }, [borderOpacity]);

  useEffect(() => {
    localStorage.setItem('backgroundType', backgroundType);
    localStorage.setItem('currentBackground', currentBackground);
  }, [backgroundType, currentBackground]);

  useEffect(() => {
    localStorage.setItem('randomEffect', randomEffect);
  }, [randomEffect]);

  useEffect(() => {
    localStorage.setItem('randomInterval', randomInterval);
  }, [randomInterval]);

  useEffect(() => {
    localStorage.setItem('randomIntervalRange', randomIntervalRange);
  }, [randomIntervalRange]);

  // Полноэкранный режим
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
      setShowFullscreenHint(true);
      
      clearTimeout(hintTimerRef.current);
      hintTimerRef.current = setTimeout(() => {
        setShowFullscreenHint(false);
      }, 3000);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
      setShowFullscreenHint(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (!document.fullscreenElement) {
        setShowFullscreenHint(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && document.fullscreenElement) {
        setIsFullscreen(false);
        setShowFullscreenHint(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Выбор папки
  const handleFolderSelect = (e) => {
    const files = Array.from(e.target.files).filter(file => 
      file.type.startsWith('image/')
    );

    if (files.length > 0) {
      const path = files[0].webkitRelativePath.split('/')[0];
      setFolderPath(path || 'Выбрана папка с изображениями');

      const newImages = [];
      let loadedCount = 0;

      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push({
            id: index,
            data: e.target.result,
            name: file.name,
            path: file.webkitRelativePath
          });

          loadedCount++;
          if (loadedCount === files.length) {
            setFolderImages(newImages);
            localStorage.setItem('folderImages', JSON.stringify(newImages.map(img => img.data)));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Выбор изображения из папки
  const selectFolderImage = (image) => {
    setBackgroundType('folder');
    setCurrentBackground(image.data);
    setCurrentImageIndex(image.id);
    stopSlideshow();
  };

  // Выбор градиента
  const selectGradient = (gradientKey) => {
    setBackgroundType('gradient');
    setCurrentBackground(gradientKey);
    stopSlideshow();
  };

  // Слайд-шоу
  const startSlideshow = useCallback(() => {
    if (folderImages.length === 0) {
      alert('Сначала выберите папку с изображениями!');
      return;
    }

    stopSlideshow();

    let images = [...folderImages];
    if (shuffleImages) {
      images = images.sort(() => Math.random() - 0.5);
    }

    setCurrentImageIndex(0);
    setSlideshowActive(true);

    const showNextImage = () => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
      
      const effect = randomEffect 
        ? effects[Math.floor(Math.random() * effects.length)]
        : transitionEffect;
      
      // Применяем эффект
      document.body.classList.add(`${effect}-bg`);
      setTimeout(() => {
        setCurrentBackground(images[currentImageIndex].data);
        setTimeout(() => {
          document.body.classList.remove(`${effect}-bg`);
        }, 500);
      }, 50);
    };

    const getIntervalMs = () => {
      if (randomInterval) {
        const [min, max] = randomIntervalRange.split(',').map(Number);
        return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
      }
      return parseInt(slideshowInterval) * 1000;
    };

    const scheduleNext = () => {
      const intervalMs = getIntervalMs();
      slideshowTimerRef.current = setTimeout(() => {
        showNextImage();
        scheduleNext();
      }, intervalMs);
    };

    scheduleNext();
  }, [folderImages, shuffleImages, randomEffect, transitionEffect, randomInterval, randomIntervalRange, slideshowInterval, currentImageIndex]);

  const stopSlideshow = useCallback(() => {
    if (slideshowTimerRef.current) {
      clearTimeout(slideshowTimerRef.current);
      slideshowTimerRef.current = null;
    }
    setSlideshowActive(false);
  }, []);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (slideshowTimerRef.current) {
        clearTimeout(slideshowTimerRef.current);
      }
      if (hintTimerRef.current) {
        clearTimeout(hintTimerRef.current);
      }
    };
  }, []);

  // Получение стиля фона
  const getBackgroundStyle = () => {
    if (backgroundType === 'gradient') {
      return { background: gradients[currentBackground], backgroundAttachment: 'fixed' };
    } else if (backgroundType === 'folder' && currentBackground) {
      return { background: `url('${currentBackground}') center/cover fixed`, backgroundAttachment: 'fixed' };
    }
    return { background: gradients.gradient1, backgroundAttachment: 'fixed' };
  };

  // Стили для часов
  const clockStyle = {
    color: clockColor,
    fontSize: `${clockSize}rem`,
    textShadow: `0 0 ${10 * glowIntensity / 100}px ${clockColor}, 
                 0 0 ${20 * glowIntensity / 100}px ${clockColor}, 
                 0 0 ${40 * glowIntensity / 100}px ${clockColor}`
  };

  const dateStyle = {
    fontSize: `${clockSize / 4}rem`
  };

  const wrapperStyle = {
    background: `rgba(0, 0, 0, ${borderOpacity})`
  };

  const [minInterval, maxInterval] = randomIntervalRange.split(',').map(Number);

  return (
    <div className="app" style={getBackgroundStyle()}>
      <div className="container" ref={containerRef}>
        {/* Верхняя панель */}
        <div className="top-bar">
          <button className="settings-btn" onClick={() => setShowSettings(true)} title="Настройки">
            <svg className="settings-icon" viewBox="0 0 24 24" width="24" height="24">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94 0 .31.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
            </svg>
          </button>
          
          <button className="fullscreen-btn" onClick={toggleFullscreen} title="На весь экран">
            <svg className="fullscreen-icon" viewBox="0 0 24 24" width="24" height="24">
              {isFullscreen ? (
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
              ) : (
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
              )}
            </svg>
          </button>
        </div>

        {/* Панель настроек */}
        {showSettings && (
          <div className="settings-panel">
            <div className="settings-header">
              <h3>Настройки</h3>
              <button className="close-settings" onClick={() => setShowSettings(false)}>✕</button>
            </div>
            
            <div className="settings-content">
              {/* Вкладки */}
              <div className="settings-tabs">
                {['background', 'clock', 'slideshow'].map(tab => (
                  <button
                    key={tab}
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'background' && '🖼️ Фон'}
                    {tab === 'clock' && '⏰ Часы'}
                    {tab === 'slideshow' && '📸 Слайд-шоу'}
                  </button>
                ))}
              </div>
              
              {/* Вкладка фона */}
              {activeTab === 'background' && (
                <div className="tab-content active">
                  <div className="background-settings">
                    <h4>Выбор папки с изображениями</h4>
                    <div className="folder-selector">
                      <input 
                        type="file" 
                        id="folderInput" 
                        webkitdirectory="true" 
                        directory="true" 
                        multiple 
                        style={{ display: 'none' }}
                        onChange={handleFolderSelect}
                      />
                      <button 
                        className="folder-btn" 
                        onClick={() => document.getElementById('folderInput').click()}
                      >
                        📁 Выбрать папку
                      </button>
                      <span className="folder-path">{folderPath || 'Папка не выбрана'}</span>
                    </div>
                    
                    {folderImages.length > 0 && (
                      <div className="folder-images">
                        <h5>Изображения в папке:</h5>
                        <div className="images-grid">
                          {folderImages.map(img => (
                            <div
                              key={img.id}
                              className={`image-item ${backgroundType === 'folder' && currentBackground === img.data ? 'active' : ''}`}
                              onClick={() => selectFolderImage(img)}
                            >
                              <img src={img.data} alt={img.name} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <h4>Готовые градиенты</h4>
                    <div className="preset-grid">
                      {Object.keys(gradients).map(key => (
                        <div
                          key={key}
                          className={`preset-item ${backgroundType === 'gradient' && currentBackground === key ? 'active' : ''}`}
                          onClick={() => selectGradient(key)}
                        >
                          <div className={`preset-preview gradient-${key.slice(-1)}`}></div>
                          <span>Градиент {key.slice(-1)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Вкладка часов */}
              {activeTab === 'clock' && (
                <div className="tab-content active">
                  <div className="clock-settings">
                    <h4>Размер часов</h4>
                    <div className="clock-size">
                      <div className="size-control">
                        <input 
                          type="range" 
                          min="2" 
                          max="12" 
                          step="0.5" 
                          value={clockSize}
                          onChange={(e) => setClockSize(e.target.value)}
                        />
                        <span className="size-value">{clockSize}rem</span>
                      </div>
                      <div className="size-presets">
                        {[
                          { size: '3', label: 'Маленький' },
                          { size: '6', label: 'Средний' },
                          { size: '9', label: 'Большой' },
                          { size: '12', label: 'Огромный' }
                        ].map(preset => (
                          <button
                            key={preset.size}
                            className={`size-preset ${clockSize === preset.size ? 'active' : ''}`}
                            onClick={() => setClockSize(preset.size)}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <h4>Цвет часов</h4>
                    <div className="color-picker">
                      {[
                        '#00ffff', '#ff00ff', '#00ff00', '#ffff00',
                        '#ff9900', '#ff0000', '#ffffff', '#aa00ff'
                      ].map(color => (
                        <div
                          key={color}
                          className={`color-preset ${clockColor === color ? 'active' : ''}`}
                          style={{ background: color, color: color === '#ffffff' ? '#000' : '#fff' }}
                          onClick={() => setClockColor(color)}
                        >
                          {color === '#00ffff' && 'Голубой'}
                          {color === '#ff00ff' && 'Розовый'}
                          {color === '#00ff00' && 'Зеленый'}
                          {color === '#ffff00' && 'Желтый'}
                          {color === '#ff9900' && 'Оранжевый'}
                          {color === '#ff0000' && 'Красный'}
                          {color === '#ffffff' && 'Белый'}
                          {color === '#aa00ff' && 'Фиолетовый'}
                        </div>
                      ))}
                    </div>
                    
                    <div className="custom-color">
                      <label>Свой цвет:</label>
                      <input 
                        type="color" 
                        value={clockColor}
                        onChange={(e) => setClockColor(e.target.value)}
                      />
                    </div>
                    
                    <h4>Интенсивность подсветки</h4>
                    <div className="glow-control">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={glowIntensity}
                        onChange={(e) => setGlowIntensity(e.target.value)}
                      />
                      <span className="glow-value">{glowIntensity}%</span>
                    </div>
                    
                    <h4>Прозрачность рамки</h4>
                    <div className="border-opacity">
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.1" 
                        value={borderOpacity}
                        onChange={(e) => setBorderOpacity(e.target.value)}
                      />
                      <span>{Math.round(borderOpacity * 100)}%</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Вкладка слайд-шоу */}
              {activeTab === 'slideshow' && (
                <div className="tab-content active">
                  <div className="slideshow-settings">
                    <label className="setting-item">
                      <span>Эффект перехода:</span>
                      <select 
                        value={transitionEffect}
                        onChange={(e) => setTransitionEffect(e.target.value)}
                        disabled={randomEffect}
                      >
                        <option value="fade">Плавное появление</option>
                        <option value="slide">Скольжение</option>
                        <option value="zoom">Увеличение</option>
                        <option value="blur">Размытие</option>
                        <option value="flip">Переворот</option>
                        <option value="rotate">Вращение</option>
                        <option value="bounce">Подпрыгивание</option>
                        <option value="flash">Вспышка</option>
                      </select>
                    </label>
                    
                    <label className="setting-item">
                      <span>Интервал смены:</span>
                      <select 
                        value={slideshowInterval}
                        onChange={(e) => setSlideshowInterval(e.target.value)}
                        disabled={randomInterval}
                      >
                        <option value="3">3 секунды</option>
                        <option value="5">5 секунд</option>
                        <option value="10">10 секунд</option>
                        <option value="30">30 секунд</option>
                        <option value="60">1 минута</option>
                        <option value="300">5 минут</option>
                        <option value="600">10 минут</option>
                        <option value="1200">20 минут</option>
                        <option value="1800">30 минут</option>
                        <option value="3600">1 час</option>
                      </select>
                    </label>
                    
                    <div className="random-options">
                      <label>
                        <input 
                          type="checkbox" 
                          checked={randomEffect}
                          onChange={(e) => setRandomEffect(e.target.checked)}
                        /> 
                        <span>Случайный эффект перехода</span>
                      </label>
                      
                      <label>
                        <input 
                          type="checkbox" 
                          checked={randomInterval}
                          onChange={(e) => setRandomInterval(e.target.checked)}
                        /> 
                        <span>Случайный интервал</span>
                      </label>
                      
                      {randomInterval && (
                        <>
                          <div className="random-interval-control">
                            <span id="minIntervalValue">{minInterval}</span>
                            <input 
                              type="range" 
                              min="3" 
                              max="60" 
                              value={randomIntervalRange}
                              onChange={(e) => setRandomIntervalRange(e.target.value)}
                              step="1"
                            />
                            <span id="maxIntervalValue">{maxInterval}</span>
                          </div>
                          <div style={{color: 'rgba(255,255,255,0.7)', fontSize: '12px', textAlign: 'center'}}>
                            Диапазон случайного интервала (секунд)
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="setting-item checkbox">
                      <label>
                        <input 
                          type="checkbox" 
                          checked={shuffleImages}
                          onChange={(e) => setShuffleImages(e.target.checked)}
                        /> 
                        <span>Случайный порядок изображений</span>
                      </label>
                    </div>
                    
                    <div className="slideshow-controls">
                      <button 
                        className="slideshow-btn" 
                        onClick={startSlideshow}
                        disabled={slideshowActive}
                      >
                        ▶ Старт
                      </button>
                      <button 
                        className="slideshow-btn stop" 
                        onClick={stopSlideshow}
                        disabled={!slideshowActive}
                      >
                        ⏹ Стоп
                      </button>
                    </div>
                    
                    <div className="current-status" style={{color: slideshowActive ? '#4caf50' : 'rgba(255,255,255,0.7)'}}>
                      Статус: {slideshowActive ? 'активно' : 'остановлено'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Часы */}
        <div className="clock-wrapper" style={wrapperStyle}>
          <div className="digital-clock" style={clockStyle}>
            <span id="hours">{formatNumber(time.getHours())}</span>
            <span className="colon">:</span>
            <span id="minutes">{formatNumber(time.getMinutes())}</span>
            <span className="colon">:</span>
            <span id="seconds">{formatNumber(time.getSeconds())}</span>
          </div>
          <div className="date" style={dateStyle}>
            {time.toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>
      
      {/* Подсказка для выхода из полноэкранного режима */}
      <div className={`fullscreen-hint ${showFullscreenHint ? 'show' : ''}`}>
        Нажмите ESC для выхода из полноэкранного режима
      </div>
    </div>
  );
};

export default App;