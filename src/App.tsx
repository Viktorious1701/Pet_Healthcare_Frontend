// App.tsx
import "./index.css";
import "@/../app/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, useLocation } from "react-router";
import { UserProvider } from "@/Context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "@/components/ui/sonner";
import PreLoader from "./components/preloader/PreLoader";
import { useEffect, useState } from "react";

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
  const location = useLocation();
  const [showPreLoader, setShowPreLoader] = useState(location.pathname === '/');

  useEffect(() => {
    // This function will run once on component mount and every time the page is reloaded
    const handleLoad = () => {
      // Only show the PreLoader on the home page after a reload
      setShowPreLoader(location.pathname === '/');
    };

    // Attach the load event listener
    window.addEventListener('load', handleLoad);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('load', handleLoad);
  }, [location.pathname]); // Dependency on pathname ensures the effect runs when the route changes

  return (
    <>
      {showPreLoader && <PreLoader />}
      <UserProvider>
        <Outlet></Outlet>
        <ToastContainer></ToastContainer>
        <Toaster />
      </UserProvider>
    </>
  );
}

export default App;
