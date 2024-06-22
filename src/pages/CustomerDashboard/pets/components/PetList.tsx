import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import SearchBar from "@/components/navigation/SearchBar";
import {
  CUSTOMER_DASHBOARD,
  CUSTOMER_PET_LIST,
  CUSTOMER_PET_UPDATE,
} from "@/Route/router-const";
import { petsOfCustomerAPI } from "@/Services/PetService";
import { useAuth } from "@/Context/useAuth";
import { PetGet } from "@/Models/Pet";

const PetList: React.FC = () => {
  const [petProfiles, setPetProfiles] = useState<PetGet[]>([]);
  const [filteredPetProfiles, setFilteredPetProfiles] = useState<PetGet[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  if (!user) return;
  const getPets = async () => {
    setLoading(true);
    if (user?.userName) {
      await petsOfCustomerAPI(user.userName)
        .then((res) => {
          if (res?.data === "User doesn't have any pets") {
            setPetProfiles([]);
            setFilteredPetProfiles([]);
          } else {
            setPetProfiles(res?.data);
            setFilteredPetProfiles(res?.data);
            sessionStorage.setItem("pets", JSON.stringify(res?.data));
          }
        })
        .catch((err) => {
          console.log("Pets not found or owner not found ", err);
          setPetProfiles([]);
          setFilteredPetProfiles([]);
        });
      setLoading(false);
    }
  };

  useEffect(() => {
    getPets();
  }, []);

  useEffect(() => {
    const filteredProfiles = petProfiles.filter((pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPetProfiles(filteredProfiles);
  }, [petProfiles, searchTerm]);

  const handleViewProfile = (id: number) => {
    navigate(`/${CUSTOMER_DASHBOARD}/${CUSTOMER_PET_LIST}/${id}`);
  };

  return (
    <div className="py-6 px-4 rounded-lg shadow-lg">
      <div className="bg-pink-600 flex items-center justify-between rounded-md p-2 mb-3">
        <h1 className="text-2xl font-bold text-white">Pet List</h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search pets..."
          className="w-1/3"
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPetProfiles.length > 0 ? (
            filteredPetProfiles.map((pet) => (
              <div
                key={pet.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <img
                  src={
                    pet.imageUrl
                      ? pet.imageUrl
                      : "https://via.placeholder.com/100"
                  }
                  alt={pet.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h4 className="text-xl font-bold">{pet.name}</h4>
                  <p className="text-sm text-custom-dark">{pet.species}</p>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <button
                      onClick={() => handleViewProfile(pet.id)}
                      className="bg-custom-darkPink text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-pink-700 whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      View
                    </button>
                    <Link
                      to={`/${CUSTOMER_DASHBOARD}/${CUSTOMER_PET_UPDATE}/${pet.id}`}
                      className="bg-custom-lightPink text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-pink-400 whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      Update
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-black font-bold">No pets found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PetList;
