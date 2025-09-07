# Expo Demo App 👋

This is a **demo Expo app** created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).  
It demonstrates basic app structure, navigation, forms, state management, and entrance animations.

---

## Getting Started

### 1. **Install dependencies**

```bash
npm install
```

### 2. **Start the app**

```bash
npx expo start
```

You can open the app in:
- Development build
- Android emulator
- iOS simulator
- Expo Go for quick testing

## Project Structure

All development happens inside the `app` directory.  
Uses file-based routing.

## Demo App Features

This app demonstrates:

- **Home Screen**: Fetches a list of items from a public API and displays them with entrance animations using react-native-reanimated (animation triggers when items load, not on press)
- **Form Screen**: Simple form using react-hook-form with validation
- **Privacy Policy Screen**: Demo screen showing how to implement a privacy policy
- **Notification Button**: Request push notification permission and send demo push notifications using Expo Notifications
- **State Management**: Uses Zustand to store and manage the list of items
- **Navigation**: Built with React Navigation for screen transitions

## How to Test Demo Features

### Home Screen
- Displays a list of demo items fetched from jsonplaceholder.typicode.com
- Each item animates into view when the list loads

### Form Screen
- Navigate via the "Go to Form" button
- Fill in Name and Email and press Submit
- Validation errors appear for empty or invalid inputs

### Privacy Policy Screen
- Navigate via the "Go to Privacy Policy" button
- Scroll to view the demo privacy policy content

### Notifications
- Tap the "Send Push Notification" button
- Make sure you are running the app on a physical device for push notifications
- Approve the permission prompt and check the device for a demo notification

## Reset Project

To start fresh:

```bash
npm run reset-project
```

This moves the starter code to `app-example` and creates a blank `app` directory.

## Learn More

- [Expo documentation](https://docs.expo.dev/)
- [Step-by-step tutorial](https://docs.expo.dev/tutorial/introduction/)

## Community

- [Expo GitHub](https://github.com/expo/expo)
- [Expo Discord](https://chat.expo.dev/)