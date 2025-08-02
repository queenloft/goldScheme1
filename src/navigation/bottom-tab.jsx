import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import HomeScreen from '@src/screens/HomeScreen';
import ProfileScreen from '@src/screens/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {FONTS, COLORS, widthPercentageToDP,FONT_SIZES, heightPercentageToDP} from '@src/config/index'
import RenderIcon from '@src/components/icon';

const Tab = createBottomTabNavigator();

function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let IconComponent;
                    if (route.name === 'Home') IconComponent = "home";
                    else if (route.name === 'My Plan') IconComponent = "calendar";
                    else if (route.name === 'Join Plan') IconComponent = "plus";
                    else if (route.name === 'Profile') IconComponent = "user";
                    
                    return <RenderIcon name={IconComponent} color={color} size={focused ? 28 : 24} />;
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
