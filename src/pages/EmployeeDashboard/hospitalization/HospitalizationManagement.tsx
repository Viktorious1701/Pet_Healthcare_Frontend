/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardHeader,
} from "@mui/material";
import { Button } from "@/components/ui/button";
import { Hospitalization, HospitalizationPost } from "@/Models/Hospitalization";
import HospitalizationDataGrid from "./components/HospitalizationDataGrid";
import { hospitalizationListAPI, hospitalizationCreateAPI } from "@/Services/HospitalizationService";
import { toast } from "react-toastify";
import HospitalizationAddModal from "./components/HospitalizationAddModal";

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
          {/* Header Section */}
          <Grid item xs={12}>
            <Card className="h-full w-full">
            <CardHeader
                title="Hospitalization Management"
                titleTypographyProps={{ variant: "h5", color: "primary" }}
                action={
                  <Button  onClick={openModal} className="bg-custom-pink hover:bg-custom-darkPink">
                    Add Hospitalization
                  </Button>
                }
              />
            </Card>
          </Grid>
          {/* Hospitalization Data Grid */}
          <Grid item xs={12}>
            <HospitalizationDataGrid
              hospitalizations={hospitalizations}
              setHospitalizations={setHospitalizations}
              onHospitalizationDelete={handleHospitalizationDelete}
            />
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
