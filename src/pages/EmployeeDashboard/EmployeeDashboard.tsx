//import React, { useState } from 'react';
import EmployeeSidebar from './EmployeeSidebar';
import { Outlet } from 'react-router-dom';

const EmployeeDashboard = () => {
  // const [searchTerm, setSearchTerm] = useState('');

  // const handleSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
  //   setSearchTerm(e.target.value);
  //   // You can add your search logic here to filter the data based on the searchTerm
  // };

  return (
    <div className="min-h-screen">
      <EmployeeSidebar />
      <div className="ml-[220px] p-4"> {/* Match this to the sidebar width */}
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;