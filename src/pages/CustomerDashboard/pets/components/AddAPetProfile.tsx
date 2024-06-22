import { Button } from "@/components/custom/button";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { Search } from "@/components/customer_components/search";
import ThemeSwitch from "@/components/customer_components/theme-switch";
import { TopNav } from "@/components/customer_components/top-nav";
import { UserNav } from "@/components/customer_components/user-nav";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_DASHBOARD, CUSTOMER_PET_LIST } from "@/Route/router-const";

const AddAPetProfile = () => {
  const navigate = useNavigate();

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
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-custom-darkPink">Name</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label htmlFor="species" className="block text-sm font-medium text-custom-darkPink">Species</label>
              <input type="text" id="species" name="species" className="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label htmlFor="breed" className="block text-sm font-medium text-custom-darkPink">Breed</label>
              <input type="text" id="breed" name="breed" className="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-custom-darkPink">Gender</label>
              <select id="gender" name="gender" className="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50">
                <option value="true">Male</option>
                <option value="false">Female</option>
              </select>
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-custom-darkPink">Weight</label>
              <input type="number" id="weight" name="weight" className="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-custom-darkPink">Image URL</label>
              <input type="text" id="imageUrl" name="imageUrl" className="mt-1 block w-full rounded-md border-pink-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200 focus:ring-opacity-50" />
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