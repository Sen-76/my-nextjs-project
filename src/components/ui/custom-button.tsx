import React, { ReactNode } from 'react';

interface ICustomButton {
  children: ReactNode;
  onClick?: () => void;
}
export const CustomButton = (props: ICustomButton) => {
  const { children, onClick } = props;
  return (
    <div
      onClick={onClick}
      className="w-10 h-10 flex items-center justify-center hover:bg-gray-300 rounded-lg cursor-pointer"
    >
      {children}
    </div>
  );
};
