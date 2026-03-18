import { useEffect, useRef } from 'react';
import { AnimatedBackground } from '../../../../types/background';
import { Particle, Wave, Star, MatrixChar, Bubble, FireParticle, Aurora } from '../types';

export const useCanvasAnimation = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  settings: AnimatedBackground
) => {
  const animationRef = useRef<number>();
  const particlesRef = useRef<any[]>([]);
  const timeRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

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

    const getBackgroundColor = () => settings.color1 || '#000000';

    const initParticles = () => {
      const count = Math.floor(settings.density * 2);
      particles = [];

      switch (settings.type) {
        case 'particles':
          for (let i = 0; i < count; i++) {
            particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              vx: (Math.random() - 0.5) * settings.speed * 2,
              vy: (Math.random() - 0.5) * settings.speed * 2,
              size: Math.random() * 3 + 1,
              color: settings.color1
            });
          }
          break;

        case 'waves':
          for (let i = 0; i < 3; i++) {
            particles.push({
              baseY: canvas.height * (0.3 + i * 0.2),
              amplitude: 50 + i * 30,
              frequency: 0.02 + i * 0.01,
              speed: settings.speed * 0.02,
              phase: i * Math.PI / 2,
              color1: settings.color1,
              color2: settings.color2
            });
          }
          break;

        case 'stars':
          for (let i = 0; i < count * 3; i++) {
            particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              size: Math.random() * 3,
              speed: settings.speed * 0.02,
              brightness: 0.5 + Math.random() * 0.5,
              color: settings.color1
            });
          }
          break;

        case 'matrix':
          const columns = Math.floor(canvas.width / 20);
          for (let i = 0; i < columns; i++) {
            particles.push({
              x: i * 20 + 10,
              y: Math.random() * canvas.height,
              speed: settings.speed * (Math.random() * 2 + 1),
              chars: '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
              color: settings.color1
            });
          }
          break;

        case 'bubbles':
          for (let i = 0; i < count; i++) {
            particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              size: Math.random() * 30 + 10,
              speed: settings.speed * 0.5,
              phase: Math.random() * Math.PI * 2,
              color1: settings.color1,
              color2: settings.color2
            });
          }
          break;

        case 'fire':
          for (let i = 0; i < count; i++) {
            particles.push({
              x: Math.random() * canvas.width,
              y: canvas.height - Math.random() * 200,
              vx: (Math.random() - 0.5) * settings.speed,
              vy: -Math.random() * settings.speed * 3,
              size: Math.random() * 10 + 5,
              life: 1,
              color: `hsl(${20 + Math.random() * 30}, 100%, 60%)`
            });
          }
          break;

        case 'aurora':
          for (let i = 0; i < 3; i++) {
            particles.push({
              baseY: canvas.height * (0.2 + i * 0.2),
              amplitude: 100 + i * 50,
              frequency: 0.005 + i * 0.002,
              speed: settings.speed * 0.01,
              phase: i * Math.PI / 3,
              color1: settings.color1,
              color2: settings.color2,
              color3: settings.color3
            });
          }
          break;

        case 'gradient':
          particles = [];
          break;
      }
    };

    initParticles();

    const drawParticles = () => {
      ctx.fillStyle = getBackgroundColor();
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        const r = parseInt(p.color.slice(1,3), 16);
        const g = parseInt(p.color.slice(3,5), 16);
        const b = parseInt(p.color.slice(5,7), 16);
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.6 + Math.sin(time + p.x) * 0.2})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      time += 0.02;
    };

    const drawWaves = () => {
      ctx.fillStyle = getBackgroundColor();
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((wave) => {
        ctx.beginPath();
        
        for (let x = 0; x < canvas.width; x += 5) {
          const y = wave.baseY + 
                    Math.sin(x * wave.frequency + time * wave.speed * 10 + wave.phase) * 
                    wave.amplitude * (settings.intensity / 100);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, wave.color1);
        gradient.addColorStop(1, wave.color2);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.stroke();
      });

      time += 0.05;
    };

    const drawStars = () => {
      ctx.fillStyle = getBackgroundColor();
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        const brightness = 0.5 + Math.sin(time * 2 + p.x) * 0.3;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * brightness, 0, Math.PI * 2);
        
        const r = parseInt(p.color.slice(1,3), 16);
        const g = parseInt(p.color.slice(3,5), 16);
        const b = parseInt(p.color.slice(5,7), 16);
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${brightness})`;
        ctx.fill();
      });

      time += 0.02;
    };

    const drawMatrix = () => {
      ctx.fillStyle = `rgba(0, 0, 0, ${0.1})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = '20px monospace';
      ctx.textAlign = 'center';
      
      particles.forEach(p => {
        const char = p.chars[Math.floor(Math.random() * p.chars.length)];
        
        const r = parseInt(p.color.slice(1,3), 16);
        const g = parseInt(p.color.slice(3,5), 16);
        const b = parseInt(p.color.slice(5,7), 16);
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.8)`;
        ctx.fillText(char, p.x, p.y);
        
        p.y += p.speed;
        if (p.y > canvas.height) {
          p.y = 0;
          p.x = 20 + Math.random() * (canvas.width - 40);
        }
      });
    };

    const drawBubbles = () => {
      ctx.fillStyle = getBackgroundColor();
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.strokeStyle = p.color1;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(p.x - p.size * 0.2, p.y - p.size * 0.2, p.size * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color2;
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
      ctx.fillStyle = `rgba(0, 0, 0, ${0.1})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles = particles.filter(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        p.size *= 0.99;
        p.life -= 0.005;

        return p.life > 0 && p.size > 1;
      });

      for (let i = 0; i < settings.intensity / 5; i++) {
        if (particles.length < 200) {
          particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height,
            vx: (Math.random() - 0.5) * settings.speed,
            vy: -Math.random() * settings.speed * 4,
            size: Math.random() * 15 + 5,
            life: 1,
            color: `hsl(${20 + Math.random() * 30}, 100%, 60%)`
          });
        }
      }
    };

    const drawAurora = () => {
      ctx.fillStyle = getBackgroundColor();
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((aurora) => {
        ctx.beginPath();
        ctx.globalAlpha = 0.3;
        
        for (let x = 0; x < canvas.width; x += 5) {
          const y = aurora.baseY + 
                    Math.sin(x * aurora.frequency + time * aurora.speed * 20 + aurora.phase) * 
                    aurora.amplitude * (settings.intensity / 100);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, aurora.color1);
        gradient.addColorStop(0.5, aurora.color2);
        gradient.addColorStop(1, aurora.color3 || aurora.color1);
        
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
      
      gradient.addColorStop(0, settings.color1);
      gradient.addColorStop(0.5, settings.color2);
      gradient.addColorStop(1, settings.color3 || settings.color1);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      time += 0.005 * settings.speed;
    };

    const animate = () => {
      const now = performance.now();
      const deltaTime = now - lastTime;
      
      if (deltaTime > 16) {
        switch (settings.type) {
          case 'particles': drawParticles(); break;
          case 'waves': drawWaves(); break;
          case 'stars': drawStars(); break;
          case 'matrix': drawMatrix(); break;
          case 'bubbles': drawBubbles(); break;
          case 'fire': drawFire(); break;
          case 'aurora': drawAurora(); break;
          case 'gradient': drawGradient(); break;
          default: drawParticles();
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
  }, [settings]);

  return animationRef;
};