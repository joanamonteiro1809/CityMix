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
    };

    const tour = route.params?.tour || sampleTour;

    const [date, setDate] = useState(null); // Store the selected date
    const [showCalendar, setShowCalendar] = useState(false); // Track visibility of CalendarPicker
    
    const[time, setTime] = useState(null); // Store the selected time
    const [showTime, setShowTime] = useState(false); // Track visibility of TimePicker

    const availableTimes = ["10:00", "11:00", "12:00", "13:00", "14:00"];

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
                <Text style={styles.input}>
                    {date ? dayjs(date).format('MMMM D, YYYY') : 'MMMM D, YYYY'}
                </Text>
                <TouchableOpacity onPress={handleToggleCalendar}>
                    <Icon name="calendar-month" size={24} color="#555" />
                </TouchableOpacity>
            </View>

            {/* Conditionally render CalendarPicker */}
            {showCalendar && (
                <CalendarPicker date={date} onDateChange={handleDateChange} />
            )}

            {/* Time Input */}
            <View style={styles.selectContainer}>
                <Text style={styles.sectionTitle}>Time:</Text>
                <Text style={styles.input}>
                    {time ? time : '00:00'}
                </Text>
                <TouchableOpacity onPress={handleToggleTime}>
                    <Icon name="access-time" size={24} color="#555" />
                </TouchableOpacity>
            </View>

            {/* Conditionally render TimePicker */}
            {showTime && (
                <View style={styles.calendarPickerContainer}>
                    <TimePicker timeSelected={time} availableTimes={availableTimes} onTimeSelect={handleTimeChange} />
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
                            <Text style={styles.totalPriceText}>Total Price: {tour.price}</Text>
                        </View>
                        <TouchableOpacity style={styles.payButton}>
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
        backgroundColor: '#f2b636',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
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
        marginBottom: 20,
        marginHorizontal: 5,
    },
    expandedInfoCard: {
        minHeight: 300, // Adjust to ensure enough space when CalendarPicker is visible
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 10,
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
    },    
    priceContainer: {
        backgroundColor: '#fff7e5',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#f2b636',
        marginHorizontal: 5,
    },
    totalPriceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    payButton: {
        backgroundColor: '#f2b636',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TourBookingScreen;
