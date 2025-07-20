import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('rememberedUser').then(user => {
      if (user) setUsername(user);
    });
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await res.json();
      const user = users.find(u => u.username === username);
      if (user && password === 'passwordValue') {
        if (remember) await AsyncStorage.setItem('rememberedUser', username);
        navigation.navigate('Propiedades');
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos.');
        console.log('Usuario o contraseña incorrectos');
        console.log(`Usuario: ${username}, Contraseña: ${password}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al iniciar sesión.');
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
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Switch
          value={remember}
          onValueChange={setRemember}
        />
        <Text style={{ marginLeft: 8 }}>Recordarme</Text>
      </View>
      <Button title="Aceptar" onPress={handleLogin} />
    </View>
  );
}
