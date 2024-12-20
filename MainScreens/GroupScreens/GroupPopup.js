// GroupPopup.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import sampleData from "../../sampledata";
import { useNavigation } from "@react-navigation/native";

const GroupPopup = ({title, location, numMembers }) => {

    const navigation = useNavigation();

    const handleCreateInvitePress = () => {
        // Quando clico no Join Community vou para o group chat
    };

    const handleMoreDetailsPress = () => {
        const group = sampleData.group.find(group => group.title === title);
        navigation.navigate('GroupEntry', {group: group});
    };

    return (
        <View>
            <View>
                {/* Title */}
                <Text style={styles.title}>{title}</Text>

                {/* Location*/}
                <View style={styles.locationContainer}>
                    <Icon name="location-pin" size={24} color="#555" style={{marginRight: 5}} />
                    <Text style={{fontFamily: 'CodecPro-Regular',}}>{location}</Text>
                </View>

                {/* Number of members*/}
                <View style={styles.locationContainer}>
                    <Icon name="group" size={24} color="#555" style={{marginRight: 5}}/>
                    <Text style={{fontFamily: 'CodecPro-Regular',}}>{numMembers}</Text>
                </View>
            </View>

            <TouchableOpacity onPress={handleCreateInvitePress}>
                    <TouchableOpacity style={styles.button} onPress={handleMoreDetailsPress}>
                        <Text style={styles.buttonText}>More details</Text>
                    </TouchableOpacity>
            </TouchableOpacity>
        </View>
        
    );
};

const styles = StyleSheet.create({

    header: {
        position: 'absolute',
        top: 10,
        right: 10,
    },

    title: {
        fontSize: 25,
        fontFamily: 'CodecPro-Bold',
        color: '#333',
        marginBottom: 5,
        textAlign: 'center',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    }, 

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
        fontFamily: 'CodecPro-Bold',
        color: '#fff',
        fontSize: 15,
        paddingHorizontal: 10,
        textAlign: 'center',
    },
});


export default GroupPopup;
