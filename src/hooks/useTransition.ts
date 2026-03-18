import { useState, useEffect } from 'react';
import { GRADIENTS } from '../utils/constants/gradients';
import { GradientKey, CustomGradient, FolderImage } from '../types/background';

export const useTransition = (
  backgroundType: string,
  backgroundValue: string,
  folderImages: FolderImage[],
  customGradients: CustomGradient[],
  getGradientStyle: (gradient: CustomGradient) => string
) => {
  const [currentBackground, setCurrentBackground] = useState<string>(() => {
    if (backgroundType === 'gradient') {
      return GRADIENTS[backgroundValue as GradientKey];
    }
    return GRADIENTS.gradient1;
  });

  const [nextBackground, setNextBackground] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionEffect, setTransitionEffect] = useState('');

  useEffect(() => {
    if (backgroundType === 'animated') return;

    if (backgroundType === 'gradient') {
      setCurrentBackground(GRADIENTS[backgroundValue as GradientKey]);
    } else if (backgroundType === 'custom') {
      const gradient = customGradients.find(g => g.id === backgroundValue);
      if (gradient) {
        setCurrentBackground(getGradientStyle(gradient));
      }
    } else if (backgroundType === 'folder') {
      const image = folderImages.find(img => img.id.toString() === backgroundValue);
      if (image?.data) {
        setCurrentBackground(image.data);
      } else if (folderImages.length > 0 && !backgroundValue) {
        setCurrentBackground(folderImages[0].data);
      }
    }
  }, [backgroundType, backgroundValue, folderImages, customGradients, getGradientStyle]);

  const startTransition = (newBackground: string, effect: string) => {
    setNextBackground(newBackground);
    setTransitionEffect(effect);
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentBackground(newBackground);
      setNextBackground(null);
      setIsTransitioning(false);
      setTransitionEffect('');
    }, 500);
  };

  return {
    currentBackground,
    nextBackground,
    isTransitioning,
    transitionEffect,
    startTransition
  };
};