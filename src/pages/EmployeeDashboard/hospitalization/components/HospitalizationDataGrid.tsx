import { useEffect, useState, useRef } from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel
} from '@mui/x-data-grid';
import { CircleX, DeleteIcon, EditIcon, SaveIcon, DollarSignIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { Hospitalization } from '@/Models/Hospitalization';
import { hospitalizationDeleteAPI, hospitalizationUpdateAPI } from '@/Services/HospitalizationService';
import { getPetById } from '@/Services/PetService';
import { cashoutApi } from '@/Services/PaymentService';

interface HospitalizationDataGridProps {
  hospitalizations: Hospitalization[];
  setHospitalizations: (hospitalizations: Hospitalization[]) => void;
  onHospitalizationDelete: (hospitalization: Hospitalization) => void;
}

const HospitalizationDataGrid: React.FC<HospitalizationDataGridProps> = ({
  hospitalizations,
  onHospitalizationDelete
}) => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [hospitalizationsWithPetNames, setHospitalizationsWithPetNames] = useState<Hospitalization[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [hospitalizationToDelete, setHospitalizationToDelete] = useState<null | number>(null);
  const prevHospitalizationsRef = useRef<Hospitalization[]>([]);

  useEffect(() => {
    const fetchPetNames = async () => {
      const updatedHospitalizations = await Promise.all(
        hospitalizations.map(async (hospitalization) => {
          if (!hospitalization.petName || hospitalization.paymentStatus === null) {
            try {
              const petData = await getPetById(hospitalization.petId.toString());
              return {
                ...hospitalization,
                petName: petData?.data.name,
                paymentStatus: hospitalization.paymentStatus === null ? 0 : hospitalization.paymentStatus
              };
            } catch (error) {
              console.error(`Failed to fetch pet name for petId: ${hospitalization.petId}`);
            }
          }
          return hospitalization;
        })
      );
      setHospitalizationsWithPetNames(updatedHospitalizations);
    };

    // Compare current and previous hospitalizations
    if (JSON.stringify(prevHospitalizationsRef.current) !== JSON.stringify(hospitalizations)) {
      fetchPetNames();
      prevHospitalizationsRef.current = hospitalizations;
    }
  }, [hospitalizations]);

  const handleHospitalizationUpdate = (hospitalizationId: number, dischargeDate: string) => {
    hospitalizationUpdateAPI(hospitalizationId, dischargeDate)
      .then((res) => {
        if (res?.data) {
          toast.success('Hospitalization ' + `${hospitalizationId}` + ' is updated');
        }
      })
      .catch((e) => {
        toast.error('Server error occurred', e);
      });
  };

  const handleHospitalizationDelete = (hospitalizationId: number) => {
    hospitalizationDeleteAPI(hospitalizationId)
      .then((res) => {
        if (res?.data) {
          onHospitalizationDelete(res.data);
          toast.success('Hospitalization ' + `${hospitalizationId}` + ' is deleted');
        }
      })
      .catch((e) => {
        toast.error('Fail to delete hospitalization', e);
      });
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setHospitalizationToDelete(Number(id));
    setDeleteDialogOpen(true);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });
  };

  const handleCashoutClick = (id: GridRowId, customerId: string) => async () => {
    try {
      const res = await cashoutApi(customerId, Number(id));
      if (res?.data) {
        toast.success('Cashout successful');
        const updatedHospitalizations = hospitalizationsWithPetNames.map((row) =>
          row.hospitalizationId === id ? { ...row, paymentStatus: 1, cashedOut: true } : row
        );
        setHospitalizationsWithPetNames(updatedHospitalizations);
      }
    } catch (error) {
      toast.error('Cashout failed, Hospitalization has been cashed out already');
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = newRow as Hospitalization;
    handleHospitalizationUpdate(updatedRow.hospitalizationId, updatedRow.dischargeDate);
    const updatedHospitalizations = hospitalizationsWithPetNames.map((row) =>
      row.hospitalizationId === updatedRow.hospitalizationId ? updatedRow : row
    );
    setHospitalizationsWithPetNames(updatedHospitalizations);
    return newRow;
  };

  const columns: GridColDef[] = [
    {
      field: 'hospitalizationId',
      headerName: 'Hospitalization ID',
      width: 200,
      sortable: true,
      filterable: true
    },
    {
      field: 'petName',
      headerName: 'Pet Name',
      width: 200,
      editable: false
    },
    {
      field: 'kennelId',
      headerName: 'Kennel ID',
      width: 150,
      editable: false
    },
    {
      field: 'vetId',
      headerName: 'Vet ID',
      width: 150,
      editable: false
    },
    {
      field: 'admissionDate',
      headerName: 'Admission Date',
      width: 200,
      editable: false
    },
    {
      field: 'dischargeDate',
      headerName: 'Discharge Date',
      width: 200,
      editable: true
    },
    {
      field: 'totalCost',
      headerName: 'Total Cost',
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
      type: 'actions',
      width: 150,
      getActions: ({ id, row }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              sx={{
                color: 'primary.main'
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CircleX />}
              label='Cancel'
              sx={{
                color: 'red'
              }}
              color='inherit'
              onClick={handleCancelClick(id)}
            />
          ];
        }

        return [
          <div>
            <GridActionsCellItem
              icon={<EditIcon />}
              label='Edit'
              className='textPrimary'
              color='inherit'
              onClick={handleEditClick(id)}
            />
            ,
            <GridActionsCellItem icon={<DeleteIcon />} label='Delete' color='inherit' onClick={handleDeleteClick(id)} />
            ,
            <GridActionsCellItem
              icon={<DollarSignIcon />}
              label='Cashout'
              color='inherit'
              onClick={handleCashoutClick(id, row.customerId)}
            />
            ,
          </div>
        ];
      }
    }
  ];

  const handleDeleteDialogClose = (confirm: boolean) => {
    setDeleteDialogOpen(false);
    if (confirm && hospitalizationToDelete !== null) {
      handleHospitalizationDelete(hospitalizationToDelete);
    }
  };

  return (
    <Box
      sx={{
        height: '450px',
        width: '100%'
      }}
    >
      <DataGrid
        columns={columns}
        rows={hospitalizationsWithPetNames}
        editMode='row'
        getRowId={(row) => row.hospitalizationId}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        processRowUpdate={processRowUpdate}
        pageSizeOptions={[5, 10, 25, 50]}
        checkboxSelection
        disableRowSelectionOnClick
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
            Are you sure you want to delete this hospitalization record?
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

export default HospitalizationDataGrid;
