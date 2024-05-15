import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, ActivityIndicator, Linking } from 'react-native';
import { doc, onSnapshot } from '@firebase/firestore';
import { AuthContext } from '../../../providers/AuthProvider'; 
import Layout from '../../layout/Layout';
import Footer from '../Footer';
import Confidentiality from '../confidentiality/Confidentiality';
import { auth, db, login, logout, register } from '../../../utils/firebase'
import { useProfile } from './useProfile';
import { useNavigation } from '@react-navigation/native';


interface UserData {
  fullName: string;
  phone: string;
  email: string;
  imageUrl?: string; 
}

const ProfileScreen = () => {
  const { profile, isLoading } = useProfile(); // Используем хук useProfile для получения данных профиля

  // Если данные профиля загружаются, отобразим индикатор загрузки
  if (isLoading) {
    return <ActivityIndicator />;
  }
  const navigation = useNavigation();
  


  return (
    
    <View>
      <View style={{backgroundColor: '#F8F8FF', width: '100%', height: '100%', }}>
        <Layout >
          <View style={{ flex: 1, justifyContent: 'space-between'}}>
            <View>
              <Text style={{ fontSize: 30, textAlign: 'center', marginVertical: 10, marginBottom: 30 }}>Профиль</Text>
            </View>

            <View style={{backgroundColor: 'white', width: '90%', marginLeft: 20, borderRadius: 30, padding: 15, paddingHorizontal: 20}}>
              <View style={{ alignItems: 'flex-start', marginLeft: 20, flexDirection: 'row', marginTop: 20, marginBottom:20 }}>
                <Image source={require('../../../../assets/profile_man_user.jpg')} style={{ width: 70, height: 70, borderRadius: 40 }}  />
                <View style={{ flexDirection: 'column', marginLeft: 20, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 5 }}>{profile.fullName}</Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>{profile.phone}</Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>{profile.email}</Text>
                </View>
              </View>

              <View style={{ ...styles.menu, alignItems: 'flex-start' }}>
              <TouchableHighlight underlayColor="#DDDDDD" onPress={() => console.log('Мой авто pressed')} style={styles.button}>
                <>
                <View style={{ marginBottom: 10, borderTopWidth: 1, borderTopColor: 'gray' }}></View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../../../assets/my_car.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                    <Text style={styles.buttonText}>Мой авто</Text>
                  </View>
                  <View style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: 'gray' }}></View>
                </>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="#DDDDDD" onPress={() => console.log('Избранное pressed')} style={styles.button}>
                <>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../../../assets/favourite.jpg')} style={{ width: 20, height: 20, marginRight: 10 }} />
                    <Text style={styles.buttonText}>Избранное</Text>
                  </View>
                  <View style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: 'gray' }}></View>
                </>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="#DDDDDD" onPress={() => navigation.navigate('Confidentiality')} style={styles.button}>
                <>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../../../assets/konf.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                    <Text style={styles.buttonText}>Конфиденциальность</Text>
                  </View>
                  <View style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: 'gray' }}></View>
                </>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="white" onPress={() => Linking.openURL('tg://resolve?domain=iliaappolonov')} style={styles.button}>
                <>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../../../assets/chat.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                    <Text style={styles.buttonText}>Чат поддержки</Text>
                  </View>
                  <View style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: 'gray' }}></View>
                </>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="#DDDDDD" onPress={() => console.log('О приложении pressed')} style={styles.button}>
                <>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../../../assets/info.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                    <Text style={styles.buttonText}>О приложении</Text>
                  </View>
                  <View style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: 'gray' }}></View>
                </>
              </TouchableHighlight>
            </View>

            

            <View style={{ alignItems: 'center', marginTop: 80, marginBottom: 30 }}>
              <TouchableHighlight>
                <Text style={{color:'gray', marginBottom: 5}}>Выйти</Text>
              </TouchableHighlight>
              <TouchableHighlight>
                <Text style={{color:'#F08080'}}>Удалить аккаунт</Text>
              </TouchableHighlight>
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
  buttonText: {
    fontSize: 18,
  },
  menu: {
    marginVertical: 20,
  },
  button: {
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    height: 1,
    backgroundColor: 'black',
  },
});


export default ProfileScreen;
