import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  
  const [user, setUser] = useState({
    display_name:"",
    user_id:"",
    spotifyToken:"",
  }); 

  const setUserData = (display_name, user_id,spotifyToken) => {
    setUser({
      display_name,
      user_id,
      spotifyToken,
    });
  };

  return (
    <UserContext.Provider value={{ user, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser=()=>{
  return useContext(UserContext);
}
export { UserProvider, useUser };
