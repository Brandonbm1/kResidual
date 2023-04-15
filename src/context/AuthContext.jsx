import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { auth } from "../firebase";
export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    setPersistence(auth, browserSessionPersistence);
  }, []);
  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setError(
        "Se te ha enviado un correo para que puedas reiniciar tu contraseña"
      );
    } catch (error) {
      if (error.code === "auth/user-not-found")
        setError("Usuario no encontrado");
    }
  };

  const logOut = () => signOut(auth);

  const value = {
    user,
    setUser,
    signUp,
    signIn,
    logOut,
    resetPassword,
    error,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
