// /* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom';
import App from "@/App";
import ProtectedRoutes from "./ProtectedRoutes";

// Import your components directly
import Dashboard from "@/pages/AdminDashboard/Dashboard";
import Accounts from "@/pages/AdminDashboard/Accounts";
import AppointmentDashboard from "@/pages/AdminDashboard/AppointmentDashboard";
import Hospitalization from "@/pages/AdminDashboard/Hospitalization";
import BookingPage from "@/pages/Booking/BookingPage";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from '@/pages/NotFound';
import About from '@/pages/About';
import BookingSuccess from '@/pages/Booking/BookingSuccess';
import Contact from '@/pages/Contact';
import ForgotPassword from '@/pages/ForgotPass';
import { ABOUT_PAGE, ADMIN_ACCOUNT_PAGE, ADMIN_APPOINTMENT, ADMIN_DASHBOARD, ADMIN_HOSPITALIZATION, APPOINTMENT, APPOINTMENT_SUCCESS, CONTACT, EMPLOYEE_DASHBOARD, FORGOT_PASS, HOME_PAGE, HOSPITALIZATION, KENNEL, LOGIN, REGISTER, RESET_PASS } from './router-const';
import EmployeeDashboard from '@/pages/EmployeeDashboard/EmployeeDashboard';
import ResetPass from '@/pages/ResetPass';
import HospitalizationPage from '@/pages/Hospitalization/HospitalizationPage';
import PetHealthTrack from '@/pages/Hospitalization/PetHealthTrack';
import KennelPage from '@/pages/Hospitalization/Kennel';
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: `${HOME_PAGE}`,
        element: <Home />,
      },
      {
        path: `${ABOUT_PAGE}`,
        element: <About />,
      },
      {
        path: `${CONTACT}`,
        element: <Contact />,
      },
      
      {
        path: `${LOGIN}`,
        element: <Login />,
      },
      {
        path: `${REGISTER}`,
        element: <Register />,
      },
      {
        path: `${FORGOT_PASS}`,
        element: <ForgotPassword />,
      },
      {
        path: `${RESET_PASS}`,
        element: <ResetPass/>
      },
      {
        path: `${ADMIN_DASHBOARD}`,
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        ),
        children: [
          {
            path: `${ADMIN_ACCOUNT_PAGE}`,
            element: <Accounts />,
          },
          {
            path: `${ADMIN_APPOINTMENT}`,
            element: <AppointmentDashboard />,
          },
          {
            path: `${ADMIN_HOSPITALIZATION}`,
            element: <Hospitalization />,
          },
        ],
      },
      {
        path: `${EMPLOYEE_DASHBOARD}`,
        element: (
          <ProtectedRoutes>
            <EmployeeDashboard/>
          </ProtectedRoutes>
        ),
        children: [
            {
              path: `${EMPLOYEE_DASHBOARD}`,
              element: <EmployeeDashboard />,
            }
        ],
      },

      {
        path: `${APPOINTMENT}`,
        element: <BookingPage />,
      },
      {
        path: `${APPOINTMENT_SUCCESS}`,
        element: <BookingSuccess />,
      },
      {
        path: `${HOSPITALIZATION}`,
        element: <HospitalizationPage />,
      },
      {
        path: `${HOSPITALIZATION}/:petName`,
        element: <PetHealthTrack />,
      },
      {
        path: `${KENNEL}/:kennelId`,
        element: <KennelPage />,
      },
      {
        path: "*",
        element: <NotFound/>,
      }
    ],
  },
]);