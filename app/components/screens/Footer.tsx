import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.iconContainer}>
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
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#333',
    height: 60,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    color: '#fff',
  },
});

export default Footer;
