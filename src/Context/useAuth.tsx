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
  reserPasswordAPI,
} from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
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
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("Login Success!");
          navigate("/dashboard");
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
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("Login Success!");
          navigate("/dashboard");
        }
      })
      .catch((e) => toast.warning("Server error occurred", e));
  };

  const forgotUser = async (email: string) => {
    await forgotPasswordAPI(email)
      .then((res: any) => {
        if (res) {
          toast.success("Email sent Success!");
          navigate("/reset-password");
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
    await reserPasswordAPI(token, email, password, confirmPassword)
      .then((res: any) => {
        if (res) {
          toast.success("Password reset Successfully");
          navigate("/login");
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
    setToken("");
    navigate("/");
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
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
