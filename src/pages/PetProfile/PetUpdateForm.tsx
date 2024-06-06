import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchPetData, { Pet } from "./fetchPetData";

const PetUpdateForm = () => {
  const { petId } = useParams();
  const [editPet, setEditPet] = useState<Pet | null>(null);
  const [formValues, setFormValues] = useState<Pet | null>(null);

  // Fetch pet data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      if (petId) {
        const petData = await fetchPetData(petId);
        setEditPet(petData);
        setFormValues(petData);
      }
    };
    fetchData();
  }, [petId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formValues) {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValues) {
      // Add save functionality here
      alert("Save functionality not implemented yet.");
    }
    setEditPet(null);
    setFormValues(null);
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
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formValues?.name || ""}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="species"
                className="block text-gray-700 font-bold mb-2"
              >
                Species
              </label>
              <input
                type="text"
                id="species"
                name="species"
                value={formValues?.species || ""}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="breed"
                className="block text-gray-700 font-bold mb-2"
              >
                Breed
              </label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={formValues?.breed || ""}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 font-bold mb-2"
              >
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formValues?.image || ""}
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
                onClick={() => {
                  setEditPet(null);
                  setFormValues(null);
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Render the pet list as before */}
        </div>
      )}
    </div>
  );
};

export default PetUpdateForm;