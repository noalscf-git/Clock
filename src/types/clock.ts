export interface ClockSettings {
  size: string;
  color: string;
  glowIntensity: string;
  borderOpacity: string;
  fontFamily: string;
}

export interface ClockDisplayProps {
  time: Date;
  clockStyle: React.CSSProperties;
  dateStyle: React.CSSProperties;
  wrapperStyle: React.CSSProperties;
}

export interface SystemMetrics {
  cpu: {
    usage: number;
    temperature?: number;
  };
  gpu: {
    usage: number;
    temperature?: number;
  };
}

export interface SystemMonitorProps {
  className?: string;
  fontFamily: string;
  textColor: string;
  glowIntensity: number;
  borderOpacity: number;
  size: 'small' | 'medium' | 'large';
}