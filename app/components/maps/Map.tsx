import React, { useEffect, useRef, useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    FlatList,
    Keyboard,
} from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { markers } from "./markers";
import Footer from "../screens/Footer";
import { MaterialIcons } from "@expo/vector-icons";
type MarkerType = {
    latitude: number;
    longitude: number;
    latitudeDelta?: number;
    longitudeDelta?: number;
    name: string;
};

const INITIAL_REGION = {
    latitude: 45.0355,
    longitude: 38.975,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
};

export default function Map() {
    const mapRef = useRef(null);
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [userLocation, setUserLocation] = useState(null); // Добавлено для хранения местоположения пользователя

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Разрешение не предоставлено");
                return;
            }
            setHasLocationPermission(true);

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }); // Установка текущего местоположения пользователя
        })();
    }, []);

    const filteredMarkers = markers.filter((marker) =>
        marker.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const zoomIn = () => {
        const currentRegion = mapRef.current?.getCamera();
        currentRegion.then((camera) => {
            camera.zoom += 1;
            mapRef.current?.animateCamera(camera, { duration: 500 });
        });
    };

    const zoomOut = () => {
        const currentRegion = mapRef.current?.getCamera();
        currentRegion.then((camera) => {
            camera.zoom -= 1;
            mapRef.current?.animateCamera(camera, { duration: 500 });
        });
    };
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={focusMap}>
                    <View style={{ padding: 10 }}>
                        <Text>Focus</Text>
                    </View>
                </TouchableOpacity>
            ),
        });
    }, []);

    const focusMap = () => {
        const KrasnodarCenter: MarkerType = {
            latitude: 45.04484,
            longitude: 38.97603,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
            name: "Krasnodar",
        };
        mapRef.current?.animateToRegion({
            latitude: KrasnodarCenter.latitude,
            longitude: KrasnodarCenter.longitude,
            latitudeDelta: KrasnodarCenter.latitudeDelta,
            longitudeDelta: KrasnodarCenter.longitudeDelta,
        });
    };

    const onMarkerSelected = (marker: MarkerType) => {
        Alert.alert(marker.name);
    };

    const calloutPressed = (ev: any) => {
        console.log(ev);
    };

    const showUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Нет разрешения на использование геолокации");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        mapRef.current?.animateToRegion(
            {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            1000
        );
    };

    const renderSuggestionItem = ({ item }) => (
        <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => {
                setSearchText(item.name);
                setShowSuggestions(false);
                Keyboard.dismiss();
                mapRef.current?.animateToRegion(
                    {
                        latitude: item.latitude,
                        longitude: item.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    },
                    1000
                );
            }}
        >
            <Text style={styles.suggestionText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            <TextInput
                style={styles.searchBar}
                placeholder="Поиск по адресу..."
                placeholderTextColor="white"
                onChangeText={(text) => {
                    setSearchText(text);
                    setShowSuggestions(true);
                }}
                value={searchText}
            />
            {showSuggestions && (
                <FlatList
                    data={filteredMarkers}
                    renderItem={renderSuggestionItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.suggestionsList}
                />
            )}
            <MapView
                style={StyleSheet.absoluteFillObject}
                initialRegion={INITIAL_REGION}
                showsUserLocation={hasLocationPermission}
                showsMyLocationButton={false}
                provider={PROVIDER_GOOGLE}
                ref={mapRef}
            >
                {filteredMarkers.map((marker, index) => (
                    <Marker
                        key={index}
                        title={marker.name}
                        coordinate={marker}
                        onPress={() => onMarkerSelected(marker)}
                    >
                        <MaterialIcons
                            name="electric-car"
                            size={34}
                            color="black"
                        />
                        <Callout onPress={calloutPressed}>
                            <View style={{ padding: 0 }}>
                                <Text style={{ fontSize: 6 }}>Hello</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.rightCenterButtons}>
                <TouchableOpacity onPress={zoomIn} style={styles.zoomButton}>
                    <Text style={styles.zoomText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={zoomOut} style={styles.zoomButton}>
                    <Text style={styles.zoomText}>—</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={showUserLocation}
                    style={styles.locationButton}
                >
                    <Text style={styles.locationButtonText}>📍</Text>
                </TouchableOpacity>
            </View>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        fontSize: 18,
        margin: 10,
        marginTop: 40,
        padding: 10,
        backgroundColor: "black",
        color: "white",
        borderRadius: 10,
        zIndex: 1,
    },
    suggestionsList: {
        position: "absolute",
        top: 80,
        left: 10,
        right: 10,
        backgroundColor: "white",
        zIndex: 2,
        maxHeight: 200,
    },
    suggestionItem: {
        backgroundColor: "white",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
    },
    suggestionText: {
        fontSize: 18,
        color: "black",
    },
    rightCenterButtons: {
        position: "absolute",
        bottom: "50%",
        right: 10,
        flexDirection: "column",
        alignItems: "center",
    },
    locationButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        marginVertical: 5,
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    locationButtonText: {
        fontSize: 24,
        color: "white",
    },
    zoomButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        marginVertical: 5,
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    zoomText: {
        fontSize: 27,
        color: "white",
    },
});
