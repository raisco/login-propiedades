import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import PropertiesScreen from "./screens/PropertiesScreen";
import PropertyDetailScreen from "./screens/PropertyDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Propiedades" component={PropertiesScreen} />
        <Stack.Screen name="Detalle" component={PropertyDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
