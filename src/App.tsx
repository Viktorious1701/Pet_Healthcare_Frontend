// App.tsx
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Outlet
} from "react-router";
import { UserProvider } from "@/Context/UserContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from "@/components/ui/sonner";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route path="/" element={<Home />} />
//       <Route path="/dashboard/*" element={<Dashboard />}>
//         <Route path="appointments" element={<Appointment />} />
//         <Route path="accounts" element={<Accounts />} />
//         <Route path="hospitalization" element={<Hospitalization />} />
//         {/* Nested Accounts route */}
//         {/* Add more nested routes here if needed */}
//       </Route>
//       <Route path="/about" element={<About />} />
//       <Route path="/services" element={<Sidebar/>} />
//       <Route path="/calendar" element={<CalendarComponent />} />
//       <Route path="/book" element={<BookingForm />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/*" element={<h1>404 Not Found</h1>} />
//     </Route>
//   )
// );
function App() {
  return (
    
      <UserProvider>
        <Outlet></Outlet>
        <ToastContainer></ToastContainer>
        <Toaster />
      </UserProvider>

  );
}

export default App;
