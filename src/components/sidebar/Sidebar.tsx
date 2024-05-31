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
        path="/dashboard"
        onClick={handleNavigation}
        active={activePath === "/dashboard"}
        
      />
      
      <SidebarItem
        icon={<UserCircle size={20} />}
        text="Accounts"
        path="/dashboard/accounts"
        onClick={handleNavigation}
        active={activePath === "/dashboard/accounts"}
      />
      
      <SidebarItem
        icon={<Receipt size={20} />}
        text="Appointments"
        path="/dashboard/appointment_dashboard"
        onClick={handleNavigation}
        active={activePath === "/dashboard/appointment_dashboard"}
      />
      <SidebarItem
        icon={<Settings size={20} />}
        text="Hospitalization"
        path="/dashboard/hospitalization"
        onClick={handleNavigation}
        active={activePath === "/dashboard/hospitalization"}
      />
      <SidebarItem
        icon={<LifeBuoy size={20} />}
        text="Support"
        path="/support"
        onClick={handleNavigation}
        active={activePath === "/support"}
      />
    </SidebarComponent>
  );
};

export default Sidebar;
