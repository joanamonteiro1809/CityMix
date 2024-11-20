import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native'; // Import this hook
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TabControl from '../../GeneralElements/TabControl';
import CalendarPicker from '../../GeneralElements/CalendarPicker';
import sampleData from '../../sampledata'
import AsyncStorage from '@react-native-async-storage/async-storage'; // For persistence
import dayjs from 'dayjs';

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
                    source={{
                        uri: 'https://cdn-imgix.headout.com/microbrands-banner-image/image/d483f23b46669db6523754a034f4d1b8-Sao%20Jorge%20Castle%201.jpeg?auto=format&w=1058.3999999999999&h=540&q=90&fit=crop&crop=faces',
                    }}
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
                keyExtractor={(item) => item.id}
                horizontal={true} // Faz com que a lista seja horizontal
                showsHorizontalScrollIndicator={false} // Oculta a barra de rolagem horizontal
                contentContainerStyle={styles.reviewsList}
            />
        </View>
    );
            case 'Calendar':
                const filteredEvents = date
                ? sampleEvents.filter(event => event.date === formatDate(date)) // Compare selected date
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
                            onPress={() => navigation.navigate('AddTourProfile', {guideName: "João Silva"})}
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
        marginTop: height * 0.1,
    },
    logoutButton:{
        position: 'absolute',
        right: 0
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
        marginTop: height * 0.01,
        marginBottom: height * 0.01,
    },
    availabilityText: {
        fontSize: 18,
        marginRight: 8,
    },
    tabContentContainer: {
        flexGrow: 1,
        //paddingBottom: height * 0.02, // Ensure there’s padding at the bottom
        backgroundColor: '#ffeadd',
        padding: 10,
        borderRadius: 20, // Borda arredondada
        marginBottom: 20,
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
        marginBottom: height * 0.5,
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
    tourPhoto: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: '#f2b636',
        marginRight: width * 0.07,
    },
    starIcon: {
        width: 16, // Ajuste o tamanho da estrela
        height: 16,
        marginRight: 4,
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
        backgroundColor: '#FF914D',
        padding: width * 0.04,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: height * 0.02,
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
        elevation: 2, // Para sombra em dispositivos Android
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
    tourImage: {
        width: width * 0.2, // Ajuste para o tamanho desejado
        height: width * 0.2,
        borderRadius: 10, // Deixe as bordas arredondadas, se necessário
        marginRight: 10, // Espaço entre a imagem e o texto
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