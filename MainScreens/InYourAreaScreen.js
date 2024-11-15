// screens/InYourAreaScreen.js
import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import sampleData from '../sampledata';

const { width, height } = Dimensions.get('window');

const InYourAreaScreen = ({navigation}) => {
    const renderIndividualItem = ({ item }) => (
        <View style={styles.card}>
            <Icon name="account-circle" size={24} color="#555" />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.activity}</Text>
        </View>
    );

    const renderGroupItem = ({ item }) => (
        <View style={styles.card}>
            <Icon name="image" size={24} color="#555" />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.activity}</Text>
        </View>
    );

    const renderPaidToursItem = ({ navigation, item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('TourDetails', { tour: item })} style={styles.card}>
            <Icon name="image" size={24} color="#555" />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput style={styles.searchInput} placeholder="Search" />
                    <Icon name="search" size={24} color="#555" />
                </View>

                {/* In Your Area Tag */}
                <Text style={styles.inYourAreaTag}>In Your Area</Text>

                {/* Individual Section */}
                <TouchableOpacity onPress={() => navigation.navigate('VisitsScreen', { tabSelected: 'Individuals' })}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Individual</Text>
                            <Icon name={"chevron-right"} style={styles.iconStyle}  />
                        </View>
                </TouchableOpacity>
                <FlatList
                    horizontal
                    data={sampleData.individual}
                    renderItem={renderIndividualItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                />

                {/* Group Section */}
                <TouchableOpacity onPress={() => navigation.navigate('VisitsScreen', { tabSelected: 'Group' })}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Group</Text>
                            <Icon name={"chevron-right"} style={styles.iconStyle}  />
                        </View>
                </TouchableOpacity>
                <FlatList
                    horizontal
                    data={sampleData.group}
                    renderItem={renderGroupItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                />

                {/* Paid Tours Section */}
                <TouchableOpacity onPress={() => navigation.navigate('VisitsScreen', { tabSelected: 'Paid' })}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Paid</Text>
                            <Icon name={"chevron-right"} style={styles.iconStyle}  />
                        </View>
                </TouchableOpacity>
                <FlatList
                    horizontal
                    data={sampleData.paidTours}
                    renderItem={({ item }) => renderPaidToursItem({ item, navigation })}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 35,
        backgroundColor: '#f5f5f5',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eaeaea',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: height * 0.02, // Space below the search bar, responsive to screen height
        height: height * 0.06, // Adjusts the height of the search bar to screen height
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    inYourAreaTag: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f2b636',
        marginVertical: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    iconStyle: {
        fontSize:25,
        color: '#888',
    },
    listContainer: {
        paddingVertical: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 5,
        width: 120,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    cardTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 5,
    },
    cardSubtitle: {
        color: '#666',
        textAlign: 'center',
    },
});

export default InYourAreaScreen;
