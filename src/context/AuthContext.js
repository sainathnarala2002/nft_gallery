import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log(storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Initialize state from localStorage
    }
  }, []);

  const login = (userData) => {
      setUser(userData.token);
      localStorage.setItem('user', JSON.stringify(userData.token)); // Optional: Persist the user data in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();// clearing the localstorage;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};