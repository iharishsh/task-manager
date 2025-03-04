import React from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeProvider, ThemeContext } from "./src/context/ThemeContext";
import { DarkTheme, LightTheme } from "./constants/Themes";
import { AuthProvider } from "./src/context/AuthContext";
import { TaskProvider } from "./src/context/TaskContext";

export const App = () => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const CombinedTheme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <PaperProvider theme={CombinedTheme}>
      <AuthProvider>
        <TaskProvider>
          <NavigationContainer theme={CombinedTheme}>
            <AppNavigator />
          </NavigationContainer>
        </TaskProvider>
      </AuthProvider>
    </PaperProvider>
  );
};

const Root = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default registerRootComponent(Root);
