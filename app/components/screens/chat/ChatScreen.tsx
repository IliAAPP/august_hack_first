import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
} from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

// Импортируйте локальные аватары
const avatar1 = require('../../../../assets/avatar_chat1.jpg'); // Убедитесь, что путь к изображению корректен
const avatar2 = require('../../../../assets/avatar_chat2.jpg'); // Убедитесь, что путь к изображению корректен

interface Message {
    id: string;
    text: string;
    user: {
        name: string;
        avatar: any; // Локальные аватары с использованием `any`
    };
    isUserMessage?: boolean;
}

const initialMessages: Message[] = [
    {
        id: "1",
        text: "Добрый день, как вам удобно...",
        user: {
            name: "Вы",
            avatar: avatar1,
        },
        isUserMessage: true,
    },
    {
        id: "2",
        text: "В каком формате вы хотите получить ответ?",
        user: {
            name: "Работодатель",
            avatar: avatar2,
        },
    },
    {
        id: "3",
        text: "Добрый день! Получили ваш запрос.",
        user: {
            name: "Работодатель",
            avatar: avatar2,
        },
    },
];

const ChatScreen: React.FC = () => {
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState<Message[]>(initialMessages);

    const handleSendMessage = () => {
        if (inputText.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                text: inputText,
                user: {
                    name: "Вы",
                    avatar: avatar1,
                },
                isUserMessage: true,
            };
            setMessages((prevMessages) => [newMessage, ...prevMessages]);
            setInputText("");
        }
    };

    const renderMessageItem = ({ item }: { item: Message }) => {
        const messageStyle = item.isUserMessage
            ? [tw`items-end`, styles.messageContainerRight]
            : tw`items-start`;

        return (
            <View style={[tw`flex-row mb-2`, messageStyle]}>
                <Image
                    source={item.user.avatar}
                    style={[
                        tw`w-10 h-10 rounded-full`,
                        item.isUserMessage ? { marginRight: 5 } : { marginLeft: 5 }, // Увеличиваем отступ на 3 пикселя
                    ]}
                />
                <View style={tw`max-w-3/4`}>
                    {item.isUserMessage && (
                        <Text style={tw`text-sm text-gray-600`}>
                            {item.user.name}
                        </Text>
                    )}
                    <View
                        style={[
                            tw`flex-row`,
                            item.isUserMessage && {
                                justifyContent: "flex-end",
                            },
                        ]}
                    >
                        <Text
                            style={[
                                tw`text-base bg-white p-2 rounded-lg`
                            ]}
                        >
                            {item.text}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-gray-100`}>
            <View style={tw`flex-1 p-4`}>
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMessageItem}
                    inverted
                />
            </View>
            <View style={tw`flex-row items-center border rounded-md p-2`}>
                <TextInput
                    style={tw`flex-1 h-10 bg-white px-4 rounded-full`}
                    onChangeText={setInputText}
                    value={inputText}
                    placeholder="Напишите сообщение..."
                />
                <TouchableOpacity
                    onPress={() => setInputText(inputText + "😊")}
                >
                    <Text style={tw`text-2xl mx-2`}>😊</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSendMessage}>
                    <Ionicons name="send" size={24} color="blue" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    messageContainerRight: {
        flexDirection: "row-reverse",
    },
});

export default ChatScreen;
