//screens/InYourAreaScreen.js
import React, {useState} from 'react';
import { useFocusEffect } from '@react-navigation/native'; // Import this hook
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Dimensions, ScrollView, Image, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import sampleData from '../sampledata';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For persistence

const { width, height } = Dimensions.get('screen');

const cardWidth = width * 0.35;
const cardHeight = height * 0.18;

const InYourAreaScreen = ({navigation}) => {

    const [paidT, setPaid] = useState(sampleData.paidTours);

    const renderIndividualItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('OtherPersonProfile', { tour: item })} style={[styles.card, styles.individual]}>            
            <Image source={item.picture} style={styles.profilePicture} />
            <Text style={styles.cardTitle}>{item.name}, {item.age}</Text>
            <Text style={styles.cardSubtitle} numberOfLines={2} ellipsizeMode="tail">{item.activities.join(', ')}</Text>
        </TouchableOpacity>
    );

    const renderGroupItem = ({ navigation, item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('GroupEntry', { group: item })} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.numPeopl}</Text>
        </TouchableOpacity>
    );

    const renderPaidToursItem = ({ navigation, item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('TourDetails', { tour: item })} style={styles.card}>
            <Image source={item.picture} style={styles.image} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.price}€</Text>
        </TouchableOpacity>
    );

    useFocusEffect(
        React.useCallback(() => {
            const fetchPaid = async () => {
                try {
                    const storedTours = await AsyncStorage.getItem('paidTours');
                    if (storedTours) {
                        setPaid(JSON.parse(storedTours));
                    } else {
                        setPaid(sampleData.paidTours);
                    }
                } catch (error) {
                    console.error('Error fetching tours:', error);
                }
            };
            fetchPaid();
        }, [])
    );

    const handleMapPress = () => {
        const screen = Platform.OS === 'ios' ? 'MapIOS' : 'MapAndroid';
        navigation.navigate(screen);
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                
                {/* Search Bar */}
                <View style={styles.header}>
                    <View style={styles.searchContainer}>
                        <MaterialIcons name="search" size={24} color="#555" />
                        <TextInput 
                            style={styles.searchInput} 
                            placeholder="Search" 
                            onFocus={() => navigation.navigate('SearchScreen')}/>
                    </View>

                    {/* Image next to the search container */}
                    <TouchableOpacity onPress={handleMapPress}>
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

                <View style={styles.sectionContainer}>
                {/* Individual Section */}
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => navigation.navigate('VisitsScreen', { tabSelected: 'Individuals' })}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Individual</Text>
                            <MaterialIcons name={"chevron-right"} style={styles.iconStyle}  />
                        </View>
                    </TouchableOpacity>
                    <FlatList
                        horizontal
                        data={sampleData.currentUser.role === 'tour_guide' 
                            ? sampleData.individual.filter(item => item.name !== 'João Silva') 
                            : sampleData.individual}
                        renderItem={renderIndividualItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContainer}
                    />
                </View>

                {/* Group Section */}
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => navigation.navigate('VisitsScreen', { tabSelected: 'Groups' })}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Group Meetups</Text>
                            <MaterialIcons name={"chevron-right"} style={styles.iconStyle}  />
                        </View>
                    </TouchableOpacity>
                    <FlatList
                        horizontal
                        data={sampleData.group}
                        renderItem={({ item }) => renderGroupItem({ item, navigation })}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={styles.listContainer}
                    />
                </View>

                {/* Paid Tours Section */}
                <View style={styles.section}>
                    <View style={styles.addButton}>
                        <TouchableOpacity onPress={() => navigation.navigate('VisitsScreen', { tabSelected: 'Paid Tours' })}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Paid Tours</Text>
                                <MaterialIcons name={"chevron-right"} style={styles.iconStyle}  />
                            </View>
                        </TouchableOpacity>

                        {sampleData.currentUser.role == "tour_guide" && (
                            <TouchableOpacity onPress={() => navigation.navigate('AddTour', {guideName: "João Silva"})}>
                                <AntDesign name={"pluscircle"} style={styles.iconStyle}  />
                            </TouchableOpacity>
                        )}
                    </View>
                    <FlatList
                        horizontal
                        data={paidT}
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
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 35,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',  
        justifyContent: 'space-between',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eaeaea',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: height * 0.02, 
        height: height * 0.06, 
        flex: 1, 
    },
    searchInput: {
        flex: 1, 
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
        //width: '61.5%',
        //backgroundColor: 'white',

    },
    // shadowRect: {
    //     position: 'absolute',
    //     backgroundColor: '#FF914D',
    //     borderRadius: 40,
    //     width: '100%',
    //     height: '100%',
    //     top: 6,
    //     right: 5,
    //     opacity: 0.1, // Torna a sombra mais suave
    // },
    titleRect: {
        //backgroundColor: '#FF914D',
        borderRadius: 10,
        // borderWidth: 2,
        // borderColor: '#FF914D',
        //paddingHorizontal: 20,
        paddingVertical: 5,
        alignSelf: 'flex-start',
        width: '100%',
    },
    inYourAreaTag: {
        fontSize: 30,
        //fontWeight: 'bold',
        fontFamily: 'ArchivoBlack-Regular',
        color: '#195FC5',
        //marginVertical: 5,
        textAlign: 'left',
    },
    sectionContainer: {
        //flex: 1,
         height: height * 0.7,
         justifyContent: 'space-between',
    },
    section: {
        height: height * 0.23, 
        marginBottom: 0,
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
    }, 
    addButton:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});

export default InYourAreaScreen;
