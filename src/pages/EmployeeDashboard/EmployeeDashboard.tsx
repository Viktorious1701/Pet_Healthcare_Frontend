import React, { useState } from 'react';
import EmployeeSidebar from "@/components/sidebar/EmployeeSidebar";
import { Outlet } from 'react-router-dom';

const EmployeeDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(e.target.value);
    // You can add your search logic here to filter the data based on the searchTerm
  };

  return (
    <div className="flex h-screen">
      <EmployeeSidebar />
      <Outlet />
    </div>
  );
};

export default EmployeeDashboard;