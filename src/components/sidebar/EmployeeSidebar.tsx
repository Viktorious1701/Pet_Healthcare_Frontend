import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarComponent from "./SidebarComponent";
import {
    HomeIcon,
  Calendar,
  User,
  Syringe,
  Hospital,
  Settings,
} from "lucide-react";
import { SidebarItem } from "./SidebarComponent";
import {
    EMPLOYEE_DASHBOARD,
  EMPLOYEE_APPOINTMENT_MANAGE,

} from "@/Route/router-const";

const EmployeeSidebar = () => {
  const [activePath, setActivePath] = useState("/Employee/appointments");
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setActivePath(path);
    navigate(path);
  };

  return (
    <SidebarComponent>
        <SidebarItem
        icon={<HomeIcon size={20} />}
        text="Dashboard"
        path={`/${EMPLOYEE_DASHBOARD}`}
        onClick={handleNavigation}
        active={activePath === `/employee/${EMPLOYEE_DASHBOARD}`}
      />
      <SidebarItem
        icon={<Calendar size={20} />}
        text="Appointments"
        path={`/employee/${EMPLOYEE_APPOINTMENT_MANAGE}`}
        onClick={handleNavigation}
        active={activePath === `/employee/${EMPLOYEE_APPOINTMENT_MANAGE}`}
      />
      <SidebarItem
        icon={<User size={20} />}
        text="Pet Profile"
        path={`/employee/${EMPLOYEE_DASHBOARD}`}
        onClick={handleNavigation}
        active={activePath === `/employee/${EMPLOYEE_DASHBOARD}`}
      />
      <SidebarItem
        icon={<Syringe size={20} />}
        text="Vaccinations"
        path={`/employee/${EMPLOYEE_DASHBOARD}`}
        onClick={handleNavigation}
        active={activePath === `/employee/${EMPLOYEE_DASHBOARD}`}
      />
      <SidebarItem
        icon={<Hospital size={20} />}
        text="Hospitalization"
        path={`/employee/${EMPLOYEE_DASHBOARD}`}
        onClick={handleNavigation}
        active={activePath === `/employee/${EMPLOYEE_DASHBOARD}`}
      />
      <SidebarItem
        icon={<Settings size={20} />}
        text="Settings"
        path={`/employee/${EMPLOYEE_DASHBOARD}`}
        onClick={handleNavigation}
        active={activePath === `/employee/${EMPLOYEE_DASHBOARD}`}
      />
    </SidebarComponent>
  );
};

export default EmployeeSidebar;