import { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";

export default function PropertiesScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then(setPosts)
      .catch(() => alert("Error cargando propiedades"));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lista de Propiedades</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            style={styles.propertyCard}
            onPress={() => navigation.navigate("Detalle", { propiedad: post })}
            activeOpacity={0.7}
          >
            <View style={styles.cardContent}>
              <Text style={styles.propertyTitle}>{post.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subHeaderText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  propertyCard: {
    backgroundColor: "#fff",
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  cardContent: {
    padding: 15,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textTransform: "capitalize",
    lineHeight: 22,
  },
});
