"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase.config"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUser] = useState(null);
  const [fireBaseloading, setLoading] = useState(true);


  useEffect(() => {
    console.log("Checking authorization");
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser || null);
      setLoading(false);
      const checkCookie = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/session`, {method: "GET"})
      const resp = await checkCookie.json()
      if (!resp.authenticated) {
        logOut();
      }
    });

    return () => unsubscribe();
  }, []);

  const logOut = async () => {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ userInfo, fireBaseloading, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const firebaseAuth = () => useContext(AuthContext);