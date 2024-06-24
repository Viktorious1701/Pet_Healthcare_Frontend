import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import SearchBar from "@/components/navigation/SearchBar";
import { hospitalizationListAPI } from "@/Services/HospitalizationService";
import { Hospitalization } from "@/Models/Hospitalization";
import {
  CUSTOMER_DASHBOARD,
  HOSPITALIZATION,
  KENNEL,
} from "@/Route/router-const";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PetGet } from "@/Models/Pet";
import { petsOfCustomerAPI } from "@/Services/PetService";
import { useAuth } from "@/Context/useAuth";
import { toast } from "sonner";

const calculateTotalCost = (
  admissionDate: string,
  dischargeDate: string,
  dailyCost: number
): number => {
  if (!dischargeDate) return 0;
  const admission = new Date(admissionDate);
  const discharge = new Date(dischargeDate);
  const days = Math.floor(
    (discharge.getTime() - admission.getTime()) / (1000 * 60 * 60 * 24)
  );
  return days * dailyCost;
};

const HospitalizationPage: React.FC = () => {
  const { user } = useAuth();
  const [hospitalizations, setHospitalizations] = useState<Hospitalization[]>(
    []
  );
  const [pets, setPets] = useState<PetGet[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const getPets = async () => {
    await petsOfCustomerAPI(String(user?.userName))
    .then((res) => {
      if (res?.data) {
        setPets(res.data);
      }
    })
    .catch((e) => {
      toast.error("Server error occurred", e);
    })
  }

  const getHospitalization = async () => {
    await hospitalizationListAPI()
      .then((res) => {
        if (res?.data) {
          const hospitalizationsWithPets = res.data?.map(
            (hospitalization: Hospitalization) => {
              const petRes = pets?.find((pet) => hospitalization.petId == pet.id);
              return {
                ...hospitalization,
                petName: petRes?.name, // Assuming the pet object has a 'name' field
              };
            }
          );
          setHospitalizations(hospitalizationsWithPets);
          sessionStorage.setItem("hospitalizations", JSON.stringify(hospitalizationsWithPets));
        } else {
          setHospitalizations([]);
        }
      })
      .catch((error) => {
        console.log("Error occurred:", error);
        setHospitalizations([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    const storedHospitalizations = sessionStorage.getItem("hospitalizations");
    // const storedPets = sessionStorage.getItem("pets");
    if (storedHospitalizations) {
      setHospitalizations(JSON.parse(storedHospitalizations));
      setLoading(false);
    } 
    getPets();
  }, []);

  useEffect(() => {
    getHospitalization();
  }, [pets])

  // Filter hospitalizations based on search term
  const filteredHospitalizations = hospitalizations.filter((hospitalization) =>
    hospitalization.petName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-pink-600 flex items-center justify-between rounded-md p-2">
        <h1 className="text-3xl font-bold text-white">
          Pet Hospitalization Status
        </h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search by pet name..."
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>A list of your recent hospitalizations.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Hospitalization ID</TableHead>
              <TableHead>Pet Name</TableHead>
              <TableHead>Admission Date</TableHead>
              <TableHead>Discharge Date</TableHead>
              <TableHead>Kennel</TableHead>
              <TableHead>Total Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHospitalizations.map((hospitalization, index) => (
              <TableRow key={index} className="even:bg-pink-50 odd:bg-pink-100">
                <TableCell className="font-medium">
                  {hospitalization.hospitalizationId}
                </TableCell>
                <TableCell>
                  <Link
                    to={`/${CUSTOMER_DASHBOARD}/${HOSPITALIZATION}/${hospitalization.hospitalizationId}`}
                    className="text-custom-pink hover:text-custom-darkPink underline"
                  >
                    {hospitalization.petName}
                  </Link>
                </TableCell>
                <TableCell>{hospitalization.admissionDate}</TableCell>
                <TableCell>{hospitalization.dischargeDate || "N/A"}</TableCell>
                <TableCell>
                  <Link
                    to={`/${CUSTOMER_DASHBOARD}/${KENNEL}/${hospitalization.kennelId}`}
                    className="text-custom-pink hover:text-custom-darkPink underline"
                  >
                    {hospitalization.kennelId}
                  </Link>
                </TableCell>
                <TableCell>
                  {calculateTotalCost(
                    String(hospitalization.admissionDate),
                    String(hospitalization.dischargeDate),
                    50
                  ).toFixed(2)}{" "}
                  $
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HospitalizationPage;
