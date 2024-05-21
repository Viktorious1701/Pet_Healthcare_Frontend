import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingForm from './components/BookingForm';
import './index.css'; // Import Tailwind CSS
import Calendar from './components/CalendarComponent';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>} /> {/* Define the route for the next form */}
        <Route path='/calendar' element={<Calendar/>}></Route>
        <Route path="/book" element={<BookingForm />} />
        
      </Routes>
    </Router>
  );
};

export default App; 