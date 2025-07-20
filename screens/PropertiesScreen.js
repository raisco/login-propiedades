import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function PropertiesScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(setPosts)
      .catch(() => alert('Error cargando propiedades'));
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Lista de Propiedades</Text>
      {posts.length === 0 ? <ActivityIndicator size="large" /> : (
        <FlatList
          data={posts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Detalle', { propiedad: item })}>
              <Text style={{ padding: 10, borderBottomWidth: 1 }}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
