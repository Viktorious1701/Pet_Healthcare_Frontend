import { Box } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { DeleteIcon, DollarSignIcon } from "lucide-react";
import { toast } from "sonner";
import { AppointmentGet } from "@/Models/Appointment";
import { deleteAppointmentByID } from "@/Services/AppointmentService";

interface AppointmentDataGridProps {
  appointments: AppointmentGet[];
  onAppointmentDelete: (appointment: AppointmentGet) => void;
  onCashoutAppointment: (appointmentId: number, customerId: string, amount: number) => void;
}

const AppointmentDataGrid: React.FC<AppointmentDataGridProps> = ({
  appointments,
  onAppointmentDelete,
  onCashoutAppointment,
}) => {
  const handleDeleteClick = (id: GridRowId) => () => {
    const appointmentToDelete = appointments.find(a => a.appointmentId === Number(id));
    if (appointmentToDelete) {
      deleteAppointmentByID(appointmentToDelete.appointmentId)
        .then(() => {
          onAppointmentDelete(appointmentToDelete);
          toast.success(`Appointment ${appointmentToDelete.appointmentId} deleted successfully`);
        })
        .catch(_error => {
          toast.error("Failed to delete appointment", _error);
          // Returning here is optional since there's no further code execution after the catch block
        });
    }
  };
  
  

  const handleCashoutClick = (id: GridRowId) => async () => {
    const appointmentToCashout = appointments.find(a => a.appointmentId === Number(id));
    const customer = appointmentToCashout?.customer || "";
    if (appointmentToCashout) {
      const amount = appointmentToCashout.totalCost; // Assuming totalCost is used for cashout amount
      onCashoutAppointment(appointmentToCashout.appointmentId, customer, amount);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "appointmentId",
      headerName: "Appointment ID",
      width: 200,
      sortable: true,
      filterable: true,
    },
    {
      field: "pet",
      headerName: "Pet",
      width: 200,
      editable: false,
    },
    {
      field: "vet",
      headerName: "Vet",
      width: 150,
      editable: false,
    },
    {
      field: "slotStartTime",
      headerName: "Slot Start Time",
      width: 200,
      editable: false,
    },
    {
      field: "slotEndTime",
      headerName: "Slot End Time",
      width: 200,
      editable: false,
    },
    {
      field: "service",
      headerName: "Service",
      width: 150,
      editable: false,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      editable: false,
    },
    {
      field: "totalCost",
      headerName: "Total Cost",
      width: 150,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: ({ id }) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          color="inherit"
          onClick={handleDeleteClick(id)}
        />,
        <GridActionsCellItem
          icon={<DollarSignIcon />}
          label="Cashout"
          color="inherit"
          onClick={handleCashoutClick(id)}
        />,
      ],
    },
  ];

  return (
    <Box
      sx={{
        height: "450px",
        width: "100%",
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
