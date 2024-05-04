import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the shape of the authentication context
interface AuthContextType {
  token: string | null; // The authentication token
  setToken: (token: string | null) => void; // Function to set the authentication token
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Authentication provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null); // State to store the authentication token

  useEffect(() => {
    // Check for a saved token in local storage when the component mounts
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token; // Set the token in Axios default headers
    }
  }, []);

  useEffect(() => {
    // Save the token to local storage when it changes
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Provide the authentication context to its children
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
