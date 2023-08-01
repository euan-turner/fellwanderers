import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from "firebase/auth";
import { auth } from "../../firebase";

interface AuthContextData {
  isLoggedIn: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthContextData>({
  isLoggedIn: false,
  user: null
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}
