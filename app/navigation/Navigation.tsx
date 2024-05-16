import React, { FC, useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoadScreen from "../components/screens/load/LoadScreen"; // Импортируем экран загрузки
import Auth from "../components/auth/Auth";
import Home from "../components/screens/profile/ProfileScreen";
import Map from "../components/maps/Map";
import FilterScreen from "../components/screens/filters/FilterScreen";
import ProfileScreen from "../components/screens/profile/ProfileScreen";
import ChatScreen from "../components/screens/chat/ChatScreen";
import ServicesScreen from "../components/screens/services/ServicesScreen";
import AdressScreen from "../components/screens/services/adress/AdressScreen";
import Confidentiality from "../components/screens/confidentiality/Confidentiality";
import FilterDeepScreen from "../components/screens/filters/FilterDeepScreen";
import CompanyScreen from "../components/screens/filters/CompanyScreen";
import { useAuth } from "../hooks/useAuth";

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Имитация загрузки данных
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Время загрузки в миллисекундах
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false, animation: "none" }}
            >
                {isLoading ? ( // Показываем экран загрузки, пока isLoading === true
                    <Stack.Screen name="LoadScreen" component={LoadScreen} />
                ) : user ? ( // Если пользователь авторизован, показываем стандартные экраны
                    <>
                        <Stack.Screen name="Map" component={Map} />
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen
                            name="ChatScreen"
                            component={ChatScreen}
                        />
                        <Stack.Screen
                            name="ServicesScreen"
                            component={ServicesScreen}
                        />
                        <Stack.Screen
                            name="ProfileScreen"
                            component={ProfileScreen}
                        />
                        <Stack.Screen
                            name="FilterScreen"
                            component={FilterScreen}
                        />
                        <Stack.Screen
                            name="AdressScreen"
                            component={AdressScreen}
                        />
                        <Stack.Screen
                            name="Confidentiality"
                            component={Confidentiality}
                        />
                        <Stack.Screen
                            name="FilterDeepScreen"
                            component={FilterDeepScreen}
                        />
                        <Stack.Screen
                            name="CompanyScreen"
                            component={CompanyScreen}
                        />
                    </>
                ) : (
                    // Если пользователь не авторизован, показываем экран авторизации
                    <Stack.Screen name="Auth" component={Auth} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
