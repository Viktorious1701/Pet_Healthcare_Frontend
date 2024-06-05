import Navbar from "@/components/navigation/Navbar";
import React, { useState, useEffect } from "react";

interface PetHospitalization {
  petName: string;
  status: string;
  admissionDate: string;
  dischargeDate?: string;
  totalCost: number;
}

const mockData: PetHospitalization[] = [
  {
    petName: "Buddy",
    status: "In Service",
    admissionDate: "2024-06-01",
    dischargeDate: "",
    totalCost: 0,
  },
  {
    petName: "Max",
    status: "Discharged",
    admissionDate: "2024-05-20",
    dischargeDate: "2024-06-02",
    totalCost: 200,
  },
  // Add more mock data as needed
];

const HospitalizationPage: React.FC = () => {
  const [hospitalizations, setHospitalizations] = useState<
    PetHospitalization[]
  >([]);

  useEffect(() => {
    // In a real application, you would fetch data from an API
    setHospitalizations(mockData);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <div className="pt-[8rem]">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">
          Pet Hospitalization Status
        </h1>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-pink-200">
            <tr>
              <th className="py-2 px-4 text-left">Pet Name</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Admission Date</th>
              <th className="py-2 px-4 text-left">Discharge Date</th>
              <th className="py-2 px-4 text-left">Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {hospitalizations.map((hospitalization, index) => (
              <tr key={index} className="even:bg-pink-50 odd:bg-pink-100">
                <td className="py-2 px-4">{hospitalization.petName}</td>
                <td className="py-2 px-4">{hospitalization.status}</td>
                <td className="py-2 px-4">{hospitalization.admissionDate}</td>
                <td className="py-2 px-4">
                  {hospitalization.dischargeDate || "N/A"}
                </td>
                <td className="py-2 px-4">
                  ${hospitalization.totalCost.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HospitalizationPage;
