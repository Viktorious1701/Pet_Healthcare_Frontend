import { useEffect, useState } from "react";
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
import { CircleX, DeleteIcon, EditIcon, SaveIcon, DollarSignIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Hospitalization } from "@/Models/Hospitalization";
import { hospitalizationDeleteAPI, hospitalizationUpdateAPI } from "@/Services/HospitalizationService";
import { getPetById } from "@/Services/PetService";
import { cashoutApi } from "@/Services/PaymentService";

interface HospitalizationDataGridProps {
  hospitalizations: Hospitalization[];
  setHospitalizations: (hospitalizations: Hospitalization[]) => void;
  onHospitalizationDelete: (hospitalization: Hospitalization) => void;
}

const HospitalizationDataGrid: React.FC<HospitalizationDataGridProps> = ({
  hospitalizations,
  onHospitalizationDelete,
}) => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [hospitalizationsWithPetNames, setHospitalizationsWithPetNames] = useState<Hospitalization[]>([]);

  useEffect(() => {
    const fetchPetNames = async () => {
      const updatedHospitalizations = await Promise.all(
        hospitalizations.map(async (hospitalization) => {
          if (!hospitalization.petName) {
            try {
              const petData = await getPetById(hospitalization.petId.toString());
              return {
                ...hospitalization,
                petName: petData?.data.name,
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

    fetchPetNames();
  }, [hospitalizations]);

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
        toast.error("Fail to delete hospitalization", e);
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

  const handleCashoutClick = (id: GridRowId, customerId: string) => async () => {
    try {
      const res = await cashoutApi(customerId, Number(id));
      if (res?.data) {
        toast.success("Cashout successful");
        const updatedHospitalizations = hospitalizationsWithPetNames.map((row) =>
          row.hospitalizationId === id ? { ...row, totalCost: res.data.totalCost, cashedOut: true } : row
        );
        setHospitalizationsWithPetNames(updatedHospitalizations);
      }
    } catch (error) {
      toast.error("Cashout failed");
    }
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
    const updatedHospitalizations = hospitalizationsWithPetNames.map((row) =>
      row.hospitalizationId === updatedRow.hospitalizationId ? updatedRow : row
    );
    setHospitalizationsWithPetNames(updatedHospitalizations);
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
      field: "petName",
      headerName: "Pet Name",
      width: 200,
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
      field: "totalCost",
      headerName: "Total Cost",
      width: 150,
      editable: false,
      cellClassName: (params) =>
        params.row.cashedOut ? 'green-cell' : '',
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: ({ id, row }) => {
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
          <div>
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
          <GridActionsCellItem
            icon={<DollarSignIcon />}
            label="Cashout"
            color="inherit"
            onClick={handleCashoutClick(id, row.customerId)}
          />,
          </div>
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
        rows={hospitalizationsWithPetNames}
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
