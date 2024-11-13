// IndividualScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import sampleData from '../sampledata';

const { width } = Dimensions.get('window'); 

const renderIndividualItem = ({ item }) => {
    // Convert the rating string to a number and round it down if necessary
    const rating = parseFloat(item.rating.replace(',', '.')); // e.g., "4,0" -> 4.0

    // Create an array with as many elements as the integer value of the rating
    const stars = Array.from({ length: Math.floor(rating) });

    return (
        <View style={styles.profileCard}>
            <Icon name="person" size={40} color="#555" />
            <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{item.name}</Text>
                <Text style={styles.profileDescription}>{item.activity}</Text>
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
        </View>
    );
};


const IndividualScreen = ({ navigation } ) => {

    return (
        <View>

            {/* Toggle Buttons */}
            {/*<SegmentedControl onOptionSelect={"Individual"} />*/}

            {/* Profile Card */}
            <FlatList
                    data={sampleData.individual}
                    renderItem={renderIndividualItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    profileCard: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    profileInfo: {
        marginLeft: 10,
    },
    profileName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    profileDescription: {
        fontSize: 12,
        color: '#888',
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
});

export default IndividualScreen;
