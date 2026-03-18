// src/entities/animated/ui/AnimatedBackground.tsx
import React, { useRef, useEffect } from 'react';
import { useAnimatedBackground } from '../model/useAnimatedBackground';
import type { AnimatedBackgroundSettings } from '../model/types';
import styles from './AnimatedBackground.module.css';

interface AnimatedBackgroundProps {
  settings?: AnimatedBackgroundSettings;
  className?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  settings: externalSettings,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  // Используем внешние настройки или стандартные
  const { settings } = useAnimatedBackground();
  const activeSettings = externalSettings || settings;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let time = 0;
    let lastTime = performance.now();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Инициализация частиц в зависимости от типа
    const initParticles = () => {
      const count = Math.floor(activeSettings.density * 2);
      particles = [];

      switch (activeSettings.type) {
        case 'particles':
          for (let i = 0; i < count; i++) {
            particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              vx: (Math.random() - 0.5) * activeSettings.speed * 2,
              vy: (Math.random() - 0.5) * activeSettings.speed * 2,
              size: Math.random() * 3 + 1,
            });
          }
          break;

        case 'waves':
          for (let i = 0; i < 3; i++) {
            particles.push({
              baseY: canvas.height * (0.3 + i * 0.2),
              amplitude: 50 + i * 30,
              frequency: 0.02 + i * 0.01,
              speed: activeSettings.speed * 0.02,
              phase: i * Math.PI / 2,
            });
          }
          break;

