import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native'; // Import this hook
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TabControl from '../../GeneralElements/TabControl';
import CalendarPicker from '../../GeneralElements/CalendarPicker';
import sampleData from '../../sampledata'
import AsyncStorage from '@react-native-async-storage/async-storage'; // For persistence

const { width, height } = Dimensions.get('window');

const sampleEvents = [
    { id: '1', date: '16 Oct', title: 'Meetup with Ana', time: '14:00', location: 'Torre de Belém' },
];

const TourGuideProfile = ({ navigation }) => {
    const [joaoTours, setJoaoTours] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchTours = async () => {
                try {
                    const storedTours = await AsyncStorage.getItem('joaoTours');
                    if (storedTours) {
                        setJoaoTours(JSON.parse(storedTours));
                    } else {
                        setJoaoTours(sampleData.joaoTours);
                    }
                } catch (error) {
                    console.error('Error fetching tours:', error);
                }
            };

            fetchTours();
        }, [])
    );

    const [activeTab, setActiveTab] = useState('About');
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
            <Text style={styles.eventDate}>{item.date}</Text>
            <View>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <View>
                    <Text style={styles.eventSubtitle}>{item.time} • {item.location}</Text>
                </View>
            </View>
        </View>
    );

    const ToursItem = ({ item, nav }) => (
        <View style={styles.tourCard}>
            <TouchableOpacity onPress={() => nav.navigate('TourDetails', { tour: item })} style={styles.titleAndPhotoInline}>
                <Icon name="image" size={50} color="#555" />
                <View style={styles.tourInfo}>
                    <Text style={styles.tourName}>{item.title}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>{item.rating}</Text>
                        <Icon name="star" size={16} color="#000" />
                    </View>
                </View>
            </TouchableOpacity>
            {/* Botão de deletar */}
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
                        <Text style={styles.sectionText}>Add a description here...</Text>
                        <Text style={styles.sectionTitle}>Interests</Text>
                        <Text style={styles.sectionText}>Add interests here...</Text>
                        <Text style={styles.sectionTitle}>Reviews</Text>
                        <View style={styles.reviewPlaceholder}>
                            <Text style={styles.sectionText}>Review 1</Text>
                            <Text style={styles.sectionText}>Review 2</Text>
                        </View>
                    </View>
                );

            case 'Calendar':
                return (
                    <View style={styles.calendarSection}>
                        <CalendarPicker date={date} onDateChange={handleDateChange} />
                        <FlatList
                            data={sampleEvents}
                            renderItem={renderEventItem}
                            keyExtractor={(item) => item.id}
                            style={styles.eventsList}
                        />
                    </View>
                );

            case 'Events':
                return (
                    <View style={styles.eventsSection}>
                        <Text style={styles.sectionTitle}>Future Events</Text>
                        <FlatList
                            data={sampleEvents}
                            renderItem={renderEventItem}
                            keyExtractor={(item) => item.id}
                        />
                        <Text style={styles.sectionTitle}>Past Events</Text>
                        <View style={styles.pastEventsPlaceholder}>
                            <Text>No past events</Text>
                        </View>
                    </View>
                );

            case 'Tours':
                return (
                    <View style={styles.toursSection}>
                        <TouchableOpacity
                            style={styles.addTourButton}
                            onPress={() => navigation.navigate('AddTourProfile')}
                        >
                            <Text style={styles.addTourButtonText}>+ Add new tour</Text>
                        </TouchableOpacity>
                        <FlatList
                            data={joaoTours}
                            renderItem={({ item }) => <ToursItem item={item} nav={navigation} />}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={styles.listContainer}
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
              <Icon name="account-circle" size={width * 0.3} color="#bbb" />
              <View style={styles.nameContainerRow}>
                  <Text style={styles.profileName}>João Silva, 32</Text>
                  <Image
                      source={require('../../assets/tourGuide.png')}
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
                tabs={['About', 'Tours', 'Calendar', 'Events']}
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
        backgroundColor: '#f2u839',
    },
    profileHeader: {
        alignItems: 'center',
        marginTop: height * 0.05,
    },
    profileName: {
        fontSize: width * 0.07,
        fontWeight: 'bold',
        marginTop: height * 0.01,
        color: '#000'
    },
    profileLocation: {
        marginTop: 5,
        color: '#888'
    },
    availabilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.02,
    },
    availabilityText: {
        fontSize: 18,
        marginRight: 8,
    },
    tabContentContainer: {
        flexGrow: 1,
        //paddingBottom: height * 0.02, // Ensure there’s padding at the bottom
        backgroundColor: '#f8e4b8',
        padding: 10,
        borderRadius: 20, // Borda arredondada
        marginBottom: 20,
        //marginHorizontal: width * 0.01,
        width: width * 0.9,
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
        fontSize: width * 0.04,
        fontWeight: 'bold',
        marginTop: height * 0.01,
    },
    sectionText: {
        color: '#666',
        fontSize: width * 0.04,
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
        marginVertical: height * 0.05,
        borderRadius: width * 0.02,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },

    eventDate: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: '#f2b636',
        marginRight: width * 0.03,
    },
    tourPhoto: {
            fontSize: width * 0.05,
            fontWeight: 'bold',
            color: '#f2b636',
            marginRight: width * 0.07,
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
    addTourButton: {
            backgroundColor: '#f2d8a5',
            padding: width * 0.04,
            borderRadius: 10,
            alignItems: 'center',
            marginTop: height * 0.02,
        },
        addTourButtonText: {
            color: '#000',
            fontSize: width * 0.04,
            fontWeight: 'bold',
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
        flex: 1, // Adiciona flexibilidade ao layout para acomodar o preço
    },
    tourInfo: {
        marginLeft: 10,
        flex: 1, // Garante que o texto se adapte ao espaço
    },
    tourName: {
        fontSize: width * 0.045, // Ajusta a fonte para caber melhor
        fontWeight: 'bold',
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
});

export default TourGuideProfile;