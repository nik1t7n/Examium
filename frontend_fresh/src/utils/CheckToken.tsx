import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

// Custom hook to check if token is present
export const CheckToken = (): boolean => {
    // Access token from AuthContext
    const { token } = useAuth();
    // State variable to track loading state
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Set loading to false when token is received
      if (token !== null) {
        setLoading(false);
      }
    }, [token]);
  
    return loading;
};
