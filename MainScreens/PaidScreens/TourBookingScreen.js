// TourBookingScreen.js --> Page for booking and paying the tour
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ArrowButton from '../../GeneralElements/ArrowButton';
import CalendarPicker from '../../GeneralElements/CalendarPicker';
import dayjs from 'dayjs';
import TimePicker from '../../GeneralElements/TimePicker';

const TourBookingScreen = ({ navigation, route }) => {
    const sampleTour = {
        id: '1',
        title: 'Visit São Jorge Castle',
        price: '20€',
        rating: '4.0',
        tourGuide: 'Rúben Santos',
        description: 'Come visit the principal castle of Lisbon.',
        meetingPoint: 'Castelo',
        routeStops: ["Torre de Belém", "Mosteiro dos Jerónimos", "Pastéis de Belém"],
        availableTimes: ["10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00"],
    };

    const tour = route.params?.tour || sampleTour;

    const [date, setDate] = useState(null); // Store the selected date
    const [showCalendar, setShowCalendar] = useState(false); // Track visibility of CalendarPicker
    
    const[time, setTime] = useState(null); // Store the selected time
    const [showTime, setShowTime] = useState(false); // Track visibility of TimePicker

    // Toggle CalendarPicker visibility
    const handleToggleCalendar = () => {
        setShowCalendar((prev) => !prev); // Toggle showCalendar state
    };

    // Toggle TimePicker visibility
    const handleToggleTime = () => {
        setShowTime((prev) => !prev); // Toggle showCalendar state
    };

    // Function to handle date selection without hiding the calendar
    const handleDateChange = (newDate) => {
        setDate(newDate); // Set selected date
    };

    // Function to handle time selection
    const handleTimeChange = (newTime) => {
        setTime(newTime); // Set selected time
    };

// VALIDATE INPUT
    const isFieldInvalid = (field) => isSubmitted && !field;
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = () => {
        if (!date || !time ) return false;
        return true;
    };

    // Function to validate inputs before navigating to the PopupPaid screen
    const handleNext = () => {
        setIsSubmitted(true);
        if (validate()) {
            navigation.navigate("PopupPaid", 
                {selectedDate: dayjs(date).format('YYYY-MM-DD'), 
                    selectedTime: time,
                    title: tour.title, 
                    guide: tour.tourGuide,
                    location: tour.routeStops[0]});
        }
    };

    const renderContent = () => (
        <View style={styles.infoCard}>

            {/* Guide info */}
            <View style={styles.infoContainer}>
                <Text style={styles.sectionTitle}>Guide:</Text>
                <Text style={styles.infoText}>{tour.tourGuide}</Text>
                <Icon name="account-circle" size={24} color="#555" />
            </View>

            {/* Date Input */}
            <View style={styles.infoContainer}>
                <Text style={styles.sectionTitle}>Date:</Text>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={handleToggleCalendar}>
                    <Text style={[styles.input, isFieldInvalid(date) && styles.inputError]}>
                        {date ? dayjs(date).format('MMMM D, YYYY') : 'MMMM D, YYYY'}
                    </Text>
                    <Icon name="calendar-month" size={24} color="#555" />
                </TouchableOpacity>
            </View>
            {isFieldInvalid(date) && <Text style={styles.errorText}>Date is required.</Text>}

            {/* Conditionally render CalendarPicker */}
            {showCalendar && (
                <CalendarPicker date={date} onDateChange={handleDateChange} disableMode={true} />
            )}

            {/* Time Input */}
            <View style={styles.selectContainer}>
                <Text style={styles.sectionTitle}>Time:</Text>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}onPress={handleToggleTime}>
                    <Text style={[styles.input, isFieldInvalid(time) && styles.inputError]}>
                        {time ? time : '00:00'}
                    </Text>
                    <Icon name="access-time" size={24} color="#555" />
                </TouchableOpacity>
            </View>
            {isFieldInvalid(time) && <Text style={styles.errorText}>Time is required.</Text>}

            {/* Conditionally render TimePicker */}
            {showTime && (
                <View style={styles.calendarPickerContainer}>
                    <TimePicker timeSelected={time} availableTimes={tour.availableTimes} onTimeSelect={handleTimeChange} />
                </View>
            )}

            {/* Meeting Point */}
            <View style={styles.infoContainer}>
                <Text style={styles.sectionTitle}>Meeting Point:</Text>
                <Text style={styles.infoText}>{tour.routeStops[0]}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            
            {/* Header */}
            <View style={styles.header}>
                <ArrowButton onPress={() => navigation.goBack()} iconName="chevron-left" />
                <Text style={styles.headerTitle}>{tour.title}</Text>
            </View>

            {/* Using FlatList for the main content */}
            <FlatList
                data={[{ key: 'content' }]} // Single item to render all content
                renderItem={renderContent}
                keyExtractor={(item) => item.key}
                ListFooterComponent={() => (
                    <>
                        <View style={styles.priceContainer}>
                            <Text style={styles.totalPriceText}>Total Price: {tour.price}€</Text>
                        </View>
                        <TouchableOpacity style={styles.payButton} onPress={handleNext}>
                            <Text style={styles.payButtonText}>Pay</Text>
                        </TouchableOpacity>
                    </>
                )}
                contentContainerStyle={{ paddingHorizontal: 15, paddingVertical:20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 35,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        //marginBottom: 15,
        padding: 10,
        backgroundColor: '#FF914D',
    },
    headerTitle: {
        fontSize: 20,
        marginLeft: 15,
        fontFamily: 'CodecPro-ExtraBold',
        color: '#ffff',
    },
    infoCard: {
        backgroundColor: '#f7f7f7',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 20,
        marginHorizontal: 5,
    },
    expandedInfoCard: {
        minHeight: 300, // Adjust to ensure enough space when CalendarPicker is visible
    },
    sectionTitle: {
        fontSize: 20,
        color: '#333',
        marginRight: 10,
        fontFamily: 'CodecPro-Bold',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 18,
        color: '#555',
        marginRight: 10,
        fontFamily: 'CodecPro-Regular',
    },
    selectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical:10,
    },
    input: {
        paddingVertical:10,
        backgroundColor: '#e9e9e9',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 18,
        color: '#aaa',
        marginRight: 5,
        fontFamily: 'CodecPro-Regular',
    },    
    priceContainer: {
        backgroundColor: '#fff7e5',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 0.5,
        borderColor: '#FF914D',
        marginHorizontal: 5,
    },
    totalPriceText: {
        fontSize: 18,
        color: '#333',
        fontFamily: 'CodecPro-Bold',
    },
    payButton: {
        backgroundColor: '#FF914D',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'CodecPro-Bold',
    },
    // Red border when missing input
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
});

export default TourBookingScreen;
