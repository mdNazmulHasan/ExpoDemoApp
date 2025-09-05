// screens/HomeScreen.js
import React, { useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useStore } from '../store/useStore';
import ItemCard from '../components/ItemCard';
import { useNavigation } from '@react-navigation/native';
import NotificationButton from '../components/NotificationButton';

export default function HomeScreen() {
  const { items, setItems } = useStore();
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Form')} style={styles.button}>
        <Text style={styles.buttonText}>Go to Form</Text>
      </TouchableOpacity>
      <NotificationButton />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ItemCard item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  button: { backgroundColor: '#1BCDB7', padding: 12, borderRadius: 10, marginBottom: 16 },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});
