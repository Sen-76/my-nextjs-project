import React from 'react';
import { ThemeConfigSheet } from './theme-config-sheet';
import { BreadCrum } from './bread-crum';
import { Notification } from './notification';
import AuthenModal from './authen-modal';
import AvatarComponent from './avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { CustomButton } from '@/components/ui/custom-button';
import useThemeProviderStore from '@/common/stores/theme-provider';

export const Header = () => {
  const config = useThemeProviderStore((state) => state.theme);
  const changeSideBar = useThemeProviderStore((state) => state.changeSideBarWidth);
  const changeWidth = () => {
    const width = config.sideBarWidth === '250px' ? '100px' : '250px';
    changeSideBar(width);
  };
  return (
    <header className="p-5 bg-white-trans-50 flex justify-between items-center">
      <div className="flex gap-3 justify-between items-center">
        <CustomButton onClick={changeWidth}>
          <FontAwesomeIcon icon={faBars} />
        </CustomButton>
        <BreadCrum />
      </div>
      <div className="flex">
        <Notification />
        <ThemeConfigSheet />
        <AuthenModal />
        <AvatarComponent />
      </div>
    </header>
  );
};
