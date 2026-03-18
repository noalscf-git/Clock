export interface SlideshowState {
  isActive: boolean;
  effect: string;
  interval: string;
  randomEffect: boolean;
  randomInterval: boolean;
  randomIntervalRange: string;
  shuffleImages: boolean;
  currentIndex: number;
  playlistIds: string[];
  playlistType: 'folder' | 'mixed';
}

export interface SlideshowSettings {
  interval: string;
  effect: string;
  randomEffect: boolean;
  randomInterval: boolean;
  randomIntervalRange: string;
  shuffleImages: boolean;
}