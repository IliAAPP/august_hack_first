import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';


const Footer = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.iconContainer}>
      <Icon
          name='chat'
          type='antdesign'
          color='#517fa4'
        />
        <Text style={styles.iconText}>Чат</Text>

      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Text style={styles.iconText}>Сервисы</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Text style={styles.iconText}>Карта</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Text style={styles.iconText}>Фильтры</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Text style={styles.iconText}>Профиль</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    // padding: 10,
    // paddingVertical: 10,
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#333',
    height: 60,
    overlayColor: 'black'
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'column',

  },
  iconText: {
    color: '#fff',
  },
});

export default Footer;
