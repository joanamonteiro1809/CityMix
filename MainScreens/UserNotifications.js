import React from 'react';
import { View, Text, StyleSheet, Platform, Dimensions, Image } from 'react-native';

// Obter dimensões da tela
const { width } = Dimensions.get('window');

// Dados de notificações organizados por categorias
const notificationsByCategory = {
    Today: [
        { id: 1, message: 'Juliana Soares joined your community "Day in Cascais"', photo: require('../assets/user1.jpg') },
    ],
    Yesterday: [
        { id: 2, message: 'João Silva sent you a review', photo: require('../assets/user2.png') },
        { id: 3, message: 'Francisco Coelho sent you a review', photo: require('../assets/user3.jpg') },
    ],
    'Last 7 days': [
        { id: 4, message: 'Joana Santos and 3 others joined your community "Day in Cascais"', photo: require('../assets/user4.jpg') },
    ],
};

const NormalUserNotifications = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications:</Text>
            <View style={styles.listContainer}>
                {Object.keys(notificationsByCategory).map(category => (
                    <View key={category} style={styles.categoryContainer}>
                        <Text style={styles.categoryTitle}>{category}</Text>
                        {notificationsByCategory[category].map(notification => (
                            <View key={notification.id} style={styles.notificationContainer}>
                                {/* Adicionando imagem */}
                                <Image source={notification.photo} style={styles.profileImage} />
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
        padding: width * 0.05, // Adapta o padding com base na largura da tela
    },
    title: {
        paddingTop: width * 0.13, // Adapta o padding com base na largura da tela
        fontSize: width * 0.06, // Escala o tamanho do título de forma proporcional
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
        flexDirection: 'row', // Permite alinhar a imagem e o texto lado a lado
        alignItems: 'center', // Centraliza verticalmente
        marginBottom: width * 0.03,
        paddingBottom: width * 0.03,
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
    },
    profileImage: {
        width: width * 0.10, // Tamanho proporcional da imagem
        height: width * 0.10,
        borderRadius: (width * 0.12) / 2, // Deixa a imagem circular
        marginRight: width * 0.04, // Espaço entre a imagem e o texto
    },
    message: {
        fontSize: width * 0.045,
        color: '#000',
        flex: 1, // Faz o texto ocupar o restante do espaço
        flexWrap: 'wrap', // Permite quebra de linha caso o texto seja longo
    },
});

export default NormalUserNotifications;
