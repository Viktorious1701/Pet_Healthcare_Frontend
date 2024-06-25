import { PetVaccinationGet } from "@/Models/PetVaccination";
import { petVaccinationGetAPI } from "@/Services/PetVaccinationService";
import { Card, CardContent } from "@/components/ui/card";
import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PetVaccinationProps {
  petId: number;
}

const PetVaccination: React.FC<PetVaccinationProps> = ({ petId }) => {
  const [petVaccination, setPetVaccination] = useState<PetVaccinationGet[]>([]);

  const getPetVaccination = async () => {
    await petVaccinationGetAPI()
      .then((res) => {
        if (res?.data) {
          setPetVaccination(res.data);
        }
      })
      .catch((e) => {
        toast.error("Server error occurred", e);
      });
  };

  useEffect(() => {
    getPetVaccination();
  }, []);

  return (
    <div className="grid grid-cols-6">
      {petVaccination.filter((vaccine) => vaccine.petId == petId).map((vaccine) => (
        <Card className="m-2 shadow-lg">
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {vaccine.vaccinationDate}
            </Typography>
            <Divider/>
            <Typography variant="h6" component="div">
              {vaccine.vaccineName}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PetVaccination;
