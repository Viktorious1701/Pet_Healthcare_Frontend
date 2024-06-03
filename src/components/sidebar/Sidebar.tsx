import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarComponent from "./SidebarComponent";
import {
  LayoutDashboard,
  UserCircle,
  Receipt,
  Settings,
  LifeBuoy,
} from "lucide-react";
import { SidebarItem } from "./SidebarComponent";
import { ADMIN_ACCOUNT_PAGE, ADMIN_APPOINTMENT, ADMIN_DASHBOARD, ADMIN_HOSPITALIZATION, HOME_PAGE } from "@/Route/router-const";

const Sidebar = () => {
  const [activePath, setActivePath] = useState("/dashboard");
   const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setActivePath(path);
     navigate(path);
  };

  return (
    <SidebarComponent>
      <SidebarItem
        icon={<LayoutDashboard size={20} />}
        text="Dashboard"
        path={`/${ADMIN_DASHBOARD}`}
        onClick={handleNavigation}
        active={activePath === `/${ADMIN_DASHBOARD}`}
        
      />
      
      
      <SidebarItem
        icon={<UserCircle size={20} />}
        text="Accounts"
        path={`/${ADMIN_DASHBOARD}/${ADMIN_ACCOUNT_PAGE}`}
        onClick={handleNavigation}
        active={activePath === `/${ADMIN_DASHBOARD}/${ADMIN_ACCOUNT_PAGE}`}
      />
      
      
      <SidebarItem
        icon={<Receipt size={20} />}
        text="Appointments"
        path={`/${ADMIN_DASHBOARD}/${ADMIN_APPOINTMENT}`}
        onClick={handleNavigation}
        active={activePath === `/${ADMIN_DASHBOARD}/${ADMIN_APPOINTMENT}`}
      />
      <SidebarItem
        icon={<Settings size={20} />}
        text="Hospitalization"
        path={`/${ADMIN_DASHBOARD}/${ADMIN_HOSPITALIZATION}`}
        onClick={handleNavigation}
        active={activePath === `/${ADMIN_DASHBOARD}/${ADMIN_HOSPITALIZATION}`}
      />
      <SidebarItem
        icon={<LifeBuoy size={20} />}
        text="Home"
        path={`/${HOME_PAGE}`}
        onClick={handleNavigation}
        active={activePath === `/${HOME_PAGE}`}
      />
    </SidebarComponent>
  );
};

export default Sidebar;
