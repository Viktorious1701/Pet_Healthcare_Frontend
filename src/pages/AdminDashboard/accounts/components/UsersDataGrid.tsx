import { UserInfo } from "@/Models/User";
import { userDeleteAPI, userUpdateAPI } from "@/Services/UserService";
import { Box, MenuItem, Select } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";
import { CircleX, EditIcon, SaveIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import UserDeleteDialog from "./UserDeleteDialog";

const countries = [
  "Viet Nam",
  "United States",
  "Canada",
  "Mexico",
  "United Kingdom",
  "Germany",
  "France",
];

interface UsersDataGridProps {
  users: UserInfo[];
  onUserDelete: (user: UserInfo) => void;
  onUserUpdate: (user: UserInfo) => void;
}

const UsersDataGrid: React.FC<UsersDataGridProps> = ({
  users,
  onUserUpdate,
  onUserDelete,
}) => {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleUserUpdate = async (
    userId: string,
    address: string,
    country: string,
    // email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    gender: boolean,
    userName: string,
    isActive: boolean
  ) => {
    await userUpdateAPI(
      userId,
      address,
      country,
      // email,
      firstName,
      lastName,
      phoneNumber,
      gender,
      userName,
      isActive
    )
      .then((res) => {
        if (res?.data) {
          onUserUpdate(res.data);
          toast.success("User " + `${userName}` + " is updated");
        }
      })
      .catch((e) => {
        toast.error("Server error occured", e);
      });
  };

  const handleUserDelete = async (userId: string) => {
    await userDeleteAPI(userId)
      .then((res) => {
        if (res?.data) {
          onUserDelete(res.data);
          toast.success("User" + `${userId}` + " is deleted");
        }
      })
      .catch((e) => {
        toast.error("Server error occured", e);
      });
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    await handleUserDelete(id.toString());
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

  const processRowUpdate = async (newRow: GridRowModel, oldRow: GridRowModel) => {
    const updatedRow = newRow as UserInfo
    console.log(updatedRow);
    
    await handleUserUpdate(
      updatedRow.userId,
      updatedRow.address,
      updatedRow.country,
      // updatedRow.email,
      updatedRow.firstName,
      updatedRow.lastName,
      updatedRow.phoneNumber,
      updatedRow.gender,
      updatedRow.userName,
      updatedRow.isActive
    );

    if (newRow.isActive !== oldRow.isActive || newRow.gender !== oldRow.gender || newRow.country !== oldRow.country) {
      return newRow;
    }

    return users;
  };

  const handleProcessRowUpdateError = (error: any) => {
    // toast.error(error.message);
    error;
  };

  const columns: GridColDef[] = [
    {
      field: "userId",
      headerName: "User ID",
      sortable: true,
      filterable: true,
      editable: false,
      flex: 2,
    },
    {
      field: "role",
      headerName: "Role",
      editable: false,
      flex: 0.5
    },
    {
      field: "userName",
      headerName: "Username",
      preProcessEditCellProps: (params) => {
        const hasError = params.props.value.length <= 0;
        return { ...params.props, error: hasError };
      },
      editable: true,
      flex: 0.7,
    },
    {
      field: "firstName",
      headerName: "First Name",
      preProcessEditCellProps: (params) => {
        const hasError = params.props.value.length <= 0;
        return { ...params.props, error: hasError };
      },
      editable: true,
      flex: 0.7,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      preProcessEditCellProps: (params) => {
        const hasError = params.props.value.length <= 0;
        return { ...params.props, error: hasError };
      },
      editable: true,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      editable: false,
      flex: 1.2,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      preProcessEditCellProps: (params) => {
        const hasError = params.props.value.length <= 0;
        return { ...params.props, error: hasError };
      },
      editable: true,
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      type: "boolean",
      editable: true,
      flex: 0.5,
    },
    {
      field: "address",
      headerName: "Address",
      preProcessEditCellProps: (params) => {
        const hasError = params.props.value <= 0;
        return { ...params.props, error: hasError };
      },
      editable: true,
      flex: 1.5,
    },
    {
      field: "country",
      headerName: "Country",
      preProcessEditCellProps: (params) => {
        const hasError = params.props.value <= 0;
        return { ...params.props, error: hasError };
      },
      renderEditCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) =>
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: e.target.value,
            })
          }
        >
          {countries.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      ),
      editable: true,
      flex: 0.7,
    },
    {
      field: "isActive",
      headerName: "Is Active",
      type: "boolean",
      editable: true,
      flex: 0.5,
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
          <UserDeleteDialog
            onDeleteUser={handleDeleteClick(id)}
          ></UserDeleteDialog>,
        ];
      },
      flex: 1,
    },
  ];

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
          rows={users}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          pageSizeOptions={[5, 10, 25, 100]}
          getRowId={(row) => row.userId}
        />
      </Box>
    </>
  );
};

export default UsersDataGrid;
