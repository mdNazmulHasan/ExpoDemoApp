// components/NotificationButton.js
import React, { useEffect } from 'react';
import { Button, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export default function NotificationButton() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    if (!Constants.isDevice) return alert('Must use physical device for push notifications');
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') return alert('Failed to get push token');
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  };

  const sendNotification = async () => {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: '<YOUR_EXPO_PUSH_TOKEN>',
        sound: 'default',
        title: 'Hello!',
        body: 'This is a test notification.',
      }),
    });
  };

  return <Button title="Send Test Notification" onPress={sendNotification} />;
}
