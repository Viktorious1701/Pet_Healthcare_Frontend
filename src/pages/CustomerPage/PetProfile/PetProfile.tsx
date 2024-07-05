import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PetGet } from "@/Models/Pet";
import { getPetById } from "@/Services/PetService";
import { handleError } from "@/Helpers/ErrorHandler";
import { CUSTOMER_DASHBOARD, CUSTOMER_PET_LIST } from "@/Route/router-const";
import { Button } from "@nextui-org/react";


const PetProfile: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();
  const [petProfile, setPetProfile] = useState<PetGet | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const storedProfileDetails = sessionStorage.getItem("petProfile");
    if(storedProfileDetails){
      setPetProfile(JSON.parse(storedProfileDetails));
      setIsLoading(false);
      return;
    }
    const fetchProfile = async () => {
      if (petId) {
        try {
          const res = await getPetById(petId);
          if (res?.data) {
            setPetProfile(res.data);
            sessionStorage.setItem("petProfile", JSON.stringify(res.data));
          }
        } catch (error) {
          handleError(error);
        } finally {
          setIsLoading(false);
          // console.log("Pet Profile: ", petProfile);
        }
      }
    };
    fetchProfile();
  }, [petId]);

  if (isLoading) {
    return (
      <div className="p-4 flex justify-center items-center h-full">
        <h1 className="text-3xl font-bold text-custom-pink mb-4">Loading...</h1>
      </div>
    );
  }

  if (!petProfile) {
    return (
      <div className="p-4 flex justify-center items-center h-full">
        <h1 className="text-3xl font-bold text-custom-pink mb-4">Pet Profile Not Found</h1>
      </div>
    );
  }

  return (
    <div className="h-screen py-6 px-4 rounded-lg shadow-lg flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-6 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-custom-pink mb-4">Pet Profile</h1>
        <img
          src={petProfile.imageUrl}
          alt={petProfile.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-2">{petProfile.name}</h2>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <p className="text-lg">
              <strong>Species:</strong> {petProfile.species}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <p className="text-lg">
              <strong>Breed:</strong> {petProfile.breed}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <p className="text-lg">
              <strong>Gender:</strong> {petProfile.gender ? "Male" : "Female"}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <p className="text-lg">
              <strong>Weight:</strong> {petProfile.weight ? `${petProfile.weight} kg` : "Not Available"}
            </p>
          </div>
        </div>
        <Button
          onClick={() => navigate(`/${CUSTOMER_DASHBOARD}/${CUSTOMER_PET_LIST}`)}
          className="mt-4 bg-custom-darkPink hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Back to Pet List
        </Button>
      </div>
    </div>
  );
};

export default PetProfile;
