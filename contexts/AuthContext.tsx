import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { MockService } from '../services/mockService';

interface AuthContextType extends AuthState {
  login: (phoneNumber: string) => Promise<void>;
  signup: (name: string, phoneNumber: string, location: string) => Promise<void>;
  verifyOtp: (phoneNumber: string, otp: string) => Promise<boolean>;
  sendOtp: (phoneNumber: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check local storage for persisted session
    const storedUser = localStorage.getItem('tennis_user');
    if (storedUser) {
      setState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const sendOtp = async (phoneNumber: string) => {
    await MockService.sendOtp(phoneNumber);
  };

  const verifyOtp = async (phoneNumber: string, otp: string) => {
    return await MockService.verifyOtp(phoneNumber, otp);
  };

  const login = async (phoneNumber: string) => {
    const user = await MockService.login(phoneNumber);
    localStorage.setItem('tennis_user', JSON.stringify(user));
    setState({ user, isAuthenticated: true, isLoading: false });
  };

  const signup = async (name: string, phoneNumber: string, location: string) => {
    const user = await MockService.signup({ 
      name, 
      phoneNumber, 
      location, 
      skillLevel: 'Beginner', // Default for new signups
      bio: "New player ready to hit!" 
    });
    localStorage.setItem('tennis_user', JSON.stringify(user));
    setState({ user, isAuthenticated: true, isLoading: false });
  };

  const logout = () => {
    localStorage.removeItem('tennis_user');
    setState({ user: null, isAuthenticated: false, isLoading: false });
  };
  
  const updateUser = (updatedUser: User) => {
      localStorage.setItem('tennis_user', JSON.stringify(updatedUser));
      setState(prev => ({ ...prev, user: updatedUser }));
  }

  return (
    <AuthContext.Provider value={{ ...state, login, signup, sendOtp, verifyOtp, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};