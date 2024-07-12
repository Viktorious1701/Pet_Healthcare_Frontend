import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
// import Dashboard from "@/pages/AdminDashboard/Dashboard";
// import Hospitalization from "@/pages/AdminDashboard/Hospitalization";
import BookingPage from '@/pages/Booking/BookingPage';
import BookingSuccess from '@/pages/Booking/BookingSuccess';
import AccountSettings from '@/pages/AccountSettings';
import NotFound from '@/pages/Errors/NotFound';
import GeneralError from '@/pages/Errors/general-error';
import MaintenanceError from '@/pages/Errors/maintenance-error';
import EmployeeDashboard from '@/pages/EmployeeDashboard/EmployeeDashboard';
import HospitalizationPage from '@/pages/CustomerDashboard/hospitalization/components/HospitalizationPage';
import PetHealthTrackDTO from '@/pages/CustomerDashboard/hospitalization/components/PetHealthTrack';
import KennelPage from '@/pages/CustomerDashboard/hospitalization/components/Kennel';
// import PetProfile from '@/pages/CustomerPage/PetProfile/PetProfile';
// import PetUpdateForm from '@/pages/CustomerPage/PetProfile/PetUpdateForm';
// import AppointmentManagement from '@/pages/CustomerPage/Appointments/AppointmentManagement';
// import HospitalizationTracking from '@/pages/CustomerPage/Hospitalization/HospitalizationPage';
//import { Resize, useWindowDimensions } from "@/components/resize";
import { Loader } from 'lucide-react';
// import UserProfile from '@/pages/CustomerPage/Profile/UserProfile'; // Adjust path as necessary
import {
  ABOUT_PAGE,
  ADMIN_ACCOUNT_PAGE,
  ADMIN_APPOINTMENT,
  ADMIN_DASHBOARD,
  // ADMIN_HOSPITALIZATION,
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
  HOSPITALIZATION_INTRO,
  SETTINGS_PROFILE,
  EMPLOYEE_APPOINTMENT_BOOKING,
  EMPLOYEE_KENNELS,
  ADMIN_ACCOUNTS,
  SCHEDULE_VET,
  EMPLOYEE_HOSPITALIZED_PETS,
  APPOINTMENT_DETAILS,
  PAYMENT,
  CUSTOMER_PROFILE,
  REFUND,
  CUSTOMER_PET_ADD,
  APPOINTMENT_EDIT,
  EMPLOYEE_APPOINTMENT_MANAGE,
  RATE,
  APPOINTMENT_MEDICAL_RECORD,
  HOSPITALIZATION_VET,
  APPOINTMENT_EDIT_DETAILS,
  APPOINTMENT_DIAGNOSIS,
  ADMIN_PETS,
  ADMIN_HOSPITALIZATION,
  ADMIN_KENNELS,
  ADMIN_SERVICES,
  ADMIN_VACCINES
} from './router-const';

import PetHealthTrack from '@/pages/CustomerDashboard/hospitalization/components/PetHealthTrack';
import BookingPageEmployee from '@/pages/Booking/BookingPageEmployee';
import KennelManagement from '@/pages/EmployeeDashboard/kennel/KennelManagement';
import React from 'react';
import ProtectedAdminDashboard from '@/pages/AdminDashboard/ProtectedAdminDashboard';

import HospitalizationManagement from '@/pages/EmployeeDashboard/hospitalization/HospitalizationManagement';
import ProtectedCustomerDashboard from '@/pages/CustomerDashboard/ProtectedCustomerDashboard';
import Pets from '@/pages/CustomerDashboard/pets';
import PetProfile from '@/pages/CustomerDashboard/pets/components/PetProfile';
import PetUpdateForm from '@/pages/CustomerDashboard/pets/components/PetUpdateForm';
import Appointments from '@/pages/CustomerDashboard/appointments';
import Hospitalization from '@/pages/CustomerDashboard/hospitalization';
import Profile from '@/pages/CustomerDashboard/profile';
import CancelAppointment from '../pages/CustomerDashboard/appointments/components/CancelAppointment';
import AddAPetProfile from '@/pages/CustomerDashboard/pets/components/AddAPetProfile';
import NotAuthorized from '@/pages/Errors/NotAuthorized';
import AppointmentManagement from '@/pages/EmployeeDashboard/appointment/AppointmentManagement';
import RateAppointment from '@/pages/CustomerDashboard/appointments/components/RateAppointment';

const ProtectedVetDashboard = React.lazy(() => import('../pages/VetDashboard/ProtectedVetDashboard'));

