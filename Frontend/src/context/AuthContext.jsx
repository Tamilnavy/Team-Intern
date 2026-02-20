import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const { data } = await API.post("/auth/login", { email, password });

    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    setUser(data.user);

    return data.user; // return user for redirect
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;  // 🔥 important

  const loadUser = async () => {
    try {
      const { data } = await API.get("/auth/profile");
      setUser(data);
    } catch (error) {
      localStorage.clear();
      setUser(null);
    }
  };

  loadUser();
}, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};