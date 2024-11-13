// PaidToursScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import sampleData from '../sampledata';

const { width } = Dimensions.get('window'); 

const renderPaidToursItem = ({ item }) => (
    <View style={styles.tourCard}>
        <View style={styles.titleAndPhoto}>
            <Icon name="image" size={50} color="#555" />
            <View style={styles.tourInfo}>
                <Text style={styles.tourName}>{item.title}</Text>
                <View style={styles.ratingContainer}>
                    <Text>{item.rating}</Text>
                    <Icon name="star" size={16} color="#000" />
                </View>
            </View>
        </View>
        <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price}</Text>
        </View>
    </View>
);

const PaidToursScreen = ({ navigation } ) => {

    return (
        <View>
            {/* Group tours cards */}
            <FlatList
                    data={sampleData.paidTours}
                    renderItem={renderPaidToursItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    tourCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        marginVertical: 10,
    },
    titleAndPhoto:{
        flexDirection: 'row',
    },
    tourInfo: {
        marginLeft: 10,
    },
    tourName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    ratingText: {
        fontSize: 14,
        color: '#333',
        marginRight: 4,
    },
    priceContainer: {
        alignItems: 'flex-end', 
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default PaidToursScreen;
