export interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: string | number;
  onChange: (value: string) => void;
  label?: string;
  valueSuffix?: string;
}