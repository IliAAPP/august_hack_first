import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { doc, onSnapshot } from '@firebase/firestore';
import { AuthContext } from '../../../providers/AuthProvider'; 
import Layout from '../../layout/Layout';
import Footer from '../Footer';
import { auth, db, login, logout, register } from '../../../utils/firebase'

interface UserData {
  fullName: string;
  phone: string;
  email: string;
  imageUrl?: string; 
}

interface UserData {
  fullName: string;
  phone: string;
  email: string;
  imageUrl?: string; 
}


const ProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState<UserData>({
    fullName: '',
    phone: '',
    email: '',
    imageUrl: '../../../../assets/profile_man_user.jpg' // Путь к изображению по умолчанию
  });

  useEffect(() => {
    if (user && user.uid) { // Используем user.uid вместо user._id
      const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (documentSnapshot) => {
        const userData = documentSnapshot.data() as UserData; // Приведение типа к UserData
        if (userData) {
          setProfileData(userData); // Обновление состояния данными пользователя
        }
      });
  
      return () => unsubscribe(); // Отписка от слушателя при размонтировании компонента
    }
  }, [user]);


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
                <Image source={{ uri: profileData.imageUrl }} style={{ width: 70, height: 70, borderRadius: 40 }}  />
                <View style={{ flexDirection: 'column', marginLeft: 20, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 5 }}>{profileData.fullName}</Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>{profileData.phone}</Text>
                  <Text style={{ fontSize: 12, color: 'gray' }}>{profileData.email}</Text>
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
              <TouchableHighlight underlayColor="#DDDDDD" onPress={() => console.log('Конфиденциальность pressed')} style={styles.button}>
                <>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../../../assets/konf.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                    <Text style={styles.buttonText}>Конфиденциальность</Text>
                  </View>
                  <View style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: 'gray' }}></View>
                </>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="#DDDDDD" onPress={() => console.log('Чат поддержки pressed')} style={styles.button}>
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
