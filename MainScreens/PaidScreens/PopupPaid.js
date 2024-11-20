// PopupPaid.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowButton from '../../GeneralElements/ArrowButton';
import sampleData from '../../sampledata';
const PopupPaid = ({ navigation, route }) => {

    const sampleTour = {
        title: 'Visit São Jorge Castle',
        tourGuide: 'Rúben Santos',
        meetingPoint: 'Castelo',
        time: '3:30 PM',
        date: 'November, 24',
    };

    const selectedDate = route.params?.selectedDate || sampleTour.date; 

    const selectedTime  = route.params?.selectedTime || sampleTour.time;
    const title = route.params?.title || sampleTour.title;
    const guide = route.params?.guide || sampleTour.tourGuide;

    const activeProf = (sampleData.currentUser.role == 'tour_guide') ? 'GuideProfile' : 'NormalProfile';

    return (
        <View style={styles.container}>
            <View style={styles.popup}>
                {/* Header */}
                <View style={styles.header}>
                    <ArrowButton onPress={() => navigation.popTo("InYourArea")} iconName="close" />
                </View>

                {/*Info message */}
                <View  style={styles.messageContainer}>
                    <View style={styles.iconContainer}>
                        <Icon name="calendar-multiple-check" size={100} color='#ffc9a1' />
                    </View>
                    <Text style={styles.title}>You're All Booked!</Text>
                    <Text style={styles.info}>Thank you for choosing us. We're excited to make this a memorable experience for you!
                    </Text>
                    <View style={styles.tourDetails}>
                        <Text style={{fontSize: 18, marginBottom: 5, color:"#555"}}>{title}</Text>
                        <View style={styles.dateTimeContainer}>
                            <Text style={styles.dateTimeText}>{selectedTime}</Text>
                            <Text style={styles.dateTimeText}> | </Text>
                            <Text style={styles.dateTimeText}>{selectedDate}</Text>
                        </View>
                        <Text style={{fontSize: 18, marginBottom: 5, color:"#555"}}>{guide}</Text>
                    </View>
                    <TouchableOpacity onPress={()=> navigation.popTo(activeProf, { tabSelected: 'Calendar'})}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>My calendar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Full screen for the overlay
        justifyContent: 'center', // Center the popup vertically
        alignItems: 'center', // Center the popup horizontally
        //backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    },
    popup: {
        width: '90%', // Width of the popup
        maxWidth: 400, // Max width for larger screens
        backgroundColor: '#fff', // Background color of the popup
        borderRadius: 20, // Rounded corners
        padding: 25, // Padding inside the popup
        alignItems: 'center', // Center the content horizontally
        justifyContent: 'center', // Center the content vertically
        shadowColor: '#000', // Shadow for the popup
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // Shadow for Android
    },
    header: {
        position: 'absolute', // Position close button at the top right
        top: 10,
        right: 10,
    },
    iconContainer: {
        marginBottom: 10,
    },
    messageContainer: {
        alignItems: 'center', // Center all message components horizontally
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    info: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center', // Center-align the text
    },
    tourDetails: {
        alignItems: 'center', // Center all components horizontally
        padding: 10,
        marginBottom: 20,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    dateTimeText: {
        fontSize: 18,
        fontWeight: 'bold',
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
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15,
        paddingHorizontal: 10,
    },
});


export default PopupPaid;
