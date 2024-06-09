import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Button } from "@/components/ui/button";
import Paw from "@/assets/Paw2.svg";
import { useAuth } from "@/Context/useAuth";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from "@nextui-org/react";
import {CUSTOMER_DASHBOARD, LOGIN, REGISTER, SETTINGS as SETTINGS, VET_DASHBOARD } from "@/Route/router-const";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(`/${LOGIN}`);
  };

  const handleRegisterClick = () => {
    navigate(`/${REGISTER}`);
  };

  const navigateToUserProfile = () => {
    navigate(`/${VET_DASHBOARD}/${SETTINGS}`);
  };

  const navigateToDashboard = () => {
    navigate(`/${VET_DASHBOARD}`);
  };

  return (
    <div className="fixed z-50 top-0 left-0 min-w-full flex bg-[#F3F4F6] pb-8  justify-between ">
      <div className="flex">
        <img
          src={Paw}
          className="ml-[3rem] mt-[2rem] w-[50px] h-[50px]"
          alt=""
        />
        <Header />
      </div>
      {isLoggedIn() ? (
        <div className="mr-[3rem]">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform mt-[2.25rem] justify-self-end"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src=""
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2" textValue="profile">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="userProfile" onClick={navigateToUserProfile}>
                User Profile
              </DropdownItem>
              <DropdownItem key="dashboard" onClick={navigateToDashboard}>
                My Dashboard
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={logout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      ) : (
        <div className="mr-[3rem]">
          <Button
            className="bg-[#DB2777] mt-[2.25rem] justify-self-end mr-3"
            onClick={handleLoginClick}
          >
            Login
          </Button>

          <Button
            className="bg-[#DB2777] mt-[2.25rem] justify-self-end"
            onClick={handleRegisterClick}
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
