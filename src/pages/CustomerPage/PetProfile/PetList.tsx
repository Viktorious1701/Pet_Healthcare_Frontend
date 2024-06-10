import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "@/components/navigation/SearchBar";
import { CUSTOMER_DASHBOARD, CUSTOMER_PET_LIST, CUSTOMER_PET_UPDATE } from "@/Route/router-const";
import { petsOfCustomerAPI } from "@/Services/PetService";
import { useAuth } from "@/Context/useAuth";
import { PetGet } from "@/Models/Pet";
import { Button } from "@nextui-org/react";

const PetList: React.FC = () => {
  const [petProfiles, setPetProfiles] = useState<PetGet[]>([]);
  const [filteredPetProfiles, setFilteredPetProfiles] = useState<PetGet[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!user) return;
    const getPets = async () => {
      try {
        if (user?.userName) {
          const res = await petsOfCustomerAPI(user.userName);
          if (res?.data) {
            setPetProfiles(res.data);
            setFilteredPetProfiles(res.data); // Set both profiles and filtered profiles
          } else {
            setPetProfiles([]);
            setFilteredPetProfiles([]); // Clear both profiles
          }
        }
      } catch (err) {
        console.log("Pets not found or owner not found ", err);
        setPetProfiles([]);
        setFilteredPetProfiles([]); // Clear both profiles
      }
    };

    getPets();
  }, [user]);

  const handleSearch = () => {
    const filteredProfiles = petProfiles.filter(pet =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPetProfiles(filteredProfiles); // Update only the filtered profiles
  };

  const handleViewProfile = (id: string) => {
    navigate(`/${CUSTOMER_DASHBOARD}/${CUSTOMER_PET_LIST}/${id}`);
  };

  return (
    <div className="mt-10 font-roboto ">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">Pet List</h1>
      <div className="flex mb-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search pets..." />
        <Button onClick={handleSearch} className="ml-2 bg-blue-500 text-white p-2 rounded">Search</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPetProfiles.length > 0 ? filteredPetProfiles.map((pet) => (
          <div key={pet.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={pet.imageURL} alt={pet.name} className="w-full h-48 object-cover" />
            <div className="p-4 text-center">
              <h4 className="text-xl font-bold">{pet.name}</h4>
              <p className="text-sm text-custom-dark ">{pet.species}</p>
              <div className="flex justify-between gap-2" >
                <Button
                  onClick={() => handleViewProfile(pet.id.toString())}
                  className="text-custom-darkPink hover:transition-opacity mt-2 block text-ellipsis"
                >
                  View Profile
                </Button>
                <Button className="bg-custom-lightPink mt-2 text-ellipsis">
                  <Link to={`/${CUSTOMER_DASHBOARD}/${CUSTOMER_PET_UPDATE}/${pet.id}`}>Update</Link>
                </Button>
              </div>
            </div>
          </div>
        )) : <div className="text-custom-pink font-bold">No pets found</div>}
      </div>
    </div>
  );
};

export default PetList;
