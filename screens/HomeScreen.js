// screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useStore } from "../store/useStore";
import ItemCard from "../components/ItemCard";
import { useNavigation } from "@react-navigation/native";
import NotificationButton from "../components/NotificationButton";

export default function HomeScreen() {
  const { items, setItems } = useStore();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          setItems([]);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator size="large" color="#1BCDB7" style={styles.center} />
      );
    }
    if (error) {
      return (
        <Text style={[styles.center, styles.errorText]}>Error: {error}</Text>
      );
    }
    return (
      <FlatList
        data={items}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ItemCard item={item} />}
        ListEmptyComponent={<Text style={styles.center}>No items found</Text>}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Form")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Go to Form</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("PrivacyPolicy")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Go to Privacy Policy</Text>
      </TouchableOpacity>
      <NotificationButton />
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  button: {
    backgroundColor: "#1BCDB7",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  center: { textAlign: "center", marginTop: 20 },
  errorText: { color: "red", fontWeight: "bold" },
});
