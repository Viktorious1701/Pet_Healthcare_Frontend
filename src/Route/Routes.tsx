
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from "@/App";
import ProtectedRoutes from './ProtectedRoutes';
import Dashboard from "@/pages/AdminDashboard/Dashboard";
import Accounts from "@/pages/AdminDashboard/Accounts";
import AppointmentDashboard from "@/pages/AdminDashboard/AppointmentDashboard";
import Hospitalization from "@/pages/AdminDashboard/Hospitalization";
import BookingPage from "@/pages/Booking/BookingPage";
import BookingSuccess from '@/pages/Booking/BookingSuccess';
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import AccountSettings from '@/pages/AccountSettings';
import NotFound from '@/pages/Errors/NotFound';
import GeneralError from '@/pages/Errors/general-error';
import MaintenanceError from '@/pages/Errors/maintenance-error';
import ForgotPassword from '@/pages/ForgotPass';
import ResetPass from '@/pages/ResetPass';
import EmployeeDashboard from '@/pages/EmployeeDashboard/EmployeeDashboard';
import HospitalizationPage from '@/pages/CustomerPage/Hospitalization/HospitalizationPage';
import PetHealthTrackDTO from '@/pages/CustomerPage/Hospitalization/PetHealthTrack';
import KennelPage from '@/pages/CustomerPage/Hospitalization/Kennel';
import PetList from '@/pages/CustomerPage/PetProfile/PetList';
import PetProfile from '@/pages/CustomerPage/PetProfile/PetProfile';
import PetUpdateForm from '@/pages/CustomerPage/PetProfile/PetUpdateForm';
import CustomerDashboard from '@/pages/CustomerPage/CustomerDashboard';
import AppointmentManagement from '@/pages/CustomerPage/Appointments/AppointmentManagement';
import HospitalizationTracking from '@/pages/CustomerPage/Hospitalization/HospitalizationPage';
import { Resize, useWindowDimensions } from '@/components/resize';
import { Loader } from 'lucide-react';
import UserProfile from '@/pages/CustomerPage/Profile/UserProfile'; // Adjust path as necessary

import {
  ABOUT_PAGE,
  ADMIN_ACCOUNT_PAGE,
  ADMIN_APPOINTMENT,
  ADMIN_DASHBOARD,
  ADMIN_HOSPITALIZATION,
  APPOINTMENT,
  APPOINTMENT_SUCCESS,
  COMING_SOON,
  CONTACT,
  CUSTOMER_APPOINTMENTS,
  CUSTOMER_DASHBOARD,
  CUSTOMER_HOSPITALIZATION_TABLE,
  CUSTOMER_PET_LIST,
  CUSTOMER_PET_UPDATE,
  EMPLOYEE_DASHBOARD,
  FORGOT_PASS,
  HOME_PAGE,
  HOSPITALIZATION,
  KENNEL,
  LOGIN,
  REGISTER,
  RESET_PASS,
  SETTINGS,

  VET_DASHBOARD,
  COMING_SOON,
  HOSPITALIZATION_INTRO
} from './router-const';
import VetDashboard from '@/pages/VetDashboard/VetDashboard';
import ComingSoon from '@/pages/VetDashboard/coming-soon';
import HospitalizationService from '@/pages/HospitalizationService';


const RouterComponent = () => {
  const { width } = useWindowDimensions();
  if (width <= 900) {
    return <Resize />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: `${HOME_PAGE}`,
          element: <Home />,
        },
        {
          path: `${HOSPITALIZATION_INTRO}`,
          element: <HospitalizationService />
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
            <ProtectedRoutes allowedRoles={['Admin']}>
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
            <ProtectedRoutes allowedRoles={['Customer']}>
              <CustomerDashboard />
            </ProtectedRoutes>
          ),
          children: [
            {
              index: true, // Default route
              element: <UserProfile />, // Default component for customer dashboard
            },
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
              path: `${HOSPITALIZATION}`,
              element: <HospitalizationPage />,
            },
            {
              path: `${HOSPITALIZATION}/:hospitalizationId`,
              element: <PetHealthTrackDTO />,
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
            <ProtectedRoutes allowedRoles={['Employee']}>
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
        // Main routes
        {
          path: `${VET_DASHBOARD}`,
          element: (
            <ProtectedRoutes allowedRoles={['Vet']}>
              <VetDashboard />
            </ProtectedRoutes>
          ),
          children: [
            {
              
              path: `${VET_DASHBOARD}`,
              element: <VetDashboard />,
            }

          lazy: async () => {
            const AppShell = await import('../pages/VetDashboard/ProtectedVetDashboard');
            return { Component: AppShell.default }
          },
          errorElement: <GeneralError />,
          children: [
            {
              index: true,
              lazy: async () => ({
                Component: (await import('../pages/VetDashboard/dashboard')).default,
              }),
            },
            {
              path: 'tasks',
              lazy: async () => ({
                Component: (await import('@/pages/VetDashboard/tasks')).default,
              }),
            },
            {
              path: 'chats',
              lazy: async () => ({
                Component: (await import('@/components/coming-soon')).default,
              }),
            },
            {
              path: 'apps',
              lazy: async () => ({
                Component: (await import('@/pages/VetDashboard/apps')).default,
              }),
            },
            {
              path: 'users',
              lazy: async () => ({
                Component: (await import('@/components/coming-soon')).default,
              }),
            },
            {
              path: `${COMING_SOON}`,
              lazy: async () => ({
                Component: (await import('@/components/coming-soon')).default,
              }),
            },
            {
              path:  `${SETTINGS_PROFILE}`,
              lazy: async () => ({
                Component: (await import('../pages/VetDashboard/settings')).default,
              }),
              errorElement: <GeneralError />,
              children: [
                {
                  index: true,
                  lazy: async () => ({
                    Component: (await import('../pages/VetDashboard/settings/profile')).default,
                  }),
                },
                {
                  path: 'account',
                  lazy: async () => ({
                    Component: (await import('../pages/VetDashboard/settings/account')).default,
                  }),
                },
                {
                  path: 'appearance',
                  lazy: async () => ({
                    Component: (await import('../pages/VetDashboard/settings/appearance')).default,
                  }),
                },
                {
                  path: 'notifications',
                  lazy: async () => ({
                    Component: (await import('../pages/VetDashboard/settings/notifications'))
                      .default,
                  }),
                },
                {
                  path: 'display',
                  lazy: async () => ({
                    Component: (await import('../pages/VetDashboard/settings/display')).default,
                  }),
                },
                {
                  path: 'error-example',
                  lazy: async () => ({
                    Component: (await import('../pages/VetDashboard/settings/error-example'))
                      .default,
                  }),
                  errorElement: <GeneralError className='h-[50svh]' minimal />,
                },
              ],
            },

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
          path: '/500',
          element: <GeneralError />,
        },
        {
          path: '/404',
          element: <NotFound />,
        },
        {
          path: '/503',
          element: <MaintenanceError />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} fallbackElement={<Loader />} />;
};

export default RouterComponent;
