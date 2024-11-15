import React, {useState} from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const Slider = ({ minVal, maxVal, values, onSliderChange}) => {

    return (
        <View style={styles.container}>
            {/* Displaying the slider values below the slider */}
            <View style={styles.valueContainer}>
                <View style={styles.valueBox}>
                    <Text style={styles.sliderValueText}>{minVal}</Text>
                </View>
                
                
                
                <View style={styles.valueBox}>
                    <Text style={styles.sliderValueText}>{maxVal}</Text>
                </View>
            </View>

            <MultiSlider
            min={minVal} // Minimum value
            max={maxVal} // Maximum value
            step={1} // Step size for the slider
            values={values} // Set initial values to the state
            onValuesChange={onSliderChange} // Handle slider change
            selectedStyle={{ backgroundColor: '#FF914D' }} // Selected slider color
            unselectedStyle={{ backgroundColor: '#e0e0e0' }} // Unselected slider color
            trackStyle={styles.trackStyle} // Custom track style
            markerStyle={styles.markerStyle} // Custom marker style
            pressedMarkerStyle={styles.pressedMarkerStyle} // Custom style for pressed markers
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    valueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Space out the min and max values
        width: '100%', // Ensure it spans the full width of the container
        paddingHorizontal: 10, // Optional padding for spacing from edges
        marginTop: 10, // Space between the values and the slider
    },
    valueBox: {
        //flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 60,
    },
    sliderSpacer:{
        flex: 1, // This takes up all available space between the two values
    }, 
    trackStyle: {
        height: 6, // Height of the track
        borderRadius: 3, // Rounded corners for the track
        backgroundColor: '#e0e0e0', // Unselected track color
    },
    markerStyle: {
        height: 20, // Height of the marker
        width: 20, // Width of the marker
        borderRadius: 10, // Circular marker
        backgroundColor: '#FF914D', // Marker color
        borderWidth: 2, // Border for the marker
        borderColor: '#fff', // Border color
        marginTop: 5, // Adjust the marker position so it's visually centered on the track
    },
    pressedMarkerStyle: {
        backgroundColor: '#FF914D', // Background color when marker is pressed
    },


});

export default Slider;