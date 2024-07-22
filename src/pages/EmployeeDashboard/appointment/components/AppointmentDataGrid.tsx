import { useState } from 'react';
import { GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import {
  Delete as DeleteIcon,
  AttachMoney as DollarSignIcon,
  Check as CheckIcon,
  EventAvailable as CalendarCheckIcon
} from '@mui/icons-material';
import { toast } from 'sonner';
import { AppointmentGet } from '@/Models/Appointment';
import { deleteAppointmentByID } from '@/Services/AppointmentService';
import {
  StyledBox,
  StyledDataGrid,
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
  StyledButton,
  ActionButton
} from './StyledComponents';
interface AppointmentDataGridProps {
  appointments: AppointmentGet[];
  onAppointmentDelete: (appointment: AppointmentGet) => void;
  onCashoutAppointment: (appointmentId: number, customerId: string, amount: number) => void;
  onCheckInAppointment: (appointmentId: number) => void;
  onFinishAppointment: (appointmentId: number) => void;
}

const AppointmentDataGrid: React.FC<AppointmentDataGridProps> = ({
  appointments,
  onAppointmentDelete,
  onCashoutAppointment,
  onCheckInAppointment,
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
    { field: 'appointmentId', headerName: 'Appointment ID', width: 200, sortable: true, filterable: true },
    { field: 'customer', headerName: 'Customer', width: 200, editable: false },
    { field: 'pet', headerName: 'Pet', width: 200, editable: false },
    { field: 'vet', headerName: 'Vet', width: 150, editable: false },
    { field: 'slotStartTime', headerName: 'Slot Start Time', width: 200, editable: false },
    { field: 'slotEndTime', headerName: 'Slot End Time', width: 200, editable: false },
    { field: 'service', headerName: 'Service', width: 150, editable: false },
    { field: 'totalCost', headerName: 'Total Cost', width: 200, editable: false, type: 'number' },
    { field: 'status', headerName: 'Status', width: 150, editable: false },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <ActionButton>
              <DeleteIcon />
            </ActionButton>
          }
          label='Delete'
          onClick={handleDeleteClick(params.id)}
        />,
        <GridActionsCellItem
          icon={
            <ActionButton disabled={params.row.paymentStatus === 1 || params.row.paymentStatus === null}>
              <DollarSignIcon />
            </ActionButton>
          }
          label='Cashout'
          onClick={handleCashoutClick(params.id)}
          disabled={params.row.paymentStatus === 1 || params.row.paymentStatus === null}
        />,
        <GridActionsCellItem
          icon={
            <ActionButton>
              <CheckIcon />
            </ActionButton>
          }
          label='Check In'
          onClick={handleCheckInClick(params.id)}
        />,
        <GridActionsCellItem
          icon={
            <ActionButton>
              <CalendarCheckIcon />
            </ActionButton>
          }
          label='Finish'
          onClick={handleFinishClick(params.id)}
        />
      ]
    }
  ];

  return (
    <>
      <StyledBox>
        <StyledDataGrid
          rows={appointments}
          columns={columns}
          getRowId={(row) => row.appointmentId}
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 }
            }
          }}
          pageSizeOptions={[5, 10, 20]}
        />
      </StyledBox>
      <StyledDialog
        open={deleteDialogOpen}
        onClose={() => handleDeleteDialogClose(false)}
        aria-labelledby='delete-dialog-title'
        aria-describedby='delete-dialog-description'
      >
        <StyledDialogTitle id='delete-dialog-title'>Confirm Delete</StyledDialogTitle>
        <StyledDialogContent id='delete-dialog-description'>
          Are you sure you want to delete this appointment?
        </StyledDialogContent>
        <StyledDialogActions>
          <StyledButton onClick={() => handleDeleteDialogClose(false)} color='primary'>
            Cancel
          </StyledButton>
          <StyledButton onClick={() => handleDeleteDialogClose(true)} color='secondary' autoFocus>
            Confirm
          </StyledButton>
        </StyledDialogActions>
      </StyledDialog>
    </>
  );
};

export default AppointmentDataGrid;
