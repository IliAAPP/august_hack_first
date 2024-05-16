import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { useProfile } from '../../../components/screens/profile/useProfile';
import Layout from '../../layout/Layout';
import Footer from '../Footer';

const Confidentiality = () => {
    const { profile, setName, updateFullName, updatePhoneNumber, email, setEmail, updateEmail } = useProfile();
    const [showChangeName, setShowChangeName] = useState(false);
    const [showChangePhone, setShowChangePhone] = useState(false);
    const [showChangeEmail, setShowChangeEmail] = useState(false);
    const [newName, setNewName] = useState(profile.fullName || '');
    const [newPhone, setNewPhone] = useState(profile.phone || '');
    const [newEmail, setNewEmail] = useState(profile.email || '');

    const handleNameChange = () => {
        setShowChangeName(!showChangeName);
    };

    const handlePhoneChange = () => {
        setShowChangePhone(!showChangePhone);
    };

    const handleEmailChange = () => {
        setShowChangeEmail(!showChangeEmail);
    };

    const handleChangeName = async () => {
        await updateFullName(newName);
        setShowChangeName(false);
        setNewName('');
    };

    const handleChangePhone = async () => {
        await updatePhoneNumber(newPhone);
        setShowChangePhone(false);
        setNewPhone('');
    };

    const handleChangeEmail = async () => {
        await updateEmail(newEmail);
        setShowChangeEmail(false);
        setNewEmail('');
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#F8F8FF', flex: 1 }}>
                <Layout>
                    <View style={{ flex: 1 }}>
                        <View style={{ justifyContent: 'space-between' }}>
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

                                <TouchableHighlight underlayColor="transparent" onPress={handlePhoneChange}>
                                    <View style={styles.item}>
                                        <Text style={styles.itemText}>Изменить номер телефона</Text>
                                    </View>
                                </TouchableHighlight>

                                {showChangePhone && (
                                    <View style={styles.changeNameContainer}>
                                        <TextInput
                                            style={styles.input}
                                            value={newPhone}
                                            onChangeText={text => setNewPhone(text)}
                                            placeholder="Введите новый номер телефона"
                                        />
                                        <TouchableHighlight underlayColor="#DDDDDD" onPress={handleChangePhone} style={styles.changeButton}>
                                            <Text style={styles.changeButtonText}>Сохранить</Text>
                                        </TouchableHighlight>
                                    </View>
                                )}

                                <TouchableHighlight underlayColor="transparent" onPress={handleEmailChange}>
                                    <View style={styles.item}>
                                        <Text style={styles.itemText}>Изменить email</Text>
                                    </View>
                                </TouchableHighlight>

                                {showChangeEmail && (
                                    <View style={styles.changeNameContainer}>
                                        <TextInput
                                            style={styles.input}
                                            value={newEmail}
                                            onChangeText={text => setNewEmail(text)}
                                            placeholder="Введите новый email"
                                        />
                                        <TouchableHighlight underlayColor="#DDDDDD" onPress={handleChangeEmail} style={styles.changeButton}>
                                            <Text style={styles.changeButtonText}>Сохранить</Text>
                                        </TouchableHighlight>
                                    </View>
                                )}

                                <View>
                                    <Text style={{fontSize: 18, marginTop: 20, fontWeight: '500'}}>Привязанные карты</Text>
                                    <View style={{ marginTop: 20, borderTopWidth: 1, borderTopColor: 'gray', width: '100%' }}></View>
                                </View>

                                <View>
                                    <Text style={{fontSize: 16, marginTop: 150, marginBottom:60, textAlign: 'center', textDecorationLine: 'underline'}}>Политика конфеденциальности</Text>
                                </View>
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
