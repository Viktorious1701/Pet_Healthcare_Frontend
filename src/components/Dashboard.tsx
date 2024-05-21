import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className='container'>
      <aside className='sidebar'>
        <div className="profile">
          <img src="" alt="profile picture" />
          <h2>Admin Account</h2>
          <p>email address</p>
        </div>
        <nav className='nav-menu'>
          <ul>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Revenue</a></li>
            <li><a href="#">Accounts</a></li>
            <li><a href="#">Settings</a></li>
          </ul>
        </nav>
      </aside>
      <div className="content">
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
                <h2>Today</h2>
                <ul>
                  <li>
                    <span className="category grocery">Grocery</span>
                    <span className="time">5:12 pm</span>
                    <span className="note">Belanja di pasar</span>
                    <span className="amount">-326.800</span>
                  </li>
                  <li>
                    <span className="category transportation">Transportation</span>
                    <span className="time">5:12 pm</span>
                    <span className="note">Naik bus umum</span>
                    <span className="amount">-15.000</span>
                  </li>
                  <li>
                    <span className="category housing">Housing</span>
                    <span className="time">5:12 pm</span>
                    <span className="note">Bayar Listrik</span>
                    <span className="amount">-185.750</span>
                  </li>
                </ul>
                <h2>Monday, 23 March 2020</h2>
                <ul>
                  <li>
                    <span className="category food-drink">Food and Drink</span>
                    <span className="time">5:12 pm</span>
                    <span className="note">Makan Steak</span>
                    <span className="amount">-156.000</span>
                  </li>
                  <li>
                    <span className="category entertainment">Entertainment</span>
                    <span className="time">5:12 pm</span>
                    <span className="note">Nonton Bioskop</span>
                    <span className="amount">-35.200</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
        <div className="sale-revenue">
          <aside className="summary">
            <h2>Where your money go?</h2>
            <ul>
              <li>Food and Drinks <span className="amount">872.400</span></li>
              <li>Shopping <span className="amount">1.378.200</span></li>
              <li>Housing <span className="amount">928.500</span></li>
              <li>Transportation <span className="amount">420.700</span></li>
              <li>Vehicle <span className="amount">520.000</span></li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
