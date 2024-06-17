import { Hospitalization } from "@/Models/Hospitalization";
import { hospitalizationDeleteAPI, hospitalizationUpdateAPI } from "@/Services/HospitalizationService";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";
import { CircleX, DeleteIcon, EditIcon, SaveIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface HospitalizationDataGridProps {
  hospitalizations: Hospitalization[];
  setHospitalizations: (hospitalizations: Hospitalization[]) => void;
  onHospitalizationDelete: (hospitalization: Hospitalization) => void;
}

const HospitalizationDataGrid: React.FC<HospitalizationDataGridProps> = ({
  hospitalizations,
  setHospitalizations,
  onHospitalizationDelete,
}) => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleHospitalizationUpdate = (
    hospitalizationId: number,
    dischargeDate: string
  ) => {
    hospitalizationUpdateAPI(hospitalizationId, dischargeDate)
      .then((res) => {
        if (res?.data) {
          toast.success("Hospitalization " + `${hospitalizationId}` + " is updated");
        }
      })
      .catch((e) => {
        toast.error("Server error occurred", e);
      });
  };

  const handleHospitalizationDelete = (hospitalizationId: number) => {
    hospitalizationDeleteAPI(hospitalizationId)
      .then((res) => {
        if (res?.data) {
          onHospitalizationDelete(res.data);
          toast.success("Hospitalization " + `${hospitalizationId}` + " is deleted");
        }
      })
      .catch((e) => {
        toast.error("Server error occurred", e);
      });
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    handleHospitalizationDelete(Number(id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = newRow as Hospitalization;
    handleHospitalizationUpdate(
      updatedRow.hospitalizationId,
      updatedRow.dischargeDate
    );
    const updatedHospitalizations = hospitalizations.map((row) =>
      row.hospitalizationId === updatedRow.hospitalizationId ? updatedRow : row
    );
    setHospitalizations(updatedHospitalizations);
    return newRow;
  };

  const columns: GridColDef[] = [
    {
      field: "hospitalizationId",
      headerName: "Hospitalization ID",
      width: 200,
      sortable: true,
      filterable: true,
    },
    {
      field: "petId",
      headerName: "Pet ID",
      width: 150,
      editable: false,
    },
    {
      field: "kennelId",
      headerName: "Kennel ID",
      width: 150,
      editable: false,
    },
    {
      field: "vetId",
      headerName: "Vet ID",
      width: 150,
      editable: false,
    },
    {
      field: "admissionDate",
      headerName: "Admission Date",
      width: 200,
      editable: false,
    },
    {
      field: "dischargeDate",
      headerName: "Discharge Date",
      width: 200,
      editable: true,
    },
    {
      field: "petName",
      headerName: "Pet Name",
      width: 200,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CircleX />}
              label="Cancel"
              sx={{
                color: "red",
              }}
              color="inherit"
              onClick={handleCancelClick(id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            color="inherit"
            onClick={handleEditClick(id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
            onClick={handleDeleteClick(id)}
          />,
        ];
      },
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
        rows={hospitalizations}
        editMode="row"
        getRowId={(row) => row.hospitalizationId}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        processRowUpdate={processRowUpdate}
        pageSizeOptions={[5, 10, 25, 100]}
      />
    </Box>
  );
};

export default HospitalizationDataGrid;
