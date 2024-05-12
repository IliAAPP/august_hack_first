import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import {
    Feather,
    Ionicons,
    FontAwesome,
    MaterialIcons,
    AntDesign,
} from "@expo/vector-icons";

// Определение типа для параметра screenName
type ScreenName = "ChatScreen" | "ServicesScreen" | "Map" | "FilterScreen" | "ProfileScreen";

const Footer = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<Record<string, object>, string>>();

    const isActive = (screenName: ScreenName) => {
        return route.name === screenName;
    };

    // Функция для получения цвета в зависимости от активности экрана
    const getIconColor = (screenName: ScreenName) => {
        return isActive(screenName) ? "white" : "grey";
    };

    return (
        <View style={styles.footer}>
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => navigation.navigate("ChatScreen")}
            >
                <Ionicons
                    name="chatbubble-outline"
                    size={24}
                    color={getIconColor("ChatScreen")}
                />
                <Text
                    style={{
                        ...styles.iconText,
                        color: getIconColor("ChatScreen"),
                    }}
                >
                    Чат
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => navigation.navigate("ServicesScreen")}
            >
                <Feather
                    name="info"
                    size={24}
                    color={getIconColor("ServicesScreen")}
                />
                <Text
                    style={{
                        ...styles.iconText,
                        color: getIconColor("ServicesScreen"),
                    }}
                >
                    Сервисы
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => navigation.navigate("Map")}
            >
                <Feather name="map-pin" size={24} color={getIconColor("Map")} />
                <Text
                    style={{ ...styles.iconText, color: getIconColor("Map") }}
                >
                    Карта
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => navigation.navigate("FilterScreen")}
            >
                <Ionicons
                    name="filter"
                    size={24}
                    color={getIconColor("FilterScreen")}
                />
                <Text
                    style={{
                        ...styles.iconText,
                        color: getIconColor("FilterScreen"),
                    }}
                >
                    Фильтры
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => navigation.navigate("ProfileScreen")}
            >
                <AntDesign
                    name="user"
                    size={24}
                    color={getIconColor("ProfileScreen")}
                />
                <Text
                    style={{
                        ...styles.iconText,
                        color: getIconColor("ProfileScreen"),
                    }}
                >
                    Профиль
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        marginTop: "auto",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "black",
        height: 60,
    },
    iconContainer: {
        marginLeft: 15,
        alignItems: "center",
        flexDirection: "column",
    },
    iconText: {
        color: "#fff",
    },
});

export default Footer;
