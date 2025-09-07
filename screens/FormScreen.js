import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

export default function FormScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    alert(`Form Submitted:\n${JSON.stringify(data, null, 2)}`);
    reset(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <Controller
        control={control}
        name="name"
        defaultValue=""
        rules={{ required: "Name is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.name && styles.errorInput]}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your name"
          />
        )}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

      <Text style={styles.label}>Email:</Text>
      <Controller
        control={control}
        name="email"
        defaultValue=""
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.errorInput]}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} color="#1BCDB7" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  label: { fontSize: 16, fontWeight: "500", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  errorInput: { borderColor: "red" },
  errorText: { color: "red", marginBottom: 10, fontSize: 14 },
});
