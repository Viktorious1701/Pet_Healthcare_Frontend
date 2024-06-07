import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "@/components/navigation/SearchBar";
import {CUSTOMER_DASHBOARD, CUSTOMER_PET_LIST, CUSTOMER_PET_UPDATE } from "@/Route/router-const";

import { petsOfCustomerAPI } from "@/Services/PetService";
import { useAuth } from "@/Context/useAuth";
import { PetGet } from "@/Models/Pet";
import { Button } from "@nextui-org/react";

const PetList: React.FC = () => {
  const [petProfiles, setPetProfiles] = useState<PetGet[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getPets = async () => {
      try {
        if (user?.userName) {
          const res = await petsOfCustomerAPI(user.userName);
          if (res?.data) {
            setPetProfiles(res.data);
          } else {
            setPetProfiles([]);
          }
        }
      } catch (err) {
        console.log("Pets not found or owner not found ", err);
        setPetProfiles([]);
      }
    };

    getPets();
  }, [user]);

  const handleSearch = () => {
    const filteredProfiles = petProfiles.filter(pet =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPetProfiles(filteredProfiles);
  };

  const handleViewProfile = (id: string) => {
    navigate(`/${CUSTOMER_DASHBOARD}/${CUSTOMER_PET_LIST}/${id}`);
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">Pet List</h1>
      <div className="flex mb-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search pets..." />
        <button onClick={handleSearch} className="ml-2 bg-blue-500 text-white p-2 rounded">Search</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {petProfiles.map((pet) => (
          <div key={pet.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={pet.imageURL} alt={pet.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h4 className="text-xl font-bold">{pet.name}</h4>
              <p className="text-gray-600">{pet.species}</p>
              <p className="text-gray-600">{pet.breed}</p>
              <p className="text-gray-600">{pet.gender ? "Male" : "Female"}</p>
              <p className="text-gray-600">{pet.weight} kg</p>
              <button
                onClick={() => handleViewProfile(pet.id.toString())}
                className="text-blue-500 hover:underline mt-2 block"
              >
                View Profile
              </button>
              <Button className="bg-custom-lightPink mt-2">
                <Link to={`/${CUSTOMER_DASHBOARD}/${CUSTOMER_PET_UPDATE}/${pet.id}`}>Update</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetList;
