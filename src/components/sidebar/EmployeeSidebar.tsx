import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarComponent from "./SidebarComponent";
import {
  HomeIcon,
  Calendar,
  //User,
  // Syringe, // We'll replace this
  Hospital,
  Settings,
  // Add these icons from lucide-react
  Dog, 
  //ChartBar,
  Users,
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
  const [activePath, setActivePath] = useState("/employee/appointments");
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
        icon={<Dog size={20} />} // Changed to a dog icon
        text="Kennels Management"
        path={`/employee/${EMPLOYEE_KENNELS}`}
        onClick={handleNavigation}
        active={activePath === `/employee/${EMPLOYEE_KENNELS}`}
      />
      <SidebarItem
        icon={<Hospital size={20} />}
        text="Hospitalized pets"
        path={`/employee/${EMPLOYEE_HOSPITALIZED_PETS}`}
        onClick={handleNavigation}
        active={activePath === `/employee/${EMPLOYEE_HOSPITALIZED_PETS}`}
      />
      <SidebarItem
        icon={<Users size={20} />} // Changed to a group of users icon
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