import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const LoadScreen = () => {
    const widthAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(widthAnimation, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: false,
            })
        ).start();
    }, []);

    const animatedWidth = widthAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"], // Анимация от 0% до 100% ширины
    });

    return (
        <LinearGradient
            colors={["#000000", "#0000FF", "#808080"]}
            style={styles.container}
        >
            <Text style={styles.logo}>E</Text>
            <View style={styles.loadingBar}>
                <Animated.View
                    style={[
                        styles.progressBar,
                        {
                            width: animatedWidth, // Изменение ширины вместо translateX
                        },
                    ]}
                >
                    <LinearGradient
                        colors={["#ADD8E6", "#00008B"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={StyleSheet.absoluteFill} // Заполнение родительского элемента
                    />
                </Animated.View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        fontSize: 200,
        color: "#FFFFFF",
        fontWeight: "bold",
        marginBottom: 20,
    },
    loadingBar: {
        height: 10,
        width: 200,
        borderRadius: 5,
        overflow: "hidden",
        backgroundColor: "#D3D3D3", // Фоновый цвет для прогресс-бара
    },
    progressBar: {
        height: "100%",
        borderRadius: 5,
    },
});

export default LoadScreen;
