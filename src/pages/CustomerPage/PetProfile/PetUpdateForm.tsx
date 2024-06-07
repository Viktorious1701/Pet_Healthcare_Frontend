import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PetGet } from "@/Models/Pet";
import { getPetById, updatePetData } from "@/Services/PetService";
import { handleError } from "@/Helpers/ErrorHandler";
import { CUSTOMER_DASHBOARD, CUSTOMER_PET_LIST } from "@/Route/router-const";

const PetUpdateForm: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const [editPet, setEditPet] = useState<PetGet | null>(null);
  const [formValues, setFormValues] = useState({
    petId: 0,
    name: "",
    species: "",
    breed: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (petId) {
        try {
          const response = await getPetById(petId);
          if (response?.data) {
            const petData = response.data as PetGet;
            setEditPet(petData);
            setFormValues({
              petId: petData.id,
              name: petData.name,
              species: petData.species,
              breed: petData.breed,
            });
          }
        } catch (err) {
          handleError(err);
        }
      }
    };
    fetchData();
  }, [petId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValues && petId) {
      try {
        await updatePetData(parseInt(petId, 10), formValues);
        alert("Pet information updated successfully.");
        navigate(`/${CUSTOMER_DASHBOARD}/${CUSTOMER_PET_LIST}/${petId}`);
      } catch (err) {
        handleError(err);
        alert("An error occurred while updating pet information.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {editPet ? (
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-pink-600">
            Edit Pet Profile
          </h2>
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="species" className="block text-gray-700 font-bold mb-2">
                Species
              </label>
              <input
                type="text"
                id="species"
                name="species"
                value={formValues.species}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="breed" className="block text-gray-700 font-bold mb-2">
                Breed
              </label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={formValues.breed}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => navigate(`/${CUSTOMER_DASHBOARD}/${CUSTOMER_PET_LIST}`)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center">
          <p>Loading pet data...</p>
        </div>
      )}
    </div>
  );
};

export default PetUpdateForm;
