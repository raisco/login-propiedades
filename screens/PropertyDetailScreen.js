import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

export default function PropertyDetailScreen({ route }) {
  const { propiedad } = route.params;
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${propiedad.id}`)
      .then(res => res.json())
      .then(setComentarios)
      .catch(() => alert('Error cargando comentarios'));
  }, []);

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 18 }}>{propiedad.title}</Text>
      <Text style={{ marginVertical: 10 }}>{propiedad.body}</Text>
      <Text style={{ fontWeight: 'bold' }}>Comentarios:</Text>
      {comentarios.length === 0 ? <ActivityIndicator size="large" /> : (
        <FlatList
          data={comentarios}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 5 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
              <Text>{item.body}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
