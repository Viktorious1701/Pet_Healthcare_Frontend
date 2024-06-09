import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "@/components/navigation/SearchBar";
import { HospitalizationListAPI } from "@/Services/HospitalizationService";
import { getPetById } from "@/Services/PetService";
import { Hospitalization } from "@/Models/Hospitalization";
import { CUSTOMER_DASHBOARD, HOSPITALIZATION, KENNEL } from "@/Route/router-const";

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
  const [hospitalizations, setHospitalizations] = useState<Hospitalization[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchHospitalizationsWithPets = async () => {
      try {
        const res = await HospitalizationListAPI();
        console.log("useeff", res?.data);
        if (res?.data) {
          const hospitalizationsWithPets = await Promise.all(
            res.data.map(async (hospitalization: Hospitalization) => {
              const petRes = await getPetById(hospitalization.petId.toString());
              return {
                ...hospitalization,
                petName: petRes?.data?.name, // Assuming the pet object has a 'name' field
              };
            })
          );

          setHospitalizations(hospitalizationsWithPets);
        } else {
          setHospitalizations([]);
        }
      } catch (error) {
        console.log("Error occurred:", error);
        setHospitalizations([]);
      }
    };

    fetchHospitalizationsWithPets();
  }, []);

  // Filter hospitalizations based on search term
  const filteredHospitalizations = hospitalizations.filter((hospitalization) =>
    hospitalization.petName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">
        Pet Hospitalization Status
      </h1>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search by pet name..."
      />
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-4">
        <thead className="bg-pink-200">
          <tr>
            <th className="py-2 px-4 text-left">Hospitalization ID</th>
            <th className="py-2 px-4 text-left">Pet Name</th>
            <th className="py-2 px-4 text-left">Admission Date</th>
            <th className="py-2 px-4 text-left">Discharge Date</th>
            <th className="py-2 px-4 text-left">Kennel</th>
            <th className="py-2 px-4 text-left">Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {filteredHospitalizations.map((hospitalization, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0 ? "even:bg-pink-50 odd:bg-pink-100" : ""
              }
            >
              <td className="py-2 px-4">{hospitalization.hospitalizationId}</td>
              <td className="py-2 px-4">
                <Link
                  to={`/${CUSTOMER_DASHBOARD}/${HOSPITALIZATION}/${hospitalization.hospitalizationId}`}
                  className="text-custom-pink hover:text-custom-darkPink underline"
                >
                  {hospitalization.petName}
                </Link>
              </td>

              <td className="py-2 px-4">{hospitalization.admissionDate}</td>
              <td className="py-2 px-4">
                {hospitalization.dischargeDate || "N/A"}
              </td>
              <td className="py-2 px-4">
                <Link
                  to={`/${CUSTOMER_DASHBOARD}/${KENNEL}/${hospitalization.kennelId}`}
                  className="text-custom-pink hover:text-custom-darkPink underline"
                >
                  {hospitalization.kennelId}
                </Link>
              </td>
              <td className="py-2 px-4">
                {calculateTotalCost(
                  String(hospitalization.admissionDate),
                  String(hospitalization.dischargeDate),
                  50
                ).toFixed(2)}{" "}
                $
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HospitalizationPage;
