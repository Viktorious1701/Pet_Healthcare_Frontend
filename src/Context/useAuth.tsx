/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../Models/User";
import { createContext, useEffect, useState } from "react";
import {
  forgotPasswordAPI,
  loginAPI,
  registerAPI,
  resetPasswordAPI,
} from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import {
  ADMIN_DASHBOARD,
  EMPLOYEE_DASHBOARD,
  HOME_PAGE,
  LOGIN,
  RESET_PASS,
  VET_DASHBOARD,
} from "@/Route/router-const";
//import { ErrorOption } from "react-hook-form";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  forgotUser: (email: string) => void;
  resetUser: (
    token: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  resetPassword: (email: string) => void;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerAPI(email, username, password)
      .then((res: any) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
            role: res?.data.role,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("Login Success!");

          navigate(`/${HOME_PAGE}`);
        }
      })
      .catch((e) => toast.warning("Server error occurred", e));
  };

  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password)
      .then((res: any) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
            role: res?.data.role,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("Login Success!");

          switch (userObj.role) {
            case "Admin":
              navigate(`/${ADMIN_DASHBOARD}`);
              break;
            case "Employee":
              navigate(`/${EMPLOYEE_DASHBOARD}`);
              break;
            case "Vet":
              navigate(`/${VET_DASHBOARD}`);
              break;
            default:
              navigate(`/${HOME_PAGE}`);
              break;
          }
        }
      })
      .catch((e) => toast.warning("Server error occurred", e));
  };

  const forgotUser = async (email: string) => {
    await forgotPasswordAPI(email)
      .then((res: any) => {
        if (res) {
          toast.success("Email sent Success!");
          navigate(`/${RESET_PASS}`);
        }
      })
      .catch((e) => toast.warning("Server error occurred", e));
  };

  const resetUser = async (
    token: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    await resetPasswordAPI(token, email, password, confirmPassword)
      .then((res: any) => {
        if (res) {
          toast.success("Password reset Successfully");
          navigate(`/${LOGIN}`);
        }
      })
      .catch((e) => toast.warning("Server error occurred", e));
  };

  // This function is used to reset the password but not yet implemented
  const resetPassword = async (email: string) => {
    await axios
      .post("http://localhost:5000/api/auth/forgot-password", { email })
      .then((res) => {
        if (res) {
          toast.success("Password reset link sent to your email");
        }
      })
      .catch((e) => toast.warning("Server error occurred", e));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate(`/${HOME_PAGE}`);
  };

  return (
    <UserContext.Provider
      value={{
        loginUser,
        user,
        token,
        logout,
        isLoggedIn,
        registerUser,
        forgotUser,
        resetUser,
        resetPassword,
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
