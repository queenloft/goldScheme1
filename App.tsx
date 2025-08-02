
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabs from '@src/navigation/bottom-tab';
import HomeScreen from '@src/screens/HomeScreen';
import LoginScreen from '@src/screens/LoginScreen';
import ProfileScreen from '@src/screens/ProfileScreen';

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

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Profile" component={ProfileScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
