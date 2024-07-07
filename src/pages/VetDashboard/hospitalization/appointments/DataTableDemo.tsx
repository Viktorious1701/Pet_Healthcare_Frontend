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
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { appointmentGetVetIdAPI } from '@/Services/AppointmentService';
import { hospitalizationListVetAPI } from '@/Services/HospitalizationService';
// Remove the import statement for 'PetHealthTrack'

// Adjustments to switch from Payment to Appointment data model
export type Hospitalization = {
  hospitalizationId: number;
  petId: number;
  kennelId: number;
  vetId: number;
  admissionDate: string;
  dischargeDate: string;
  petName: string;
  kennelDescription: string;
  vetName: string;
  totalCost: number;
  paymentStatus: number;
};

export type PetHealthTrack = {
  petHealthTrackId: number;
  hospitalizationId: number; // Assuming a link to the Hospitalization type
  petName: string;
  petImage: string;
  description: string;
  date: string;
  status: number; // Consider using an enum for clarity on status values
};

// Update the DataTableDemo component to use the Appointment data model
export function DataTableDemo({ onHospitalizationSelect }: { onHospitalizationSelect: (id: number) => void }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<Hospitalization[]>([]); // State to hold fetched data

  // Function to fetch appointments and update state
  const fetchHospitalizationsAndUpdateState = async () => {
    try {
      const response = await appointmentGetVetIdAPI(); // Fetch the vet details
      const vetName = (response as unknown as { userName: string }).userName; // Type assertion
      //console.log("vetId:", vetName);
      if (vetName) {
        const hospitalization: Hospitalization[] | undefined = await hospitalizationListVetAPI(vetName); // Fetch appointments
        //console.log("hospitalization:", hospitalization);
        if (hospitalization) {
          const formattedHospitalization: Hospitalization[] = hospitalization.map((hospitalization) => ({
            hospitalizationId: hospitalization.hospitalizationId,
            petId: hospitalization.petId,
            kennelId: hospitalization.kennelId,
            vetId: hospitalization.vetId,
            admissionDate: hospitalization.admissionDate,
            dischargeDate: hospitalization.dischargeDate,
            totalCost: hospitalization.totalCost,
            paymentStatus: hospitalization.paymentStatus,
            petName: hospitalization.petName,
            kennelDescription: hospitalization.kennelDescription,
            vetName: hospitalization.vetName
          }));
          setData(formattedHospitalization); // Update state with fetched data
        }
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };

  // Use useEffect to fetch data on component mount
  React.useEffect(() => {
    fetchHospitalizationsAndUpdateState();
  }, []); // Empty dependency array means this effect runs once on mount

  // Adjust the columns definition to match the Appointment data model
  const columns: ColumnDef<Hospitalization>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: 'petName',
      header: 'Pet Name',
      cell: ({ row }) => <div className='capitalize'>{row.getValue('petName')}</div>
    },
    {
      accessorKey: 'vetName',
      header: 'Veterinarian',
      cell: ({ row }) => <div>{row.getValue('vetName')}</div>
    },
    {
      accessorKey: 'admissionDate',
      header: 'Admission Date',
      cell: ({ row }) => <div className='capitalize'>{row.getValue('admissionDate')}</div>
    },
    {
      accessorKey: 'dischargeDate',
      header: 'Discharge Date',
      cell: ({ row }) => <div className='capitalize'>{row.getValue('dischargeDate')}</div>
    },
    {
      accessorKey: 'kennelDescription',
      header: 'Kennel Description',
      cell: ({ row }) => <div>{row.getValue('kennelDescription')}</div>
    },
    {
      accessorKey: 'totalCost',
      header: () => <div className='text-right'>Total Cost</div>,
      cell: ({ row }) => {
        const totalCost = parseFloat(row.getValue('totalCost'));

        // Format the totalCost as a dollar amount
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(totalCost);

        return <div className='text-right font-medium'>{formatted}</div>;
      }
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const hospitalization = row.original;

        return (
          <div className='flex justify-center'>
            <Button variant='outline' onClick={() => onHospitalizationSelect(hospitalization.hospitalizationId)}>
              View pet health track
            </Button>
          </div>
        );
      }
    }
  ];

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
        <span className='flex-1 text-[2rem] font-mont font-semibold '>HOSPITALIZATION</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
