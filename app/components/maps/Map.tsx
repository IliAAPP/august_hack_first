import React, { useEffect, useRef } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        onRegionChangeComplete={onRegionChange}
      >
        {markers.map((marker, index) => (
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
    zoomButtons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRadius: 20,
        padding: 10
      },
  zoomButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    marginVertical: 5,
    width: 50,
    height: 50,
    borderRadius: 30
  },
  zoomText: {
    fontSize: 27,
    color: 'white',
    
  },
});
