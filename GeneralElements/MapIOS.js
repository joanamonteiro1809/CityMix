import React from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Image } from 'react-native';
import sampleData from '../sampledata';
import ArrowButton from './ArrowButton'; // Make sure path is correct
import GroupPopup from '../MainScreens/GroupScreens/GroupPopup';

const initialRegion = {
    latitude: 38.688098053260575,
    longitude: -9.156535305731573,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
};

const MapIOS = ({ navigation }) => {

    const onMarkerSelected = (marker) => {
        // Alert or log marker title
        // console.log(marker.title)
    };

    const calloutPressed = (marker) => {
        console.log('Title:', marker.title);
        console.log('Num:', marker.numPeopl);
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

            {/* Map View */}
            <MapView
                style={StyleSheet.absoluteFillObject} // Take up the whole screen
                initialRegion={initialRegion}
            >
                {
                    sampleData.group.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={marker}
                            title={marker.title}
                            pinColor='#FF914D'
                            onPress={() => onMarkerSelected(marker)} 
                        >
                            {/* Community banner */}
                            <Callout onPress={() => calloutPressed(marker)}>
                                <GroupPopup
                                    title={marker.title}
                                    location={marker.location}
                                    numMembers={marker.numPeopl}
                                />
                            </Callout>
                        </Marker>
                    ))
                }
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Fill the entire screen
    },
    map: {
        width: '100%',
        height: '100%',
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

export default MapIOS;
