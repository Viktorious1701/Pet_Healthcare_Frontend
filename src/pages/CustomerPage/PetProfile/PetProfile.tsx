import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PetGet } from "@/Models/Pet";
import { getPetById } from "@/Services/PetService";
import { handleError } from "@/Helpers/ErrorHandler";
import { CUSTOMER_DASHBOARD, CUSTOMER_PET_LIST } from "@/Route/router-const";
import { Button } from "@nextui-org/react";

import { useEffect, useState } from "react";
const PetProfile: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();
  const [petProfile, setPetProfile] = useState<PetGet | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (petId) {
        try {
          const res = await getPetById(petId);
          if (res?.data) {
            setPetProfile(res.data);
        
          }
        } catch (error) {
          handleError(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchProfile();
  }, [petId]);

  if (isLoading) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Loading...</h1>
      </div>
    );
  }

  if (!petProfile) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Pet Profile Not Found</h1>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="p-4">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Pet Profile</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
          <img
            src={petProfile.imageURL}
            alt={petProfile.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">{petProfile.name}</h2>
          <p className="text-lg">
            <strong>Species:</strong> {petProfile.species}
          </p>
          <p className="text-lg">
            <strong>Breed:</strong> {petProfile.breed}
          </p>
          <p className="text-lg">
            <strong>Gender:</strong> {petProfile.gender ? "Male" : "Female"}
          </p>
          <p className="text-lg">
            <strong>Weight:</strong> {petProfile.weight? `${petProfile.weight} kg` : "Not Available"}
          </p>
          <Button
            onClick={() => navigate(`/${CUSTOMER_DASHBOARD}/${CUSTOMER_PET_LIST}`)}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back to Pet List
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PetProfile;
