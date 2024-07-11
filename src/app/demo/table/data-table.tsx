'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  VisibilityState,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { CustomButton } from '@/components/ui/custom-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTableCellsLarge, faTableList, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IGame } from './columns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import FilterSheet from './filter-sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import useThemeProviderStore from '@/common/stores/theme-provider';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: Readonly<DataTableProps<TData, TValue>>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [displayType, setDisplayType] = useState<'grid' | 'list'>('grid');
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const componentRef = useRef(null);
  const [containDivWidth, setContainDivWidth] = useState<number>(0);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection,
    },
  });

  const useContainerDimensions = (myRef: A) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
      const getDimensions = () => ({
        width: myRef.current.offsetWidth,
        height: myRef.current.offsetHeight,
      });

      const handleResize = () => {
        setDimensions(getDimensions());
      };

      if (myRef.current) {
        setDimensions(getDimensions());
      }

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [myRef]);

    return dimensions;
  };
  const { width } = useContainerDimensions(componentRef);
  const sideBarWidth = useThemeProviderStore((state) => state.theme.sideBarWidth);

  useEffect(() => {
    setContainDivWidth(width);
  }, [width]);

  useEffect(() => {
    console.log(containDivWidth);
  }, [containDivWidth]);

  useEffect(() => {
    sideBarWidth === '250px' ? setContainDivWidth(width - 150) : setContainDivWidth(width + 150);
  }, [sideBarWidth]);

  return (
    <div className="flex justify-between h-full w-full">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between">
          <div>
            <Button className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faPlus} />
              Create New
            </Button>
          </div>
          <div className="flex gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="m-0 p-0 hover:opacity-60 transition-all duration-700">
                  <CustomButton>
                    <FontAwesomeIcon icon={faEye} />
                  </CustomButton>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              style={{
                background: displayType === 'list' ? 'green' : 'white',
                color: displayType === 'list' ? 'white' : 'black',
              }}
              className="m-0 p-0 hover:opacity-60 transition-all duration-700"
              onClick={() => setDisplayType('list')}
            >
              <CustomButton>
                <FontAwesomeIcon icon={faTableList} />
              </CustomButton>
            </Button>
            <Button
              variant="outline"
              style={{
                background: displayType === 'grid' ? 'green' : 'white',
                color: displayType === 'grid' ? 'white' : 'black',
              }}
              className="m-0 p-0 hover:opacity-60 transition-all duration-700"
              onClick={() => setDisplayType('grid')}
            >
              <CustomButton>
                <FontAwesomeIcon icon={faTableCellsLarge} />
              </CustomButton>
            </Button>
            <Button
              variant="outline"
              className="m-0 p-0 hover:opacity-60 transition-all duration-700"
              onClick={() => {
                setOpenSheet(!openSheet);
                openSheet ? setContainDivWidth(containDivWidth + 290) : setContainDivWidth(containDivWidth - 290);
              }}
              style={{
                background: openSheet ? 'green' : 'white',
                color: openSheet ? 'white' : 'black',
              }}
            >
              <CustomButton>
                <FontAwesomeIcon icon={faFilter} />
              </CustomButton>
            </Button>
          </div>
        </div>
        <div className="relative">
          <div
            ref={componentRef}
            className="flex gap-2 overflow-hidden transition-all duration-700 absolute flex-col"
            style={{ width: displayType == 'grid' ? '100%' : 0, opacity: displayType == 'grid' ? '1' : 0 }}
          >
            <div className="flex gap-2">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row: A) => (
                  <div
                    key={row.id}
                    className="border border-[#6b72804a] rounded-lg relative overflow-hidden"
                    style={{ width: 'calc(100% / 4 - 0.5rem * 4)' }}
                  >
                    <Badge
                      className="absolute top-1 right-1 z-50 cursor-pointer hover:text-white hover:bg-amber-600"
                      variant="secondary"
                    >
                      {(row.original as IGame).status}
                    </Badge>
                    <Badge
                      className="absolute top-7 right-1 z-50 cursor-pointer hover:text-white hover:bg-amber-600"
                      variant="secondary"
                    >
                      {(row.original as IGame).lang}
                    </Badge>
                    <div
                      style={{ borderRadius: '0px 100px 15px 10px' }}
                      className="absolute top-[140.5px] left-0 z-50 cursor-pointer bg-white/70 hover:text-white hover:bg-amber-600 pl-1 pr-3 text-[13px]"
                    >
                      Author: {(row.original as IGame).author}
                    </div>
                    <div className="h-40 w-full cursor-pointer overflow-hidden">
                      <LazyLoadImage
                        alt="Test Imgae"
                        src={(row.original as IGame).img[0]}
                        className="h-full w-full object-cover hover:scale-[120%] transition-all duration-700"
                      />
                    </div>
                    <div className="flex justify-between mx-2 items-center">
                      <h3 className="font-semibold cursor-pointer hover:text-green-500">
                        {(row.original as IGame).title}
                      </h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.id)}>
                            Copy payment ID
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View customer</DropdownMenuItem>
                          <DropdownMenuItem>View payment details</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex mx-2 items-center gap-1">
                      {(row.original as IGame).category.map((cate, index) => (
                        <Badge
                          className="cursor-pointer hover:text-white hover:bg-amber-600"
                          key={index}
                          variant="secondary"
                        >
                          {cate}
                        </Badge>
                      ))}
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <p className="text-[13px] m-2 text-gray-600 line-clamp-3 text-left">
                            {(row.original as IGame).description}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-60">{(row.original as IGame).description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))
              ) : (
                <div>No results.</div>
              )}
            </div>
            <Pagination className="flex items-center">
              <div className="flex-1 text-sm text-muted-foreground"></div>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
          <div
            className="transition-all overflow-hidden duration-700 absolute right-0"
            style={{
              width: displayType == 'list' ? '100%' : '100px',
              borderWidth: displayType == 'list' ? '1px' : 0,
              opacity: displayType == 'list' ? '1' : 0,
            }}
          >
            <div className="border border-[#6b72804a] rounded-tr-lg rounded-tl-lg">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <Pagination className="flex items-center">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
                selected.
              </div>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
        {/* <Pagination className="flex items-center">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}
      </div>
      <FilterSheet openSheet={openSheet} />
    </div>
  );
}
