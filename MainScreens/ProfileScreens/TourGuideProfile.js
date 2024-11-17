import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native'; // Import this hook
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TabControl from '../../GeneralElements/TabControl';
import CalendarPicker from '../../GeneralElements/CalendarPicker';
import sampleData from '../../sampledata'
import AsyncStorage from '@react-native-async-storage/async-storage'; // For persistence

const { width, height } = Dimensions.get('window');

const sampleEvents = [
    { id: '1', date: '16 Oct', title: 'Meetup with Ana', time: '14:00', location: 'Torre de Belém' },
    // Adicione mais eventos de exemplo aqui
];


const TourGuideProfile = ({ navigation }) => { // Recebe `navigation` como prop

    const [joaoTours, setJoaoTours] = useState([]); // State to hold tours


    useFocusEffect(
        React.useCallback(() => {
            const fetchTours = async () => {
                try {
                    const storedTours = await AsyncStorage.getItem('joaoTours');
                    if (storedTours) {
                        setJoaoTours(JSON.parse(storedTours));
                    } else {
                        setJoaoTours(sampleData.joaoTours); // Fallback to initial data
                    }
                } catch (error) {
                    console.error('Error fetching tours:', error);
                }
            };
    
            fetchTours();
        }, []) // Dependency array ensures this runs every time the screen is focused
    );

    const [activeTab, setActiveTab] = useState('About'); // Aba padrão
    const [isAvailable, setIsAvailable] = useState(true); // Estado de disponibilidade
    const [date, setDate] = useState(null); // Data selecionada no calendário

    const handleDateChange = (newDate) => {
        setDate(newDate); // Atualiza a data selecionada
    };

    const toggleAvailability = () => {
        setIsAvailable(!isAvailable);
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

    const ToursItem = ({ item, nav}) => (
    <TouchableOpacity onPress={() => nav.navigate('TourDetails', { tour: item })} style={styles.tourCard}>
            <View style={styles.titleAndPhotoInline}>
                <Icon name="image" size={50} color="#555" />
                <View style={styles.tourInfo}>
                    <Text style={styles.tourName}>{item.title}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>{item.rating}</Text>
                        <Icon name="star" size={16} color="#000" />
                    </View>
                </View>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>{item.price}</Text>
            </View>
    </TouchableOpacity>
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
                            keyExtractor={item => item.id}
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
                            keyExtractor={item => item.id}
                        />
                        <Text style={styles.sectionTitle}>Past Events</Text>
                        <View style={styles.pastEventsPlaceholder}>
                            <Text>No past events</Text>
                        </View>
                    </View>
                );

            case 'Tours':
                console.log(sampleData.joaoTours);
                return (
                    <View style={styles.toursSection}>
                        <TouchableOpacity
                            style={styles.addTourButton}
                            onPress={() => navigation.navigate('AddTourProfile')} // Navega para a tela de adição de tours
                        >
                            <Text style={styles.addTourButtonText}>+ Add new tour</Text>
                        </TouchableOpacity>
                        <View style={styles.container}>
                            <FlatList
                                data={joaoTours}
                                renderItem={({ item }) => <ToursItem item={item} nav={navigation} />}
                                keyExtractor={item => item.id.toString()}
                                contentContainerStyle={styles.listContainer}
                            />
                        </View>
                    </View>
                );

            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {/* Cabeçalho do Perfil */}
            <View style={styles.profileHeader}>
                <Icon name="account-circle" size={width * 0.3} color="#bbb" />
                <Text style={styles.profileName}>João Silva, 32</Text>
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
                tabs={['About', 'Tours', 'Calendar', 'Events']}
            />

            {/* Conteúdo da aba */}
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
        justifyContent: 'space-between', // Garante que o preço fique à direita
        width: '100%',
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
});

export default TourGuideProfile;
