import React, { useContext, useState } from "react";
import { Alert, View, StyleSheet, Image } from "react-native";
import { Text, TextInput, Button, useTheme } from "react-native-paper";
import logo from "../../assets/images/tm.png";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Email and Password are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Login Failed", error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.imageStyles} />
      </View>
      <Text variant="headlineMedium" style={styles.title}>
        Login
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
      />
      {error && <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>}

      {/* Disable button and change text while loading */}
      <Button 
        mode="contained" 
        onPress={handleLogin} 
        style={styles.button} 
        disabled={loading} // Disable button
      >
        {loading ? "Loading..." : "Login"} 
      </Button>

      <Button onPress={() => navigation.navigate("Signup")} disabled={loading}>
        Create an Account
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { textAlign: "center", marginBottom: 20 },
  button: { marginTop: 10 },
  imageContainer: { justifyContent: "center", alignItems: "center" },
  imageStyles: { width: 100, height: 100, marginVertical: 20 },
  errorText: { textAlign: "center", margin: 10 },
});

export default LoginScreen;
