// TourDetailScreen.js --> Page of an individual tour
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ArrowButton from '../../GeneralElements/ArrowButton';
import sampleData from '../../sampledata';

const { width } = Dimensions.get('window');

const TourDetailScreen = ({navigation, route}) => {
    const sampleTour = {
        id: '1',
        title: "St. George's Castle Tour",
        price: '20€',
        rating: '4.0',
        tourGuide: 'João Silva',
        description: 'Come visit the principal castle of Lisbon.',
        imageLink: "https://cdn-imgix.headout.com/microbrands-banner-image/image/d483f23b46669db6523754a034f4d1b8-Sao%20Jorge%20Castle%201.jpeg?auto=format&w=1058.3999999999999&h=540&q=90&fit=crop&crop=faces",
        routeStops: ["São Jorge Castle"],
        reviews: [
            { reviewer: 'Maria Oliveira', rating: 5, comment: 'Amazing tour! The guide was very knowledgeable.' },
            { reviewer: 'Carlos Silva', rating: 4, comment: 'Great experience, but a bit crowded.' },
        ],
        languages: ['Portuguese', 'English'],
        };

    const tourDetails = route.params?.tour || sampleTour;

    const handleGuidePress = (guideName) => {
        const guideDetails = sampleData.individual.find(individual => individual.name === guideName) || sampleData.individual[0]; // Exemplo
        navigation.navigate('OtherPersonProfile', { tour: guideDetails });
    };


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
                    <Image source={tourDetails.picture} style={styles.image} />
                </View>


                {/* Tour Info */}
                <View style={styles.tourInfoContainer}>
                    <Text style={styles.tourTitle}>{tourDetails.title}</Text>
                </View>

                <View style={{paddingHorizontal: 20}}>
                {/* Guide info*/}

                <View style={styles.guideContainer}>
                        <Text style={styles.sectionTitle}>Guide:</Text>

                        {(sampleData.currentUser.role == "tour_guide" && tourDetails.tourGuide == "João Silva")?
                        (
                        <View style={{flexDirection: 'row',}}>
                            <Text style={styles.guideText}>{tourDetails.tourGuide}</Text>
                            <Icon name="chat-bubble-outline" size={20} color="#888" style={styles.chatIcon} />
                        </View>
                        ) : (
                        <TouchableOpacity style={{flexDirection: 'row',}} onPress={() => {handleGuidePress(tourDetails.tourGuide)}}>
                            <Text style={styles.guideText}>{tourDetails.tourGuide}</Text>
                            <Icon name="chat-bubble-outline" size={20} color="#888" style={styles.chatIcon} />
                        </TouchableOpacity>
                        )}
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

               <Text style={styles.sectionTitle}>Languages</Text>
               <View style={[styles.languageContainer, { marginBottom: 1 }]}>
                   {tourDetails.languages.map((language, index) => (
                       <View key={index} style={styles.languageTag}>
                           <Text style={{ fontFamily: 'CodecPro-Regular' }}>{language}</Text>
                       </View>
                   ))}
               </View>

                {/* Reviews */}
                <Text style={styles.sectionTitle}>Reviews</Text>

                <FlatList
                horizontal
                data={tourDetails.reviews}
                renderItem={({ item }) => {
                    // Convert the rating to a number
                    const rating = parseFloat(item.rating.replace(",", "."));

                    return (
                        <View style={styles.reviewCard}>
                            <View>
                                <Text style={styles.reviewerText}>{item.reviewer}</Text>
                                <Text>{item.comment}</Text>
                            </View>
                            <View style={styles.reviewRating}>
                                <Text style={{marginRight: 5}}>{item.rating}</Text>
                                {/* Display stars based on the rating */}
                                {[...Array(Math.floor(rating))].map((_, index) => (
                                    <Icon key={index} name="star" size={14} color="#f2b636" />
                                ))}
                            </View>
                        </View>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.reviewsList}
            />


            </View>
            </ScrollView>

            {/* Footer with Price and Book Button */}
            {((sampleData.currentUser.role != "tour_guide") ||
            (sampleData.currentUser.role == "tour_guide" && tourDetails.tourGuide != "João Silva")) &&
            (
            <View style={styles.footer}>
                <Text style={styles.price}>{tourDetails.price}€ per person</Text>
                <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('TourBooking', { tour: tourDetails })}>
                    <Text style={styles.bookButtonText}>Book Tour</Text>
                </TouchableOpacity>
            </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //paddingTop: 35,
        marginTop: 10,
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
   languageContainer: {
       flexDirection: 'row',
       flexWrap: 'wrap',
   },

   languageTag: {
       backgroundColor: '#e0e0e0',
       borderRadius: 30,
       paddingVertical: 12,
       paddingHorizontal: 15,
       margin: 5,
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
        color: '#333',
        marginLeft: 5,
        fontFamily: 'CodecPro-ExtraBold',
    },
    sectionTitle: {
        fontSize: 18,
        color: '#333',
        marginRight: 10,
        paddingVertical: 6,
        fontFamily: 'CodecPro-Bold',
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
        fontFamily: 'CodecPro-Regular',
    },
    chatIcon: {
        marginLeft: 10,
    },

    // Description info
    description: {
        fontSize: 16,
        color: '#333',
        //fontFamily: 'CodecPro-Regular',
    },

    // Route info
    routeItem: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    routeText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 5,
        //fontFamily: 'CodecPro-Regular',
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
        justifyContent: 'space-between'
    },
    reviewerText:{
        fontSize: 15,
        marginBottom: 2,
        fontFamily: 'CodecPro-Bold',
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
        //fontWeight: 'bold',
        color: '#333',
        fontFamily: 'CodecPro-Bold',
    },
    bookButton: {
        backgroundColor: '#FF914D',
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'CodecPro-Bold',
    },
     languageContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 30,
        },
});

export default TourDetailScreen;