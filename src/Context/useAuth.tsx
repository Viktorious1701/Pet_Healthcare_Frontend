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
  refreshTokenAPI,
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
  VET_DASHBOARD,
} from "@/Route/router-const";
//import { ErrorOption } from "react-hook-form";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  refreshToken: string | null;
  refresh: (token: string, refreshToken: string) => void;
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
      toast.success("Token Authorized");
      
      setUser(JSON.parse(user));
      setToken(token);
      setRefreshToken(refreshToken);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, [loggedIn]);

  // const refresh = React.useCallback(async () => {
  //   if (!token || !refreshToken) return;
  //   try {
  //     const res: any = await refreshTokenAPI(token, refreshToken);
  //     if (res) {
  //       localStorage.setItem("token", res.data.token);
  //       localStorage.setItem("refreshToken", res.data.refreshToken);
  //       const userObj = {
  //         userName: res.data.userName,
  //         email: res.data.email,
  //         role: res.data.role,
  //       };
  //       localStorage.setItem("user", JSON.stringify(userObj));
  //       setToken(res.data.token);
  //       setRefreshToken(res.data.refreshToken);
  //       setUser(userObj);
  //       axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
  //     }
  //   } catch (e) {
  //     toast.warning("Session expired. Please log in again.");
  //     logout();
  //   }
  // }, [token, refreshToken ]);
  const refresh = async (token: string, refreshToken: string) => {
    await refreshTokenAPI(token, refreshToken)
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
          toast.success("Token Authorized");
          axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
        }
      })
      .catch((e) => {
        toast.warning("Session expired, pls login again", e);
      });
  };

  // useEffect(() => {
  //   const checkTokenValidity = async () => {
  //     const currentTime = Date.now() / 1000;
  //     const tokenExpiration = localStorage.getItem("tokenExpiration");
  //     if (tokenExpiration && currentTime > Number(tokenExpiration)) {
  //       await refresh();
  //     }
  //   };

  //   checkTokenValidity();
  // }, [refresh]);

  // useEffect(() => {
  //   const interceptor = axios.interceptors.response.use(
  //     response => response,
  //     async error => {
  //       const originalRequest = error.config;
  //       if (error.response.status === 401 && !originalRequest._retry) {
  //         originalRequest._retry = true;
  //         await refresh();
  //         originalRequest.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  //         return axios(originalRequest);
  //       }
  //       return Promise.reject(error);
  //     }
  //   );
  //   return () => {
  //     axios.interceptors.response.eject(interceptor);
  //   };
  // }, [refresh]);
  useEffect(() => {
    const interval = setInterval(() => {
      refresh(String(token), String(refreshToken));
    }, 1000 * 60 * 25); // 25 mins

    return () => clearInterval(interval);
  }, [refreshToken]);

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
          // navigate(`/${RESET_PASS}`);
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
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    setUser(null);
    setToken("");
    setRefreshToken("");
    localStorage.clear();
    navigate(`/${HOME_PAGE}`);
  };

  return (
    <UserContext.Provider
      value={{
        refresh,
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
  );
};

export const useAuth = () => React.useContext(UserContext);
