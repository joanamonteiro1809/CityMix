// IndividualScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import sampleData from '../sampledata';
import SegmentedControl from './SegmentedControl';

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


const GroupScreen = ({ navigation } ) => {

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Lisbon</Text>
                <Icon name="filter-list" size={24} color="#000" />
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Search" />
                <Icon name="search" size={24} color="#555" />
            </View>

            {/* Toggle Buttons */}
            <SegmentedControl onOptionSelect={"Group"} />

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
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eaeaea',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 5,
    },
    toggleButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f2b636',
        marginHorizontal: 5,
    },
    activeButton: {
        backgroundColor: '#f2b636',
    },
    toggleButtonText: {
        color: '#555',
        fontWeight: 'bold',
    },
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
    recommendationList: {
        paddingVertical: 10,
    },
    recommendationCard: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    imagePlaceholder: {
        width: 50,
        height: 50,
        backgroundColor: '#ccc',
        borderRadius: 10,
    },
    recommendationInfo: {
        marginLeft: 10,
        flex: 1,
    },
    recommendationTitle: {
        fontWeight: 'bold',
    },
    starsContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
});

export default IndividualScreen;
