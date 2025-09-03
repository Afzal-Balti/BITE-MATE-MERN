import React, { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserData = createContext();

export const ContextProvider = ({ children }) => {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });
  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
  }, [username]);

  return (
    <UserData.Provider value={{ username, setUsername }}>
      {children}
    </UserData.Provider>
  );
};
