import { createContext, useEffect, useState } from "react";
import { apiRequest } from "../services/api";

export const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const result = await apiRequest("/auth/me");
        setUser(result.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);
  const login = async (Credential) => {
    const result = await apiRequest("/auth/login", {
      method: "POST",
      body: Credential,
    });
    setUser(result.user);
    return result;
  };
  const logout = async () => {
    try {
      await apiRequest("/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Erreur de déconnexion :", error.message);
    } finally {
      setUser(null);
    }
  };
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}