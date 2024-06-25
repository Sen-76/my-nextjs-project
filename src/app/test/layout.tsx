import React, { PropsWithChildren } from 'react';

export const metadata = {
  title: 'hihi',
  description: 'haha',
};

const layout = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export default layout;
