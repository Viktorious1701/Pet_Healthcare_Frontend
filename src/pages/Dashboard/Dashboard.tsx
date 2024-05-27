import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/react.svg';
import DashboardHome from './DashboardHome';
const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/dashboard/appointments', label: 'Appointments' },
    { path: '/dashboard/accounts', label: 'Accounts' },
    { path: '/dashboard/hospitalization', label: 'Hospitalization' },
    { path: '/', label: 'Home Page' },
  ];

  return (
    <div className="flex min-h-screen bg-custom-gray">
      <aside className="hidden md:flex w-1/4 bg-pink-100 flex-col items-center py-6 px-4">
        <div className="text-center mb-6">
          <img src={logo} alt="profile picture" className="w-24 h-24 rounded-full mx-auto" />
          <h2 className="text-xl font-bold text-pink-700 mt-3">Admin Account</h2>
          <p className="text-pink-600">email@example.com</p>
        </div>
        <nav className="w-full">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-3 py-2 rounded-lg text-lg font-semibold transition-colors ${location.pathname === item.path
                      ? 'bg-pink-300 text-pink-900'
                      : 'text-pink-700 hover:bg-pink-200'
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="w-full md:w-3/4 p-6 overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-center mb-5 gap-5">
          <div className="bg-custom-pink text-white p-5 rounded-lg md:w-1/2 hover:bg-custom-darkPink" onClick={() => navigate('/dashboard/accounts')}>
            <h2 className="text-xl font-bold mb-2">Total User Accounts</h2>
            <div className="text-2xl font-bold">1,234</div>
          </div>
          <div className="bg-custom-pink text-white p-5 rounded-lg md:w-1/2 hover:bg-custom-darkPink mt-5 md:mt-0" onClick={() => navigate('/dashboard/appointments')}>
            <h2 className="text-xl font-bold mb-2">Total Revenue</h2>
            <div className="text-2xl font-bold">$123,456.78</div>
          </div>
        </div>
        {location.pathname === '/dashboard' && <DashboardHome />}

        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;

