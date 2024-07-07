import React from 'react';
import SidebarComponent, { SidebarItem } from '../../components/sidebar/SidebarComponent';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, Calendar, Hospital, Dog } from 'lucide-react';
import {
  EMPLOYEE_DASHBOARD,
  EMPLOYEE_APPOINTMENT_BOOKING,
  EMPLOYEE_KENNELS,
  EMPLOYEE_HOSPITALIZED_PETS
} from '@/Route/router-const';
import styled from 'styled-components';

const StyledSidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px; /* Adjust the width as needed */
  background-color: #f8f9fa; /* Example background color */
  z-index: 1000; /* Ensure it is above other elements */
`;

const EmployeeSidebar = () => {
  const [activePath, setActivePath] = React.useState('/employee/appointments');
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setActivePath(path);
    navigate(path);
  };

  return (
    <StyledSidebar>
      <SidebarComponent>
        <SidebarItem
          icon={<HomeIcon size={20} />}
          text='Dashboard'
          path={`/${EMPLOYEE_DASHBOARD}`}
          onClick={handleNavigation}
          active={activePath === `/employee/${EMPLOYEE_DASHBOARD}`}
        />
        <SidebarItem
          icon={<Calendar size={20} />}
          text='Appointments'
          path={`/employee/${EMPLOYEE_APPOINTMENT_BOOKING}`}
          onClick={handleNavigation}
          active={activePath === `/employee/${EMPLOYEE_APPOINTMENT_BOOKING}`}
        />
        <SidebarItem
          icon={<Dog size={20} />} // Changed to a dog icon
          text='Kennels Management'
          path={`/employee/${EMPLOYEE_KENNELS}`}
          onClick={handleNavigation}
          active={activePath === `/employee/${EMPLOYEE_KENNELS}`}
        />
        <SidebarItem
          icon={<Hospital size={20} />}
          text='Hospitalized pets'
          path={`/employee/${EMPLOYEE_HOSPITALIZED_PETS}`}
          onClick={handleNavigation}
          active={activePath === `/employee/${EMPLOYEE_HOSPITALIZED_PETS}`}
        />
      </SidebarComponent>
    </StyledSidebar>
  );
};

export default EmployeeSidebar;
