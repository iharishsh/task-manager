import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme, IconButton } from "react-native-paper";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import logo from "../../assets/images/tm.png";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const { colors } = useTheme();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={[styles.header, { backgroundColor: colors.primary }]}>
      <View style={styles.content}>
        {/* Logo & Title */}
        <View style={styles.leftContainer}>
          <Image source={logo} style={styles.imageStyles} />
          <Text style={[styles.headerText, { color: colors.text }]}>Task Manager</Text>
        </View>

        {/* Theme Toggle & Logout */}
        <View style={styles.rightContainer}>
          <IconButton 
            icon={isDarkMode ? "weather-sunny" : "moon-waning-crescent"}
            iconColor="#fff"
            size={24}
            onPress={toggleTheme}
          />
          <IconButton 
            icon="logout"
            iconColor="#fff"
            size={24}
            onPress={() => logout(navigation)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 20,
    position: "absolute",
    top: 35,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 999,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageStyles: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Header;
