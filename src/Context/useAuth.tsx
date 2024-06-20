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
import { Toaster, toast } from "sonner";
import React from "react";
// import axios from "axios";
import {
  ADMIN_DASHBOARD,
  EMPLOYEE_DASHBOARD,
  HOME_PAGE,
  LOGIN,
} from "@/Route/router-const";
import axiosInstance from "@/Helpers/axiosInstance";
//import { ErrorOption } from "react-hook-form";
import "@/../app/globals.css"

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  refreshToken: string | null;
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
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    if (user && token && refreshToken) {
      setUser(JSON.parse(user));
      setToken(token);
      setRefreshToken(refreshToken);
      axiosInstance.defaults.headers.common["Authorization"] =
        "Bearer " + token;
    }
    setIsReady(true);
  }, [loggedIn]);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerAPI(email, username, password)
      .then((res: any) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          localStorage.setItem("refreshToken", res?.data.refreshToken);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
            role: res?.data.role,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setRefreshToken(res?.data.refreshToken!);
          setUser(userObj!);
          setLoggedIn(true);
          toast("Login Success!", {
            type: "success",
            style: {
              backgroundColor: "var(--background)", // Pastel green
              color: "var(--hero-text)",
              outline: "2px solid #77dd77",
            },
          } as any);

          navigate(`/${HOME_PAGE}`);
        }
      })
      .catch((e) =>
        toast("Server error occurred", {
          description: e,
        })
      );
  };

  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password)
      .then((res: any) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          localStorage.setItem("refreshToken", res?.data.refreshToken);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
            role: res?.data.role,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setRefreshToken(res?.data.refreshToken!);
          setUser(userObj!);
          setLoggedIn(true);
          toast("Login Success!", {
            type: "success",
            style: {
              backgroundColor: "var(--background)", // Pastel green
              color: "var(--hero-text)",
              outline: "2px solid #77dd77",
            },
          } as any);

          switch (userObj.role) {
            case "Admin":
              navigate(`/${ADMIN_DASHBOARD}`);
              break;
            case "Employee":
              navigate(`/${EMPLOYEE_DASHBOARD}`);
              break;
            case "Vet":
              navigate(`/${HOME_PAGE}`);
              break;
            default:
              navigate(`/${HOME_PAGE}`);
              break;
          }
        }
      })
      .catch((e) =>
        toast("Server error occurred", {
          description: e,
        })
      );
  };

  const forgotUser = async (email: string) => {
    await forgotPasswordAPI(email)
      .then((res: any) => {
        if (res) {
          toast("Email sent Success!");
          // navigate(`/${RESET_PASS}`);
        }
      })
      .catch((e) =>
        toast("Server error occurred", {
          description: e,
        })
      );
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
          toast("Password reset Successfully");
          navigate(`/${LOGIN}`);
        }
      })
      .catch((e) =>
        toast("Server error occurred", {
          description: e,
        })
      );
  };

  // This function is used to reset the password but not yet implemented
  const resetPassword = async (email: string) => {
    await axiosInstance
      .post("http://localhost:5000/api/auth/forgot-password", { email })
      .then((res) => {
        if (res) {
          toast("Password reset link sent to your email");
        }
      })
      .catch((e) =>
        toast("Server error occurred", {
          description: e,
        })
      );
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    setUser(null);
    setToken("");
    setRefreshToken("");
    localStorage.clear();
    navigate(`/${HOME_PAGE}`);
  };

  return (
    <>
      <Toaster />
      <UserContext.Provider
        value={{
          loginUser,
          user,
          token,
          refreshToken,
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
    </>
  );
};

export const useAuth = () => React.useContext(UserContext);