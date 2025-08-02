import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import HomeScreen from '@src/screens/HomeScreen';
import ProfileScreen from '@src/screens/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {FONTS, COLORS, widthPercentageToDP,FONT_SIZES, heightPercentageToDP} from '@src/config/index'
import { 
    Home, 
    PiggyBank, 
    PlusSquare, 
    User, 
    Menu, 
    ArrowLeft,
    CircleDollarSign,
    Gem,
    Sparkles,
    HelpCircle,
    Landmark,
    Camera
} from 'lucide-react-native';
const Tab = createBottomTabNavigator();

function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let IconComponent;
                    if (route.name === 'Home') IconComponent = Home;
                    else if (route.name === 'My Plan') IconComponent = PiggyBank;
                    else if (route.name === 'Join Plan') IconComponent = PlusSquare;
                    else if (route.name === 'Profile') IconComponent = User;
                    
                    return <IconComponent color={color} size={focused ? 28 : 24} />;
                },
                tabBarActiveTintColor: COLORS.theme,
                tabBarInactiveTintColor: COLORS.textSecondary,
                tabBarStyle: { 
                    height: heightPercentageToDP('8%'),
                    paddingBottom: heightPercentageToDP('1%'),
                },
                tabBarLabelStyle: {
                    fontFamily: FONTS.PoppinsMedium,
                    fontSize: FONT_SIZES.small,
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export default AppTabs;
