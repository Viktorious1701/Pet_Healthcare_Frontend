import {  Outlet, useLocation, useNavigate } from 'react-router-dom';

import DashboardHome from './DashboardHome';

import Sidebar from '@/components/sidebar/Sidebar'; // Import the new Sidebar component

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Dummy data for revenue
  // const appointmentsRevenue = 60000;
  // const hospitalizationRevenue = 63456.78;

  // const navItems = [
  //   { path: '/dashboard', label: 'Dashboard' },
  //   { path: '/dashboard/appointments', label: 'Appointments' },
  //   { path: '/dashboard/accounts', label: 'Accounts' },
  //   { path: '/dashboard/hospitalization', label: 'Hospitalization' },
  //   { path: '/', label: 'Home Page' },
  // ];

  return (
    <div className="flex h-screen bg-white">
      {/* Render the new Sidebar component */}
      <Sidebar />

      <div className=" flex-1 p-6 overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-center mb-5 gap-5">
          <div
            className="bg-custom-pink text-white p-5 rounded-lg md:w-1/2 hover:bg-custom-darkPink"
            onClick={() => navigate('/dashboard/accounts')}
          >
            <h2 className="text-xl font-bold mb-2">Total User Accounts</h2>
            <div className="text-2xl font-bold">1,234</div>
          </div>
          <div
            className="bg-custom-pink text-white p-5 rounded-lg md:w-1/2 hover:bg-custom-darkPink mt-5 md:mt-0"
            onClick={() => navigate('/dashboard')}
          >
            <h2 className="text-xl font-bold mb-2">Total Revenue</h2>
            <div className="text-2xl font-bold">$123,456.78</div>
          </div>
        </div>
        
        {location.pathname === '/dashboard' && <DashboardHome />}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;