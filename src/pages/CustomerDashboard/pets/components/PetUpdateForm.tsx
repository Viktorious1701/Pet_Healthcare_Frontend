import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PetGet } from "@/Models/Pet";
import { getPetById, updatePetData } from "@/Services/PetService";
import { handleError } from "@/Helpers/ErrorHandler";
import { CUSTOMER_DASHBOARD, CUSTOMER_PET_LIST } from "@/Route/router-const";
import { useTheme } from "@/components/vet_components/theme-provider"; // Import useTheme hook

const PetUpdateForm: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const [editPet, setEditPet] = useState<PetGet | null>(null);
  const [formValues, setFormValues] = useState({
    petId: 0,
    name: "",
    species: "",
    breed: "",
    gender: false,
    weight: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { theme } = useTheme(); // Use the useTheme hook to get the current theme

  useEffect(() => {
    const fetchData = async () => {
      if (petId) {
        try {
          const response = await getPetById(petId);
          if (response?.data) {
            const petData = response.data;
            setEditPet(petData);
            setFormValues({
              petId: petData.id,
              name: petData.name,
              species: petData.species,
              breed: petData.breed,
              weight: petData.weight,
              gender: petData.gender,
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
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValues && petId) {
      try {
        const dataToUpdate = { imageFile, ...formValues };
        console.log("dataToUpdate", dataToUpdate);
        await updatePetData(parseInt(petId, 10), dataToUpdate);
        alert("Pet information updated successfully.");
        navigate(`/${CUSTOMER_DASHBOARD}/${CUSTOMER_PET_LIST}/${petId}`);
      } catch (err) {
        handleError(err);
        alert("An error occurred while updating pet information.");
      }
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      gender: e.target.value === "male",
    });
  };

  return (
    <div className={`flex justify-center items-center h-screen ${theme === 'dark' ? 'bg-custom-darkGray text-white ' : 'bg-white text-black'}`}>
      {editPet ? (
        <div className={`rounded-lg shadow-md p-8 w-full max-w-md ${theme === 'dark' ? 'bg-custom-darkGray' : 'bg-white'}`}>
          <h2 className={`text-2xl font-bold mb-4 text-center ${theme === 'dark' ? 'text-custom-lightPink' : 'text-pink-600'}`}>
            Edit Pet Profile
          </h2>
          <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-custom-lightGray text-black' : 'border-gray-300 text-gray-700'}`}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="species"
                  className="block font-bold mb-2"
                >
                  Species
                </label>
                <input
                  type="text"
                  id="species"
                  name="species"
                  value={formValues.species}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-custom-lightGray text-black' : 'border-gray-300 text-gray-700'}`}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="breed"
                  className="block font-bold mb-2"
                >
                  Breed
                </label>
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  value={formValues.breed}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-custom-lightGray text-black' : 'border-gray-300 text-gray-700'}`}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="block font-bold mb-2"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formValues.gender ? "male" : "female"}
                  onChange={handleGenderChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-custom-lightGray text-black' : 'border-gray-300 text-gray-700'}`}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="weight"
                  className="block font-bold mb-2"
                >
                  Weight
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formValues.weight}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-custom-lightGray text-black' : 'border-gray-300 text-gray-700'}`}
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label
                  htmlFor="imageFile"
                  className="block font-bold mb-2"
                >
                  Pet Profile Image
                </label>
                <input
                  type="file"
                  id="imageFile"
                  name="imageFile"
                  onChange={(e) => {
                    setImageFile(e.target.files?.[0] ?? null);
                  }}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-custom-lightGray text-black' : 'border-gray-300 text-gray-700'}`}
                  readOnly
                />
              </div>
            </div>
            <div className="col-span-2 flex justify-center">
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 ${theme === 'dark' ? 'border border-teal-500' : ''}`}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() =>
                  navigate(`/${CUSTOMER_DASHBOARD}/${CUSTOMER_PET_LIST}`)
                }
                className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'border border-teal-500' : ''}`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          <p>Loading pet data...</p>
        </div>
      )}
    </div>
  );
};

export default PetUpdateForm;
