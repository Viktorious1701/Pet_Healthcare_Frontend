import {  Outlet, useLocation } from 'react-router-dom';

import DashboardHome from './DashboardHome';

import Sidebar from '@/components/sidebar/Sidebar'; // Import the new Sidebar component
import { ADMIN_DASHBOARD } from '@/Route/router-const';

const Dashboard = () => {
  const location = useLocation();

  return (
    <>
    
    <div className="flex h-screen bg-white">
      {/* Render the new Sidebar component */}
      <Sidebar />

      <div className=" flex-1 p-6 overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-center mb-5 gap-5">
          <div
            className="bg-custom-pink text-white p-5 rounded-lg md:w-1/2 hover:bg-custom-darkPink"
          >
            <h2 className="text-xl font-bold mb-2">Total User Accounts</h2>
            <div className="text-2xl font-bold">1,234</div>
          </div>
          <div
            className="bg-custom-pink text-white p-5 rounded-lg md:w-1/2 hover:bg-custom-darkPink mt-5 md:mt-0"
          >
            <h2 className="text-xl font-bold mb-2">Total Revenue</h2>
            <div className="text-2xl font-bold">$123,456.78</div>
          </div>
        </div>
        
        {location.pathname === `/${ADMIN_DASHBOARD}` && <DashboardHome />}
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default Dashboard;