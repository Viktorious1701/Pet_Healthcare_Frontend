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

import { getPetHealthTrackByHospitalizationId } from '@/Services/PetHealthTrackService';
import AddPetHealthTrack from './addPetHealthTrack';

export type PetHealthTrack = {
  petHealthTrackId: number;
  hospitalizationId: number;
  petName: string;
  petImage: string;
  description: string;
  date: string;
  status: number;
};

export function DataTableDemo2({ hospitalizationId }: { hospitalizationId: number }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<PetHealthTrack[]>([]);

  const fetchPetHealthTracksAndUpdateState = async () => {
    try {
      if (hospitalizationId !== 0) {
        const response = await getPetHealthTrackByHospitalizationId(hospitalizationId);
        if (response) {
          const formattedPetHealthTrack: PetHealthTrack[] = response.map((pethealthtrack) => ({
            petHealthTrackId: pethealthtrack.petHealthTrackId,
            hospitalizationId: pethealthtrack.hospitalizationId,
            petName: pethealthtrack.petName,
            petImage: pethealthtrack.petImage,
            description: pethealthtrack.description,
            date: pethealthtrack.date,
            status: pethealthtrack.status
          }));
          setData(formattedPetHealthTrack);
        }
      }
    } catch (error) {
      console.error('Error fetching pet health tracks:', error);
    }
  };

  React.useEffect(() => {
    console.log('hospitalizationId changed:', hospitalizationId);
    fetchPetHealthTracksAndUpdateState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hospitalizationId]); // Ensure hospitalizationId is listed as a dependency

  const columns: ColumnDef<PetHealthTrack>[] = [
    {
      accessorKey: 'petName',
      header: () => 'Pet Name',
      cell: (info) => info.getValue()
    },
    {
      accessorKey: 'description',
      header: () => 'Description',
      cell: (info) => info.getValue()
    },
    {
      accessorKey: 'date',
      header: () => 'Date',
      cell: (info) => info.getValue()
    },
    {
      accessorKey: 'status',
      header: () => 'Status',
      cell: (info) => info.getValue()
    }
  ];

  const table = useReactTable({
    data,
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
        <span className='flex-1 text-[2rem] font-mont font-semibold '>PET HEALTH TRACK</span>
        <AddPetHealthTrack hospitalizationId={hospitalizationId} />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div key={row.original.petHealthTrackId} className='border rounded-md p-4 shadow-sm'>
              <div className='image-container mb-4'>
                <img
                  src={row.original.petImage}
                  alt={row.original.petName}
                  className='object-cover w-full h-48 rounded-md'
                />
              </div>
              <div className='font-bold text-lg'>{row.original.petName}</div>
              <div>Description: {row.original.description}</div>
              <div>Date: {row.original.date}</div>
              <div>Status: {row.original.status}</div>
            </div>
          ))
        ) : (
          <div className='col-span-full text-center'>No results.</div>
        )}
      </div>
    </div>
  );
}
