import { View, Text } from "react-native";
import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import Home from "../components/screens/profile/ProfileScreen";
import Auth from "../components/auth/Auth";
import Map from "../components/maps/Map";
import FilterScreen from "../components/screens/filters/FilterScreen";
import ProfileScreen from "../components/screens/profile/ProfileScreen";
import ChatScreen from "../components/screens/chat/ChatScreen";
import ServicesScreen from "../components/screens/services/ServicesScreen";
import AdressScreen from "../components/screens/services/adress/AdressScreen";
import tw from "twrnc";



const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <>
                    <Stack.Screen name="Map" component={Map}  />
                    <Stack.Screen name="ChatScreen" component={ChatScreen} />
                    <Stack.Screen name="ServicesScreen" component={ServicesScreen}  />
                    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                    <Stack.Screen name="FilterScreen" component={FilterScreen} />
                    <Stack.Screen name="AdressScreen" component={AdressScreen}/>
                {user ? (
          <>
            <Stack.Screen name="Map" component={Map} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={Auth} />
        )}</>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
