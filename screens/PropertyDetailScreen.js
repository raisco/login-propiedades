import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";

export default function PropertyDetailScreen({ route }) {
  const { propiedad } = route.params;
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${propiedad.id}`
    )
      .then((res) => res.json())
      .then(setComentarios)
      .catch(() => alert("Error cargando comentarios"));
  }, []);

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 18 }}>ID: {propiedad.id}</Text>
      <Text style={{ fontSize: 18 }}>Titulo: {propiedad.title}</Text>
      <Text style={{ marginVertical: 10 }}>Cuerpo: {propiedad.body}</Text>
      <Text style={{ fontWeight: "bold" }}>Comentarios:</Text>
      {comentarios.map((comentario) => (
        <ScrollView key={comentario.id} style={{ marginVertical: 5 }}>
          <Text style={{ fontWeight: "bold" }}>{comentario.name}</Text>
          <Text>{comentario.body}</Text>
        </ScrollView>
      ))}
    </View>
  );
}
