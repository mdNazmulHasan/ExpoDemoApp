import { Text, StyleSheet, Pressable } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function ItemCard({ item, onPress }) {
  return (
    <Animated.View
      entering={FadeInDown.duration(500)}
      style={styles.card}
    >
      <Pressable
        onPress={() => onPress?.(item)}
        android_ripple={{ color: "#ddd" }}
        style={({ pressed }) => [
          styles.pressable,
          pressed && { opacity: 0.8 },
        ]}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    overflow: "hidden", 
    elevation: 2, 
    shadowColor: "#000", 
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  pressable: { padding: 16 },
  title: { fontWeight: "bold", marginBottom: 4, fontSize: 16 },
  body: { fontSize: 14, color: "#555" },
});
