import useThemeProviderStore from '@/common/stores/theme-provider';
import React from 'react';

export const SideBar = () => {
  const config = useThemeProviderStore((state) => state.theme);
  return (
    <div
      className="bg-white-trans-50 px-5 py-3 h-full transition-all duration-1000 overflow-hidden"
      style={{ width: config.sideBarWidth, minWidth: config.sideBarWidth }}
    >
      SideBar
    </div>
  );
};
