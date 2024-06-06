import React from "react";
import Navbar from "@/components/navigation/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { mockData, PetHospitalization } from "./MockData";

const KennelPage: React.FC = () => {
  const { kennelId } = useParams<{ kennelId: string }>();
  const navigate = useNavigate();

  // Find the kennel details based on kennelId
  const kennelDetails: PetHospitalization | undefined = mockData.find(
    (hospitalization) => hospitalization.kennel.kennelId === kennelId
  );

  if (!kennelDetails) {
    return <div>Kennel not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <div className="mt-[8rem]">
        <Button
          onClick={() => navigate(-1)}
          className="mb-4 bg-custom-darkPink text-custom-lightGrey"
        >
          Go Back
        </Button>
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Kennel Details</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-lg font-semibold mb-2">Kennel ID: {kennelId}</p>
          <p className="text-lg font-semibold mb-2">
            Description: {kennelDetails.kennel.description}
          </p>
          <p className="text-lg font-semibold mb-2">
            Daily Cost: ${kennelDetails.kennel.dailyCost.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default KennelPage;
