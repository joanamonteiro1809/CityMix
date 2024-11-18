// screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TabControl from '../GeneralElements/TabControl';

const { width, height } = Dimensions.get('window');

const sampleEvents = [
    { id: '1', date: '16 Oct', title: 'Meetup with Ana', time: '14:00', location: 'Torre de Belém' },
    // Add more sample events here
];

const ProfileScreen = () => {
    const [activeTab, setActiveTab] = useState('Events'); // Default tab
    const [isAvailable, setIsAvailable] = useState(true); 

    const toggleAvailability = () => {
        console.log("Availability toggled");
        setIsAvailable(!isAvailable);
    };

    const renderEventItem = ({ item }) => (
        <View style={styles.eventCard}>
            <Text style={styles.eventDate}>{item.date}</Text>
            <View>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventSubtitle}>{item.time} • {item.location}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Profile Header */}
            <View style={styles.profileHeader}>
                <Icon name="account-circle" size={width * 0.3} color="#bbb" />
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
                tabs={['About', 'Calendar', 'Events']} 
            />

            {/* Tab Content */}
            <View style={styles.tabContent}>
                {activeTab === 'About' && (
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
                )}

                {activeTab === 'Calendar' && (
                    <View style={styles.calendarSection}>
                        <Text style={styles.sectionTitle}>October</Text>
                        <View style={styles.calendarPlaceholder}>
                            <Text>Calendar here...</Text>
                        </View>
                        <FlatList
                            data={sampleEvents}
                            renderItem={renderEventItem}
                            keyExtractor={item => item.id}
                            style={styles.eventsList}
                        />
                    </View>
                )}

                {activeTab === 'Events' && (
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
                )}
            </View>
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
        color: '#888'
    },
    availabilityContainer: { // Adiciona estilos para o botão
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.02,
    },
    availabilityText: { 
        fontSize: 18,
        marginRight: 8, 
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#f2b636', // Fundo da área das abas
        paddingVertical: 8,
        borderRadius: 10,
    },
    tab: {
        fontSize: 18,
        color: '#fff', // Branco para as abas inativas
    },
    activeTab: {
        backgroundColor: '#ffffff', // Fundo branco para a aba ativa
        color: '#000', // Preto para o texto da aba ativa
        fontWeight: 'bold',
        fontSize: 18,
        borderRadius: 50, // Tornar o botão mais arredondado
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginHorizontal: 5,
    },
    tabContent: {
        flex: 0,
        height: height * 0.5, // Reduz a altura do retângulo para 40% da altura da tela
        backgroundColor: '#f8e4b8',
        padding: 15,
        borderRadius: 20, // Borda arredondada
        marginTop: 5,
        marginHorizontal: width * 0.01,
        width: width * 0.9,
        },

    aboutSection: {
        flex: 1,
        justifyContent: 'space-between', // Garante que o conteúdo se distribua no espaço disponível
    },
    calendarSection: {
        padding: width * 0.03,
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
    calendarPlaceholder: {
        height: height * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eaeaea',
        borderRadius: width * 0.02,
        marginVertical: height * 0.01,
    },
    eventsList: {
        marginTop: height * 0.01,
    },
    eventCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: width * 0.03,
        marginVertical: height * 0.01,
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
    eventSubtitle: {
        color: '#888',
        fontSize: width * 0.035,
    },
    pastEventsPlaceholder: {
        marginTop: height * 0.01,
        alignItems: 'center',
    },
});

export default ProfileScreen;