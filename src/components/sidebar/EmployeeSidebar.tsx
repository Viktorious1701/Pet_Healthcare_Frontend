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
  EMPLOYEE_KENNELS,
  EMPLOYEE_HOSPITALIZED_PETS,
  EMPLOYEE_SCHEDULING_VETS,
  EMPLOYEE_SETTINGS,

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
        text="Kennels Management"
        path={`/employee/${EMPLOYEE_KENNELS}`}
        onClick={handleNavigation}
        active={activePath === `/employee/${EMPLOYEE_KENNELS}`}
      />
      <SidebarItem
        icon={<Syringe size={20} />}
        text="Hospitalized pets"
        path={`/employee/${EMPLOYEE_HOSPITALIZED_PETS}`}
        onClick={handleNavigation}
        active={activePath === `/employee/${EMPLOYEE_HOSPITALIZED_PETS}`}
      />
      <SidebarItem
        icon={<Hospital size={20} />}
        text="Scheduling Vets"
        path={`/employee/${EMPLOYEE_SCHEDULING_VETS}`}
        onClick={handleNavigation}
        active={activePath === `/employee/${EMPLOYEE_SCHEDULING_VETS}`}
      />
      <SidebarItem
        icon={<Settings size={20} />}
        text="Settings"
        path={`/employee/${EMPLOYEE_SETTINGS}`}
        onClick={handleNavigation}
        active={activePath === `/employee/${EMPLOYEE_SETTINGS}`}
      />
    </SidebarComponent>
  );
};

export default EmployeeSidebar;