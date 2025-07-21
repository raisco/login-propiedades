import { useEffect, useState } from "react";
import { Text, TouchableOpacity, ScrollView } from "react-native";

export default function PropertiesScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then(setPosts)
      .catch(() => alert("Error cargando propiedades"));
  }, []);

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Lista de Propiedades
      </Text>
      {posts.map((post) => (
        <TouchableOpacity
          key={post.id}
          onPress={() => navigation.navigate("Detalle", { propiedad: post })}
        >
          <Text style={{ padding: 10, borderBottomWidth: 1 }}>
            {post.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
