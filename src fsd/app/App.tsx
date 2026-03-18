// src/app/App.tsx
import React from 'react';
import { SettingsProvider } from './providers/SettingsProvider';
import { MainPage } from '@/pages/MainPage';
import './index.css';

export const App: React.FC = () => {
  return (
    <SettingsProvider>
      <MainPage />
    </SettingsProvider>
  );
};