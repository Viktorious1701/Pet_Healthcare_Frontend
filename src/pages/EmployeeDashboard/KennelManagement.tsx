import { Kennel } from "@/Models/Kennel";
import { kennelGetAPI } from "@/Services/KennelService";
import {
  Box,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Card, CardHeader } from "@nextui-org/card";
import { PieChart } from "@mui/x-charts/PieChart";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import KennelAddModal from "./KennelAddModal";

interface Column {
  id: "kennelId" | "description" | "capacity" | "dailyCost" | "isAvailable";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "kennelId", label: "KennelID", minWidth: 200 },
  { id: "description", label: "Description", minWidth: 400 },
  {
    id: "capacity",
    label: "Capacity",
    minWidth: 250,
    align: "right",
  },
  {
    id: "dailyCost",
    label: "Daily Cost",
    minWidth: 300,
    align: "right",
  },
  {
    id: "isAvailable",
    label: "Availability",
    minWidth: 300,
    align: "right",
  },
];

const KennelManagement = () => {
  const [kennels, setKennels] = useState<Kennel[]>([]);
  const availableKennels = kennels.filter(
    (kennel) => kennel.isAvailable
  ).length;
  const occupiedKennels = kennels.filter(
    (kennel) => !kennel.isAvailable
  ).length;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getKennels = async () => {
    kennelGetAPI()
      .then((res) => {
        if (res?.data) {
          setKennels(res.data);
        }
      })
      .catch((e) => {
        toast.warning("Server error occured", e);
      });
  };

  useEffect(() => {
    getKennels();
  }, []);

  return (
    <div className="w-screen m-10">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item container xs={6} spacing={2}>
            <Grid item xs={6}>
              <Card className="h-full">
                <CardHeader className="justify-between">
                  <div className="flex-col gap-5 p-4">
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h2 className="text-xl text-default-600">
                        Total kennels
                      </h2>
                    </div>
                    <div>
                      <h1 className="text-4xl">{kennels.length}</h1>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className="h-full">
                <CardHeader className="justify-between">
                  <div className="flex-col gap-5 p-4">
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h2 className="text-xl text-default-600">
                        Total kennels
                      </h2>
                    </div>
                    <div>
                      <h1 className="text-4xl">{kennels.length}</h1>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className="h-full">
                <CardHeader className="justify-between">
                  <div className="flex-col gap-5 p-4">
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h2 className="text-xl text-default-600">
                        Total kennels
                      </h2>
                    </div>
                    <div>
                      <h1 className="text-4xl">{kennels.length}</h1>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className="h-full">
                <CardHeader className="justify-between">
                  <div className="flex-col gap-5 p-4">
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h2 className="text-xl text-default-600">
                        Total kennels
                      </h2>
                    </div>
                    <div>
                      <h1 className="text-4xl">{kennels.length}</h1>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Grid>
          </Grid>
          <Grid item container xs={6}>
            <Card className="h-full w-full">
              <CardHeader className="justify-between">
                <div className="flex-col gap-5 p-4">
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h2 className="text-xl text-default-600">Total kennels</h2>
                  </div>
                  <div>
                    <PieChart
                      series={[
                        {
                          data: [
                            {
                              id: 0,
                              value: availableKennels,
                              label: "available",
                              color: "green"  
                            },
                            {
                              id: 1,
                              value: occupiedKennels,
                              label: "occupied",
                              color: "orange"
                            },
                          ],
                          innerRadius: 30,
                          outerRadius: 100,
                          paddingAngle: 5,
                          cornerRadius: 5,
                        },
                      ]}
                      width={600}
                      height={200}
                    />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Grid>
          <Grid item container xs={12}>
            <Card className="h-full w-full">
              <CardHeader className="justify-between">
                <div className="flex-col gap-5 p-4">
                  <div className="flex flex-rol gap-1 items-start justify-between mb-4">
                    <h1 className="text-2xl text-black font-bold">Kennels</h1>
                    <KennelAddModal></KennelAddModal>
                  </div>
                  <div>
                    <Paper sx={{ width: "100%", overflow: "hidden" }}>
                      <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {columns.map((column) => (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ minWidth: column.minWidth }}
                                >
                                  {column.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {kennels
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((kennel) => {
                                return (
                                  <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={kennel.kennelId}
                                  >
                                    {columns.map((column) => {
                                      const value = kennel[column.id];
                                      if (column.label === "Availability") {
                                        return (
                                          <TableCell
                                            key={column.id}
                                            align={column.align}
                                          >
                                            <Chip
                                              icon={(value == true) ? <EventAvailableIcon /> : <EventBusyIcon />}
                                              label={value.toString()}
                                              color={(value == true) ? "success" : "warning"}
                                            />
                                          </TableCell>
                                        );
                                      } else {
                                        return (
                                          <TableCell
                                            key={column.id}
                                            align={column.align}
                                          >
                                            {value}
                                          </TableCell>
                                        );
                                      }
                                    })}
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[5, 10]}
                        component="div"
                        count={kennels.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Paper>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default KennelManagement;
