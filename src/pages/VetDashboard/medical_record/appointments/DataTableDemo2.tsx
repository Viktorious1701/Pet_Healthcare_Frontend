/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';

import { recordGetAPI } from '@/Services/AppointmentService';

export type Record = {
  recordId: number;
  petName: string;
  numberOfVisits: number;
};

// Update the DataTableDemo component to use the Appointment data model
export function DataTableDemo2() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<Record[]>([]); // State to hold fetched data

  const fetchRecordsAndUpdateState = async () => {
    try {
      const response = await recordGetAPI();
      console.log('PetHealthTrack', response);
      if (response) {
        const formattedRecord: Record[] = response.data.map((record) => ({
          recordId: record.recordId,
          petName: record.petName,
          numberOfVisits: record.numberOfVisits
        }));
        setData(formattedRecord); // Update state with fetched data
      }
    } catch (error) {
      console.error('Error fetching pet health tracks:', error);
    }
  };

  // Use useEffect to fetch data on component mount
  React.useEffect(() => {
    fetchRecordsAndUpdateState();
  }, []); // Now includes `id` in the dependency array

  const columns: ColumnDef<Record>[] = []; // Declare or initialize the 'columns' variable with type argumentserror);
  const table = useReactTable({
    data, // Use state variable for data
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <span className='flex-1 text-[2rem] font-mont font-semibold '>RECORDS</span>
        {/* <Button variant="outline">Add Pet Health Track</Button> */}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div className='border rounded-md p-4 shadow-sm'>
              {/* Image container */}
              <div className='image-container mb-4'>
                <img
                  // src={row.original.petImage}
                  alt={row.original.petName}
                  className='object-cover w-full h-48 rounded-md'
                />
              </div>
              <div className='font-bold text-lg'>{row.original.petName}</div>
              <div>Record Id: {row.original.recordId}</div>
              <div>Number Of Visits: {row.original.numberOfVisits}</div>
              {/* Include any actions here */}
            </div>
          ))
        ) : (
          <div className='col-span-full text-center'>No results.</div>
        )}
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'></div>
    </div>
  );
}
