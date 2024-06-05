// /* eslint-disable react-refresh/only-export-components */

// React Router
import { createBrowserRouter } from 'react-router-dom';

// App and Protected Routes
import App from "@/App";
import ProtectedRoutes from "./ProtectedRoutes";

// Admin Dashboard Pages
import Dashboard from "@/pages/AdminDashboard/Dashboard";
import Accounts from "@/pages/AdminDashboard/Accounts";
import AppointmentDashboard from "@/pages/AdminDashboard/AppointmentDashboard";
import Hospitalization from "@/pages/AdminDashboard/Hospitalization";

// Booking Pages
import BookingPage from "@/pages/Booking/BookingPage";
import BookingSuccess from '@/pages/Booking/BookingSuccess';

// General Pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import About from '@/pages/About';
import Contact from '@/pages/Contact';

// Error Pages
import NotFound from '@/pages/Errors/NotFound';
import GeneralError from '@/pages/Errors/general-error';
import MaintenanceError from '@/pages/Errors/maintenance-error';

// Password Management Pages
import ForgotPassword from '@/pages/ForgotPass';
import ResetPass from '@/pages/ResetPass';

// Employee Dashboard
import EmployeeDashboard from '@/pages/EmployeeDashboard/EmployeeDashboard';

// Router Constants
import { ABOUT_PAGE, ADMIN_ACCOUNT_PAGE, ADMIN_APPOINTMENT, ADMIN_DASHBOARD, ADMIN_HOSPITALIZATION, APPOINTMENT, APPOINTMENT_SUCCESS, CONTACT, CUSTOMER_PET_PROFILE, CUSTOMER_PET_UPDATE, EMPLOYEE_DASHBOARD, FORGOT_PASS, HOME_PAGE, HOSPITALIZATION, KENNEL, LOGIN, REGISTER, RESET_PASS } from './router-const';
import HospitalizationPage from '@/pages/Hospitalization/HospitalizationPage';
import PetHealthTrack from '@/pages/Hospitalization/PetHealthTrack';
import KennelPage from '@/pages/Hospitalization/Kennel';
import PetList from '@/pages/PetProfile/PetList';
import PetProfile from '@/pages/PetProfile/PetProfile';
import PetUpdateForm from '@/pages/PetProfile/PetUpdateForm';
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

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFound },
  { path: '/503', Component: MaintenanceError },

  // Fallback 404 route
  { path: '*', Component: NotFound },
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
        path: `${CUSTOMER_PET_PROFILE}`,
        element: <PetList />,
      },
      {
        path: `${CUSTOMER_PET_PROFILE}/:petId`,
        element: <PetProfile />,
      },
      {
        path: `${CUSTOMER_PET_UPDATE}/:petId`,
        element: <PetUpdateForm />,
      },
      {
        path: "*",
        element: <NotFound/>,
      }
    ],
  },
]);