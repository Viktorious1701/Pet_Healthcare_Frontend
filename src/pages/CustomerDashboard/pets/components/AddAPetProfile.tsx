import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/custom/button";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { Search } from "@/components/customer_components/search";
import ThemeSwitch from "@/components/customer_components/theme-switch";
import { TopNav } from "@/components/customer_components/top-nav";
import { UserNav } from "@/components/customer_components/user-nav";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_DASHBOARD, CUSTOMER_PET_LIST } from "@/Route/router-const";
import { AddAPetAPI } from "@/Services/PetService"; // Adjust the import path according to your project structure
import { useAuth } from "@/Context/useAuth"; // Adjust the import path according to your project structure
import { PetGet } from "@/Models/Pet";

interface PetInfo {
  customerUsername: string;
  name: string;
  species: string;
  breed: string;
  gender: boolean;
  weight: number;
  imageURL: string;
}

const AddAPetProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const username = user?.userName as string;

  const { register, handleSubmit, formState: { errors } } = useForm<PetInfo>();

  const onSubmit: SubmitHandler<PetInfo> = async (data) => {
    if (username) {
      try {
        const newPet = { ...data, customerUsername: username };
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
    <Layout className="h-screen">
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <TopNav links={topNav} />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      {/* ===== Main ===== */}
      <LayoutBody className="space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Add a Pet Profile
          </h1>
          <Button
            onClick={handleBack}
            className="bg-custom-pink hover:bg-custom-darkPink text-white font-bold py-2 px-4 rounded"
          >
            Back to Pets
          </Button>
        </div>
        
        <div className="max-w-md mx-auto mt-10 p-6 bg-pink-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-custom-darkPink">Create a Pet</h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-custom-darkPink">Name</label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>
            <div>
              <label htmlFor="species" className="block text-sm font-medium text-custom-darkPink">Species</label>
              <input
                type="text"
                id="species"
                {...register("species", { required: "Species is required" })}
                className="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
              />
              {errors.species && <span className="text-red-500">{errors.species.message}</span>}
            </div>
            <div>
              <label htmlFor="breed" className="block text-sm font-medium text-custom-darkPink">Breed</label>
              <input
                type="text"
                id="breed"
                {...register("breed", { required: "Breed is required" })}
                className="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
              />
              {errors.breed && <span className="text-red-500">{errors.breed.message}</span>}
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-custom-darkPink">Gender</label>
              <select
                id="gender"
                {...register("gender", { required: "Gender is required" })}
                className="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
              >
                <option value="true">Male</option>
                <option value="false">Female</option>
              </select>
              {errors.gender && <span className="text-red-500">{errors.gender.message}</span>}
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-custom-darkPink">Weight</label>
              <input
                type="number"
                id="weight"
                {...register("weight", { required: "Weight is required" })}
                className="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
              />
              {errors.weight && <span className="text-red-500">{errors.weight.message}</span>}
            </div>
            <div>
              <label htmlFor="imageURL" className="block text-sm font-medium text-custom-darkPink">Image URL</label>
              <input
                type="text"
                id="imageURL"
                {...register("imageURL", { required: "Image URL is required" })}
                className="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
              />
              {errors.imageURL && <span className="text-red-500">{errors.imageURL.message}</span>}
            </div>
            <div>
              <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-custom-pink hover:bg-custom-darkPink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                Create Pet
              </button>
            </div>
          </form>
        </div>
      </LayoutBody>
    </Layout>
  );
};

const topNav = [
  {
    title: "Overview",
    href: "",
    isActive: true,
  },
  {
    title: "Customers",
    href: "",
    isActive: false,
  },
  {
    title: "Products",
    href: "",
    isActive: false,
  },
  {
    title: "Settings",
    href: "",
    isActive: false,
  },
];

export default AddAPetProfile;
