/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
"use client";

import * as React from "react";
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
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  appointmentGetVetIdAPI,
  appointmentVetAPI,
  recordGetAPI,
} from "@/Services/AppointmentService";
import { AppointmentGet } from "@/Models/Appointment";
import { useNavigate } from "react-router-dom"; // Updated import

// Adjustments to switch from Payment to Appointment data model
export type Record = {
  recordId: number;
  petName: string;
  numberOfVisits: number;
};

// Adjust the columns definition to match the Appointment data model
export const columns: ColumnDef<Record>[] = [
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
    accessorKey: "service",
    header: "Service",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("service")}</div>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => <div>{row.getValue("customer")}</div>,
  },
  {
    accessorKey: "pet",
    header: "Pet",
    cell: ({ row }) => <div>{row.getValue("pet")}</div>,
  },
  {
    accessorKey: "petId",
    header: "PetID",
    cell: ({ row }) => <div>{row.getValue("petId")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div className="capitalize">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },

  {
    accessorKey: "totalCost",
    header: () => <div className="text-right">Total Cost</div>,
    cell: ({ row }) => {
      const totalCost = parseFloat(row.getValue("totalCost"));

      // Format the totalCost as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalCost);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const appointment = row.original;

      const navigate = useNavigate();

      const openAppointmentEditForm = (appointmentId: number) => {
        // Assuming the path to the appointment edit form is `/appointments/edit/{appointmentId}`
        const targetPath = `/vet/appointment-edit/${appointmentId}`;
        console.log(`Navigating to: ${targetPath}`);
        navigate(targetPath);
      };

      const openAppointmentAddForm = (appointmentId: number) => {
        // Assuming the path to the appointment edit form is `/appointments/edit/{appointmentId}`
        const targetPath = `/vet/appointment-diagnosis/${appointmentId}`;
        console.log(`Navigating to: ${targetPath}`);
        navigate(targetPath);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  appointment.appointmentId.toString()
                )
              }
            >
              Copy appointment ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => openAppointmentEditForm(appointment.appointmentId)}
            >
              View appointment details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => openAppointmentAddForm(appointment.appointmentId)}
            >
              Add diagnosis
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Update the DataTableDemo component to use the Appointment data model
export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<Appointment[]>([]); // State to hold fetched data

  // Function to fetch appointments and update state
  const fetchAppointmentsAndUpdateState = async () => {
    try {
      const response = await recordGetAPI(); // Fetch the vet details
        if (response) {
          console.log(response);
          const formattedRecords: Record[] = response.map(
            (record) => ({
              appointmentId: appointment.appointmentId,
              customer: appointment.customer,
              pet: appointment.pet,
              vet: appointment.vet,
              petId: appointment.petId,
              slotStartTime: appointment.slotStartTime.toString(),
              slotEndTime: appointment.slotEndTime.toString(),
              service: appointment.service,
              date: appointment.date,
              totalCost: appointment.totalCost,
              cancellationDate: appointment.cancellationDate,
              refundAmount: appointment.refundAmount,
              rating: appointment.rating,
              comment: appointment.comment,
              status: appointment.status,
            })
          );
          setData(formattedAppointments); // Update state with fetched data
        }
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  // Use useEffect to fetch data on component mount
  React.useEffect(() => {
    fetchAppointmentsAndUpdateState();
  }, []); // Empty dependency array means this effect runs once on mount

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
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <span className="flex-1 text-[2rem] font-mont font-semibold ">
          MEDICAL RECORDS
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
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
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
