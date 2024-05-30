import App from "@/App";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Accounts from "@/pages/Dashboard/Accounts";
import AppointmentDashboard from "@/pages/Dashboard/AppointmentDashboard";
import Hospitalization from "@/pages/Dashboard/Hospitalization";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ProtectedRoutes from "./ProtectedRoutes";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      { path: "", element: <Home></Home> },
      { path: "login", element: <Login></Login> },
      { path: "register", element: <Register></Register> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoutes>
            <Dashboard></Dashboard>
          </ProtectedRoutes>
        ),
        children: [
          { path: "accounts", element: <Accounts></Accounts> },
          { path: "appointment_dashboard", element: <AppointmentDashboard></AppointmentDashboard> },
          { path: "hospitalization", element: <Hospitalization></Hospitalization> },
        ],

      },
    ],
  },
]);
