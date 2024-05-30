/* eslint-disable react-refresh/only-export-components */
import  { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from "@/App";
import ProtectedRoutes from "./ProtectedRoutes";

// Lazy load your components
const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
const Accounts = lazy(() => import("@/pages/Dashboard/Accounts"));
const AppointmentDashboard = lazy(() => import("@/pages/Dashboard/AppointmentDashboard"));
const Hospitalization = lazy(() => import("@/pages/Dashboard/Hospitalization"));
const Calendar = lazy(() => import("@/pages/Calendar"));
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));

// Create a fallback component for suspense
const Loading = () => <div>Loading...</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<Loading />}>
              <Dashboard />
            </Suspense>
          </ProtectedRoutes>
        ),
        children: [
          {
            path: "accounts",
            element: (
              <Suspense fallback={<Loading />}>
                <Accounts />
              </Suspense>
            ),
          },
          {
            path: "appointment_dashboard",
            element: (
              <Suspense fallback={<Loading />}>
                <AppointmentDashboard />
              </Suspense>
            ),
          },
          {
            path: "hospitalization",
            element: (
              <Suspense fallback={<Loading />}>
                <Hospitalization />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "calendar",
        element: (
          <Suspense fallback={<Loading />}>
            <Calendar />
          </Suspense>
        )
      },
      {
        path: "*",
        element: <div>404 Not Found</div>,
      }
    ],
  },
]);
