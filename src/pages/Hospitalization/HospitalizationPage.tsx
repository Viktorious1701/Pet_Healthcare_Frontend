import Navbar from "@/components/navigation/Navbar";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PetHospitalization, mockData } from "./MockData";
import SearchBar from "@/components/navigation/SearchBar";

const calculateTotalCost = (
  admissionDate: string,
  dischargeDate: string | undefined,
  dailyCost: number
): number => {
  if (!dischargeDate) return 0;
  const admission = new Date(admissionDate);
  const discharge = new Date(dischargeDate);
  console.log(admission, discharge);
  const days = Math.floor(
    (discharge.getTime() - admission.getTime()) / (1000 * 60 * 60 * 24)
  );
  return days * dailyCost;
};

const HospitalizationPage: React.FC = () => {
  const [hospitalizations, setHospitalizations] = useState<PetHospitalization[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // Update the total cost for each hospitalization
    const updatedData = mockData.map((hospitalization) => ({
      ...hospitalization,
      totalCost: calculateTotalCost(
        hospitalization.admissionDate,
        hospitalization.dischargeDate,
        hospitalization.kennel.dailyCost
      ),
    }));
    setHospitalizations(updatedData);
  }, []);

  // Filter hospitalizations based on search term
  const filteredHospitalizations = hospitalizations.filter((hospitalization) =>
    hospitalization.petName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <div className="pt-[8rem]">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Pet Hospitalization Status</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search by pet name..." />
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-4">
          <thead className="bg-pink-200">
            <tr>
              <th className="py-2 px-4 text-left">Pet Name</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Admission Date</th>
              <th className="py-2 px-4 text-left">Discharge Date</th>
              <th className="py-2 px-4 text-left">Kennel</th>
              <th className="py-2 px-4 text-left">Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {filteredHospitalizations.map((hospitalization, index) => (
              <tr key={index} className="even:bg-pink-50 odd:bg-pink-100">
                <td className="py-2 px-4">
                  <Link to={`/hospitalization/${hospitalization.petName}`} className="text-custom-pink hover:text-custom-darkPink underline">
                    {hospitalization.petName}
                  </Link>
                </td>
                <td className="py-2 px-4">{hospitalization.status}</td>
                <td className="py-2 px-4">{hospitalization.admissionDate}</td>
                <td className="py-2 px-4">{hospitalization.dischargeDate || "N/A"}</td>
                <td className="py-2 px-4">
                  <Link to={`/kennel/${hospitalization.kennel.kennelId}`} className="text-custom-pink hover:text-custom-darkPink underline">
                    {hospitalization.kennel.kennelId}
                  </Link>
                </td>
                <td className="py-2 px-4">${hospitalization.totalCost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HospitalizationPage;
