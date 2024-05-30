import { Link } from "react-router-dom";
import Header from "./Header";
import { Button } from "./ui/button";
import Paw from "@/assets/Paw2.svg";
import { useAuth } from "@/Context/useAuth";
const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  return (
    <>
      <div className="flex bg-[#F3F4F6] pb-8 justify-between ">
        <div className="flex">
          <img
            src={Paw}
            className="ml-[3rem] mt-[2rem] w-[50px] h-[50px]"
            alt=""
          />
          <Header />
        </div>
        {isLoggedIn() ? (
          <div>
            <div className="mr-[3rem]">Welcome, {user?.userName}</div>
            <a onClick={logout}>Logout</a>
          </div>
        ) : (
          <div className="mr-[3rem]">
            <Button className="bg-[#DB2777] mt-[2.25rem] justify-self-end mr-1">
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-[#DB2777] mt-[2.25rem] justify-self-end">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
