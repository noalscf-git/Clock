// src/features/systemMonitor/index.ts
export { SystemMonitor } from './ui/SystemMonitor';
export { useSystemMonitor } from './model/useSystemMonitor';
export type { 
  SystemMetrics, 
  CPUInfo, 
  GPUInfo,
  MonitorSize,
  SystemMonitorViewModel 
} from './model/types';