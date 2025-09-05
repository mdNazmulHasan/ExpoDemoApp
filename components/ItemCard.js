// components/ItemCard.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ItemCard({ item }) {
  return (
    <Animated.View entering={FadeInDown.duration(500)} style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.body}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, marginVertical: 8, backgroundColor: '#f5f5f5', borderRadius: 12 },
  title: { fontWeight: 'bold', marginBottom: 4 },
});
