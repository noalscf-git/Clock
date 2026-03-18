// src/features/settings/config/constants.ts
import type { SlideshowSettings } from '../model/types';

export const DEFAULT_SLIDESHOW_SETTINGS: SlideshowSettings = {
  interval: '5',
  effect: 'fade',
  randomEffect: false,
  randomInterval: false,
  randomIntervalRange: '5,30',
  shuffleImages: false,
};