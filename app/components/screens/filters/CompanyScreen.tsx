import React, { useState } from 'react';
import { View, Text, Switch, FlatList, StyleSheet, Image } from 'react-native';
import Footer from '../Footer';

type Company = {
  id: string;
  name: string;
  logo: string;
  isEnabled: boolean;
};

const companies: Company[] = [
  { id: '1', name: 'Нет названия', logo: '', isEnabled: false },
  { id: '2', name: 'Россети', logo: 'https://example.com/rosseti.png', isEnabled: false },
  { id: '3', name: 'ZEVS', logo: 'https://example.com/zevs.png', isEnabled: false },
  { id: '4', name: 'ItCharge', logo: 'https://example.com/itcharge.png', isEnabled: false },
  { id: '5', name: 'Brixby', logo: 'https://example.com/brixby.png', isEnabled: false },
  { id: '6', name: 'Пункт E', logo: 'https://example.com/punkt-e.png', isEnabled: true },
  { id: '7', name: 'eDrive', logo: 'https://example.com/edrive.png', isEnabled: false },
  { id: '8', name: 'Touch', logo: 'https://example.com/touch.png', isEnabled: false },
  { id: '9', name: 'НЭСК', logo: 'https://example.com/nesk.png', isEnabled: false },
  { id: '10', name: 'Sitronics Electro', logo: 'https://example.com/sitronics.png', isEnabled: true },
  { id: '11', name: 'ChargeNet', logo: 'https://example.com/chargenet.png', isEnabled: true },
  { id: '12', name: 'РСК Сети', logo: 'https://example.com/rsk-seti.png', isEnabled: false },
  { id: '13', name: 'Газпромнефть', logo: 'https://example.com/gazprom.png', isEnabled: false },
  { id: '14', name: 'Electro.cars', logo: 'https://example.com/electrocars.png', isEnabled: false },
  { id: '15', name: 'Green Drive', logo: 'https://example.com/greendrive.png', isEnabled: true },
];

const App = () => {
  const [companyList, setCompanyList] = useState(companies);

  const toggleSwitch = (id: string) => {
    setCompanyList((prevList) =>
      prevList.map((company) =>
        company.id === id ? { ...company, isEnabled: !company.isEnabled } : company
      )
    );
  };

  return (
    <>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Компании</Text>
      </View>
      <FlatList
        data={companyList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {item.logo ? (
              <Image source={{ uri: item.logo }} style={styles.logo} />
            ) : (
              <View style={styles.logoPlaceholder} />
            )}
            <Text style={styles.name}>{item.name}</Text>
            <Switch
              value={item.isEnabled}
              onValueChange={() => toggleSwitch(item.id)}
            />
          </View>
        )}
      />
    </View>
    <Footer/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginTop:20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  name: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
});

export default App;
