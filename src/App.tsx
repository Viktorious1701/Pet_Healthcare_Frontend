import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingForm from './components/BookingForm';
import NextForm from './components/NextForm'; // Import your next form component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookingForm />} />
        <Route path="/next-form" element={<NextForm />} /> {/* Define the route for the next form */}
      </Routes>
    </Router>
  );
};

export default App;

