import { useState, useEffect } from "react";
import { View, TextInput, Button, Text, Alert, Switch } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    const savedUser = await AsyncStorage.getItem("rememberedUser");
    const savedPass = await AsyncStorage.getItem("rememberedPassword");
    if (savedUser && savedPass) {
      setUsername(savedUser);
      setPassword(savedPass);
      Alert.alert("Bienvenido, sus credenciales han sido cargadas ");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await res.json();
      const user = users.find((u) => u.username === username);
      if (user && password === "123") {
        if (remember) {
          await AsyncStorage.setItem("rememberedUser", username);
          await AsyncStorage.setItem("rememberedPassword", password);
        }
        navigation.navigate("Propiedades");
      } else {
        Alert.alert("Error", "Usuario o contraseña incorrectos.");
        console.log("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al iniciar sesión.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Usuario</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <Switch value={remember} onValueChange={setRemember} />
        <Text style={{ marginLeft: 8 }}>Recordarme</Text>
      </View>
      <Button title="Aceptar" onPress={handleLogin} />
    </View>
  );
}
