// ✅ Define Light and Dark Themes
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from "@react-navigation/native";
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

export const LightTheme = {
    ...MD3LightTheme,
    ...NavigationDefaultTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...NavigationDefaultTheme.colors,
      primary: "#89E219", // Green for productivity and motivation
      accent: "#FFC107", // Amber for attention-grabbing elements
      background: "#F5F5F5", // Light gray for a clean, soft background
      surface: "#FFFFFF", // White for cards and containers
      text: "#212121", // Dark gray for high-contrast text
      secondaryText: "#757575", // Medium gray for less important text
      error: "#FF5252", // Red for errors
      success: "#4CAF50", // Green for success messages
      warning: "#FFC107", // Amber for warnings
    },
    fonts: {
      ...MD3LightTheme.fonts,
    },
  };
  
export const DarkTheme = {
    ...MD3DarkTheme,
    ...NavigationDarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...NavigationDarkTheme.colors,
      primary: "#58CC02", // Soft green for productivity and motivation
      accent: "#FFD54F", // Soft amber for attention-grabbing elements
      background: "#121212", // Dark gray for a deep, immersive background
      surface: "#1E1E1E", // Slightly lighter gray for cards and containers
      text: "#E0E0E0", // Light gray for high-contrast text
      secondaryText: "#9E9E9E", // Medium gray for less important text
      error: "#FF6E6E", // Soft red for errors
      success: "#81C784", // Soft green for success messages
      warning: "#FFD54F", // Soft amber for warnings
    },
    fonts: {
      ...MD3DarkTheme.fonts,
    },
  };