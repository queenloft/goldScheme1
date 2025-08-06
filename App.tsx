
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false // Hides the default header for all screens
        }}
      >
         <Stack.Screen 
            name="MainApp" 
            component={AppTabs}
            options={{ headerShown: false }}
        />
        <Stack.Screen name="MyPlan" component={MyPlanScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
         <Stack.Screen name="JoinScheme" component={JoinScheme}  />

        <Stack.Screen name="Profile" component={ProfileScreen}  />
        <Stack.Screen name="ChangeMpin" component={ChangeMpinScreen}  />
                <Stack.Screen name="OTPScreen" component={OTPScreen}  />
<Stack.Screen name="SchemeDetail" component={GoldInvestmentTracker}  />
<Stack.Screen name="EditProfile" component={EditProfile}  />
<Stack.Screen name="MyTransactions" component={TransactionsScreen}  />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
