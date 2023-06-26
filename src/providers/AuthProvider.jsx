import React, {createContext, useState} from "react";
import {getAuth} from "firebase/auth";
import app from "../firebase/firebase.config";

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  const authInfo = {
    user,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
