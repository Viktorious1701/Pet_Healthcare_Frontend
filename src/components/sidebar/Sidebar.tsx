import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarComponent from "./SidebarComponent";
import {
  LayoutDashboard,
  BarChart3,
  UserCircle,
  Boxes,
  Package,
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
        alert
      />
      <SidebarItem
        icon={<BarChart3 size={20} />}
        text="Reports"
        path="/dashboard/reports"
        onClick={handleNavigation}
        active={activePath === "/dashboard/reports"}
      />
      <SidebarItem
        icon={<UserCircle size={20} />}
        text="Accounts"
        path="/dashboard/accounts"
        onClick={handleNavigation}
        active={activePath === "/dashboard/accounts"}
      />
      <SidebarItem
        icon={<Boxes size={20} />}
        text="Services"
        path="/services"
        onClick={handleNavigation}
        active={activePath === "/services"}
      />
      <SidebarItem
        icon={<Package size={20} />}
        text="Inventory"
        path="/inventory"
        onClick={handleNavigation}
        active={activePath === "/inventory"}
      />
      <SidebarItem
        icon={<Receipt size={20} />}
        text="Appointments"
        path="/dashboard/appointments"
        onClick={handleNavigation}
        active={activePath === "/dashboard/appointments"}
      />
      <SidebarItem
        icon={<Settings size={20} />}
        text="Settings"
        path="/settings"
        onClick={handleNavigation}
        active={activePath === "/settings"}
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
