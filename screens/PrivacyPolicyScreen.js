import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.text}>Last updated: September 7, 2025</Text>

      <Text style={styles.sectionTitle}>Introduction</Text>
      <Text style={styles.text}>
        This is a demo Privacy Policy. It explains how a sample app may handle 
        user information, even though this demo app does not collect any personal data.
      </Text>

      <Text style={styles.sectionTitle}>Information Collection</Text>
      <Text style={styles.text}>
        - This demo app does not request, store, or share personal information.{"\n"}
        - Any data displayed comes from public APIs or placeholder sources.
      </Text>

      <Text style={styles.sectionTitle}>Use of Information</Text>
      <Text style={styles.text}>
        Since no personal data is collected, there is no use of user information 
        beyond basic app functionality and demo content display.
      </Text>

      <Text style={styles.sectionTitle}>Third-Party Services</Text>
      <Text style={styles.text}>
        This demo app may display content from public APIs for demonstration purposes. 
        No user information is transmitted to third parties.
      </Text>

      <Text style={styles.sectionTitle}>Changes to This Policy</Text>
      <Text style={styles.text}>
        This Privacy Policy is for demonstration purposes only. 
        It may be updated if the demo app is expanded with new features.
      </Text>

      <Text style={styles.sectionTitle}>Contact</Text>
      <Text style={styles.text}>
        For demo purposes, you can contact us at demo@example.com.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12, color: "#1BCDB7" },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginTop: 16, marginBottom: 6 },
  text: { fontSize: 16, lineHeight: 22, marginBottom: 8 },
});
