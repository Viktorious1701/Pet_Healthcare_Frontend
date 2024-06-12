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
    gender: false,
    weight: 0,
    imageUrl: ""
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (petId) {
        try {
          const response = await getPetById(petId);
          if (response?.data) {
            const petData = response.data;
            console.log("petData in update", petData.imageUrl);
            setEditPet(petData);
            setFormValues({
              petId: petData.id,
              name: petData.name,
              species: petData.species,
              breed: petData.breed,
              weight: petData.weight,
              gender: petData.gender,
              imageUrl: petData.imageUrl || "path/to/default-image.jpg"
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first file selected
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set imageUrl in formValues state to the base64 representation of the selected image
        setFormValues({
          ...formValues,
          imageUrl: reader.result as string,
        });
        // Set imagePreview state to display the selected image
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
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

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      gender: e.target.value === "male" ? true : false,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {editPet ? (
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-pink-600">
            Edit Pet Profile
          </h2>
          <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
            <div>
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
              <div className="mb-4">
                <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formValues.gender ? "male" : "female"}
                  onChange={handleGenderChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="weight" className="block text-gray-700 font-bold mb-2">
                  Weight
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formValues.weight}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                  Choose Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*" // Specify accepted file types (images)
                  onChange={handleFileChange} // Handle file input change
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="block mx-auto mb-4 max-w-full h-auto"
                />
              )}
              <div className="mb-4">
                <label htmlFor="imageURL" className="block text-gray-700 font-bold mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  id="imageURL"
                  name="imageURL"
                  value={formValues.imageUrl}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="col-span-2 flex justify-center">
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