        case 'stars':
          for (let i = 0; i < count * 3; i++) {
            particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              size: Math.random() * 3,
              speed: activeSettings.speed * 0.02,
              brightness: 0.5 + Math.random() * 0.5,
            });
          }
          break;

        case 'matrix':
          const columns = Math.floor(canvas.width / 20);
          for (let i = 0; i < columns; i++) {
            particles.push({
              x: i * 20 + 10,
              y: Math.random() * canvas.height,
              speed: activeSettings.speed * (Math.random() * 2 + 1),
              chars: '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
            });
          }
          break;

        case 'bubbles':
          for (let i = 0; i < count; i++) {
            particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              size: Math.random() * 30 + 10,
              speed: activeSettings.speed * 0.5,
              phase: Math.random() * Math.PI * 2,
            });
          }
          break;

        case 'fire':
          for (let i = 0; i < count; i++) {
            particles.push({
              x: Math.random() * canvas.width,
              y: canvas.height - Math.random() * 200,
              vx: (Math.random() - 0.5) * activeSettings.speed,
              vy: -Math.random() * activeSettings.speed * 3,
              size: Math.random() * 10 + 5,
              life: 1,
            });
          }
          break;

        case 'aurora':
          for (let i = 0; i < 3; i++) {
            particles.push({
              baseY: canvas.height * (0.2 + i * 0.2),
              amplitude: 100 + i * 50,
              frequency: 0.005 + i * 0.002,
              speed: activeSettings.speed * 0.01,
              phase: i * Math.PI / 3,
            });
          }
          break;
      }
    };

    initParticles();

    // Функции отрисовки
    const drawParticles = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        const alpha = 0.6 + Math.sin(time + p.x) * 0.2;
        ctx.fillStyle = `rgba(${parseInt(activeSettings.color1.slice(1,3), 16)}, 
                              ${parseInt(activeSettings.color1.slice(3,5), 16)}, 
                              ${parseInt(activeSettings.color1.slice(5,7), 16)}, 
                              ${alpha})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      time += 0.02;
    };

    const drawWaves = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(wave => {
        ctx.beginPath();

        for (let x = 0; x < canvas.width; x += 5) {
          const y = wave.baseY + 
                    Math.sin(x * wave.frequency + time * 10 + wave.phase) * 
                    wave.amplitude * (activeSettings.intensity / 100);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, activeSettings.color1);
        gradient.addColorStop(1, activeSettings.color2);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.stroke();
      });

      time += 0.05;
    };

    const drawStars = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        const brightness = 0.5 + Math.sin(time * 2 + p.x) * 0.3;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * brightness, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(${parseInt(activeSettings.color1.slice(1,3), 16)}, 
                              ${parseInt(activeSettings.color1.slice(3,5), 16)}, 
                              ${parseInt(activeSettings.color1.slice(5,7), 16)}, 
                              ${brightness})`;
        ctx.fill();
      });

      time += 0.02;
    };

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '20px monospace';
      ctx.textAlign = 'center';

      particles.forEach(p => {
        const char = p.chars[Math.floor(Math.random() * p.chars.length)];

        ctx.fillStyle = `rgba(${parseInt(activeSettings.color1.slice(1,3), 16)}, 
                              ${parseInt(activeSettings.color1.slice(3,5), 16)}, 
                              ${parseInt(activeSettings.color1.slice(5,7), 16)}, 
                              0.8)`;
        ctx.fillText(char, p.x, p.y);

        p.y += p.speed;
        if (p.y > canvas.height) {
          p.y = 0;
        }
      });
    };

    const drawBubbles = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.strokeStyle = activeSettings.color1;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p.x - p.size * 0.2, p.y - p.size * 0.2, p.size * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = activeSettings.color2;
        ctx.fill();

        p.y -= p.speed;
        p.x += Math.sin(time + p.phase) * 0.5;

        if (p.y + p.size < 0) {
          p.y = canvas.height + p.size;
          p.x = Math.random() * canvas.width;
        }
      });

      time += 0.05;
    };

    const drawFire = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, activeSettings.color1);
        gradient.addColorStop(1, activeSettings.color2);
        
        ctx.fillStyle = gradient;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        p.size *= 0.99;
        p.life -= 0.005;

        return p.life > 0 && p.size > 1;
      });

      for (let i = 0; i < activeSettings.intensity / 5; i++) {
        if (particles.length < 200) {
          particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height,
            vx: (Math.random() - 0.5) * activeSettings.speed,
            vy: -Math.random() * activeSettings.speed * 4,
            size: Math.random() * 15 + 5,
            life: 1,
          });
        }
      }
    };

    const drawAurora = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(aurora => {
        ctx.beginPath();
        ctx.globalAlpha = 0.3;

        for (let x = 0; x < canvas.width; x += 5) {
          const y = aurora.baseY + 
                    Math.sin(x * aurora.frequency + time * 20 + aurora.phase) * 
                    aurora.amplitude * (activeSettings.intensity / 100);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, activeSettings.color1);
        gradient.addColorStop(0.5, activeSettings.color2);
        gradient.addColorStop(1, activeSettings.color3 || activeSettings.color1);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 5;
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      time += 0.02;
    };

    const drawGradient = () => {
      const gradient = ctx.createLinearGradient(
        Math.sin(time) * 200 + canvas.width / 2,
        Math.cos(time) * 200 + canvas.height / 2,
        Math.sin(time + Math.PI) * 200 + canvas.width / 2,
        Math.cos(time + Math.PI) * 200 + canvas.height / 2
      );

      gradient.addColorStop(0, activeSettings.color1);
      gradient.addColorStop(0.5, activeSettings.color2);
      gradient.addColorStop(1, activeSettings.color3 || activeSettings.color1);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.005 * activeSettings.speed;
    };

    // Анимационный цикл
    const animate = () => {
      const now = performance.now();
      const deltaTime = now - lastTime;

      if (deltaTime > 16) { // ~60 FPS
        switch (activeSettings.type) {
          case 'particles':
            drawParticles();
            break;
          case 'waves':
            drawWaves();
            break;
          case 'stars':
            drawStars();
            break;
          case 'matrix':
            drawMatrix();
            break;
          case 'bubbles':
            drawBubbles();
            break;
          case 'fire':
            drawFire();
            break;
          case 'aurora':
            drawAurora();
            break;
          case 'gradient':
            drawGradient();
            break;
          default:
            drawParticles();
        }
        lastTime = now;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [activeSettings]);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.canvas} ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};