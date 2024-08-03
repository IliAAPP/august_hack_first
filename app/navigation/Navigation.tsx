import React, { FC, useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadScreen from "../components/screens/load/LoadScreen";
import Auth from "../components/auth/Auth";
import Home from "../components/home/Home";
import Map from "../components/maps/Map";
import ProfileScreen from "../components/screens/profile/ProfileScreen";
import ChatScreen from "../components/screens/chat/ChatScreen";
import { useAuth } from "../hooks/useAuth";
import FilterScreen from "../components/FiltersVacancy/FiltersVacancy"; // Assuming you have this screen
import TasksScreen from "../components/TasksScreen/TasksScreen"; // Ensure this path is correct

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Map') {
            iconName = 'map';
          } else if (route.name === 'Tasks') {
            iconName = 'tasks'; // Or another icon that fits
          } else if (route.name === 'Chat') {
            iconName = 'comments';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#59A9CC',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} /> 
    </Tab.Navigator>
  );
};

const Navigation: FC = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
                {isLoading ? (
                    <Stack.Screen name="LoadScreen" component={LoadScreen} />
                ) : user ? ( 
                    <>
                        <Stack.Screen name="HomeTabs" component={HomeTabs} />
                        <Stack.Screen name="FiltersScreen" component={FilterScreen} /> 
                    </>
                ) 
                : (
                    <Stack.Screen name="Auth" component={Auth} />
                )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
