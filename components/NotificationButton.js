// components/NotificationButton.js
import React, { useEffect, useState } from 'react';
import { Button, Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export default function NotificationButton() {
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  }, []);

  // Request permission and get Expo Push Token
  const registerForPushNotificationsAsync = async () => {
    if (!Constants.isDevice) {
      alert('Must use a physical device for push notifications');
      return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token!');
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);
    return token;
  };

  // Send push notification via Expo push service
  const sendPushNotification = async () => {
    if (!expoPushToken) return alert('Push token not available');

    try {
      const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Hello!',
        body: 'This is a push notification from Expo!',
        data: { someData: 'goes here' },
      };

      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });

      const data = await response.json();
      console.log('Push response:', data);
      Alert.alert('Notification sent!');
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  };

  return <Button title="Send Push Notification" onPress={sendPushNotification} />;
}
