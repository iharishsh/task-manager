import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../api/axiosInstance";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setUserToken(token);
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", { email, password });
      const {token, user} = response.data;
      setUserToken(token);
      await AsyncStorage.setItem("token", token);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      Alert.alert("Success", `Welcome, ${user.name}!`);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    try {
      const response = await axiosInstance.post("/api/auth/signup", { name, email, password });
      const token = response.data.token;
      setUserToken(token);
      await AsyncStorage.setItem("token", token);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  // Logout function
  const logout = async (navigation) => {
    try {
      setUserToken(null);
      await AsyncStorage.removeItem("token");
      delete axiosInstance.defaults.headers.common["Authorization"];
      Alert.alert("Logged Out", "You have been logged out successfully.");

      // Navigate to Login
      if (navigation) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }], 
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};