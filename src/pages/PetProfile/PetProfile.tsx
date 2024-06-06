import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";

// Mock data for demonstration
const mockPetProfiles = [
  {
    id: "1",
    name: "Bella",
    species: "Dog",
    breed: "Labrador Retriever",
    gender: "Female",
    weight: "30kg",
    image: "https://placehold.co/600x400",
  },
  {
    id: "2",
    name: "Max",
    species: "Cat",
    breed: "Siamese",
    gender: "Male",
    weight: "5kg",
    image: "https://placehold.co/600x400",
  },
  // Add more mock profiles as needed
];

const PetProfile: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const petProfile = mockPetProfiles.find((pet) => pet.id === petId);

  if (!petProfile) {
    return (
      <div className="container mx-auto p-4">
        <Navbar />
        <div className="pt-[8rem]">
          <h1 className="text-3xl font-bold text-pink-600 mb-4">Pet Profile Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <div className="pt-[8rem]">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Pet Profile</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
          <img
            src={petProfile.image}
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
            <strong>Gender:</strong> {petProfile.gender}
          </p>
          <p className="text-lg">
            <strong>Weight:</strong> {petProfile.weight}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PetProfile;
