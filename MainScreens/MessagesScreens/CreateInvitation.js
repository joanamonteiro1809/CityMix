// CreateInvitation.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ArrowButton from '../../GeneralElements/ArrowButton';
import dayjs from 'dayjs';
import CalendarPicker from '../../GeneralElements/CalendarPicker';
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateInvitation = ({ navigation, route }) => {

// Date picker
    const [date, setDate] = useState(null); // Store the selected date
    const [showCalendar, setShowCalendar] = useState(false); // Track visibility of CalendarPicker

    // Toggle CalendarPicker visibility
    const handleToggleCalendar = () => {
        setShowCalendar((prev) => !prev); // Toggle showCalendar state
    };

    // Function to handle date selection without hiding the calendar
    const handleDateChange = (newDate) => {
        setDate(newDate); // Set selected date
    };

//Time Picker
    const [time, setTime] = useState(''); // Store the selected time
    const [showTimePicker, setShowTimePicker] = useState(false); // Track visibility of TimePicker

    // Track visibility of TimePicker
    const handleToggleTimepicker = () => {
        setShowTimePicker((prev) => !prev);
    };

    const handleTimeChange = (_, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setTime(dayjs(selectedTime).format('HH:mm')); // Format time as "HH:mm"
        }
    };

// Meeting Point picker
    const [meetingPoint, setMeetingPoint] = useState(''); // Store the selected time

    const handleMeetingPChange = (text) => {
        setMeetingPoint(text);
    };

// Validate input
    const isFieldInvalid = (field) => isSubmitted && !field;
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = () => {
        if (!date || !time || !meetingPoint) return false;
        return true;
    };

    const handleNext = () => {
        setIsSubmitted(true);
        if (validate()) {
            //navigation.navigate('');
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
                        <Text style={[styles.input, isFieldInvalid(date) && styles.inputError]}>
                            {date ? dayjs(date).format('MMMM D, YYYY') : 'Select Date'}
                        </Text>
                        <Icon name="calendar-month" size={24} color="#555" />
                    </View>
                </TouchableOpacity>
                {isFieldInvalid(date) && <Text style={styles.errorText}>Date is required.</Text>}
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
                        <Text style={[styles.input, isFieldInvalid(time) && styles.inputError]}>
                                {time ? time : 'Select Time'}
                            </Text>
                        <Icon name="access-time" size={24} color="#555" />
                    </View>
                </TouchableOpacity>
                {isFieldInvalid(time) && <Text style={styles.errorText}>Time is required.</Text>}
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
                        <TextInput 
                            style={[styles.input, isFieldInvalid(meetingPoint) && styles.inputError]} 
                            placeholder="Select a location" 
                            placeholderTextColor="#aaa"
                            value={meetingPoint}
                            onChangeText={handleMeetingPChange}
                        />
                        <TouchableOpacity>
                            <Icon name="location-pin" size={24} color="#555" />
                        </TouchableOpacity>
                    </View>
                    {isFieldInvalid(meetingPoint) && <Text style={styles.errorText}>Meeting point is required.</Text>}
            </View>       
        </View>
    );

    return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        //keyboardVerticalOffset={5} // Adjust based on your app's header height
        >
            <View style={styles.container}>
                <View style={styles.popup}>
                    
                    {/* Header */}
                    <View style={styles.header}>
                        <ArrowButton onPress={() => navigation.goBack()} iconName="close" />
                    </View>

                    {/* Scrollable Content */}
                    <FlatList
                        data={[]}
                        renderItem={null}
                        ListHeaderComponent={renderContent}
                        contentContainerStyle={styles.scrollContainer}
                    />

                    <TouchableOpacity onPress={handleNext}>
                            <TouchableOpacity onPress={() => navigation.popTo('IndividualMessage', {date: dayjs(date).format('D-MMM'), time: time, meetingPoint: meetingPoint})}style={styles.button}>
                                <Text style={styles.buttonText}>Create Invite</Text>
                            </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
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
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 10,
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
