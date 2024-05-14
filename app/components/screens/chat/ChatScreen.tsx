import React, { useState, useRef, useEffect } from "react";
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
import Footer from "../Footer";

interface Message {
    id: string;
    text: string;
    user: {
        name: string;
        avatar: string;
    };
    isUserMessage?: boolean;
}

const initialMessages: Message[] = [
    {
        id: "1",
        text: "Привет всем, как дела?",
        user: {
            name: "Анна Иванова",
            avatar: "https://via.placeholder.com/50",
        },
    },
    {
        id: "2",
        text: "Всё отлично, спасибо!",
        user: {
            name: "Игорь Николаев",
            avatar: "https://via.placeholder.com/50",
        },
    },
    {
        id: "3",
        text: "Не забудьте проверить новое обновление системы.",
        user: {
            name: "Елена Петрова",
            avatar: "https://via.placeholder.com/50",
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
                    avatar: "https://via.placeholder.com/50",
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
                {item.isUserMessage && (
                    <Image
                        source={{ uri: item.user.avatar }}
                        style={tw`w-10 h-10 rounded-full mr-2`}
                    />
                )}
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
                {!item.isUserMessage && (
                    <Image
                        source={{ uri: item.user.avatar }}
                        style={tw`w-10 h-10 rounded-full ml-2`}
                    />
                )}
            </View>
        );
    };

    return (
      <>
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
        <Footer/>
        </>
    );
};

const styles = StyleSheet.create({
    messageContainerRight: {
        flexDirection: "row-reverse",
    },
});

export default ChatScreen;
