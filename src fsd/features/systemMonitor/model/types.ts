// src/features/systemMonitor/model/types.ts
export interface CPUInfo {
  usage: number;        // 0-100
  temperature?: number; // в градусах Цельсия
  cores?: number;       // количество ядер
  frequency?: number;   // частота в МГц
}

export interface GPUInfo {
  usage: number;        // 0-100
  temperature?: number; // в градусах Цельсия
  memory?: number;      // использование памяти в %
  name?: string;        // название GPU
}

export interface SystemMetrics {
  cpu: CPUInfo;
  gpu: GPUInfo;
  timestamp: number;    // временная метка
}

export type MonitorSize = 'small' | 'medium' | 'large';

export interface SystemMonitorViewModel {
  metrics: SystemMetrics;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export interface SystemMonitorProps {
  size?: MonitorSize;
  showLabels?: boolean;
  showTemperature?: boolean;
  className?: string;
  fontFamily?: string;
  textColor?: string;
  glowIntensity?: number;
  borderOpacity?: number;
}