const RouterComponent = () => {
  // const { width } = useWindowDimensions();
  // if (width <= 900) {
  //   return <Resize />;
  // }

  const router = createBrowserRouter([
    {
      path: '/',
      lazy: async () => ({
        Component: (await import('@/App')).default
      }),
      children: [
        {
          path: `${HOME_PAGE}`,
          lazy: async () => ({
            Component: (await import('@/pages/Home')).default
          })
        },
        {
          path: `${HOSPITALIZATION_INTRO}`,
          lazy: async () => ({
            Component: (await import('@/pages/HospitalizationService')).default
          })
        },
        {
          path: `${ABOUT_PAGE}`,
          lazy: async () => ({
            Component: (await import('@/pages/About')).default
          })
        },
        {
          path: `${CONTACT}`,
          lazy: async () => ({
            Component: (await import('@/pages/Contact')).default
          })
        },
        {
          path: `${LOGIN}`,
          lazy: async () => ({
            Component: (await import('@/pages/Login')).default
          })
        },
        {
          path: `${REGISTER}`,
          lazy: async () => ({
            Component: (await import('@/pages/Register')).default
          })
        },
        {
          path: `${FORGOT_PASS}`,
          lazy: async () => ({
            Component: (await import('@/pages/ForgotPass')).default
          })
        },
        {
          path: `${RESET_PASS}`,
          lazy: async () => ({
            Component: (await import('@/pages/ResetPass')).default
          })
        },
        {
          path: `${ADMIN_DASHBOARD}`,
          element: (
            <ProtectedRoutes allowedRoles={['Admin']}>
              <ProtectedAdminDashboard />
            </ProtectedRoutes>
          ),
          children: [
            {
              path: `${ADMIN_ACCOUNT_PAGE}`,
              lazy: async () => ({
                Component: (await import('@/pages/AdminDashboard/Accounts')).default
              })
            },
            {
              index: true,
              lazy: async () => ({
                Component: (await import('../pages/AdminDashboard/dashboard/index')).default
              })
            },
            {
              path: `${ADMIN_ACCOUNTS}`,
              lazy: async () => ({
                Component: (await import('@/pages/AdminDashboard/accounts/index')).default
              })
            },
            {
              path: `${ADMIN_PETS}`,
              lazy: async () => ({
                Component: (await import('@/pages/AdminDashboard/pets/index')).default
              })
            },
            {
              path: `${ADMIN_APPOINTMENT}`,
              lazy: async () => ({
                Component: (await import('@/pages/AdminDashboard/appointments/index')).default
              })
            },
            {
              path: `${ADMIN_HOSPITALIZATION}`,
              lazy: async () => ({
                Component: (await import('@/pages/AdminDashboard/hospitalizations/index')).default
              })
            },
            {
              path: `${ADMIN_KENNELS}`,
              lazy: async () => ({
                Component: (await import('@/pages/AdminDashboard/kennels/index')).default
              })
            },
            {
              path: `${ADMIN_SERVICES}`,
              lazy: async () => ({
                Component: (await import('@/pages/AdminDashboard/services/index')).default
              })
            },
            {
              path: `${ADMIN_VACCINES}`,
              lazy: async () => ({
                Component: (await import('@/pages/AdminDashboard/vaccines/index')).default
              })
            },
            {
              path: `${SCHEDULE_VET}`,
              lazy: async () => ({
                Component: (await import('@/pages/AdminDashboard/schedule')).default
              })
            },
            {
              path: `${COMING_SOON}`,
              lazy: async () => ({
                Component: (await import('@/components/coming-soon')).default
              })
            },
            {
              path: `${SETTINGS_PROFILE}`,
              lazy: async () => ({
                Component: (await import('../pages/AdminDashboard/settings')).default
              }),
              errorElement: <GeneralError />,
              children: [
                {
                  index: true,
                  lazy: async () => ({
                    Component: (await import('../pages/AdminDashboard/settings/profile')).default
                  })
                },
                {
                  path: 'account',
                  lazy: async () => ({
                    Component: (await import('../pages/AdminDashboard/settings/account')).default
                  })
                },
                {
                  path: 'appearance',
                  lazy: async () => ({
                    Component: (await import('../pages/AdminDashboard/settings/appearance')).default
                  })
                },
                {
                  path: 'notifications',
                  lazy: async () => ({
                    Component: (await import('../pages/AdminDashboard/settings/notifications')).default
                  })
                },
                {
                  path: 'display',
                  lazy: async () => ({
                    Component: (await import('../pages/AdminDashboard/settings/display')).default
                  })
                },
                {
                  path: 'error-example',
                  lazy: async () => ({
                    Component: (await import('../pages/AdminDashboard/settings/error-example')).default
                  }),
                  errorElement: <GeneralError className='h-[50svh]' minimal />
                }
              ]
            }
          ]
        },

        {
          path: `/${PAYMENT}`,
          lazy: async () => ({
            Component: (await import('@/pages/Booking/PaymentPage')).default
          })
        },
        {
          path: `/${CUSTOMER_DASHBOARD}`,
          element: (
            <ProtectedRoutes allowedRoles={['Customer']}>
              <ProtectedCustomerDashboard />
            </ProtectedRoutes>
          ),
          children: [
            {
              path: `${CUSTOMER_PROFILE}`,
              element: <Profile /> // Default component for customer dashboard
            },
            {
              path: `${RATE}/:appointmentId`,
              element: <RateAppointment /> // Default component for customer dashboard
            },
            {
              path: `${CUSTOMER_PET_LIST}`,
              element: <Pets /> // Component for pet list
            },
            {
              path: `${CUSTOMER_PET_LIST}/:petId`,
              element: <PetProfile /> // Component for pet profile
            },
            {
              path: `${CUSTOMER_PET_ADD}`,
              element: <AddAPetProfile />
            },
            {
              path: `${CUSTOMER_PET_UPDATE}/:petId`,
              element: <PetUpdateForm />
            },
            {
              path: `${REFUND}/:appointmentId`,
              element: <CancelAppointment />
            },
            {
              path: `${CUSTOMER_APPOINTMENTS}`,
              element: <Appointments /> // Component for appointment management
            },
            {
              path: `${CUSTOMER_HOSPITALIZATION_TABLE}`,
              element: <Hospitalization /> // Component for hospitalization tracking
            },
            {
              path: `${HOSPITALIZATION}`,
              element: <HospitalizationPage />
            },
            {
              path: `${HOSPITALIZATION}/:hospitalizationId`,
              element: <PetHealthTrackDTO />
            },
            {
              path: `${SETTINGS}`,
              element: <AccountSettings /> // Component for account settings
            },
            {
              path: `${HOSPITALIZATION}/:petName`,
              element: <PetHealthTrack />
            },

            {
              path: `${KENNEL}/:kennelId`,
              element: <KennelPage />
            },
            {
              index: true,
              lazy: async () => ({
                Component: (await import('../pages/CustomerDashboard/dashboard/index')).default
              })
            },
            {
              path: `${SCHEDULE_VET}`,
              lazy: async () => ({
                Component: (await import('@/pages/CustomerDashboard/schedule')).default
              })
            },
            {
              path: `${COMING_SOON}`,
              lazy: async () => ({
                Component: (await import('@/components/coming-soon')).default
              })
            },
            {
              path: `${SETTINGS_PROFILE}`,
              lazy: async () => ({
                Component: (await import('../pages/CustomerDashboard/settings')).default
              }),
              errorElement: <GeneralError />,
              children: [
                {
                  index: true,
                  path: '',
                  lazy: async () => ({
                    Component: (await import('../pages/CustomerDashboard/settings/profile')).default
                  })
                },
                {
                  path: 'account',
                  lazy: async () => ({
                    Component: (await import('../pages/CustomerDashboard/settings/account')).default
                  })
                },
                {
                  path: 'appearance',
                  lazy: async () => ({
                    Component: (await import('../pages/CustomerDashboard/settings/appearance')).default
                  })
                },
                {
                  path: 'notifications',
                  lazy: async () => ({
                    Component: (await import('../pages/CustomerDashboard/settings/notifications')).default
                  })
                },
                {
                  path: 'display',
                  lazy: async () => ({
                    Component: (await import('../pages/CustomerDashboard/settings/display')).default
                  })
                },
                {
                  path: 'error-example',
                  lazy: async () => ({
                    Component: (await import('../pages/CustomerDashboard/settings/error-example')).default
                  }),
                  errorElement: <GeneralError className='h-[50svh]' minimal />
                }
              ]
            }
          ]
        },
        {
          path: `${EMPLOYEE_DASHBOARD}`,
          element: (
            <ProtectedRoutes allowedRoles={['Employee']}>
              <EmployeeDashboard />
            </ProtectedRoutes>
          ),
          errorElement: <GeneralError />,
          children: [
            {
              index: true,
              lazy: async () => ({
                Component: (await import('../pages/EmployeeDashboard/dashboard/index')).default
              })
            },
            {
              path: `${EMPLOYEE_DASHBOARD}`,
              element: <EmployeeDashboard />
            },
            {
              path: `${EMPLOYEE_APPOINTMENT_BOOKING}`,
              element: <BookingPageEmployee />
            },
            {
              path: `${EMPLOYEE_APPOINTMENT_MANAGE}`,
              element: <AppointmentManagement />
            },
            {
              path: `${EMPLOYEE_KENNELS}`,
              element: <KennelManagement />
            },
            {
              path: `${EMPLOYEE_HOSPITALIZED_PETS}`,
              element: <HospitalizationManagement />
            },
            {
              path: `${SETTINGS}`,
              element: <AccountSettings /> // Component for account settings
            }
          ]
        },
        // Main routes
        {
          path: `${VET_DASHBOARD}`,
          element: (
            <ProtectedRoutes allowedRoles={['Vet']}>
              <ProtectedVetDashboard />
            </ProtectedRoutes>
          ),
          errorElement: <GeneralError />,
          children: [
            {
              index: true,
              lazy: async () => ({
                Component: (await import('../pages/VetDashboard/dashboard')).default
              })
            },
            {
              path: `${APPOINTMENT_DETAILS}`,
              lazy: async () => ({
                Component: (await import('@/pages/VetDashboard/appointment_details/index')).default
              })
            },
            {
              path: `${APPOINTMENT_EDIT}/:appointmentId`,
              lazy: async () => ({
                Component: (await import('@/pages/VetDashboard/appointment_view/index')).default
              })
            },
            {
              path: `${APPOINTMENT_EDIT_DETAILS}/:appointmentId`,
              lazy: async () => ({
                Component: (await import('@/pages/VetDashboard/appointment_edit_details/index')).default
              })
            },
            {
              path: `${HOSPITALIZATION_VET}`,
              lazy: async () => ({
                Component: (await import('@/pages/VetDashboard/hospitalization/index')).default
              })
            },
            {
              path: `${APPOINTMENT_DIAGNOSIS}/:appointmentId`,
              lazy: async () => ({
                Component: (await import('@/pages/VetDashboard/diagnosis_add/index')).default
              })
            },
            {
              path: `${APPOINTMENT_MEDICAL_RECORD}`,
              lazy: async () => ({
                Component: (await import('@/pages/VetDashboard/medical_record/index')).default
              })
            },
            {
              path: `${HOSPITALIZATION_VET}`,
              lazy: async () => ({
                Component: (await import('@/pages/VetDashboard/hospitalization/index')).default
              })
            },
            {
              path: `${SCHEDULE_VET}`,
              lazy: async () => ({
                Component: (await import('@/pages/VetDashboard/schedule')).default
              })
            },
            {
              path: `${COMING_SOON}`,
              lazy: async () => ({
                Component: (await import('@/components/coming-soon')).default
              })
            },
            {
              path: `${SETTINGS_PROFILE}`,
              lazy: async () => ({
                Component: (await import('../pages/VetDashboard/settings')).default
              }),
              errorElement: <GeneralError />,
              children: [
                {
                  index: true,
                  lazy: async () => ({
                    Component: (await import('../pages/VetDashboard/settings/profile')).default
                  })
                },
                {
                  path: 'account',
                  lazy: async () => ({
                    Component: (await import('../pages/VetDashboard/settings/account')).default
                  })
                },
                {
                  path: 'appearance',
                  lazy: async () => ({
                    Component: (await import('../pages/VetDashboard/settings/appearance')).default
                  })
                },
                {
                  path: 'notifications',
                  lazy: async () => ({
                    Component: (await import('../pages/VetDashboard/settings/notifications')).default
                  })
                },
                {
                  path: 'display',
                  lazy: async () => ({
                    Component: (await import('../pages/VetDashboard/settings/display')).default
                  })
                },
                {
                  path: 'error-example',
                  lazy: async () => ({
                    Component: (await import('../pages/VetDashboard/settings/error-example')).default
                  }),
                  errorElement: <GeneralError className='h-[50svh]' minimal />
                }
              ]
            }
          ]
        },
        {
          path: `${APPOINTMENT}`,
          element: <BookingPage />
        },
        {
          path: `${APPOINTMENT_SUCCESS}`,
          element: <BookingSuccess />
        },
        {
          path: `${HOSPITALIZATION}`,
          element: <HospitalizationPage />
        },

        {
          path: '/500',
          element: <GeneralError />
        },
        {
          path: '/404',
          element: <NotFound />
        },
        {
          path: '/503',
          element: <MaintenanceError />
        },
        {
          path: '/not-authorized',
          element: <NotAuthorized />
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} fallbackElement={<Loader />} />;
};

export default RouterComponent;
