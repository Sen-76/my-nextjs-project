import useThemeProviderStore from '@/common/stores/theme-provider';
import React, { PropsWithChildren } from 'react';

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const config = useThemeProviderStore((state) => state.theme);
  return (
    <div
      className="h-full w-full bg-blend-color-dodge !py-0 object-cover bg-contain bg-repeat-round"
      style={{ backgroundImage: `url(${config.backgroundImage})`, backgroundColor: config.background }}
    >
      {children}
    </div>
  );
};

export default ThemeProvider;
