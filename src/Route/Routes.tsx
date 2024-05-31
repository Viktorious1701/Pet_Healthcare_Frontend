// /* eslint-disable react-refresh/only-export-components */
// import  { Suspense, lazy } from 'react';
// import { createBrowserRouter } from 'react-router-dom';
// import App from "@/App";
// import ProtectedRoutes from "./ProtectedRoutes";

// // Lazy load your components
// const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
// const Accounts = lazy(() => import("@/pages/Dashboard/Accounts"));
// const AppointmentDashboard = lazy(() => import("@/pages/Dashboard/AppointmentDashboard"));
// const Hospitalization = lazy(() => import("@/pages/Dashboard/Hospitalization"));
// const Calendar = lazy(() => import("@/pages/Calendar"));
// const Home = lazy(() => import("@/pages/Home"));
// const Login = lazy(() => import("@/pages/Login"));
// const Register = lazy(() => import("@/pages/Register"));

// // Create a fallback component for suspense
// const Loading = () => <div>Loading...</div>;

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Home />
//           </Suspense>
//         ),
//       },
//       {
//         path: "login",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Login />
//           </Suspense>
//         ),
//       },
//       {
//         path: "register",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Register />
//           </Suspense>
//         ),
//       },
//       {
//         path: "dashboard",
//         element: (
//           <ProtectedRoutes>
//             <Suspense fallback={<Loading />}>
//               <Dashboard />
//             </Suspense>
//           </ProtectedRoutes>
//         ),
//         children: [
//           {
//             path: "accounts",
//             element: (
//               <Suspense fallback={<Loading />}>
//                 <Accounts />
//               </Suspense>
//             ),
//           },
//           {
//             path: "appointment_dashboard",
//             element: (
//               <Suspense fallback={<Loading />}>
//                 <AppointmentDashboard />
//               </Suspense>
//             ),
//           },
//           {
//             path: "hospitalization",
//             element: (
//               <Suspense fallback={<Loading />}>
//                 <Hospitalization />
//               </Suspense>
//             ),
//           },
//         ],
//       },
//       {
//         path: "calendar",
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Calendar />
//           </Suspense>
//         )
//       },
//       {
//         path: "*",
//         element: <div>404 Not Found</div>,
//       }
//     ],
//   },
// ]);
/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom';
import App from "@/App";
import ProtectedRoutes from "./ProtectedRoutes";

// Import your components directly
import Dashboard from "@/pages/Dashboard/Dashboard";
import Accounts from "@/pages/Dashboard/Accounts";
import AppointmentDashboard from "@/pages/Dashboard/AppointmentDashboard";
import Hospitalization from "@/pages/Dashboard/Hospitalization";
import Calendar from "@/pages/Calendar";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import BookingForm from '@/components/appointment/BookingForm';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        ),
        children: [
          {
            path: "accounts",
            element: <Accounts />,
          },
          {
            path: "appointment_dashboard",
            element: <AppointmentDashboard />,
          },
          {
            path: "hospitalization",
            element: <Hospitalization />,
          },
        ],
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "book",
        element: <BookingForm/>,
      },
      {
        path: "*",
        element: <div>404 Not Found</div>,
      }
    ],
  },
]);