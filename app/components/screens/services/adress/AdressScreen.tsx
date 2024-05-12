import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import tw from "twrnc";
import Footer from "../../Footer";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
const ServicesScreen = () => {
    const [fontsLoaded] = useFonts({
        "SFProDisplay-Regular": require("../../../../../assets/fonts/SF-Pro-Display-Regular.otf"),
    });

    if (!fontsLoaded) {
        return <View />; // Или отобразите экран загрузки
    }
    const navigation = useNavigation();

    return (
        <>
            <View style={[tw`flex-1 justify-center items-center bg-white `]}>
                <View style={tw`w-full px-4`}>
                    <View style={tw`mb-6`}>
                        <Text
                            style={[
                                tw`text-[40px] font-bold text-center`,
                                { fontFamily: "SFProDisplay-Regular" },
                            ]}
                        >
                            Адреса
                        </Text>
                    </View>

                    <View
                        style={tw`flex-col bg-white pb-4 rounded-[36px] mb-4 shadow-lg`}
                    >
                        <View>
                            <Text
                                style={tw`text-lg font-bold pt-3 text-center text-[#101D8E]`}
                            >
                                История заряда
                            </Text>
                            <View
                                style={tw`flex-row justify-center gap-2 mt-2`}
                            >
                                <FontAwesome
                                    name="long-arrow-left"
                                    size={18}
                                    color="black"
                                />
                                <Text style={tw`text-center`}>май 2024</Text>
                                <FontAwesome
                                    name="long-arrow-right"
                                    size={18}
                                    color="black"
                                />
                            </View>
                        </View>
                        <View style={tw`flex justify-start mt-4 `}>
                            <View>
                                <Text style={tw`ml-10 `}>
                                    Потреблено, кВт*ч
                                </Text>
                                <Text style={tw`pt-1 pb-2 ml-10  font-bold`}>
                                    20,09 кВт*ч
                                </Text>
                            </View>
                            <View style={tw`border-t-[1px] border-slate-200`}>
                                <Text style={tw`ml-10 pt-2`}>Потрачено, ₽</Text>
                                <Text style={tw`pt-1 pb-2 ml-10 font-bold`}>
                                    356,09 ₽
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={tw`border-t-[1px] border-slate-200`}
                                onPress={() =>
                                    navigation.navigate("AdressScreen")
                                }
                            >
                                <View style={tw``}>
                                    <Text style={tw`ml-10 pt-2  `}>
                                        Места зарядки
                                    </Text>
                                    <View
                                        style={tw`flex justify-between flex-row pr-5`}
                                    >
                                        <Text
                                            style={tw`pt-1 pb-2 ml-10 font-bold`}
                                        >
                                            Адреса
                                        </Text>
                                        <FontAwesome
                                            name="long-arrow-right"
                                            size={18}
                                            color="black"
                                        />
                                    </View>

                                    <View
                                        style={tw`pb-5 border-t-[1px] border-slate-200`}
                                    ></View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <View style={tw`mt-30`}>
                            <Text style={tw`text-gray-400 text-center`}>
                                Назад
                            </Text>
                            <FontAwesome
                                name="long-arrow-left"
                                size={20}
                                color="gray"
                                style={tw`text-center`}
                                onPress={() =>
                                    navigation.navigate("ServicesScreen")
                                }
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <Footer />
        </>
    );
};

export default ServicesScreen;
