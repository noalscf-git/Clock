import { AnimatedBackground as AnimatedBackgroundType } from '../../../types/background';

export interface AnimatedBackgroundProps {
  settings: AnimatedBackgroundType;
  className?: string;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

export interface Wave {
  baseY: number;
  amplitude: number;
  frequency: number;
  speed: number;
  phase: number;
  color1: string;
  color2: string;
}

export interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  brightness: number;
  color: string;
}

export interface MatrixChar {
  x: number;
  y: number;
  speed: number;
  chars: string;
  color: string;
}

export interface Bubble {
  x: number;
  y: number;
  size: number;
  speed: number;
  phase: number;
  color1: string;
  color2: string;
}

export interface FireParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  color: string;
}

export interface Aurora {
  baseY: number;
  amplitude: number;
  frequency: number;
  speed: number;
  phase: number;
  color1: string;
  color2: string;
  color3?: string;
}