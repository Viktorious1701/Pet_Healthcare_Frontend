import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/custom/button";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { Search } from "@/components/customer_components/search";
import ThemeSwitch from "@/components/vet_components/theme-switch";
import { UserNav } from "@/components/customer_components/user-nav";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_DASHBOARD, CUSTOMER_PET_LIST } from "@/Route/router-const";
import { AddAPetAPI } from "@/Services/PetService"; // Adjust the import path according to your project structure
import { useAuth } from "@/Context/useAuth"; // Adjust the import path according to your project structure
import { PetGet } from "@/Models/Pet";
import { useTheme } from "@/components/vet_components/theme-provider"; // Import useTheme hook from your theme provider

interface PetInfo {
  customerUsername: string;
  name: string;
  species: string;
  breed: string;
  gender: boolean;
  weight: number;
  imageURL: string;
  imageFile: File | null;
}

const AddAPetProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const username = user?.userName as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<PetInfo>();
  const { theme } = useTheme(); // Get current theme from theme provider

  const onSubmit: SubmitHandler<PetInfo> = async (data) => {
    if (username) {
      try {
        const newPet = { ...data, customerUsername: username };
        console.log(newPet);
        
        await AddAPetAPI(newPet);

        // Fetch current pets from session storage
        const storedList = sessionStorage.getItem("petProfiles");
        const parsedList: PetGet[] = storedList ? JSON.parse(storedList) : [];

        // Update session storage with the new pet
        const updatedList = [...parsedList, newPet];
        sessionStorage.setItem("petProfiles", JSON.stringify(updatedList));

        navigate(`/${CUSTOMER_DASHBOARD}/${CUSTOMER_PET_LIST}`);
      } catch (error) {
        console.error("Failed to add pet profile", error);
      }
    } else {
      console.error("User is not authenticated");
    }
  };

  const handleBack = () => {
    navigate(`/${CUSTOMER_DASHBOARD}/${CUSTOMER_PET_LIST}`);
  };

  return (
    <Layout
      className={`h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      {/* ===== Main ===== */}
      <LayoutBody className="space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h1
            className={`text-2xl font-bold tracking-tight md:text-3xl ${
              theme === "dark" ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Add a Pet Profile
          </h1>
          <Button
            onClick={handleBack}
            className={`bg-custom-pink hover:bg-custom-darkPink text-white font-bold py-2 px-4 rounded ${
              theme === "dark" ? "hover:bg-pink-700" : "hover:bg-pink-600"
            }`}
          >
            Back to Pets
          </Button>
        </div>

        <div
          className={`max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-200"
          }`}
        >
          <h2
            className={`text-2xl font-bold mb-4 ${
              theme === "dark"
                ? "text-custom-lightPink"
                : "text-custom-darkPink"
            }`}
          >
            Create a Pet
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-custom-darkPink"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className={`mt-1 block w-full rounded-md border ${
                  theme === "dark" ? "border-gray-700" : "border-pink-300"
                } shadow-sm focus:border-${
                  theme === "dark" ? "pink-500" : "pink-500"
                } focus:ring focus:ring-${
                  theme === "dark" ? "pink-200" : "pink-200"
                } focus:ring-opacity-50`}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="species"
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-custom-darkPink"
                }`}
              >
                Species
              </label>
              <input
                type="text"
                id="species"
                {...register("species", { required: "Species is required" })}
                className={`mt-1 block w-full rounded-md border ${
                  theme === "dark" ? "border-gray-700" : "border-pink-300"
                } shadow-sm focus:border-${
                  theme === "dark" ? "pink-500" : "pink-500"
                } focus:ring focus:ring-${
                  theme === "dark" ? "pink-200" : "pink-200"
                } focus:ring-opacity-50`}
              />
              {errors.species && (
                <span className="text-red-500">{errors.species.message}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="breed"
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-custom-darkPink"
                }`}
              >
                Breed
              </label>
              <input
                type="text"
                id="breed"
                {...register("breed", { required: "Breed is required" })}
                className={`mt-1 block w-full rounded-md border ${
                  theme === "dark" ? "border-gray-700" : "border-pink-300"
                } shadow-sm focus:border-${
                  theme === "dark" ? "pink-500" : "pink-500"
                } focus:ring focus:ring-${
                  theme === "dark" ? "pink-200" : "pink-200"
                } focus:ring-opacity-50`}
              />
              {errors.breed && (
                <span className="text-red-500">{errors.breed.message}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="gender"
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-custom-darkPink"
                }`}
              >
                Gender
              </label>
              <select
                id="gender"
                {...register("gender", { required: "Gender is required" })}
                className={`mt-1 block w-full rounded-md border ${
                  theme === "dark" ? "border-gray-700" : "border-pink-300"
                } shadow-sm focus:border-${
                  theme === "dark" ? "pink-500" : "pink-500"
                } focus:ring focus:ring-${
                  theme === "dark" ? "pink-200" : "pink-200"
                } focus:ring-opacity-50`}
              >
                <option value="true">Male</option>
                <option value="false">Female</option>
              </select>
              {errors.gender && (
                <span className="text-red-500">{errors.gender.message}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="weight"
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-custom-darkPink"
                }`}
              >
                Weight
              </label>
              <input
                type="number"
                id="weight"
                {...register("weight", { required: "Weight is required" })}
                className={`mt-1 block w-full rounded-md border ${
                  theme === "dark" ? "border-gray-700" : "border-pink-300"
                } shadow-sm focus:border-${
                  theme === "dark" ? "pink-500" : "pink-500"
                } focus:ring focus:ring-${
                  theme === "dark" ? "pink-200" : "pink-200"
                } focus:ring-opacity-50`}
              />
              {errors.weight && (
                <span className="text-red-500">{errors.weight.message}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="imageFile"
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-custom-darkPink"
                }`}
              >
                Pet Image Profile
              </label>
              <input
                type="file"
                id="imageFile"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setValue("imageFile", file);
                }}
                className={`mt-1 block w-full rounded-md border ${
                  theme === "dark" ? "border-gray-700" : "border-pink-300"
                } shadow-sm focus:border-${
                  theme === "dark" ? "pink-500" : "pink-500"
                } focus:ring focus:ring-${
                  theme === "dark" ? "pink-200" : "pink-200"
                } focus:ring-opacity-50`}
              />
            </div>
            <Button
              type="submit"
              className={`bg-custom-pink hover:bg-custom-darkPink text-white font-bold py-2 px-4 rounded ${
                theme === "dark" ? "hover:bg-pink-700" : "hover:bg-pink-600"
              }`}
            >
              Add a Pet
            </Button>
          </form>
        </div>
      </LayoutBody>
    </Layout>
  );
};

export default AddAPetProfile;
