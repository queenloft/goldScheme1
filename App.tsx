import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your Zustand auth store

// Import Screens
import AppTabs from '@src/navigation/bottom-tab';
import HomeScreen from '@src/screens/HomeScreen';
import LoginScreen from '@src/screens/LoginScreen';
import ChangeMpinScreen from '@src/screens/MPinScreen';
import OTPScreen from '@src/screens/OTPScreen';
import ProfileScreen from '@src/screens/ProfileScreen';
import MyPlanScreen from '@src/screens/MyPlanScreen';
import GoldInvestmentTracker from '@src/screens/SchemeDetail';
import EditProfile from '@src/screens/EditProfile';
import JoinScheme from '@src/screens/JoinPlanScreen';
import TransactionsScreen from '@src/screens/MyTransactions';
import PaymentScreen from '@src/screens/Payment';
import NotificationScreen from '@src/screens/Notifications';
import useAuthStore from '@src/hooks/useAuthStore';
import firebase from '@react-native-firebase/app';
import '@src/utility/i18n'; // This import initializes i18next
import { useTranslation } from 'react-i18next';
import useLanguageStore from '@src/hooks/useLanguageStore';


const Stack = createNativeStackNavigator();

function App() {
  // Get the isLoggedIn state from your Zustand store
  const { isLoggedIn } = useAuthStore();
    const { t, i18n } = useTranslation(); // In your app, use the real useTranslation()

 useEffect(()=>{
  i18n.changeLanguage(useLanguageStore.getState().language)
 },[])
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false // Hides the default header for all screens
        }}
      >
        {isLoggedIn ? (
          // --- User is Logged IN ---
          // Show the main app screens, with the Bottom Tab navigator as the entry point
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
            {/* OTPScreen might still be needed here for actions like "Forgot MPIN" */}
            <Stack.Screen name="OTPScreen" component={OTPScreen} />
          </>
        ) : (
          // --- User is Logged OUT ---
          // Show only the screens needed for authentication
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="OTPScreen" component={OTPScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
