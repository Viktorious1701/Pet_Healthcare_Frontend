import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarComponent, { SidebarItem } from "../../components/sidebar/SidebarComponent";
import { HomeIcon, Calendar, Settings, Hospital, User, DoorOpen } from "lucide-react"; // Import the User icon
import {
  CUSTOMER_PET_LIST,
  CUSTOMER_DASHBOARD as CUSTOMER_PAGE,
  CUSTOMER_APPOINTMENTS,
  CUSTOMER_HOSPITALIZATION_TABLE as HOSPITALIZATION,
  SETTINGS,
  
} from "@/Route/router-const";

const CustomerSidebar = () => {
  const [activePath, setActivePath] = useState(`/${CUSTOMER_PAGE}/${CUSTOMER_PET_LIST}`);
  const navigate = useNavigate();
  const location = useLocation();
  // Reset activePath when the location changes
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <SidebarComponent>
       <SidebarItem
        icon={<User size={20} />} // Add the User icon
        text="Public Profile" // Text for Public Profile
        path={`/${CUSTOMER_PAGE}`} // Path for Public Profile
        onClick={() => handleNavigation(`/${CUSTOMER_PAGE}`)} // Handle navigation
        active={activePath === `/${CUSTOMER_PAGE}`} // Check if active
      />
      <SidebarItem
        icon={<HomeIcon size={20} />}
        text="Pet List"
        path={`/${CUSTOMER_PAGE}/${CUSTOMER_PET_LIST}`}
        onClick={() => handleNavigation(`/${CUSTOMER_PAGE}/${CUSTOMER_PET_LIST}`)}
        active={activePath === `/${CUSTOMER_PAGE}/${CUSTOMER_PET_LIST}`}
      />
      <SidebarItem
        icon={<Calendar size={20} />}
        text="Appointment Management"
        path={`/${CUSTOMER_PAGE}/${CUSTOMER_APPOINTMENTS}`}
        onClick={() => handleNavigation(`/${CUSTOMER_PAGE}/${CUSTOMER_APPOINTMENTS}`)}
        active={activePath === `/${CUSTOMER_PAGE}/${CUSTOMER_APPOINTMENTS}`}
      />
      <SidebarItem
        icon={<Hospital size={20} />}
        text="Hospitalization Tracking"
        path={`/${CUSTOMER_PAGE}/${HOSPITALIZATION}`}
        onClick={() => handleNavigation(`/${CUSTOMER_PAGE}/${HOSPITALIZATION}`)}
        active={activePath === `/${CUSTOMER_PAGE}/${HOSPITALIZATION}`}
      />
     
      <SidebarItem
        icon={<Settings size={20} />}
        text="Account Settings"
        path={`/${CUSTOMER_PAGE}/${SETTINGS}`}
        onClick={() => handleNavigation(`/${CUSTOMER_PAGE}/${SETTINGS}`)}
        active={activePath === `/${CUSTOMER_PAGE}/${SETTINGS}`}
      />
      <SidebarItem
        icon={<DoorOpen size={20} />}
        text="Go Back To Home Page"
        path={`/`}
        onClick={() => handleNavigation(`/`)}
        active={activePath === `/`}
      />
    </SidebarComponent>
  );
};

export default CustomerSidebar;
