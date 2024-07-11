import React, { ReactNode } from 'react';

interface ILinkText {
  children: ReactNode;
}
const LinkText = (props: ILinkText) => {
  const { children } = props;
  return <div className="hover:text-blue-600 cursor-pointer">{children}</div>;
};

export default LinkText;
