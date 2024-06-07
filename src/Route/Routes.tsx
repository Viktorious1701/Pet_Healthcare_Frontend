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
import AccountSettings from '@/pages/AccountSettings'; // Import the AccountSettings component

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
import { ABOUT_PAGE, ADMIN_ACCOUNT_PAGE, ADMIN_APPOINTMENT, ADMIN_DASHBOARD, ADMIN_HOSPITALIZATION, APPOINTMENT, APPOINTMENT_SUCCESS, CONTACT, CUSTOMER_APPOINTMENTS, CUSTOMER_DASHBOARD, CUSTOMER_HOSPITALIZATION_TABLE,  CUSTOMER_PET_LIST, CUSTOMER_PET_UPDATE, EMPLOYEE_DASHBOARD, FORGOT_PASS, HOME_PAGE, HOSPITALIZATION, KENNEL, LOGIN, REGISTER, RESET_PASS, SETTINGS } from './router-const';
import HospitalizationPage from '@/pages/CustomerPage/Hospitalization/HospitalizationPage';
import PetHealthTrack from '@/pages/CustomerPage/Hospitalization/PetHealthTrack';
import KennelPage from '@/pages/CustomerPage/Hospitalization/Kennel';
import PetList from '@/pages/CustomerPage/PetProfile/PetList';
import PetProfile from '@/pages/CustomerPage/PetProfile/PetProfile';
import PetUpdateForm from '@/pages/CustomerPage/PetProfile/PetUpdateForm';
import CustomerDashboard from '@/pages/CustomerPage/CustomerDashboard';
import AppointmentManagement from '@/pages/CustomerPage/Appointments/AppointmentManagement';
import HospitalizationTracking from '@/pages/CustomerPage/Hospitalization/HospitalizationPage';
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
        element: <ResetPass />
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
        path: `/${CUSTOMER_DASHBOARD}`,
        element: (
          <ProtectedRoutes>
            <CustomerDashboard />
          </ProtectedRoutes>
        ),
        children: [
          {
            path: `${CUSTOMER_PET_LIST}`,
            element: <PetList />, // Component for pet list
          },
          {
            path: `${CUSTOMER_PET_LIST}/:petId`,
            element: <PetProfile />, // Component for pet profile
          },
          {
            path: `${CUSTOMER_PET_UPDATE}/:petId`,
            element: <PetUpdateForm />,
          },
          {
            path: `${CUSTOMER_APPOINTMENTS}`,
            element: <AppointmentManagement />, // Component for appointment management
          },
          {
            path: `${CUSTOMER_HOSPITALIZATION_TABLE}`,
            element: <HospitalizationTracking />, // Component for hospitalization tracking
          },
          {
            path: `${SETTINGS}`,
            element: <AccountSettings />, // Component for account settings
          },
        ],
      },
      
      {
        path: `${EMPLOYEE_DASHBOARD}`,
        element: (
          <ProtectedRoutes>
            <EmployeeDashboard />
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
        path: "*",
        element: <NotFound />,
      }
    ],
  },
]);