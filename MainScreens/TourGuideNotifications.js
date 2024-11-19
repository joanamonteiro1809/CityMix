import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TourGuideNotifications = () => {
    const notifications = [
        { id: 1, date: 'Today', message: 'Paulo sent you a review' },
        { id: 2, date: 'Today', message: 'Vitor sent you a review' },
        { id: 3, date: 'Yesterday', message: 'Ana bought your tour "Belém: Best Sights"' },
        { id: 4, date: 'Yesterday', message: 'João joined your community "Day in Belém"' },
        { id: 5, date: 'Yesterday', message: 'Maria sent you a review' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications:</Text>
            <View style={styles.listContainer}>
                {notifications.map(notification => (
                    <View key={notification.id} style={styles.notificationContainer}>
                        <Text style={styles.date}>{notification.date}</Text>
                        <Text style={styles.message}>{notification.message}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#f2b636',
    },
    listContainer: {
        flexGrow: 1,
    },
    notificationContainer: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    date: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    message: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
});

export default TourGuideNotifications;
