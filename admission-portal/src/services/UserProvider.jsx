import React, { createContext, useState, useEffect, useCallback } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('');

  const setUser = useCallback((role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  }, []);

  const clearUser = useCallback(() => {
    setUserRole('');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
  }, []);

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, [setUser, clearUser]);

  const userContextValue = {
    userRole,
    setUser,
    clearUser,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
);
};