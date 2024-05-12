import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Switch, TouchableOpacity, TouchableHighlight } from 'react-native';
import Footer from '../Footer';
import Layout from '../../layout/Layout';
import { Slider } from '@rneui/base';

// interface FilterScreenProps {
//   value: number;
// }

const FilterScreen = () => {
  const [power, setPower] = useState(0);
  const [isFastCharging, setIsFastCharging] = useState(false);
  const [isSlowCharging, setIsSlowCharging] = useState(false);

  const handlePowerChange = (value: number) => {
    setPower(value);
  };

  const toggleFastCharging = () => {
    setIsFastCharging(true);
    setIsSlowCharging(false);
  };

  const toggleSlowCharging = () => {
    setIsFastCharging(false);
    setIsSlowCharging(true);
  };

  return (
    <View style={{ backgroundColor: '#F8F8FF', width: '100%', height: '100%' }}>
      <Layout>
        <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: '#F8F8FF' }}>
          <View>
            <Text style={{ fontSize: 30, textAlign: 'center', marginVertical: 10, marginBottom: 50 }}>Фильтры</Text>
          </View>

          <View style={{ backgroundColor: 'white', width: '90%', marginLeft: 20, borderRadius: 30, padding: 15, paddingHorizontal: 20 }}>
            <Text style={{ color: '#101D8E', fontSize: 24, textAlign: 'center', marginVertical: 15, marginBottom: 50 }}>Выбор мощности</Text>
            <View style={styles.container}>
              <Slider
                style={styles.slider}
                minimumValue={2}
                maximumValue={20}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#000000"
                thumbStyle={styles.thumb}
                value={power}
                onValueChange={handlePowerChange}
              />
              <Text>{`${power.toFixed(2)} КВт * ч`}</Text>
            </View>

            <View style={{ marginTop: 50, marginLeft: 10 }}>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../../../assets/green_battery.jpg')} style={{ width: 30, height: 30 }} />
                  <Text style={{ fontWeight: '300', fontSize: 16, marginLeft: 10 }}>Только быстрая зарядка</Text>
                </View>
                <Switch
                  trackColor={{ false: "#767577", true: "green" }}
                  thumbColor={isFastCharging ? "#white" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleFastCharging}
                  value={isFastCharging}
                />
              </View>
              <View style={{ marginBottom: 10, borderTopWidth: 1, borderTopColor: 'gray' }}></View>

              {/* Переключатель "Только медленная зарядка" */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../../../assets/yellow_battery.jpg')} style={{ width: 30, height: 30, }} />
                  <Text style={{ fontWeight: '300', fontSize: 16, marginLeft: 10 }}>Только медленная зарядка</Text>
                </View>
                <Switch
                  trackColor={{ false: "#767577", true: "green" }}
                  thumbColor={isSlowCharging ? "#white" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSlowCharging}
                  value={isSlowCharging}
                />
              </View>
              <View style={{ marginBottom: 10, borderTopWidth: 1, borderTopColor: 'gray' }}></View>

              {/* Прочие фильтры */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../../../assets/cord.png')} style={{ width: 30, height: 30 }} />
                  <Text style={{ fontWeight: '300', fontSize: 16, marginLeft: 10 }}>Коннекторы</Text>
                </View>
                <TouchableOpacity>
                  <Text style={{ color: '#101D8E', fontSize: 12, textAlign: 'center' }}>Выбрать</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginVertical: 10, borderTopWidth: 1, borderTopColor: 'gray' }}></View>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../../../assets/downloading.jpg')} style={{ width: 30, height: 30, }} />
                  <Text style={{ fontWeight: '300', fontSize: 16, marginLeft: 10 }}>Статус станции</Text>
                </View>
                <TouchableHighlight>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#49A13A', fontSize: 11, marginRight: 10 }}>Свободно</Text>
                    <Text style={{ color: '#CB6A25', fontSize: 11 }}>Занято</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={{ marginBottom: 10, borderTopWidth: 1, borderTopColor: 'gray' }}></View>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../../../assets/people.jpg')} style={{ width: 30, height: 30 }} />
                  <Text style={{ fontWeight: '300', fontSize: 16, marginLeft: 10 }}>Компании</Text>
                </View>
                <TouchableOpacity>
                  <Text style={{ color: '#101D8E', fontSize: 12, textAlign: 'center' }}>Выбрать</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginBottom: 50, borderTopWidth: 1, borderTopColor: 'gray', marginTop: 10 }}></View>
            </View>
          </View>
        </View>
      </Layout>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: 300,
    height: 40,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'blue',
  },
});

export default FilterScreen;
