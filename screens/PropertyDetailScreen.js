import { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

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
    <ScrollView style={styles.container}>
      <View style={styles.propertyCard}>
        <Text style={styles.propertyId}>ID: {propiedad.id}</Text>
        <Text style={styles.propertyTitle}>Título: {propiedad.title}</Text>
        <Text style={styles.propertyBody}>Descripción: {propiedad.body}</Text>
      </View>

      <View style={styles.commentsSection}>
        <Text style={styles.commentsHeader}>Comentarios:</Text>
        {comentarios.map((comentario) => (
          <View key={comentario.id} style={styles.commentCard}>
            <Text style={styles.commentName}>{comentario.name}</Text>
            <Text style={styles.commentEmail}>{comentario.email}</Text>
            <Text style={styles.commentBody}>{comentario.body}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  propertyCard: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  propertyId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2196F3",
    marginBottom: 8,
  },
  propertyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textTransform: "capitalize",
  },
  propertyBody: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
    textAlign: "justify",
  },
  commentsSection: {
    margin: 10,
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    paddingLeft: 5,
  },
  commentCard: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  commentName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 4,
    textTransform: "capitalize",
  },
  commentEmail: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
    fontStyle: "italic",
  },
  commentBody: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    textAlign: "justify",
  },
});
