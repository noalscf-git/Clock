export interface SystemMonitorProps {
  className?: string;
  fontFamily: string;
  textColor: string;
  glowIntensity: number;
  borderOpacity: number;
  size: 'small' | 'medium' | 'large';
}

export interface MetricItemProps {
  icon: string;
  value: number;
  unit?: string;
  color: string;
  temperature?: number;
  fontFamily: string;
  textColor: string;
  glowIntensity: number;
  size: 'small' | 'medium' | 'large';
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