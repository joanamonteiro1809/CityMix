import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import sampleData from '../sampledata';
import GroupPopup from '../MainScreens/GroupScreens/GroupPopup';
import ArrowButton from './ArrowButton';

const initialRegion = {
    latitude: 38.688098053260575,
    longitude: -9.156535305731573,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
};

const MapTest = ({navigation}) => {

    const [selectedMarker, setSelectedMarker] = useState(null);

    const handleMarkerPress = (marker) => {
        if (selectedMarker && selectedMarker.latitude === marker.latitude && selectedMarker.longitude === marker.longitude) {
            // Deselect the marker if it was already selected
            setSelectedMarker(null);
          } else {
            // Select a new marker
            setSelectedMarker(marker);
          }
    };
  
    const handleMapPress = () => {
        // Hide the banner when the user clicks anywhere on the map that isn't a marker
        setSelectedMarker(null);
      };

    const closeBanner = () => {
      setSelectedMarker(null);
    };
  
    return (
      <View style={styles.container}>

         {/* Arrow Button in front of the map */}
         <View style={styles.buttonContainer}>
                <ArrowButton
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    iconName="chevron-left"
                />
            </View>


        <MapView
          style={StyleSheet.absoluteFillObject} // Take up the whole screen
          initialRegion={initialRegion}
          onPress={handleMapPress} // This will handle the press anywhere on the map
        >
            {
                sampleData.group.map((marker, index) => (
                    <Marker
                            key={index}
                            coordinate={marker}
                            pinColor='#FF914D'
                            onPress={() => handleMarkerPress(marker)} 
                    ></Marker>
                ))
            }
          <Marker
            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
            onPress={() => handleMarkerPress({ latitude: 37.78825, longitude: -122.4324 })}
          />
        </MapView>
  
        {selectedMarker && (
          <View style={styles.banner}>
            <GroupPopup
                title={selectedMarker.title}
                location={selectedMarker.location}
                numMembers={selectedMarker.numPeopl}
            />
            <TouchableOpacity onPress={closeBanner}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1, // Fill the entire screen
    },
    banner: {
      position: 'absolute',
      bottom: 100,
      left: 20,
      right: 20,
      backgroundColor: 'white',
      padding: 15,
      borderRadius: 10,
      elevation: 5, // Adds shadow for Android
    },
    bannerText: {
      color: 'black',
    },
    closeButton: {
      marginTop: 10,
      color: 'blue',
      textAlign: 'right',
    },
    buttonContainer: {
      position: 'absolute', // Ensure it's positioned over the map
      zIndex: 100, // Bring the button to the front
      paddingTop: 20, // Add some space from the top
      paddingHorizontal: 20,
      paddingTop: 45,
  },
  backButton: {
      position: 'absolute',
      top: 10, // Adjust the distance from the top
      left: 10, // Adjust the distance from the left
      zIndex: 100, // Ensure it stays on top of the map
  }
  });
  

export default MapTest;
