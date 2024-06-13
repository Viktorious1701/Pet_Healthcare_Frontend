import { Kennel } from "@/Models/Kennel";
import { kennelGetAPI } from "@/Services/KennelService";
import {
  Box,
  Grid
} from "@mui/material";
import { Card, CardHeader } from "@nextui-org/card";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import KennelAddModal from "./KennelAddModal";
import KennelDataGrid from "./KennelDataGrid";

const KennelManagement = () => {
  const [kennels, setKennels] = useState<Kennel[]>([]);
  const availableKennels = kennels.filter(
    (kennel) => kennel.isAvailable
  ).length;
  const occupiedKennels = kennels.filter(
    (kennel) => !kennel.isAvailable
  ).length;

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
          <Grid item container md={6} spacing={2}>
            <Grid item md={6}>
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
            <Grid item md={6}>
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
            <Grid item md={6}>
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
            <Grid item md={6}>
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
          <Grid item container md={6}>
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
          <Grid item container md={12}>
            <Card className="h-full w-full">
              <CardHeader className="justify-between">
                <div className="flex-col gap-5 p-4">
                  <div className="flex flex-rol gap-1 items-start justify-between mb-4">
                    <h1 className="text-2xl text-black font-bold">Kennels</h1>
                    <KennelAddModal></KennelAddModal>
                  </div>
                  <div>
                    <KennelDataGrid kennels={kennels} setKennels={setKennels}></KennelDataGrid>
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
