import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const tasks = [
  { title: 'Разнорабочий', date: '01.08, с 8:00 до 17:00', payment: '3 000 ₽', points: '+30' },
  { title: 'Разнорабочий', date: '23.07-26.07, с 8:00 до 17:00', payment: '12 000 ₽', points: '+120' },
  { title: 'Разнорабочий', date: '22.07, с 9:00 до 18:00', payment: '2 500 ₽', points: '+25' },
  { title: 'Монтажник', date: '21.07, с 8:00 до 18:00', payment: '7 000 ₽', points: '+70' },
  { title: 'Разнорабочий', date: '19.07, с 9:00 до 18:00', payment: '3 000 ₽', points: '+30' },
  { title: 'Монтажник', date: '17.07, с 10:00 до 20:00', payment: '5 000 ₽', points: '+50' },
];

const TaskItem = ({ title, date, payment, points }) => (
  <View style={styles.taskItem}>
    <View style={styles.taskInfo}>
      <Text style={styles.taskTitle}>{title}</Text>
      <Text style={styles.taskDate}>{date}</Text>
    </View>
    <View style={styles.taskPayment}>
      <Text style={styles.payment}>{payment}</Text>
      <Text style={styles.points}>{points}</Text>
    </View>
  </View>
);

const TaskTabs = ({ activeTab, setActiveTab }) => (
  <View style={styles.segmentedControl}>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'История' && styles.activeTab]}
      onPress={() => setActiveTab('История')}
    >
      <Text style={[styles.tabText, activeTab === 'История' && styles.activeTabText]}>История</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'В обработке' && styles.activeTab]}
      onPress={() => setActiveTab('В обработке')}
    >
      <Text style={[styles.tabText, activeTab === 'В обработке' && styles.activeTabText]}>В обработке</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'В работе' && styles.activeTab]}
      onPress={() => setActiveTab('В работе')}
    >
      <Text style={[styles.tabText, activeTab === 'В работе' && styles.activeTabText]}>В работе</Text>
    </TouchableOpacity>
  </View>
);

const TasksScreen = () => {
  const [activeTab, setActiveTab] = useState('История');

  return (
    <ScrollView style={styles.container}>
      <TaskTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'История' && (
        <View style={styles.centeredView}>
        <Image source={require('../../../assets/v_obrabotke1.png')} style={styles.image} />
        <Image source={require('../../../assets/v_obrabotke2.png')} style={styles.image} />
        <Image source={require('../../../assets/v_obrabotke3.png')} style={styles.image} />
      </View>
      )}
      {activeTab === 'В обработке' && (
        <View style={styles.centeredView}>
          <Image source={require('../../../assets/v_obrabotke2.png')} style={styles.image} />
          <Image source={require('../../../assets/v_obrabotke3.png')} style={styles.image} />
        </View>
      )}
      {activeTab === 'В работе' && (
        <View style={styles.centeredView}>
        <Image source={require('../../../assets/v_obrabotke3.png')} style={styles.image} />
      </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 30,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#e0f7ff',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10

  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    backgroundColor: '#59A9CC',
    borderRadius: 20,
  },
  tabText: {
    color: '#59A9CC',
    fontWeight: 'bold',
    fontSize: 18
  },
  activeTabText: {
    color: '#fff',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 17,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  taskInfo: {
    flexDirection: 'column',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDate: {
    fontSize: 14,
    color: '#888',
  },
  taskPayment: {
    alignItems: 'flex-end',
  },
  payment: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  points: {
    fontSize: 14,
    color: '#f1c40f',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400, // Adjust width as needed
    height: 285, // Adjust height as needed
    resizeMode: 'contain',
    borderRadius: 5,
    
  },
  centeredText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#59A9CC',
  },
});

export default TasksScreen;
