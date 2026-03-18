export interface FolderImage {
  id: number;
  data: string;
  name: string;
  path?: string;
}

export interface GradientColor {
  id: string;
  color: string;
  position: number;
}

export interface CustomGradient {
  id: string;
  name: string;
  colors: GradientColor[];
  angle: number;
  type: 'linear' | 'radial';
}

export interface AnimatedBackground {
  id: string;
  name: string;
  type: 'particles' | 'waves' | 'stars' | 'matrix' | 'gradient' | 'fire' | 'aurora' | 'bubbles';
  speed: number;
  intensity: number;
  color1: string;
  color2: string;
  color3?: string;
  density: number;
}

export type GradientKey = 'gradient1' | 'gradient2' | 'gradient3' | 'gradient4' | 'gradient5' | 'gradient6';

export type BackgroundType = 'gradient' | 'folder' | 'custom' | 'animated';