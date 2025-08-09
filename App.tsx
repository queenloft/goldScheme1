import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native'; // Import for loading indicator

// Firebase Auth
import auth from '@react-native-firebase/auth';

// Import your Zustand auth store
import useAuthStore from '@src/hooks/useAuthStore';
import useLanguageStore from '@src/hooks/useLanguageStore';

// Import i18n
import '@src/utility/i18n';
import { useTranslation } from 'react-i18next';

// Import Screens
import AppTabs from '@src/navigation/bottom-tab';
import HomeScreen from '@src/screens/HomeScreen';
import LoginScreen from '@src/screens/LoginScreen';
import OTPScreen from '@src/screens/OTPScreen';
import CreateMpinScreen from '@src/screens/MPinScreen'; // Import MPIN screen
import EnterMpinScreen from '@src/screens/MPinScreen';   // Import MPIN screen
import ProfileScreen from '@src/screens/ProfileScreen';
import MyPlanScreen from '@src/screens/MyPlanScreen';
import GoldInvestmentTracker from '@src/screens/SchemeDetail';
import EditProfile from '@src/screens/EditProfile';
import JoinScheme from '@src/screens/JoinPlanScreen';
import TransactionsScreen from '@src/screens/MyTransactions';
import PaymentScreen from '@src/screens/Payment';
import NotificationScreen from '@src/screens/Notifications';
import ChangeMpinScreen from '@src/screens/MPinScreen';


const Stack = createNativeStackNavigator();

function App() {
  // Get state and actions from your Zustand store
  const { isLoggedIn, login, logout } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set initial language from store
    i18n.changeLanguage(useLanguageStore.getState().language);

    // --- Firebase Auth State Listener ---
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in according to Firebase.
        // We can sync our local state if it's not already set.
        if (!isLoggedIn) {
          // You might want to fetch the user's profile from Firestore here
          // before calling login to have all user data available globally.
          console.log('Auth state changed: User is logged in, syncing store.');
          login(user, "1234567890"); // Replace with actual token logic
        }
      } else {
        // User is signed out according to Firebase.
        // Force a logout in our local state to clear session.
        console.log('Auth state changed: User is logged out, clearing store.');
        logout();
      }

      // Hide the loading indicator once the initial check is complete
      if (isInitializing) {
        setIsInitializing(false);
      }
    });

    // Unsubscribe from the listener when the component unmounts
    return subscriber;
  }, [isInitializing, isLoggedIn, login, logout]);


  // Show a loading screen while we check for an existing session
  if (isInitializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false // Hides the default header for all screens
        }}
      >
        {isLoggedIn ? (
          // --- User is Logged IN ---
          <>
            <Stack.Screen name="MainApp" component={AppTabs} />
            <Stack.Screen name="MyPlan" component={MyPlanScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="JoinScheme" component={JoinScheme} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="ChangeMpin" component={ChangeMpinScreen} />
            <Stack.Screen name="SchemeDetail" component={GoldInvestmentTracker} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="MyTransactions" component={TransactionsScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="Notifications" component={NotificationScreen} />
          </>
        ) : (
          // --- User is Logged OUT ---
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="OTPScreen" component={OTPScreen} />
            <Stack.Screen name="CreateMpin" component={CreateMpinScreen} />
            <Stack.Screen name="EnterMpin" component={EnterMpinScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;