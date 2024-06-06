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

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
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
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2" textValue="profile">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings" textValue="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings" textValue="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics" textValue="analytics">Analytics</DropdownItem>
              <DropdownItem key="system" textValue="system">System</DropdownItem>
              <DropdownItem key="configurations" textValue="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback" textValue="help_and_feedback">
                Help & Feedback
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
