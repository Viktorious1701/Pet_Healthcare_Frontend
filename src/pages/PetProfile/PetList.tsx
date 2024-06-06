import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import SearchBar from "@/components/navigation/SearchBar";
import { CUSTOMER_PET_PROFILE, CUSTOMER_PET_UPDATE } from "@/Route/router-const";
import { Button } from "@/components/ui/button";

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

const PetList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [petProfiles, setPetProfiles] = useState(mockPetProfiles);
  const navigate = useNavigate();

  const handleSearch = () => {
    const filteredProfiles = mockPetProfiles.filter(pet =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPetProfiles(filteredProfiles);
  };



  const handleViewProfile = (id: string) => {
    navigate(`/${CUSTOMER_PET_PROFILE}/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <div className="pt-[8rem]">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Pet List</h1>
        <div className="flex mb-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search pets..." />
          <button onClick={handleSearch} className="ml-2 bg-blue-500 text-white p-2 rounded">Search</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {petProfiles.map((pet) => (
            <div key={pet.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="text-xl font-bold">{pet.name}</h4>
                <p className="text-gray-600">{pet.species}</p>
                <p className="text-gray-600">{pet.breed}</p>
                <p className="text-gray-600">{pet.gender}</p>
                <p className="text-gray-600">{pet.weight}</p>
                <button 
                  onClick={() => handleViewProfile(pet.id)} 
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  View Profile
                </button>
                <Button>
                  <Link to={`/${CUSTOMER_PET_UPDATE}/${pet.id}`}>Update</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetList;
