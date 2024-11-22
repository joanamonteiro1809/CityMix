import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native'; // Import this hook
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TabControl from '../../GeneralElements/TabControl';
import CalendarPicker from '../../GeneralElements/CalendarPicker';
import sampleData from '../../sampledata'
import AsyncStorage from '@react-native-async-storage/async-storage'; // For persistence
import dayjs from 'dayjs';
import { getEvents } from '../../GeneralElements/asyncStorage';
import { saveEvents } from '../../GeneralElements/asyncStorage';

const { width, height } = Dimensions.get('window');

const sampleEvents = [
    { id: '1', date: '16 Oct', title: 'Meetup with Ana', time: '14:00', location: 'Torre de Belém' },
];

const TourGuideProfile = ({ navigation, route }) => {
    const [joaoTours, setJoaoTours] = useState([]);

    const [events, setEvents] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchEvents = async () => {
                const storedEvents = await getEvents();
                setEvents(storedEvents); // Ensure the state is updated with fresh data
            };
            fetchEvents();
        }, [])
    );

    useFocusEffect(
        React.useCallback(() => {
            const fetchTours = async () => {
                try {
                    const storedTours = await AsyncStorage.getItem('joaoTours');
                    if (storedTours) {
                        setJoaoTours(JSON.parse(storedTours));
                    } else {
                        setJoaoTours(sampleData.joaoTours); // Se não houver tours armazenados, use os de exemplo
                    }
                } catch (error) {
                    console.error('Error fetching tours:', error);
                }
            };
    
            fetchTours();
        }, [])
    );

    const initialTab = route.params?.tabSelected || "Events";
    const [activeTab, setActiveTab] = useState(initialTab);
    const [isAvailable, setIsAvailable] = useState(true);
    const [date, setDate] = useState(null);

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const toggleAvailability = () => {
        setIsAvailable(!isAvailable);
    };

 // Função para remover um tour
     const handleDeleteTour = async (tourId) => {
         try {
             // Remover o tour das listas em memória
             sampleData.joaoTours = sampleData.joaoTours.filter(tour => tour.id !== tourId);
             sampleData.paidTours = sampleData.paidTours.filter(tour => tour.id !== tourId);

             // Persistir as listas atualizadas no AsyncStorage
             await AsyncStorage.multiSet([
                 ['joaoTours', JSON.stringify(sampleData.joaoTours)],
                 ['paidTours', JSON.stringify(sampleData.paidTours)],
             ]);

             // Atualizar o estado local
             setJoaoTours(sampleData.joaoTours);

             Alert.alert('Success', 'The tour has been removed.');
         } catch (error) {
             console.error('Error removing tour:', error);
             Alert.alert('Error', 'Failed to delete the tour. Try again.');
         }
     };

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

    const ToursItem = ({ item, nav }) => (
        <View style={styles.tourCard}>
            {/* Navegar para os detalhes do Tour */}
            <TouchableOpacity 
                onPress={() => nav.navigate('TourDetails', { tour: item })} 
                style={styles.titleAndPhotoInline}
            >
                {/* Substituir com a imagem do tour */}
                <Image 
                    source={item.picture} // Altere para 'imageLink'
                    style={styles.tourImage}
                />

                <View style={styles.tourInfo}>
                    <Text style={styles.tourName}>{item.title}</Text>
                    <View style={styles.ratingContainer}>
                        {/* Exibir o número seguido por um símbolo da estrela */}
                        <Text style={styles.ratingText}>{item.rating}</Text>
                        <Image
                            source={require('../../assets/star.png')} // Estrela personalizada
                            style={styles.starIcon}
                        />
                    </View>
                </View>
            </TouchableOpacity>
            {/* Botão para deletar o Tour */}
            <TouchableOpacity onPress={() => handleDeleteTour(item.id)} style={styles.deleteButton}>
                <Icon name="delete" size={24} color="#000" />
            </TouchableOpacity>
        </View>
    );
    

    const renderTabContent = () => {
        switch (activeTab) {
            case 'About':
    return (
        <View style={styles.aboutSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionText}>
                Hi, I'm João Silva, a passionate and experienced tour guide based in Lisbon. I have been guiding travelers 
                through the rich history and culture of Lisbon for over 5 years. 
            </Text>
            <Text style={styles.sectionTitle}>Interests</Text>
            <Text style={styles.sectionText}>
                Museums, Art
            </Text>
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
                keyExtractor={(item) => item.id.toString()}
                horizontal={true} // Faz com que a lista seja horizontal
                showsHorizontalScrollIndicator={false} // Oculta a barra de rolagem horizontal
                contentContainerStyle={styles.reviewsList}
            />
        </View>
    );
            case 'Calendar':
                const filteredEvents = date
                ? events.filter(event => formatDate(formatDate(event.date) === formatDate(date))) // Compare selected date
                : []; // If no date selected, show all events

                return (
                    <View style={styles.calendarSection}>
                        <CalendarPicker date={date} onDateChange={handleDateChange} />
                        
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
                    eventDate: dayjs(event.date, 'YYYY-MM-DD'), // Parse event date using the correct format
                }));
                
                const futureEvents = formattedEvents
                    .filter(event => event.eventDate.isAfter(today, 'day'))
                    .sort((a, b) => a.eventDate - b.eventDate); // Ascending order
                const pastEvents = formattedEvents
                    .filter(event => !event.eventDate.isAfter(today, 'day'))
                    .sort((a, b) => b.eventDate - a.eventDate); // Ascending order


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
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                );

            case 'Tours':
                return (
                    <View style={styles.toursSection}>
                        <TouchableOpacity
                            style={styles.addTourButton}
                            onPress={() => navigation.navigate('AddTourProfile', {guideName: "João Silva"})}
                        >
                            <Text style={styles.addTourButtonText}>+ Add new tour</Text>
                        </TouchableOpacity>
                        <FlatList
                            data={joaoTours}
                            renderItem={({ item }) => <ToursItem item={item} nav={navigation} />}
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
            <View style={styles.profileHeader}>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}style={styles.logoutButton}>
                 <Icon name={'logout'} size={26} color={'red'}/>
              </TouchableOpacity>
              <Image source={require('../../assets/user2.png')} style={styles.profilePicture} />
              <View style={styles.nameContainerRow}>
                  <Text style={styles.profileName}>João Silva, 32</Text>
                  <Image
                       source={require('../../assets/tourguide.png')}
                      style={styles.guideImage}
                  />
              </View>
              <Text style={styles.profileLocation}>Lisboa</Text>
              <TouchableOpacity style={styles.availabilityContainer} onPress={toggleAvailability}>
                  <Text style={styles.availabilityText}>Available</Text>
                  <Icon
                      name={isAvailable ? 'toggle-on' : 'toggle-off'}
                      size={24}
                      color={isAvailable ? 'green' : 'gray'}
                  />
              </TouchableOpacity>
          </View>
            <TabControl
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={['Events', 'Calendar', 'Tours','About' ]}
            />
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
        backgroundColor: '#fff',
    },
    profileHeader: {
        alignItems: 'center',
        marginTop: height * 0.1,
    },
    logoutButton:{
        position: 'absolute',
        right: 0
    }, 
    profileName: {
        fontSize: width * 0.07,
        fontFamily: 'CodecPro-ExtraBold',
        marginTop: height * 0.01,
        color: '#000'
    },
    profileLocation: {
        color: '#888',
        fontFamily: 'CodecPro-Regular',
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
        fontFamily: 'CodecPro-Regular',
    },
    tabContentContainer: {
        flexGrow: 1,
        backgroundColor: '#E8E8E8',
        padding: 10,
        borderRadius: 20,
        marginBottom: 20,
        width: width * 0.9,
        //height: height * 0.4,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6,},
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 3,
    },
    aboutSection: {
        flex: 1,
    },
    calendarSection: {
        flex: 1,
    },
    eventsSection: {
        padding: width * 0.03,
    },
    sectionTitle: {
        fontSize: width * 0.05,
        marginTop: 15,
        marginHorizontal: 10,
        fontFamily: 'CodecPro-Bold',
    },
    sectionText: {
        fontSize: width * 0.04,
        color: '#555',
        marginTop: 5,
        marginBottom: 20,
        fontFamily: 'CodecPro-Regular',
        lineHeight: 18,
        marginHorizontal: 10,
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
        marginBottom: 10
    },

    eventDate: {
        fontSize: width * 0.05,
        color: '#f2b636',
        marginRight: width * 0.04,
        fontFamily: 'CodecPro-ExtraBold',
    },

    eventTitle: {
        fontFamily: 'CodecPro-Bold',
        fontSize: width * 0.04,
    },
    tourPhoto: {
        fontSize: width * 0.05,
        color: '#f2b636',
        marginRight: width * 0.07,
    },
    starIcon: {
        width: 16,
        height: 16,
        marginRight: 4,
    },
    eventSubtitle: {
        color: '#888',
        fontSize: width * 0.030,
        fontFamily: 'CodecPro-Regular',
    },
    pastEventsPlaceholder: {
        marginTop: height * 0.01,
        alignItems: 'center',
    },
    addTourButton: {
        backgroundColor: '#FF914D',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    reviewsList: {
        marginVertical: 10,
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
        elevation: 2, // Para sombra em dispositivos Android
    },
    
    reviewerName: {
        fontSize: 16,
        fontFamily: 'CodecPro-Bold',
    },
    
    reviewText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
        //fontFamily: 'CodecPro-Regular',
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
    
    addTourButtonText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'CodecPro-Bold',
    },

    deleteButton: {
        marginLeft: 10,
    },

    tourCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: width * 0.05,
        marginVertical: height * 0.01,
        borderRadius: width * 0.02,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        justifyContent: 'space-between',
    },

    titleAndPhotoInline: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    tourInfo: {
        marginLeft: 10,
        flex: 1,
    },
    tourName: {
        fontSize: width * 0.045,
        fontFamily: 'CodecPro-Bold',
    },
    tourImage: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: 10,
        marginRight: 10,
        backgroundColor: '#ddd',
    },
    
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    priceContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    price: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        color: '#f2b636',
    },
    nameContainerRow: {
        flexDirection: 'row', // Alinha os elementos lado a lado
        alignItems: 'center', // Centraliza verticalmente
        marginTop: height * 0.01, // Espaçamento superior
    },
    guideImage: {
        width: width * 0.08, // Tamanho ajustado para a imagem
        height: width * 0.08,
        marginLeft: 8, // Espaço entre o nome e a imagem
    },
    noEventsPlaceholder:{
        alignItems: 'center',
        paddingBottom: 10,
    },

    profilePicture: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: (width * 0.3) / 2,
        borderWidth: 1,
        borderColor: '#888',
    }
});

export default TourGuideProfile;