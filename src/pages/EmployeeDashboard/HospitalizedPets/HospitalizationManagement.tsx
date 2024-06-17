import { useEffect, useState } from "react";
import { Box, Grid, Card, CardHeader } from "@mui/material";
import { Hospitalization } from "@/Models/Hospitalization";
import HospitalizationDataGrid from "./HospitalizationDataGrid";
import { hospitalizationListAPI } from "@/Services/HospitalizationService";
import { toast } from "react-toastify";

const HospitalizationManagement = () => {
  const [hospitalizations, setHospitalizations] = useState<Hospitalization[]>([]);

  const getHospitalizations = async () => {
    await hospitalizationListAPI()
      .then((res) => {
        if (res?.data) {
          setHospitalizations(res.data);
        }
      })
      .catch((e) => {
        toast.error("Server error occurred", e);
      });
  };

  useEffect(() => {
    getHospitalizations();
  }, []);

  return (
    <div className="m-10">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* Total Hospitalizations Card */}
          <Grid item xs={12} md={12}>
            <Card className="h-full w-full">
              <CardHeader className="justify-between">
                <div className="flex-col gap-5 p-4">
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h2 className="text-xl text-default">Total Hospitalizations</h2>
                    <p className="text-2xl font-bold">{hospitalizations.length}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Grid>
          {/* Hospitalization Data Grid */}
          <Grid item xs={12} md={12}>
            <HospitalizationDataGrid
              hospitalizations={hospitalizations}
              setHospitalizations={setHospitalizations}
              onHospitalizationDelete={(deletedHospitalization) =>
                setHospitalizations(hospitalizations.filter(h => h.hospitalizationId !== deletedHospitalization.hospitalizationId))
              }
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default HospitalizationManagement;
