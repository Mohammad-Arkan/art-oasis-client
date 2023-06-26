import React, {createContext, useEffect, useState} from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.config";
export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (name, photo) => {
    return updateUserProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const authInfo = {
    updateUserProfile,
    googleSignIn,
    createUser,
    signIn,
    logout,
    loading,
    user,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current user ✔", currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  });

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
