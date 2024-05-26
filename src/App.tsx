// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './About';
import './index.css';

import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';  // Import the Accounts component
import BookingForm from './components/BookingForm';
import CalendarComponent from './components/CalendarComponent';
import 'react-calendar/dist/Calendar.css';

import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="accounts" element={<Accounts />} /> {/* Nested Accounts route */}
          {/* Add more nested routes here if needed */}
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<h1>Services</h1>} />
        <Route path="/calendar" element={<CalendarComponent />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
