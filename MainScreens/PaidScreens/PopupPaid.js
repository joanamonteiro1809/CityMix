// PopupPaid.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowButton from '../../GeneralElements/ArrowButton';
import sampleData from '../../sampledata';
import { getEvents, getRitaEvents } from '../../GeneralElements/asyncStorage';
import { saveEvents, saveRitaEvents } from '../../GeneralElements/asyncStorage';
import dayjs from 'dayjs';

const PopupPaid = ({ navigation, route }) => {

    const sampleTour = {
        title: 'Visit São Jorge Castle',
        tourGuide: 'Rúben Santos',
        location: 'Castelo',
        time: '3:30 PM',
        date: '2024-10-24',
        location: 'Belém',
    };

    const selectedDate = route.params?.selectedDate || sampleTour.date; 

    const selectedTime  = route.params?.selectedTime || sampleTour.time;
    const title = route.params?.title || sampleTour.title;
    const guide = route.params?.guide || sampleTour.tourGuide;
    const location = route.params?.location || sampleTour.location;

    const activeProf = (sampleData.currentUser.role == 'tour_guide') ? 'GuideProfile' : 'NormalProfile';


    // Function to add event to AsyncStorage
    const addEventToStorage = async () => {
        try {

            // Create a new event object
            const newEvent = {
                id: Date.now().toString(),
                title,
                date: selectedDate,
                time: selectedTime,
                location,
            };
            if(sampleData.currentUser.role == 'tour_guide'){
                // Retrieve existing events from AsyncStorage
                const existingEvents = await getEvents();

                // Add the new event to the existing events array
                const updatedEvents = [...existingEvents, newEvent];

                // Save the updated events list to AsyncStorage
                await saveEvents(updatedEvents);
            } else {
                // Retrieve existing events from AsyncStorage
                const existingEvents = await getRitaEvents();

                // Add the new event to the existing events array
                const updatedEvents = [...existingEvents, newEvent];

                // Save the updated events list to AsyncStorage
                await saveRitaEvents(updatedEvents);
            }
        } catch (error) {
            console.error('Failed to add event to AsyncStorage:', error);
        }
    };

    // Trigger event saving when the popup is shown
    useEffect(() => {
        addEventToStorage();
    }, [title, guide, selectedDate, selectedTime]);

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
                            <Text style={styles.dateTimeText}>{dayjs(selectedDate).format('MMMM D, YYYY')}</Text>
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
