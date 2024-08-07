/* eslint-disable @typescript-eslint/no-explicit-any */
// UserContext.tsx

import React, { createContext, useState, useEffect } from 'react';
import { UserProfile } from '../Models/User';
import { forgotPasswordAPI, loginAPI, registerAPI, resetPasswordAPI } from '../Services/AuthService';
import { toast } from 'sonner';
import axiosInstance from '@/Helpers/axiosInstance';

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  refreshToken: string | null;
  registerUser: (
    email: string,
    username: string,
    password: string,
    confirmPassword: string
  ) => Promise<UserProfile | null>;
  loginUser: (username: string, password: string) => Promise<UserProfile | null>;
  forgotUser: (email: string) => Promise<void>;
  resetUser: (token: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  isLoggedIn: () => boolean;
  resetPassword: (email: string) => Promise<void>;
};
export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (storedUser && storedToken && storedRefreshToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setRefreshToken(storedRefreshToken);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setIsReady(true);
  }, []);

  const updateAuthState = (userData: any) => {
    console.log('updateAuthState', userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('refreshToken', userData.refreshToken);
    localStorage.setItem('user', JSON.stringify(userData.user));
    setToken(userData.token);
    setRefreshToken(userData.refreshToken);
    setUser(userData.user);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
  };

  const registerUser = async (email: string, username: string, password: string, confirmPassword: string) => {
    try {
      const userData = await registerAPI(email, username, password, confirmPassword);
      console.log('userData', userData);
      //updateAuthState(userData);
      toast('Registration Successful!', {
        style: {
          backgroundColor: 'var(--background)',
          color: 'var(--hero-text)',
          outline: '2px solid #77dd77'
        }
      });
      return userData;
    } catch (error: any) {
      console.log('Registration error:', error);
      if (Array.isArray(error) && error.length > 0) {
        // Handle server-side validation errors
        const firstError = error[0];
        toast.error(`${firstError.code}: ${firstError.description}`);
      } else {
        // Handle unexpected errors
        toast.error('An unexpected error occurred', error);
      }
      toast.error('Registration failed', error);
      return null;
    }
  };

  const loginUser = async (username: string, password: string) => {
    try {
      const res = await loginAPI(username, password);
      if (res) {
        const userData = {
          token: res.data.token,
          refreshToken: res.data.refreshToken,
          user: {
            userName: res.data.userName,
            email: res.data.email,
            role: res.data.role
          }
        };
        updateAuthState(userData);
        toast('Login Success!', {
          duration: 1500, // Toast will now fade out faster
          style: {
            backgroundColor: 'var(--background)',
            color: 'var(--hero-text)',
            outline: '2px solid #77dd77'
          }
        });
        return userData.user;
      }
    } catch (e) {
      toast('Server error occurred');
    }
    return null;
  };
  const forgotUser = async (email: string) => {
    try {
      const res = await forgotPasswordAPI(email);
      if (res) {
        toast('Email sent Successfully!');
      }
    } catch (e) {
      toast('Server error occurred');
    }
  };

  const resetUser = async (token: string, email: string, password: string, confirmPassword: string) => {
    try {
      const res = await resetPasswordAPI(token, email, password, confirmPassword);
      if (res) {
        toast('Password reset Successfully');
      }
    } catch (e) {
      toast('Server error occurred');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const res = await axiosInstance.post('http://localhost:5000/api/auth/forgot-password', { email });
      if (res) {
        toast('Password reset link sent to your email');
      }
    } catch (e) {
      toast('Server error occurred');
    }
  };

  const isLoggedIn = () => {
    const userStorage = localStorage.getItem('user');
    const tokenStorage = localStorage.getItem('token');
    if (userStorage && tokenStorage) {
      return true;
    } else {
      setUser(null);
      setToken(null);
    }
    return !!user && !!token;
  };
  const contextValue: UserContextType = {
    user,
    token,
    refreshToken,
    registerUser,
    loginUser,
    forgotUser,
    resetUser,
    isLoggedIn,
    resetPassword
  };

  return <UserContext.Provider value={contextValue}>{isReady ? children : null}</UserContext.Provider>;
};
