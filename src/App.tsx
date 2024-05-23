import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css'; // Import Tailwind CSS
import About from './About';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} /> {/* Define the route for the home page */}
        <Route path="/about" element={<About/>} /> {/* Define the route for the next form */}  \
        <Route path="/services" element={<h1>Services</h1>} /> {/* Define the route for the services page */}
        <Route path="/booking" element={<h1>Booking</h1>} /> {/* Define the route for the booking page */}
        <Route path="/login" element={<h1>Login</h1>} /> {/* Define the route for the login page */}
        <Route path="/*" element={<h1>404 Not Found</h1>} /> {/* Define the route for the 404 page */}
      </Routes>
    </Router>
  );
};

export default App;