import React, { useContext, useState } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { Text, TextInput, Button, useTheme } from "react-native-paper";
import logo from "../../assets/images/tm.png";
import { AuthContext } from "../context/AuthContext";

const SignupScreen = ({ navigation }) => {
  const { colors } = useTheme(); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useContext(AuthContext);

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Name, Email and Password are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await signup(name, email, password);
      Alert.alert("Success", "Signup successful!");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error);
      Alert.alert("Signup Failed", error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.imageStyles} />
      </View>
      <Text variant="headlineMedium" style={styles.title}>
        Sign Up
      </Text>
      <TextInput
        label="Name"
        mode="outlined"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      {error && <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>}

      <Button 
        mode="contained" 
        onPress={handleSignup} 
        disabled={loading}
      >
        {loading ? "Loading..." : "Sign Up"} 
      </Button>

      <Button onPress={() => navigation.navigate("Login")} disabled={loading}>
        Have an Account? Login
      </Button>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { textAlign: "center", marginBottom: 20 },
  input: { marginBottom: 10 },
  imageContainer: { justifyContent: "center", alignItems: "center" },
  imageStyles: { width: 100, height: 100, marginVertical: 20 },
  errorText: { textAlign: "center", margin: 10 },
});
