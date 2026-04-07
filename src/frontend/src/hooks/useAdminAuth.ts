import { useState } from "react";

const ADMIN_EMAIL = "admin@rojgarkhabar.in";
const ADMIN_PASSWORD = "admin123";
const SESSION_KEY = "rojgar_admin_session";

export function useAdminAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem(SESSION_KEY) === "true";
  });

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(SESSION_KEY, "true");
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
}
