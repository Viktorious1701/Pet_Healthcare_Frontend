import './Dashboard.css';
import { Link } from 'react-router-dom';
import logo from "../assets/react.svg"
import Report, {ReportItem} from '../components/Report';
const Dashboard = () => {
  const sampleData: ReportItem[] = [
    {
      category: 'Hospitalization',
      time: '5:12 pm',
      note: 'Belanja di pasar',
      amount: '-326.800'
    },
    {
      category: 'Booking',
      time: '6:45 pm',
      note: 'Naik bus umum',
      amount: '-15.000'
    },
    {
      category: 'Others',
      time: '9:30 am',
      note: 'Bayar Listrik',
      amount: '-185.750'
    }
  ];
  
  return (
    <div className='container'>
      <aside className='sidebar'>
        <div className="profile">
          <img src={logo} alt="profile picture" />
          <h2>Admin Account</h2>
          <p>email address</p>
        </div>
        <nav className='nav-menu'>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/revenue">Revenue</Link></li>
            <li><Link to="/accounts">Accounts</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
        </nav>
      </aside>
      <div className="content">
        <div className="dashboard-boards">
          <div className="accounts-board">
            <h2>Total User Accounts</h2>
            <div className="accounts-count">
              {/* Display the total number of user accounts here */}
              <span>1,234</span>
            </div>
          </div>
          <div className="revenue-board">
            <h2>Total Revenue</h2>
            <div className="revenue-amount">
              {/* Display the total revenue amount here */}
              <span>$123,456.78</span>
            </div>
          </div>
        </div>
        <div className='main-content'>
          <div className="expense-menu">
            <header>
              <div className='header-content'>
                <h1>Revenue</h1>
              </div>
              <p>20 - 5 - 2024</p>
            </header>
            <section className="expense-details">
              <div className="expense-chart">
                <div className="bar-chart">
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
      </div>
    </div>
  );
}

export default Dashboard;
