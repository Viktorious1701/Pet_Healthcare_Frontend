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
  const [images, setImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const getPets = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const storedList = sessionStorage.getItem("petProfiles");
        if (storedList) {
          const parsedList = JSON.parse(storedList);
          if (Array.isArray(parsedList)) {
            setPetProfiles(parsedList);
            setFilteredPetProfiles(parsedList);
            fetchImages(parsedList);
          }
          setLoading(false);
          return;
        }
        if (user?.userName) {
          const res = await petsOfCustomerAPI(user.userName);
          if (res?.data) {
            setPetProfiles(res.data);
            setFilteredPetProfiles(res.data);
            console.log("Pet profiles: ", res.data);
            sessionStorage.setItem("petProfiles", JSON.stringify(res.data));
            fetchImages(res.data);
          } else {
            setPetProfiles([]);
            setFilteredPetProfiles([]);
          }
        }
      } catch (err) {
        console.log("Pets not found or owner not found ", err);
        setPetProfiles([]);
        setFilteredPetProfiles([]);
      }
      setLoading(false);
    };

    const fetchImages = async (pets: PetGet[]) => {
      const newImages: { [key: string]: string } = {};
      await Promise.all(
        pets.map(async (pet) => {
          if (pet.imageUrl) {
            if (pet.imageUrl.startsWith("http")) {
              // If imageUrl starts with 'http', it's already a valid URL
              newImages[pet.id] = pet.imageUrl;
            } else {
              try {
                // If imageUrl is a local file path, you need to handle it differently
                const file = await fetch(pet.imageUrl);
                const blob = await file.blob();
                const imageUrl = URL.createObjectURL(blob);
                newImages[pet.id] = imageUrl;
              } catch (error) {
                console.log("Error fetching image for pet: ", pet.id, error);
                newImages[pet.id] = "https://via.placeholder.com/100"; // Use placeholder image if fetch fails
              }
            }
          } else {
            newImages[pet.id] = "https://via.placeholder.com/100"; // Use placeholder image if no imageUrl
          }
        })
      );
      setImages(newImages);
    };

    getPets();
  }, [user]);

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
                  src={images[pet.id] || "https://via.placeholder.com/100"}
                  alt={pet.name}
                  className="w-full h-32 object-cover"
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
            <div className="text-white font-bold">No pets found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PetList;
