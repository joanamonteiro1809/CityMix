// TourDetailScreen.js --> Page of an individual tour
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ArrowButton from '../../GeneralElements/ArrowButton';

const { width } = Dimensions.get('window');

const TourDetailScreen = ({navigation, route}) => {
    //const routeStops = ["Torre de Belém", "Mosteiro dos Jerónimos", "Pastéis de Belém"];
    const reviews = Array(3).fill({ id: Math.random().toString(), rating: 4.5, review: "Great tour!" });

    const sampleTour = {
        id: '1',
        title: 'Visit São Jorge Castle',
        price: '20€',
        rating: '4.0',
        tourGuide: 'Rúben Santos',
        description: 'Come visit the principal castle of Lisbon.',
        meetingPoint: 'Castelo',
        imageLink: 'https://via.placeholder.com/150',
        routeStops: ["Torre de Belém", "Mosteiro dos Jerónimos", "Pastéis de Belém"],
    };

    const tourDetails = route.params?.tour || sampleTour;

    return (
        <View style={styles.container}>

            {/* Back button */}
            <View style={styles.header}>
                <ArrowButton
                    onPress={() => navigation.goBack()}
                    iconName={("chevron-left")}
                />
            </View>

            <ScrollView>
                {/* Image Section */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: tourDetails.imageLink }} style={styles.image} />
                </View>

                
                {/* Tour Info */}
                <View style={styles.tourInfoContainer}>
                    <Text style={styles.tourTitle}>{tourDetails.title}</Text>
                </View>
                
                <View style={{paddingHorizontal: 20}}>
                {/* Guide info*/}
                <View style={styles.guideContainer}>
                        <Text style={styles.sectionTitle}>Guide:</Text>
                        <TouchableOpacity>
                            <Text style={styles.guideText}>{tourDetails.tourGuide}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="chat-bubble-outline" size={20} color="#888" style={styles.chatIcon} />
                        </TouchableOpacity>
                </View>

                {/* Description */}
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>{tourDetails.description}</Text>

                {/* Route */}
                <Text style={styles.sectionTitle}>Route</Text>
                {tourDetails.routeStops.map((stop, index) => (
                    <View style={styles.routeItem} key={index}>
                        <Icon name="place" size={16} color="#888" />
                        <Text style={styles.routeText}>{stop}</Text>
                    </View>
                ))}

                {/* Reviews */}
                <Text style={styles.sectionTitle}>Reviews</Text>
                <FlatList
                    horizontal
                    data={reviews}
                    renderItem={({ item }) => (
                        <View style={styles.reviewCard}>
                            <Text>{item.review}</Text>
                            <View style={styles.reviewRating}>
                                <Text>{item.rating}</Text>
                                <Icon name="star" size={14} color="#f2b636" />
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.reviewsList}
                />

            </View>
            </ScrollView>

            {/* Footer with Price and Book Button */}
            <View style={styles.footer}>
                <Text style={styles.price}>{tourDetails.price} per person</Text>
                <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('TourBooking', { tour: tourDetails })}>
                    <Text style={styles.bookButtonText}>Book Tour</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingHorizontal: 20,
        backgroundColor: '#fff',
        paddingTop: 35,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    imageContainer: {
        backgroundColor: '#e0e0e0',
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    tourInfoContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    tourTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 10,
        paddingVertical: 10
    },
    // Guide info
    guideContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    guideText: {
        fontSize: 17,
        color: '#333',
    },
    chatIcon: {
        marginLeft: 10,
    },

    // Description info
    description: {
        fontSize: 17,
        color: '#333',
    },

    // Route info
    routeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    routeText: {
        fontSize: 17,
        color: '#333',
        marginLeft: 5,
    },

    // Reviews
    reviewsList: {
        marginVertical: 10,
    },
    reviewCard: {
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        width: width * 0.4,
    },
    reviewRating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },

    // Price and book
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingHorizontal: 20,
    },
    price: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#333',
    },
    bookButton: {
        backgroundColor: '#FF914D',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    bookButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
    },
});

export default TourDetailScreen;
