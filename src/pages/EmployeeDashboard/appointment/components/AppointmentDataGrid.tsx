/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';

import { DeleteIcon, DollarSignIcon, CheckIcon, CalendarCheck2 } from 'lucide-react';

import { toast } from 'sonner';
import { AppointmentGet } from '@/Models/Appointment';
import { deleteAppointmentByID } from '@/Services/AppointmentService';

interface AppointmentDataGridProps {
  appointments: AppointmentGet[];
  onAppointmentDelete: (appointment: AppointmentGet) => void;
  onCashoutAppointment: (appointmentId: number, customerId: string, amount: number) => void;
  onCheckInAppointment: (appointmentId: number) => void; // Add the check-in prop
  onFinishAppointment: (appointmentId: number) => void;
}

const AppointmentDataGrid: React.FC<AppointmentDataGridProps> = ({
  appointments,
  onAppointmentDelete,
  onCashoutAppointment,
  onCheckInAppointment, // Add the check-in prop
  onFinishAppointment
}) => {
  const handleDeleteClick = (id: GridRowId) => () => {
    const appointmentToDelete = appointments.find((a) => a.appointmentId === Number(id));
    if (appointmentToDelete) {
      deleteAppointmentByID(appointmentToDelete.appointmentId)
        .then(() => {
          onAppointmentDelete(appointmentToDelete);
          toast.success(`Appointment ${appointmentToDelete.appointmentId} deleted successfully`);
        })
        .catch((_error) => {
          toast.error('Failed to delete appointment', _error);
        });
    }
  };

  const handleCashoutClick = (id: GridRowId) => () => {
    const appointmentToCashout = appointments.find((a) => a.appointmentId === Number(id));
    if (appointmentToCashout) {
      const customer = appointmentToCashout.customer || '';
      const amount = appointmentToCashout.totalCost || 0; // Use 0 as default if totalCost is undefined
      onCashoutAppointment(appointmentToCashout.appointmentId, customer, amount);
    }
  };

  const handleCheckInClick = (id: GridRowId) => () => {
    onCheckInAppointment(Number(id));
  };

  const handleFinishClick = (id: GridRowId) => () => {
    onFinishAppointment(Number(id));
  };
  const columns: GridColDef[] = [
    {
      field: 'appointmentId',
      headerName: 'Appointment ID',
      width: 200,
      sortable: true,
      filterable: true
    },
    {
      field: 'customer',
      headerName: 'Customer',
      width: 200,
      editable: false
    },
    {
      field: 'pet',
      headerName: 'Pet',
      width: 200,
      editable: false
    },
    {
      field: 'vet',
      headerName: 'Vet',
      width: 150,
      editable: false
    },
    {
      field: 'slotStartTime',
      headerName: 'Slot Start Time',
      width: 200,
      editable: false
    },
    {
      field: 'slotEndTime',
      headerName: 'Slot End Time',
      width: 200,
      editable: false
    },
    {
      field: 'service',
      headerName: 'Service',
      width: 150,
      editable: false
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
      editable: false
    },
    {
      field: 'totalCost',
      headerName: 'Total Cost',
      width: 150,
      editable: false
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: false
    },
    {
      field: 'paymentStatus',
      headerName: 'Payment Status',
      width: 150,
      editable: false
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      type: 'actions',
      getActions: ({ id }) => [
        <GridActionsCellItem icon={<DeleteIcon />} label='Delete' color='inherit' onClick={handleDeleteClick(id)} />,
        <GridActionsCellItem
          icon={<DollarSignIcon />}
          label='Cashout'
          color='inherit'
          onClick={handleCashoutClick(id)}
        />,
        <GridActionsCellItem
          icon={<CalendarCheck2 />}
          label='Check In'
          color='inherit'
          onClick={handleCheckInClick(id)}
        />,
        <GridActionsCellItem icon={<CheckIcon />} label='Check In' color='inherit' onClick={handleFinishClick(id)} />
      ]
    }
  ];

  return (
    <Box
      sx={{
        height: '450px',
        width: '100%'
      }}
    >
      <DataGrid
        columns={columns}
        rows={appointments}
        getRowId={(row) => row.appointmentId}
        pageSizeOptions={[5, 10, 25, 100]}
      />
    </Box>
  );
};

export default AppointmentDataGrid;
