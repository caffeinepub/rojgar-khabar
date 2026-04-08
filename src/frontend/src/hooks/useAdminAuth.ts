import { useState } from "react";

const ADMIN_EMAIL = "admin@rojgarkhabar.in";
const DEFAULT_PASSWORD = "admin123";
const SESSION_KEY = "rojgar_admin_session";
const PASSWORD_KEY = "rojgar_admin_password";

function getStoredPassword(): string {
  return localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
}

export function useAdminAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem(SESSION_KEY) === "true";
  });

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === getStoredPassword()) {
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

  const changePassword = (
    currentPassword: string,
    newPassword: string,
  ): { success: boolean; error?: string } => {
    if (currentPassword !== getStoredPassword()) {
      return { success: false, error: "Current password is incorrect" };
    }
    if (newPassword.length < 6) {
      return {
        success: false,
        error: "New password must be at least 6 characters",
      };
    }
    localStorage.setItem(PASSWORD_KEY, newPassword);
    return { success: true };
  };

  return { isLoggedIn, login, logout, changePassword };
}
