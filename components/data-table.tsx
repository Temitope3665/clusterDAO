'use client';

import {
  Table as ReactTable,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/libs/utils';

interface DataTableProps {
  columns: any[];
  data: any[];
  handleClickRow?: (row: any) => void;
  headerClassName?: string;
}

const DataTable = ({
  columns,
  data,
  //   className,
  //   pageSize,
  //   dataLength,
  handleClickRow,
  headerClassName,
}: //   handleChangePageSize,
DataTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    enableGlobalFilter: true,
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <Table>
      <TableHeader className="overflow-hidden whitespace-nowrap text-ellipsis">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className='dark:hover:bg-[#191919] hover:bg-white dark:border-b-[#292929] border-b-[#CCCCCC99] border-b w-full'>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className={cn(headerClassName, 'py-5 text-[#888888] font-light text-sm')}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className=''>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              onClick={() => (handleClickRow ? handleClickRow(row) : null)}
              className={cn('dark:hover:bg-[#191919] hover:bg-white text-sm  dark:text-white text-dark border-none', handleClickRow && 'cursor-pointer')}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="capitalize py-5">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow className='hover:bg-[#191919]'>
            <TableCell colSpan={columns?.length} className="h-24 text-center">
              No data found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
