import { useState } from "react";

// Custom hook for managing success and error messages
export const useMessageHandler = () => {
    // State variable to store message and its type
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
    // Function to set a message
    const showMessage = (type: "success" | "error", text: string) => {
      setMessage({ type, text });
    };
  
    // Function to clear the message
    const clearMessage = () => {
      setMessage(null);
    };
  
    return { message, showMessage, clearMessage };
};
