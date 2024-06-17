/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardHeader,
  Button,
} from "@mui/material";
import { Hospitalization, HospitalizationPost } from "@/Models/Hospitalization";
import HospitalizationDataGrid from "./HospitalizationDataGrid";
import { hospitalizationListAPI, hospitalizationCreateAPI } from "@/Services/HospitalizationService";
import { toast } from "react-toastify";
import HospitalizationAddModal from "./HospitalizationAddModal";

const HospitalizationManagement = () => {
  const [hospitalizations, setHospitalizations] = useState<Hospitalization[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getHospitalizations();
  }, []);

  const getHospitalizations = async () => {
    try {
      const res = await hospitalizationListAPI();
      if (res?.data) {
        setHospitalizations(res.data);
      }
    } catch (error: any) {
      toast.error("Failed to fetch hospitalizations", error);
    }
  };

  const handleHospitalizationDelete = (deletedHospitalization: Hospitalization) => {
    setHospitalizations(hospitalizations.filter(h => h.hospitalizationId !== deletedHospitalization.hospitalizationId));
  };

  const handleAddHospitalization = async (newHospitalization: HospitalizationPost) => {
    try {
      const res = await hospitalizationCreateAPI(newHospitalization);
      if (res?.data) {
        setHospitalizations([...hospitalizations, res.data]);
        toast.success("Hospitalization added successfully");
        closeModal();
      }
    } catch (error: any) {
      toast.error("Failed to add hospitalization", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
              onHospitalizationDelete={handleHospitalizationDelete}
            />
          </Grid>
          {/* Add Hospitalization Button */}
          <Grid item xs={12} md={12}>
            <Button variant="contained" color="primary" onClick={openModal}>
              Add Hospitalization
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Hospitalization Add Modal */}
      <HospitalizationAddModal
        open={isModalOpen}
        onClose={closeModal}
        onAddHospitalization={handleAddHospitalization}
      />
    </div>
  );
};

export default HospitalizationManagement;
