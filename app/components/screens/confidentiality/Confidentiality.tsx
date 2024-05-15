import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import Layout from '../../layout/Layout';
import Footer from '../Footer';

const Confidentiality = () => {
    const [showChangeName, setShowChangeName] = useState(false); // Состояние для отображения/скрытия плашки изменения имени
    const [newName, setNewName] = useState(''); // Состояние для хранения нового имени пользователя

    const handleNameChange = () => {
        setShowChangeName(!showChangeName); // Переключение состояния при нажатии на "Изменить имя"
    };

    const handleChangeName = () => {
        // Обработка изменения имени пользователя
        // Здесь вы можете добавить логику сохранения нового имени в базу данных или хранилище
        console.log('New name:', newName);
        setShowChangeName(false); // Скрыть плашку после сохранения
        setNewName(''); // Очистить состояние нового имени
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#F8F8FF', flex: 1 }}>
                <Layout>
                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.title}>Конфиденциальность</Text>
                        </View>

                        <View style={styles.content}>
                            <TouchableHighlight underlayColor="transparent" onPress={handleNameChange}>
                                <View style={styles.item}>
                                    <Text style={styles.itemText}>Изменить имя</Text>
                                </View>
                            </TouchableHighlight>

                            {showChangeName && (
                                <View style={styles.changeNameContainer}>
                                    <TextInput
                                        style={styles.input}
                                        value={newName}
                                        onChangeText={text => setNewName(text)}
                                        placeholder="Введите новое имя"
                                    />
                                    <TouchableHighlight underlayColor="#DDDDDD" onPress={handleChangeName} style={styles.changeButton}>
                                        <Text style={styles.changeButtonText}>Сохранить</Text>
                                    </TouchableHighlight>
                                </View>
                            )}

<View>
                                    <Text style={{fontSize: 18, marginTop: 20, fontWeight: '500'}}>Изменить номер телефона</Text>
                                    <View style={{ marginTop: 20, borderTopWidth: 1, borderTopColor: 'gray', width: '100%' }}></View>
                                </View>

                                <View>
                                    <Text style={{fontSize: 18, marginTop: 20, fontWeight: '500'}}>Изменить почту</Text>
                                    <View style={{ marginTop: 20, borderTopWidth: 1, borderTopColor: 'gray', width: '100%' }}></View>
                                </View>

                                <View>
                                    <Text style={{fontSize: 18, marginTop: 20, fontWeight: '500'}}>Привязанные карты</Text>
                                    <View style={{ marginTop: 20, borderTopWidth: 1, borderTopColor: 'gray', width: '100%' }}></View>
                                </View>
                                
                                <View>
                                    <Text style={{fontSize: 16, marginTop: 150, marginBottom:60, textAlign: 'center', textDecorationLine: 'underline'}}>Политика конфеденциальности</Text>
                                </View>
                        </View>
                    </View>
                </Layout>
            </View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginVertical: 20,
        marginBottom: 30,
        fontWeight: '600',
    },
    content: {
        backgroundColor: 'white',
        flex: 1,
        marginLeft: 20,
        borderRadius: 30,
        padding: 15,
        paddingHorizontal: 20,
        width: '90%',
    },
    item: {
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    itemText: {
        fontSize: 18,
        fontWeight: '500',
    },
    changeNameContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        width: '100%',
    },
    changeButton: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 5,
    },
    changeButtonText: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default Confidentiality;
