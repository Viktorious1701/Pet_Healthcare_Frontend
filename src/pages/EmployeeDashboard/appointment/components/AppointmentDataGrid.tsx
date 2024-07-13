import { useState } from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<null | number>(null);

  const handleDeleteClick = (id: GridRowId) => () => {
    setAppointmentToDelete(Number(id));
    setDeleteDialogOpen(true);
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

  const handleDeleteDialogClose = (confirm: boolean) => {
    setDeleteDialogOpen(false);
    if (confirm && appointmentToDelete !== null) {
      const appointmentToDeleteObj = appointments.find((a) => a.appointmentId === appointmentToDelete);
      if (appointmentToDeleteObj) {
        deleteAppointmentByID(appointmentToDeleteObj.appointmentId)
          .then(() => {
            onAppointmentDelete(appointmentToDeleteObj);
            toast.success(`Appointment ${appointmentToDeleteObj.appointmentId} deleted successfully`);
          })
          .catch((_error) => {
            toast.error('Failed to delete appointment', _error);
          });
      }
    }
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
        <GridActionsCellItem icon={<CheckIcon />} label='Finish' color='inherit' onClick={handleFinishClick(id)} />
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
      <Dialog
        open={deleteDialogOpen}
        onClose={() => handleDeleteDialogClose(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Confirm Deletion'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this appointment record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDeleteDialogClose(false)} color='primary'>
            No
          </Button>
          <Button onClick={() => handleDeleteDialogClose(true)} color='primary' autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppointmentDataGrid;
