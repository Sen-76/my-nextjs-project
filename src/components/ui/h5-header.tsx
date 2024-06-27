import React from 'react';

interface IPragraph {
  children: string;
}
export const H5Header = (props: IPragraph) => {
  const { children } = props;
  return <div className="text-base text-black-85 font-semibold !no-underline">{children}</div>;
};
