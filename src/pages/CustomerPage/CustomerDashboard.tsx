import { Outlet } from 'react-router-dom';
import CustomerSidebar from './CustomerSidebar';
import { useAuth } from '@/Context/useAuth';

const CustomerDashboard = () => {
  const { user } = useAuth();
  console.log('user is ', user);
  return (
    <div className='flex min-h-screen'>
      <CustomerSidebar />
      <div className='flex-1 pl-6'>
        <div className=''>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
