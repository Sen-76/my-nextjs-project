import React from 'react';
import { ThemeConfigSheet } from './theme-config-sheet';
import { BreadCrum } from './bread-crum';

export const Header = () => {
  return (
    <header className="p-5 bg-white flex justify-between items-center">
      <BreadCrum />
      <ThemeConfigSheet />
    </header>
  );
};
