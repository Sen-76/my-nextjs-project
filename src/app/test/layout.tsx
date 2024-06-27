import React, { PropsWithChildren } from 'react';

export const metadata = {
  title: 'Test',
  description: 'Test Page',
};

const layout = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export default layout;
