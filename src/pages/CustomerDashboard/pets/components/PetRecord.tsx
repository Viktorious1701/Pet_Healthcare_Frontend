import { useAuth } from "@/Context/useAuth";
import { AppointmentDetailGet } from "@/Models/AppointmentDetail";
import { PetGet } from "@/Models/Pet";
import { appointmentDetailGetAPI } from "@/Services/AppointmentDetailService";
import { petsOfCustomerAPI } from "@/Services/PetService";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function PetRecord() {
  const { user } = useAuth();
  const [pets, setPets] = useState<PetGet[]>([]);
  const [appointmentDetails, setAppointmentDetails] = useState<
    AppointmentDetailGet[]
  >([]);

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

  const getAppointmentDetails = async () => {
    await appointmentDetailGetAPI()
      .then((res) => {
        if (res?.data) {
          setAppointmentDetails(res.data);
        }
      })
      .catch((e) => {
        toast.error("Server error occurred", e);
      });
  };

  useEffect(() => {
    getPets();
    getAppointmentDetails();
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
            <Table className="bg-white">
              <TableCaption>
                A list of your pet medical record details.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Vet</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Treatment</TableHead>
                  <TableHead>Medication</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointmentDetails
                  .filter(
                    (appointmentDetail) => (appointmentDetail.recordId)
                  )
                  .map((appointmentDetail) => (
                    <TableRow key={appointmentDetail.appointmentDetailId}>
                      <TableCell className="font-medium">
                        {appointmentDetail.appointmentDetailId}
                      </TableCell>
                      <TableCell>{}</TableCell>
                      <TableCell>{}</TableCell>
                      <TableCell>{appointmentDetail.diagnosis}</TableCell>
                      <TableCell>{appointmentDetail.medication}</TableCell>
                      <TableCell>{appointmentDetail.treatment}</TableCell>
                      <TableCell className="text-right">{}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={6}>Total Visits</TableCell>
                  <TableCell className="text-right">
                    {appointmentDetails.length}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
