import App from "@/App";
import Dashboard from "@/pages/Dashboard/Dashboard";
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
      },
    ],
  },
]);
