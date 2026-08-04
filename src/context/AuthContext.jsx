import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService, initStorage } from '../services/storageService';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    initStorage();
    const user = storageService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const user = storageService.loginUser(email, password);
      setCurrentUser(user);
      toast.success(`Welcome back, ${user.name}!`);
      return user;
    } catch (err) {
      toast.error(err.message || 'Login failed.');
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const user = storageService.registerUser(userData);
      setCurrentUser(user);
      toast.success('Account created successfully!');
      return user;
    } catch (err) {
      toast.error(err.message || 'Registration failed.');
      throw err;
    }
  };

  const logout = () => {
    storageService.logoutUser();
    setCurrentUser(null);
    toast.info('Logged out successfully.');
  };

  const resetPassword = async (email) => {
    // Simulated password reset
    toast.success(`Password reset link sent to ${email}`);
    return true;
  };

  const updateProfile = (updatedFields) => {
    const updated = storageService.updateUserProfile(updatedFields);
    if (updated) {
      setCurrentUser(updated);
      toast.success('Profile updated successfully!');
    }
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        register,
        logout,
        resetPassword,
        updateProfile,
        isAuthenticated: !!currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
