import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importando o componente Icon

const { width } = Dimensions.get('window');

const notificationsByCategory = {
    Today: [
        { id: 1, date: 'Today', message: 'Paulo sent you a review', icon: "account-circle" },
        { id: 2, date: 'Today', message: 'Vitor sent you a review', icon: "account-circle" },
    ],
    Yesterday: [
        { id: 3, date: 'Yesterday', message: 'Ana bought your tour "Belém: Best Sights"', icon: "account-circle" },
        { id: 4, date: 'Yesterday', message: 'João joined your community "Day in Belém"', photo: require('../assets/user2.png') },
        { id: 5, date: 'Yesterday', message: 'Maria sent you a review' , icon: "account-circle"},
    ],
    'Last 7 days': [
        { id: 6, date: '6 days ago', message: 'Joana and 3 others joined your community "Day in Belém"', photo: require('../assets/user4.jpg') },
    ],
};

const TourGuideNotifications = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications:</Text>
            <View style={styles.listContainer}>
                {Object.keys(notificationsByCategory).map(category => (
                    <View key={category} style={styles.categoryContainer}>
                        <Text style={styles.categoryTitle}>{category}</Text>
                        {notificationsByCategory[category].map(notification => (
                            <View key={notification.id} style={styles.notificationContainer}>
                                {/* Verificando se a notificação tem foto ou ícone */}
                                {notification.photo ? (
                                    <Image source={notification.photo} style={styles.profileImage} />
                                ) : notification.icon ? (
                                    <Icon name={notification.icon} size={width * 0.1} color="#bbb" style={styles.icon} />
                                ) : null}
                                
                                <Text style={styles.message}>{notification.message}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdfdfd',
        padding: width * 0.05,
    },
    title: {
        paddingTop: width * 0.13,
        fontSize: width * 0.06,
        fontWeight: 'bold',
        color: '#FF914D',
        marginBottom: width * 0.08,
    },
    listContainer: {
        flexGrow: 1,
    },
    categoryContainer: {
        marginBottom: width * 0.05,
    },
    categoryTitle: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: width * 0.04,
    },
    notificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: width * 0.03,
        paddingBottom: width * 0.03,
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
    },
    profileImage: {
        width: width * 0.10,
        height: width * 0.10,
        borderRadius: (width * 0.12) / 2,
        marginRight: width * 0.04,
    },
    icon: {
        marginRight: width * 0.04,
    },
    message: {
        fontSize: width * 0.045,
        color: '#000',
        flex: 1,
        flexWrap: 'wrap',
    },
});

export default TourGuideNotifications;
