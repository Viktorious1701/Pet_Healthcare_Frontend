import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { appointmentDetailsAPI } from "@/Services/AppointmentService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AppointmentForm = () => {
  const [appointmentDetails, setAppointmentDetails] = useState({
    appointmentId: 0,
    diagnosis: "",
    treatment: "",
    medication: ""
  });

  const { appointmentId: urlAppointmentId } = useParams<{
    appointmentId: string;
  }>();

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        if (typeof urlAppointmentId === 'string') {
          // urlAppointmentId is confirmed to be a string, safe to call appointmentDetailsAPI
          const fetchedDetails = await appointmentDetailsAPI(urlAppointmentId);
          if (fetchedDetails) {
            setAppointmentDetails({
              appointmentId: fetchedDetails.appointmentId,
              diagnosis: fetchedDetails.diagnosis || "",
              treatment: fetchedDetails.treatment || "",
              medication: fetchedDetails.medication || ""
            });
          } else {
            console.log("No matching appointment found");
          }
        } else {
          // Handle the case where urlAppointmentId is undefined
          console.error("Appointment ID is undefined");
        }
      } catch (error) {
        console.error("Failed to fetch appointment details:", error);
      }
    };
  
    fetchAppointmentDetails();
  }, [urlAppointmentId]); // Add urlAppointmentId as a dependency

  return (
    <form className="w-full p-10 bg-opacity-20 z-10 overflow-auto">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-4xl font-bold mb-6">
            Edit Diagnosis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3 mb-6">
              <Label htmlFor="appointmentId" className="block text-xl font-normal">
                Appointment ID
              </Label>
              <Input
                id="appointmentId"
                type="text"
                readOnly
                value={appointmentDetails.appointmentId.toString()}
                className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg"
              />
            </div>
            <div className="w-full px-3 mb-6">
              <Label htmlFor="diagnosis" className="block text-xl font-normal">
                Diagnosis
              </Label>
              <Input
                id="diagnosis"
                type="text"
                value={appointmentDetails.diagnosis}
                onChange={(e) =>
                  setAppointmentDetails({
                    ...appointmentDetails,
                    diagnosis: e.target.value,
                  })
                }
                className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg"
              />
            </div>
            <div className="w-full px-3 mb-6">
              <Label htmlFor="treatment" className="block text-xl font-normal">
                Treatment
              </Label>
              <Input
                id="treatment"
                type="text"
                value={appointmentDetails.treatment}
                onChange={(e) =>
                  setAppointmentDetails({
                    ...appointmentDetails,
                    treatment: e.target.value,
                  })
                }
                className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg"
              />
            </div>
            <div className="w-full px-3 mb-6">
              <Label htmlFor="medication" className="block text-xl font-normal">
                Medication
              </Label>
              <Input
                id="medication"
                type="text"
                value={appointmentDetails.medication}
                onChange={(e) =>
                  setAppointmentDetails({
                    ...appointmentDetails,
                    medication: e.target.value,
                  })
                }
                className="w-full py-4 bg-[var(--nav-header)] shadow-[0_3px_0px_-0.5px_rgba(140,140,140)] text-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default AppointmentForm;