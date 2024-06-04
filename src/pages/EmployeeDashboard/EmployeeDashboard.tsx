import React, { useState } from 'react';
import EmployeeSidebar from "@/components/sidebar/EmployeeSidebar";

const EmployeeDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(e.target.value);
    // You can add your search logic here to filter the data based on the searchTerm
  };

  return (
    <div className="flex h-screen">
      <EmployeeSidebar />
      <div className="flex-1 p-4">
        <div className="container mx-auto p-4">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold">Employee Dashboard</h1>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="px-4 py-2 border rounded-md mr-4"
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                New Appointment
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-lg font-bold">Upcoming Appointments</h2>
              <ul>
                <li>Appointment 1</li>
                <li>Appointment 2</li>
                <li>Appointment 3</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-lg font-bold">Hospitalized Pets</h2>
              <ul>
                <li>Pet 1</li>
                <li>Pet 2</li>
                <li>Pet 3</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-lg font-bold">Kennels Management</h2>
              <ul>
                <li>Kennel 1</li>
                <li>Kennel 2</li>
                <li>Kennel 3</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;