// PopupPaid.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ArrowButton from '../../GeneralElements/ArrowButton';
import dayjs from 'dayjs';
import CalendarPicker from '../../GeneralElements/CalendarPicker';
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateInvitation = ({ navigation, route }) => {

// Date picker
    const [date, setDate] = useState(null); // Store the selected date
    const [showCalendar, setShowCalendar] = useState(false); // Track visibility of CalendarPicker
    const [dateError, setDateError] = useState(false); // Error for date

    // Toggle CalendarPicker visibility
    const handleToggleCalendar = () => {
        setShowCalendar((prev) => !prev); // Toggle showCalendar state
    };

    // Function to handle date selection without hiding the calendar
    const handleDateChange = (newDate) => {
        setDate(newDate); // Set selected date
        setDateError(false); // Clear error when user selects a date
    };

//Time Picker
    const [time, setTime] = useState(''); // Store the selected time
    const [showTimePicker, setShowTimePicker] = useState(false); // Track visibility of TimePicker
    const [timeError, setTimeError] = useState(false); // Error for time

    // Track visibility of TimePicker
    const handleToggleTimepicker = () => {
        setShowTimePicker((prev) => !prev);
    };

    const handleTimeChange = (_, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setTime(dayjs(selectedTime).format('HH:mm')); // Format time as "HH:mm"
        }
        setTimeError(false); // Clear error when user selects a date
    };

// Meeting Point picker
    const [meetingPoint, setMeetingPoint] = useState(''); // Store the selected time
    const [meetingPointError, setMeetingPointError] = useState(false); // Error for time

    // Handle meeting point input change
    const handleMeetingPointChange = (text) => {
        setMeetingPoint(text);
        setMeetingPointError(false); // Clear error when user types
    };

    const handleCreateInvitePress = () => {
        if (!date || !time) {
            if (!date) setDateError(true);
            if (!time) setTimeError(true);
            if(!meetingPoint) setMeetingPointError(true);
        } else {
            /*navigation.navigate("PopupPaid", 
                {selectedDate: dayjs(date).format('MMMM D, YYYY'), 
                    selectedTime: time,
                    title: tour.title, 
                    guide: tour.tourGuide});*/
        }
    };


    const renderContent = () => (
        <View>
            {/* Title */}
            <Text style={styles.title}>Invite</Text>

            {/* Date Input */}
            <View style={styles.infoContainer}>
                <Text style={styles.sectionTitle}>Date</Text>
                <TouchableOpacity onPress={handleToggleCalendar}>
                    <View style={styles.selectionContainer}>
                        <Text style={[styles.input, dateError && styles.errorContainer]}>
                            {date ? dayjs(date).format('MMMM D, YYYY') : 'Select a Date'}
                        </Text>
                        <Icon name="calendar-month" size={24} color="#555" />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Conditionally Render Calendar */}
            {showCalendar && (
                <CalendarPicker date={date} onDateChange={handleDateChange} disableMode={true} />
            )}

            {/* Time Input */}
            <View style={styles.infoContainer}>
                <Text style={styles.sectionTitle}>Time</Text>
                <TouchableOpacity onPress={handleToggleTimepicker}>
                    <View style={styles.selectionContainer}>
                        <Text style={[styles.input, timeError && styles.errorContainer]}>
                                {time ? time : 'Select a Time'}
                            </Text>
                        <Icon name="access-time" size={24} color="#555" />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Conditionally Render TIme Picker */}
            {showTimePicker && (
                    <DateTimePicker
                        mode="time"
                        display= "spinner"
                        value={new Date()}
                        is24Hour={true}
                        onChange={handleTimeChange}
                    />
            )}

            {/* Meeting Point Input */}
            <View style={styles.infoContainer}>
                <Text style={styles.sectionTitle}>Meeting Point</Text>
                    <View style={styles.selectionContainer}>
                        <TextInput style={[styles.input, meetingPointError && styles.errorContainer]} placeholder="Enter Location" placeholderTextColor="#aaa"></TextInput>
                        <TouchableOpacity>
                            <Icon name="location-pin" size={24} color="#555" />
                        </TouchableOpacity>
                    </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.popup}>
                
                {/* Header */}
                <View style={styles.header}>
                    <ArrowButton onPress={() => navigation.navigate("InYourArea")} iconName="close" />
                </View>

                {/* Scrollable Content */}
                <FlatList
                    data={[]}
                    renderItem={null}
                    ListHeaderComponent={renderContent}
                    contentContainerStyle={styles.scrollContainer}
                />

                <TouchableOpacity onPress={handleCreateInvitePress}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Create Invite</Text>
                        </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Full screen for the overlay
        justifyContent: 'center', // Center the popup vertically
        alignItems: 'center', // Center the popup horizontally
    },
    popup: {
        width: '90%', // Width of the popup
        maxWidth: 400, // Max width for larger screens
        backgroundColor: '#fff', // Background color of the popup
        borderRadius: 20, // Rounded corners
        padding: 25, // Padding inside the popup
        shadowColor: '#000', // Shadow for the popup
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // Shadow for Android
    },
    // Close button
    header: {
        position: 'absolute', // Position close button at the top right
        top: 10,
        right: 10,
    },
    // Invite title
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        textAlign: 'center',
    },
    // Each selection section
    infoContainer: {
        marginBottom: 15,
    },
    selectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    }, 
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    input: {
        flex:1,
        paddingVertical:10,
        backgroundColor: '#e9e9e9',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 18,
        color: '#aaa',
        marginRight: 10,
    },
    // Red border when missing input
    errorContainer:{
        borderWidth: 2,
        borderColor: 'red',
    },
    // Create invite button
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
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15,
        paddingHorizontal: 10,
        textAlign: 'center',
    },
});


export default CreateInvitation;
