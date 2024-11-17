// GroupPopup.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const GroupPopup = ({ title, location, numMembers }) => {

    const handleCreateInvitePress = () => {
        // Quando clico no Join Community vou para o group chat
    };

    return (
        <View>
            <View>
                {/* Title */}
                <Text style={styles.title}>{title}</Text>

                {/* Location*/}
                <View style={styles.locationContainer}>
                    <Icon name="location-pin" size={24} color="#555" style={{marginRight: 5}} />
                    <Text>{location}</Text>
                </View>

                {/* Number of members*/}
                <View style={styles.locationContainer}>
                    <Icon name="group" size={24} color="#555" style={{marginRight: 5}}/>
                    <Text>{numMembers}</Text>
                </View>
            </View>

            <TouchableOpacity onPress={handleCreateInvitePress}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Join community</Text>
                    </View>
            </TouchableOpacity>
        </View>
        
    );
};

const styles = StyleSheet.create({

    // Close button
    header: {
        position: 'absolute', // Position close button at the top right
        top: 10,
        right: 10,
    },
    // Community title
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        textAlign: 'center',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    }, 
    // Join community button
    button: {
        padding: 10,
        borderRadius: 25,
        backgroundColor: '#FF914D',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: 'center', // Prevent the button from stretching
        paddingHorizontal: 20, // Adjust for content-based width
        marginTop: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15,
        paddingHorizontal: 10,
        textAlign: 'center',
    },
});


export default GroupPopup;
