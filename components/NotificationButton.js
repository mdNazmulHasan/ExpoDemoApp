import React, { useEffect, useState } from "react";
import { Button, Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationButton() {
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) setExpoPushToken(token);
    });

    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
      }
    );

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response:", response);
      });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    if (!Constants.isDevice) {
      Alert.alert("Error", "Push notifications only work on a physical device");
      return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("Permission denied", "Failed to get push token");
      return null;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", token);

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  const sendPushNotification = async () => {
    if (!expoPushToken) {
      Alert.alert("Error", "Push token not available");
      return;
    }

    try {
      const message = {
        to: expoPushToken,
        sound: "default",
        title: "Hello 👋",
        body: "This is a push notification from Expo!",
        data: { customData: "example" },
      };

      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });

      const data = await response.json();
      console.log("Push response:", data);
      Alert.alert("Success", "Notification sent!");
    } catch (error) {
      console.error("Error sending push notification:", error);
      Alert.alert("Error", "Failed to send notification");
    }
  };

  return <Button title="Send Push Notification" onPress={sendPushNotification} />;
}
