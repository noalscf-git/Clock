// src/entities/animated/model/types.ts
export type AnimatedBackgroundType = 
  | 'particles'
  | 'waves'
  | 'stars'
  | 'matrix'
  | 'gradient'
  | 'fire'
  | 'aurora'
  | 'bubbles';

export interface AnimatedBackgroundSettings {
  id: string;
  name: string;
  type: AnimatedBackgroundType;
  speed: number;        // 0.5 - 3
  intensity: number;     // 0 - 100
  density: number;       // 1 - 100
  color1: string;
  color2: string;
  color3?: string;
}

export interface AnimationConfig {
  fps?: number;
  width?: number;
  height?: number;
  onFrame?: (ctx: CanvasRenderingContext2D, time: number) => void;
}