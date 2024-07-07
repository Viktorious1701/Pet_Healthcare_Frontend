import { Kennel } from '@/Models/Kennel';
import { kennelDeleteAPI, kennelUpdateAPI } from '@/Services/KennelService';
import { Box } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel
} from '@mui/x-data-grid';
import { CircleX, DeleteIcon, EditIcon, SaveIcon } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface KennelDataGridProps {
  kennels: Kennel[];
  setKennels: (kennels: Kennel[]) => void;
  onKennelDelete: (kennel: Kennel) => void;
}

const KennelDataGrid: React.FC<KennelDataGridProps> = ({ kennels, setKennels, onKennelDelete }) => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleKennelUpdate = (kennelId: number, description: string, dailyCost: number) => {
    kennelUpdateAPI(kennelId, description, dailyCost)
      .then((res) => {
        if (res?.data) {
          toast.success('Kennel ' + `${kennelId}` + ' is updated');
        }
      })
      .catch((e) => {
        toast.error('Server error occured', e);
      });
  };

  const handleKennelDelete = (kennelId: number) => {
    kennelDeleteAPI(kennelId)
      .then((res) => {
        if (res?.data) {
          onKennelDelete(res.data);
          toast.success('Kennel ' + `${kennelId}` + ' is deleted');
        }
      })
      .catch((e) => {
        toast.error('Server error occured', e);
      });
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    handleKennelDelete(Number(id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = newRow as Kennel;
    handleKennelUpdate(updatedRow.kennelId, updatedRow.description, updatedRow.dailyCost);
    const updatedKennels = kennels.map((row) => (row.kennelId === updatedRow.kennelId ? updatedRow : row));
    setKennels(updatedKennels);
    return newRow;
  };

  const columns: GridColDef[] = [
    {
      field: 'kennelId',
      headerName: 'Kennel ID',
      width: 200,
      sortable: true,
      filterable: true
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 400,
      preProcessEditCellProps: (params) => {
        const hasError = params.props.value.length <= 0;
        return { ...params.props, error: hasError };
      },
      editable: true
    },
    {
      field: 'capacity',
      headerName: 'Capacity',
      width: 200,
      editable: false
    },
    {
      field: 'dailyCost',
      headerName: 'Daily Cost',
      width: 100,
      type: 'number',
      preProcessEditCellProps: (params) => {
        const hasError = params.props.value <= 0;
        return { ...params.props, error: hasError };
      },
      editable: true
    },
    {
      field: 'isAvailable',
      headerName: 'Availability',
      width: 100,
      type: 'boolean'
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      getActions: ({ id }) => {
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
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            color='inherit'
            onClick={handleEditClick(id)}
          />,
          <GridActionsCellItem icon={<DeleteIcon />} label='Delete' color='inherit' onClick={handleDeleteClick(id)} />
        ];
      }
    }
  ];

  return (
    <>
      <Box
        sx={{
          height: '450px',
          width: '100%'
        }}
      >
        <DataGrid
          columns={columns}
          rows={kennels}
          editMode='row'
          getRowId={(row) => row.kennelId}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          processRowUpdate={processRowUpdate}
          pageSizeOptions={[5, 10, 25, 100]}
        />
      </Box>
    </>
  );
};

export default KennelDataGrid;
