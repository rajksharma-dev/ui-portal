import { createContext, useState, useEffect } from "react";

interface AuthContextType {
  token: string | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const stored = localStorage.getItem("token");

    if (stored) {
      setToken(stored);
    }

    setLoading(false);

  }, []);

  // 🔹 Multi-tab logout sync
  useEffect(() => {

    const syncLogout = (event: StorageEvent) => {

      if (event.key === "token" && !event.newValue) {
        console.log("Logout detected in another tab");

        setToken(null);

        window.location.href = "/login";
      }

    };

    window.addEventListener("storage", syncLogout);

    return () => {
      window.removeEventListener("storage", syncLogout);
    };

  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};