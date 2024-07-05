import { useAuth } from "@/Context/useAuth";
import { PetGet } from "@/Models/Pet";
import { petsOfCustomerAPI } from "@/Services/PetService";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PetRecordTable from "./PetRecordTable";
import PetVaccination from "./PetVaccination";

export function PetRecord() {
  const { user } = useAuth();
  const [pets, setPets] = useState<PetGet[]>([]);

  const getPets = async () => {
    await petsOfCustomerAPI(String(user?.userName))
      .then((res) => {
        if (res?.data) {
          setPets(res.data);
        }
      })
      .catch((e) => {
        toast.error("Server error occurred", e);
      });
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <Accordion type="single" collapsible className="w-full p-4">
      <div className="bg-pink-600 flex items-center justify-between rounded-md p-2 mb-3">
        <h1 className="text-2xl font-bold text-white">Pet Medical Records</h1>
      </div>
      {pets.map((pet) => (
        <AccordionItem key={pet.id} value={pet.name}>
          <AccordionTrigger>
            <Card className="flex bg-white shadow-lg w-full">
              <CardMedia
                sx={{ height: 100, width: 200 }}
                image={pet.imageUrl}
                className="rounded-l-lg"
                component="div"
              />
              <CardContent className="mt-2">
                <Typography variant="h5" className="flex justify-between">
                  {pet.name}
                </Typography>
                <Typography variant="body1" color="body2" align="left">
                  {pet.species} - {pet.breed}
                </Typography>
              </CardContent>
            </Card>
          </AccordionTrigger>
          <AccordionContent className="shadow-lg">
            <PetVaccination petId={pet.id} />
            <PetRecordTable petId={pet.id} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
