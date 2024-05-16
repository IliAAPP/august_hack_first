import React, { useState } from "react";
import { View, Text, Switch, FlatList, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Footer from "../Footer";

type Connector = {
    id: string;
    name: string;
    type: "AC" | "DC";
    icon: string;
    description: string;
};

const connectors: Connector[] = [
    {
        id: "1",
        name: "CHAdeMO",
        type: "DC",
        icon: "car-electric",
        description: "Любой, первой или второй ревизии",
    },
    {
        id: "2",
        name: "CCS Combo2",
        type: "DC",
        icon: "car-electric",
        description: "Типо - Европейский CCS/SAE Combo 2",
    },
    {
        id: "3",
        name: "Type 2",
        type: "AC",
        icon: "car-electric",
        description: "Типо - Европейский CCS/SAE Combo 2",
    },
    {
        id: "4",
        name: "GB/T DC",
        type: "DC",
        icon: "car-electric",
        description: "Китайский ГОСТовый Быстрый разъем",
    },
    {
        id: "5",
        name: "Type 1",
        type: "AC",
        icon: "car-electric",
        description: "J-1772",
    },
    {
        id: "6",
        name: "Type1/Type2(Multi)",
        type: "AC",
        icon: "car-electric",
        description: "Любой кабель, розетка или переходник",
    },
    {
        id: "7",
        name: "Розетка RU/EURO",
        type: "AC",
        icon: "power-plug",
        description:
            'Любая розетка 220/230 V на 16A, часто обозначается как "Евро" или "Шуко" (Штекер)',
    },
    {
        id: "8",
        name: "GB/T AC",
        type: "AC",
        icon: "car-electric",
        description: "Китайский ГОСТовый Быстрый разъем. Похож на Type2",
    },
    {
        id: "9",
        name: "Tesla Supercharger US",
        type: "DC",
        icon: "car-electric",
        description: "Для Американских машин с использованием NACS DC",
    },
    {
        id: "10",
        name: "5-pin 32A, красная",
        type: "AC",
        icon: "power-plug",
        description: "CEE-розетки 3 фазы, для грузовиков и автобусов",
    },
    {
        id: "11",
        name: "Красная (на три фазы)",
        type: "AC",
        icon: "power-plug",
        description:
            "Пока не рассортированные промышленные разъемы на три фазы",
    },
    {
        id: "12",
        name: "5-pin 16A, красная",
        type: "AC",
        icon: "power-plug",
        description: 'CEE-розетка "-6h" под три фазы',
    },
    {
        id: "13",
        name: "Tesla Supercharger Type 2",
        type: "DC",
        icon: "car-electric",
        description: "EU: с разъемом как Type 2 (есть в Сколково)",
    },
    {
        id: "14",
        name: "Type 3",
        type: "AC",
        icon: "car-electric",
        description:
            "IT/FR, Крайне редкие 1-/3- фазные разъемы семейства Scame",
    },
    {
        id: "15",
        name: "Tesla US",
        type: "AC",
        icon: "car-electric",
        description: "US: Американский медленный Wall/Mobile Charger NACS AC",
    },
    {
        id: "16",
        name: "CCS 1",
        type: "DC",
        icon: "car-electric",
        description: "Точно - Американский CCS/SAE Combo 1",
    },
    {
        id: "17",
        name: "CCS",
        type: "DC",
        icon: "car-electric",
        description: "Неопределенно CCS1 или CCS2",
    },
    {
        id: "18",
        name: "Синяя, 32A",
        type: "AC",
        icon: "power-plug",
        description: "Промышленная розетка Commando Mains Socket, CEE 3-pin",
    },
    {
        id: "19",
        name: "Синяя, 16A",
        type: "AC",
        icon: "power-plug",
        description: "Промышленная розетка Caravan Mains Socket, CEE 3-pin",
    },
    {
        id: "20",
        name: "4-pin 32A, красная",
        type: "AC",
        icon: "power-plug",
        description:
            'Редкая CEE-розетка с четырьмя штырьками "-6h" под три фазы',
    },
];

const App = () => {
    const [showAC, setShowAC] = useState(true);
    const [showDC, setShowDC] = useState(true);

    const filteredConnectors = connectors.filter(
        (connector) =>
            (showAC && connector.type === "AC") ||
            (showDC && connector.type === "DC")
    );

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Коннекторы</Text>
                    <View style={styles.switchContainer}>
                        <Text>AC</Text>
                        <Switch value={showAC} onValueChange={setShowAC} />
                        <Text>DC</Text>
                        <Switch value={showDC} onValueChange={setShowDC} />
                    </View>
                </View>
                <FlatList
                    data={filteredConnectors}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <MaterialCommunityIcons
                                name={item.icon}
                                size={24}
                                color="black"
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text
                                    style={[
                                        styles.type,
                                        item.type === "AC"
                                            ? styles.ac
                                            : styles.dc,
                                    ]}
                                >
                                    {item.type}
                                </Text>
                                <Text style={styles.description}>
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                    )}
                />
            </View>
            <Footer />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    header: {
        marginTop: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    textContainer: {
        marginLeft: 10,
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    type: {
        fontSize: 16,
        marginLeft: 10,
    },
    ac: {
        color: "#FFA800",
    },
    dc: {
        color: "green",
    },
    description: {
        fontSize: 14,
        color: "#666",
    },
});

export default App;
