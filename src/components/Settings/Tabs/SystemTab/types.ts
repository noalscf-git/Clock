export interface SystemSettingsProps {
  showMonitor: boolean;
  monitorSize: 'small' | 'medium' | 'large';
  onShowMonitorChange: (show: boolean) => void;
  onMonitorSizeChange: (size: 'small' | 'medium' | 'large') => void;
}