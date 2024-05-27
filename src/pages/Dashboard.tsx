/*
color
#dd327e : pink
#fce7f3 : light pink
#fdf2f8 : light pink
#f4f4f4 : light grey
#f0e4f1 : light pink
#eceff5 : light blue
*/

import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from "../assets/react.svg";
import Report, { ReportItem } from '../components/Report';


const Dashboard = () => {
  const sampleData: ReportItem[] = [
    {
      category: 'Hospitalization',
      time: '5:12 pm',
      note: 'Belanja di pasar',
      amount: '-326.800',
    },
    {
      category: 'Booking',
      time: '6:45 pm',
      note: 'Naik bus umum',
      amount: '-15.000',
    },
    {
      category: 'Others',
      time: '9:30 am',
      note: 'Bayar Listrik',
      amount: '-185.750',
    },
  ];

  const location = useLocation();
  const isAccountsPage = location.pathname === '/dashboard/accounts';

  return (
    <div>
      <div className="flex min-h-screen bg-gray-200">
        <aside className="w-1/5 min-h-screen bg-pink-100 p-5 flex flex-col items-center overflow-y-auto">
          <div className="text-center mb-5">
            <img src={logo} alt="profile picture" className="mx-auto rounded-full w-20 h-20" />
            <h2 className="text-pink-600 mt-2">Admin Account</h2>
            <p>email address</p>
          </div>
          <nav className="w-full">
            <ul className="space-y-5">
              <li>
                <Link to="/dashboard" className="text-pink-600 font-bold hover:bg-pink-200 rounded px-2 py-1 block">Dashboard</Link>
              </li>
              <li>
                <Link to="/dashboard/revenue" className="text-pink-600 font-bold hover:bg-pink-200 rounded px-2 py-1 block">Revenue</Link>
              </li>
              <li>
                <Link to="/dashboard/accounts" className="text-pink-600 font-bold hover:bg-pink-200 rounded px-2 py-1 block">Accounts</Link>
              </li>
              <li>
                <Link to="/dashboard/settings" className="text-pink-600 font-bold hover:bg-pink-200 rounded px-2 py-1 block">Settings</Link>
              </li>
              {/* Link to home page */}
              <li>
                <Link to ="/" className="text-pink-600 font-bold hover:bg-pink-200 rounded px-2 py-1 block">Home Page</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="w-4/5 p-5 flex flex-col overflow-y-auto">
          {!isAccountsPage && (
            <div className="flex justify-center mb-5 gap-5">
              <div className="bg-blue-100 text-pink-600 p-5 rounded-lg flex-1">
                <h2 className="text-xl font-bold mb-2">Total User Accounts</h2>
                <div className="text-2xl font-bold">1,234</div>
              </div>
              <div className="bg-blue-100 text-pink-600 p-5 rounded-lg flex-1">
                <h2 className="text-xl font-bold mb-2">Total Revenue</h2>
                <div className="text-2xl font-bold">$123,456.78</div>
              </div>
            </div>
          )}
          {!isAccountsPage && (
            <div className="bg-white p-5 rounded-lg mb-5 flex-1 overflow-y-auto">
            <div className="expense-menu">
              <header className="flex justify-between items-center mb-5">
                <div className='header-content'>
                  <h1 className="text-2xl font-bold text-pink-600">Revenue</h1>
                </div>
                <p className="text-gray-500">20 - 5 - 2024</p>
              </header>
              <section className="expense-details">
                <div className="expense-chart mb-5">
                  <div className="bar-chart bg-gray-200 p-5 rounded-lg">
                    {/* Add bar chart implementation here */}
                  </div>
                </div>
                <div className="expense-list">
                  <Report day="Today" data={sampleData} />
                  <Report day="Yesterday" data={sampleData} />
                </div>
              </section>
            </div>
          </div>
          )}
          {isAccountsPage && <Outlet />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
