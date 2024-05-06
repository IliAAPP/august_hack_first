import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList, Keyboard } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { markers } from './markers';
import Footer from '../screens/Footer';

type MarkerType = {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
  name: string;
};

const INITIAL_REGION = {
  latitude: 45.0355,
  longitude: 38.975,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1
};

export default function Map() {
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredMarkers = markers.filter((marker) => 
    marker.name.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={focusMap}>
          <View style={{ padding: 10 }}>
            <Text>Focus</Text>
          </View>
        </TouchableOpacity>
      )
    });
  }, []);

  const focusMap = () => {
    const KrasnodarCenter: MarkerType = {
      latitude: 45.04484,
      longitude: 38.97603,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
      name: 'Krasnodar'
    };
  };

  const onMarkerSelected = (marker: MarkerType) => {
    Alert.alert(marker.name);
  };

  const calloutPressed = (ev: any) => {
    console.log(ev);
  };

  const onRegionChange = (region: Region) => {
    console.log(region);
  };

  const zoomIn = () => {
    const currentRegion = mapRef.current?.getCamera();
    currentRegion.then((camera) => {
      camera.zoom += 1;
      mapRef.current?.animateCamera(camera, { duration: 500 });
    });
  };

  const zoomOut = () => {
    const currentRegion = mapRef.current?.getCamera();
    currentRegion.then((camera) => {
      camera.zoom -= 1;
      mapRef.current?.animateCamera(camera, { duration: 500 });
    });
  };

  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => {
        setSearchText(item.name);
        setShowSuggestions(false);
        Keyboard.dismiss();
        mapRef.current?.animateToRegion({
          latitude: item.latitude,
          longitude: item.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 1000); 
      }}
    >
      <Text style={styles.suggestionText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.searchBar}
        placeholder="Поиск по адресу..."
        placeholderTextColor='white'
        onChangeText={(text) => {
          setSearchText(text);
          setShowSuggestions(true);
        }}
        value={searchText}
      />
      {showSuggestions && (
        <FlatList
          data={filteredMarkers}
          renderItem={renderSuggestionItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.suggestionsList}
        />
      )}
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        onRegionChangeComplete={onRegionChange}
      >
        {filteredMarkers.map((marker, index) => (
          <Marker
            key={index}
            title={marker.name}
            coordinate={marker}
            onPress={() => onMarkerSelected(marker)}
          >
            <Callout onPress={calloutPressed}>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 24 }}>Hello</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.zoomButtons}>
        <TouchableOpacity onPress={zoomIn} style={styles.zoomButton}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={zoomOut} style={styles.zoomButton}>
          <Text style={styles.zoomText}>—</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    fontSize: 18,
    margin: 10,
    marginTop: 40,
    padding: 10,
    backgroundColor: 'black',
    color:'white',
    borderRadius: 10,
    zIndex: 1
  },
  suggestionsList: {
    position: 'absolute',
    top: 80,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    zIndex: 2,
    maxHeight: 200, 
  },
  suggestionItem: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  suggestionText: {
    fontSize: 18,
    color: 'black',
  },
  zoomButtons: {
    position: 'absolute', // Используйте абсолютное позиционирование
    bottom: 50, // Отступ снизу
    right: 10, // Отступ справа
    padding: 10,
  },
  zoomButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    marginVertical: 5,
    width: 50,
    height: 50,
    borderRadius: 25, // Сделайте кнопки более круглыми
  },
  zoomText: {
    fontSize: 27,
    color: 'white',
  },
});
