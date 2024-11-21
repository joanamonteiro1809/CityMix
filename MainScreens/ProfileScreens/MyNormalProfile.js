import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native'; // Import this hook
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TabControl from '../../GeneralElements/TabControl';
import CalendarPicker from '../../GeneralElements/CalendarPicker';
import dayjs from 'dayjs';
import { getRitaEvents } from '../../GeneralElements/asyncStorage';

const { width, height } = Dimensions.get('window');

const sampleEvents = [
    { id: '1', date: '16 Oct', title: 'Meetup with Ana', time: '14:00', location: 'Torre de Belém' },
    { id: '2', date: '14 Oct', title: 'Bla', time: '11:00', location: 'Lisboa' },
    // Add more sample events here
];

const MyNormalProfile = ({ navigation, route }) => {
    const initialTab = route.params?.tabSelected || "Events";
    const [activeTab, setActiveTab] = useState(initialTab); // Default tab
    const [isAvailable, setIsAvailable] = useState(true); // Availability toggle state
    
    // Calendar state
    const [date, setDate] = useState(null); // Store the selected date

    // Function to handle date selection without hiding the calendar
    const handleDateChange = (newDate) => {
        setDate(newDate); // Set selected date
    };

    const toggleAvailability = () => {
        console.log("Availability toggled");
        setIsAvailable(!isAvailable);
    };

    const [events, setEvents] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchEvents = async () => {
                const storedEvents = await getRitaEvents();
                setEvents(storedEvents); 
            };
            fetchEvents();
        }, [])
    );

    const renderEventItem = ({ item }) => (
        <View style={styles.eventCard}>
            <Text style={styles.eventDate}>{formatDate(item.date)}</Text>
            <View>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <View>
                    <Text style={styles.eventSubtitle}>{item.time} • {item.location}</Text>
                </View>
            </View>
        </View>
    );

    const formatDate = (date) => {
        if (!date) return null;
        const selectedDate = dayjs(date).format('D MMM');
        return selectedDate;
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'About':
                return (
                    <View style={styles.aboutSection}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.sectionText}>Hi, I'm Rita and I'm passionate about traveling and gastronomy. I love exploring the food that each country has to offer.</Text>
                        <Text style={styles.sectionTitle}>Interests</Text>
                        <Text style={styles.sectionText}>Food</Text>
                        <Text style={styles.sectionTitle}>Reviews</Text>
                        <FlatList
                            data={[
                                { id: '1', reviewer: 'Maria Carvalho', review: 'The guide was very friendly and sociable.', rating: 5 },
                                { id: '2', reviewer: 'José Silva', review: 'Lovely experience, but a bit overpriced.', rating: 4 },
                            ]}
                            renderItem={({ item }) => (
                                <View style={styles.reviewCard}>
                                    <Text style={styles.reviewerName}>{item.reviewer}</Text>
                                    <Text style={styles.reviewText}>{item.review}</Text>
                                    <View style={styles.ratingContainer}>
                                        <Text style={styles.ratingText}>{item.rating}</Text>
                                        <Icon name="star" size={16} color="#f2b636" />
                                    </View>
                                </View>
                            )}
                            keyExtractor={(item) => item.id}
                            horizontal={true} 
                            showsHorizontalScrollIndicator={false} 
                            contentContainerStyle={styles.reviewsList}
                        />
                    </View>
                );

            case 'Calendar':

                const filteredEvents = date
                ? events.filter(event => formatDate(event.date) === formatDate(date)) 
                : []; 

                return (
                    <View style={styles.calendarSection}>
                        {/* Calendar Picker */}
                        <CalendarPicker date={date} onDateChange={handleDateChange}/>
                        
                        {filteredEvents.length > 0 ? (
                            <FlatList
                                data={filteredEvents}
                                renderItem={renderEventItem}
                                keyExtractor={item => item.id}
                                style={styles.eventsList}
                            />
                        ) : (
                            <View style={styles.noEventsPlaceholder}>
                                <Text>No events on this date</Text>
                            </View>
                        )}

                    </View>
                );

            case 'Events':

            const today = dayjs(); 
                
                const formattedEvents = events.map(event => ({
                    ...event,
                    eventDate: dayjs(event.date, 'YYYY-MM-DD'), 
                }));
                
                const futureEvents = formattedEvents
                    .filter(event => event.eventDate.isAfter(today, 'day'))
                    .sort((a, b) => a.eventDate - b.eventDate); 
                const pastEvents = formattedEvents
                    .filter(event => !event.eventDate.isAfter(today, 'day'))
                    .sort((a, b) => b.eventDate - a.eventDate); 
                
                return (
                    <View style={styles.eventsSection}>
                        <Text style={styles.sectionTitle}>Future Events</Text>
                        <FlatList
                            data={futureEvents}
                            renderItem={renderEventItem}
                            keyExtractor={(item) => item.id}
                        />
                        <Text style={styles.sectionTitle}>Past Events</Text>
                        <FlatList
                            data={pastEvents}
                            renderItem={renderEventItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                );
            
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {/* Profile Header */}
            <View style={styles.profileHeader}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}style={styles.logoutButton}>
                    <Icon name={'logout'} size={26} color={'red'}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image 
                        source={require('../../assets/Rita.jpg')} 
                        style={styles.profileImage} 
                    />
                </TouchableOpacity>                
                <Text style={styles.profileName}>Rita, 25</Text>
                <Text style={styles.profileLocation}>Lisboa</Text>
                <TouchableOpacity style={styles.availabilityContainer} onPress={toggleAvailability}>
                    <Text style={styles.availabilityText}>Available</Text>
                    <Icon 
                        name={isAvailable ? "toggle-on" : "toggle-off"} 
                        size={24} 
                        color={isAvailable ? "green" : "gray"} 
                    />
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <TabControl 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                tabs={['Events', 'Calendar', 'About']}
            />

            {/* Tab Content */}
            <FlatList
                data={[{ key: 'tabContent' }]} 
                renderItem={() => <>{renderTabContent()}</>}
                keyExtractor={(item) => item.key}
                contentContainerStyle={styles.tabContentContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: width * 0.05,
        backgroundColor: '#f2u839',
    },
    profileHeader: {
        alignItems: 'center',
        marginTop: height * 0.1,
    },
    logoutButton:{
        position: 'absolute',
        right: 0
    }, 
    profileImage: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: (width * 0.3) / 2, 
        marginBottom: 10,
    },
    profileName: {
        fontSize: width * 0.07, 
        fontWeight: 'bold',
        marginTop: height * 0.01, 
        color: '#000',
    },
    profileLocation: {
        marginTop: 5,
        color: '#888'
    },
    availabilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.01,
        marginBottom: height * 0.01,
    },
    availabilityText: {
        fontSize: 18,
        marginRight: 8,
    },
    tabContentContainer: {
        flexGrow: 1,
        //paddingBottom: height * 0.02, 
        backgroundColor: '#ffeadd',
        padding: 10,
        borderRadius: 20, 
        marginBottom: 20,
        //marginHorizontal: width * 0.01,
        width: width * 0.9,
        marginTop: 10,
    },
    aboutSection: {
        flex: 1,
    },
    calendarSection: {
        flex: 1,
    },
    eventsSection: {
        padding: width * 0.03,
        //marginBottom: height * 0.5,
    },
    sectionTitle: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 15,
    },
    sectionText: {
        fontSize: width * 0.04,
        color: '#555',
        marginBottom: 20,
    },
    reviewPlaceholder: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: height * 0.01,
    },
    eventsList: {
        marginTop: height * 0.01,
    },
    eventCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: width * 0.04,
        borderRadius: width * 0.02,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: height * 0.01,
        
    },
    eventDate: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: '#f2b636',
        marginRight: width * 0.03,
    },
    eventTitle: {
        fontWeight: 'bold',
        fontSize: width * 0.04,
        
    },
    eventSubtitle: {
        color: '#888',
        fontSize: width * 0.035,
    },
    pastEventsPlaceholder: {
        marginTop: height * 0.01,
        alignItems: 'center',
    },
    noEventsPlaceholder:{
        alignItems: 'center',
        paddingBottom: 10,
    },

    reviewsList: {
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    
    reviewCard: {
        backgroundColor: '#fff',
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginHorizontal: 10,
        width: width * 0.55, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, 
    },
    
    reviewerName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    
    reviewText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    ratingText: {
        fontSize: 14,
        marginRight: 5,
        color: '#FF914D',
    },
});

export default MyNormalProfile;
