import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockData } from "./MockData";
import { Button } from "@/components/ui/button";
import CustomerSideBar from "@/components/sidebar/CustomerSidebar";

const PetHealthTrack: React.FC = () => {
  const { petName } = useParams<{ petName: string }>();
  const navigate = useNavigate();

  const pet = mockData.find((pet) => pet.petName === petName);

  if (!pet) {
    return <div>Pet not found</div>;
  }

  return (
    <div className="flex">
      <CustomerSideBar />
      <div className="p-6">
        <Button onClick={() => navigate(-1)} className="mb-4 bg-custom-darkPink text-custom-lightGrey">
          Go Back
        </Button>
        <h1 className="text-3xl font-bold text-pink-600 mb-4">{pet.petName}'s Health Track</h1>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-pink-200">
            <tr>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {pet.healthTrack.map((entry, index) => (
              <tr key={index} className={index % 2 === 0 ? "even:bg-pink-50" : "odd:bg-pink-100"}>
                <td className="py-2 px-4">{entry.date}</td>
                <td className="py-2 px-4">{entry.description}</td>
                <td className="py-2 px-4">{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PetHealthTrack;
