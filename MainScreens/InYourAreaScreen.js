// screens/InYourAreaScreen.js
import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import sampleData from '../sampledata';

const { width, height } = Dimensions.get('screen');

const cardWidth = width * 0.35;
const cardHeight = height * 0.18;

const InYourAreaScreen = ({navigation}) => {
    const renderIndividualItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('OtherPersonProfile', { tour: item })} style={[styles.card, styles.individual]}>            <Image source={item.picture} style={styles.profilePicture} />
            <Text style={styles.cardTitle}>{item.name}, {item.age}</Text>
           <Text style={styles.cardSubtitle} numberOfLines={2} ellipsizeMode="tail">{item.activities.join(', ')}</Text>
        </TouchableOpacity>
    );

    const renderGroupItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('GroupDetail', { tour: item })} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.numPeopl}</Text>
        </TouchableOpacity>
    );

    const renderPaidToursItem = ({ navigation, item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('TourDetails', { tour: item })} style={styles.card}>
            <Image source={{uri: item.imageLink}} style={styles.image} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.price}€</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                
                {/* Search Bar */}
                <View style={styles.header}>
                    <View style={styles.searchContainer}>
                        <Icon name="search" size={24} color="#555" />
                        <TextInput style={styles.searchInput} placeholder="Search" />
                    </View>

                    {/* Image next to the search container */}
                    <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                        <Image
                            source={require('../assets/map.png')}
                            style={styles.map}
                        />
                    </TouchableOpacity>
                </View>

                {/* In Your Area Tag */}
                <View style={styles.titleContainer}>
                    <View style={styles.shadowRect}></View>
                    <View style={styles.titleRect}>
                        <Text style={styles.inYourAreaTag}>In Your Area</Text>
                    </View>
                </View>

                <View style={styles.sectionsContainer}>
                {/* Individual Section */}
                <View style={styles.section}>
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
                </View>

                {/* Group Section */}
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => navigation.navigate('VisitsScreen', { tabSelected: 'Group' })}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Group Meetups</Text>
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
                </View>

                {/* Paid Tours Section */}
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => navigation.navigate('VisitsScreen', { tabSelected: 'Paid' })}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Paid Tours</Text>
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
            </View>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',  // Ensures both search bar and map align in the center vertically
        justifyContent: 'space-between', // Space out the elements if needed
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eaeaea',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: height * 0.02, // Space below the search bar, responsive to screen height
        height: height * 0.06, // Adjusts the height of the search bar to screen height
        flex: 1, // Ensures search input takes the available space
    },
    searchInput: {
        flex: 1, // Ensures input field takes most of the space
        fontSize: 16,
    },
    map: {
        width: height * 0.06,
        height: height * 0.06,
        marginLeft: 10,
        resizeMode: 'contain',
    },
    titleContainer: {
        position: 'relative',
        alignSelf: 'flex-start',
        marginVertical: 10,
        width: '61.5%',

    },
    shadowRect: {
        position: 'absolute',
        backgroundColor: '#FF914D',
        borderRadius: 40,
        width: '100%',
        height: '100%',
        top: 6,
        right: 5,
    },
    titleRect: {
        backgroundColor: '#fff4ee',
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#FF914D',
        paddingHorizontal: 20,
        paddingVertical: 5,
        alignSelf: 'flex-start',
        width: '100%',
    },
    inYourAreaTag: {
        fontSize: 28,
        //fontWeight: 'bold',
        fontFamily: 'CodecPro-ExtraBold',
        color: '#FF914D',
        marginVertical: 5,
        textAlign: 'center',
    },
    sectionContainer: {
        //flex: 1,
         height: height * 0.8,
         justifyContent: 'space-between',
    },
    section: {
        height: height * 0.23, // mexer aqui para mudar divisao do screen pelos 3 grupos
        marginBottom: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 5,
    },
    sectionTitle: {
        fontSize: 22,
        fontFamily: 'CodecPro-Bold',
    },
    iconStyle: {
        fontSize: 25,
        color: '#FF914D',
    },
    listContainer: {
        paddingVertical: 5,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        //padding: 10,
        marginHorizontal: 5,
        width: width * 0.45,
        //height: height * 0.2,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation: 2,
        justifyContent: 'flex-start',
        borderColor: '#888',
        borderWidth: 0.5,
        //position: 'relative',
        paddingBottom: 10,
        marginBottom: -2,
        overflow: 'hidden',
    },

    individual: {
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: Math.min(cardWidth, cardHeight) * 0.12,
        //fontWeight: 'bold',
        fontFamily: 'CodecPro-Bold',
        textAlign: 'center',
        marginTop: 5,
        marginHorizontal: 15,
        lineHeight: 20,
    },
    cardSubtitle: {
        fontSize: Math.min(cardWidth, cardHeight) * 0.08,
        color: '#666',
        textAlign: 'center',
        fontFamily: 'CodecPro-Regular',
        lineHeight: 17,
        marginHorizontal: 10,
        //flexWrap: 'wrap',
        //marginBottom: 5,
        //flex: 1,
        justifySelf: 'center',
    },

    profilePicture: {
        width: cardWidth * 0.35,
        height: cardWidth * 0.35,
        borderRadius: (cardWidth * 0.6) / 2,
        borderWidth: 1,
        borderColor: '#888',
        marginTop: 15,

    },
    image: {
        width: '100%',
        height: cardHeight * 0.4,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 5,
    }
});

export default InYourAreaScreen;
