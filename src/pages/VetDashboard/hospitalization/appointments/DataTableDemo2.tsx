/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
'use client'

import * as React from 'react'
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
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { getPetHealthTrackByHospitalizationId } from '@/Services/PetHealthTrackService'

export type PetHealthTrack = {
  petHealthTrackId: number
  hospitalizationId: number // Assuming a link to the Hospitalization type
  petName: string
  petImage: string
  description: string
  date: string
  status: number // Consider using an enum for clarity on status values
}

// Update the DataTableDemo component to use the Appointment data model
export function DataTableDemo2({ hospitalizationId }: { hospitalizationId: number }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [data, setData] = React.useState<PetHealthTrack[]>([]) // State to hold fetched data

  // Function to fetch appointments and update state
  const id = hospitalizationId
  console.log('hospitalizationId:', id)
  const fetchPetHealthTracksAndUpdateState = async () => {
    try {
      if (id != 0) {
        console.log('hospitalizationId2222:', id)
        const response = await getPetHealthTrackByHospitalizationId(id)
        console.log('PetHealthTrack', response)
        if (response) {
          const formattedPetHealthTrack: PetHealthTrack[] = response.map((pethealthtrack) => ({
            petHealthTrackId: pethealthtrack.petHealthTrackId,
            hospitalizationId: pethealthtrack.hospitalizationId,
            petName: pethealthtrack.petName,
            petImage: pethealthtrack.petImage,
            description: pethealthtrack.description,
            date: pethealthtrack.date,
            status: pethealthtrack.status
          }))
          setData(formattedPetHealthTrack) // Update state with fetched data
        }
      }
    } catch (error) {
      console.error('Error fetching pet health tracks:', error)
    }
  }

  // Use useEffect to fetch data on component mount
  React.useEffect(() => {
    fetchPetHealthTracksAndUpdateState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]) // Now includes `id` in the dependency array

  const columns: ColumnDef<PetHealthTrack>[] = [] // Declare or initialize the 'columns' variable with type argumentserror);
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
  })

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <span className='flex-1 text-[2rem] font-mont font-semibold '>PET HEALTH TRACK</span>
        <Button variant='outline'>Add Pet Health Track</Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div key={row.original.petHealthTrackId} className='border rounded-md p-4 shadow-sm'>
              {/* Image container */}
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
              {/* Include any actions here */}
            </div>
          ))
        ) : (
          <div className='col-span-full text-center'>No results.</div>
        )}
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'></div>
    </div>
  )
}
