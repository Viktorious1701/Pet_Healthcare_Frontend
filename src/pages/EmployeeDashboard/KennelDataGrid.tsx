import { Kennel, KennelPost } from "@/Models/Kennel";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowModes,
  GridRowModesModel,
  gridClasses,
} from "@mui/x-data-grid";
import { CircleX, DeleteIcon, EditIcon, SaveIcon, X } from "lucide-react";
import React, { useMemo, useState } from "react";

interface KennelDataGridProps {
  kennels: Kennel[];
}

const KennelDataGrid: React.FC<KennelDataGridProps> = ({ kennels }) => {
  const [rowId, setRowId] = useState<number>(0);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
    console.log(newRowModesModel);
    
  };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "kennelId",
        headerName: "Kennel ID",
        width: 200,
        sortable: true,
        filterable: true,
      },
      {
        field: "description",
        headerName: "Description",
        width: 400,
        editable: true,
      },
      {
        field: "capacity",
        headerName: "Capacity",
        width: 200,
        editable: false,
      },
      {
        field: "dailyCost",
        headerName: "Daily Cost",
        width: 100,
        editable: true,
      },
      {
        field: "isAvailable",
        headerName: "Availability",
        width: 100,
        type: "boolean",
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        getActions: ({id}) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: "primary.main",
                }}
              />,
              <GridActionsCellItem
                icon={<CircleX />}
                label="Cancel"
                className="textPrimary"
                color="inherit"
              />,
            ];
          }

          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              color="inherit"
            />,
          ];
        },
      },
    ],
    [rowId]
  );
  return (
    <>
      <Box
        sx={{
          height: "450px",
          width: "100%",
        }}
      >
        <DataGrid
          columns={columns}
          rows={kennels}
          getRowId={(row) => row.kennelId}
          editMode="row"
          rowModesModel={rowModesModel}
          pageSizeOptions={[100, 10, 5]}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? grey[200] : grey[900],
            },
          }}
          onRowModesModelChange={handleRowModesModelChange}
        />
      </Box>
    </>
  );
};

export default KennelDataGrid;
