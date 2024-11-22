// IndividualScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const renderIndividualItem = ({ nav, item }) => {
    // Convert the rating string to a number and round it down if necessary
    const rating = parseFloat(item.rating.replace(',', '.')); // e.g., "4,0" -> 4.0

    // Create an array with as many elements as the integer value of the rating
    const stars = Array.from({ length: Math.floor(rating) });

    return (
        <TouchableOpacity onPress={() => nav.navigate('OtherPersonProfile', { tour: item })} style={styles.profileCard}>
            <Image source={item.picture} style={styles.picture} />
            <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{item.name}, {item.age}</Text>
                <Text style={styles.profileDescription}>{item.activities.join(', ')}</Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>{item.rating}</Text>
                    {/* Map over the stars array to render the star icons */}
                    {stars.map((_, index) => (
                        <Icon key={index} name="star" size={16} color="#f2b636" />
                    ))}
                    {/* Optionally add a half-star if the rating has a decimal part >= 0.5 */}
                    {rating % 1 >= 0.5 && (
                        <Icon name="star-half" size={16} color="#f2b636" />
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};


const IndividualScreen = ({ nav,  tours }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={tours}
                renderItem={({item})=>renderIndividualItem ({ nav, item })}
                keyExtractor={item => item.id}

                contentContainerStyle={{
                    flexGrow: 1, // Ensures it grows to fit the content
                    paddingBottom: 20, // Adds padding to avoid cut-offs
                    justifyContent: tours.length < 3 ? 'flex-start' : 'center', // Adjust layout if fewer items
                }}
                ListFooterComponent={
                    tours.length === 1 || tours.length === 2 || tours.length === 3 || tours.length === 4 || tours.length === 5? <View style={{ height: 20 }} /> : null
                } // Optional spacing for short lists
                
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        maxWidth: '100%', 
        maxHeight: '95%',
    },
    profileCard: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation: 2,
    },
    profileInfo: {
        marginLeft: 10,
    },
    profileName: {
        fontSize: 17,
        //fontWeight: 'bold',
        fontFamily: 'CodecPro-Bold',
    },
    profileDescription: {
        fontSize: 12,
        color: '#888',
        fontFamily: 'CodecPro-Regular',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    ratingText: {
        fontSize: 14,
        color: '#888',
        marginRight: 3,
    },
    picture: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: (width * 0.6) / 2,
        borderWidth: 0.5,
        borderColor: '#888',
        //marginTop: 15,
    },
});

export default IndividualScreen;
