import React from 'react';
import { DataTable } from './data-table';
import { columns, IGame } from './columns';

export const payments: IGame[] = [
  {
    id: '728ed52f',
    title: 'Title 1',
    img: [
      'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    ],
    description: 'Đây là description',
    category: ['Action', 'Some-Tag'],
    status: 'Pending',
    lang: 'Vn',
    author: 'Author 1',
  },
  {
    id: '489e1d42',
    title: 'Title 2',
    category: ['R-10'],
    img: ['https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg'],
    description:
      'Đây là description long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long ',
    status: 'Processing',
    lang: 'En',
    author: 'Author 2',
  },
];
const DemoTable = () => {
  return (
    <div className="container mx-auto py-10 h-full w-full">
      <DataTable columns={columns} data={payments} />
    </div>
  );
};

export default DemoTable;
