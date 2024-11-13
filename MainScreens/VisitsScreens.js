// screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IndividualScreen from './IndividualScreen';
import TabControl from '../GeneralElements/TabControl';
import ArrowButton from '../GeneralElements/ArrowButton';

const { width, height } = Dimensions.get('window');

const VisitsScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('Individuals'); // Default tab

    return (
        <View style={styles.container}>
            
            {/* Custom Header */}
            <View style={styles.header}>
                {/*<TouchableOpacity style={styles.loginButton} onPress={() => { navigation.navigate('HomeScreen') }}>
                        <Text style={styles.loginButtonText}> </Text>
                        <Image source={require('../assets/arrow.png')} style={styles.arrow}/>
                </TouchableOpacity>*/}
                <ArrowButton
                    onPress={() => navigation.navigate('HomeScreen')}
                    iconName={("chevron-left")}
                />
                
                <View style={styles.headerTitleContainer}>
                    <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
                    <Text style={styles.headerTitle}>Lisbon</Text>
                </View>

                <TouchableOpacity>
                    <Icon name="tune" size={24} color="#000" style={styles.filterIcon} />
                </TouchableOpacity>
            </View>


            {/* Segmented Control */}
            <TabControl
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={['Individuals', 'Group', 'Paid']}
            />
            
            {/* Tab Content */}
            <View style={styles.tabContent}>
                {activeTab === 'Individuals' && (
                    <IndividualScreen></IndividualScreen>
                )}

                {activeTab === 'Group' && (
                    <Text>Group</Text>
                )}

                {activeTab === 'Paid' && (
                    <Text>Paid</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    tab: {
        fontSize: 18,
        color: '#888',
    },
    activeTab: {
        color: '#f2b636',
        fontWeight: 'bold',
    },
    tabContent: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    sectionText: {
        color: '#666',
    },
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
        marginTop: height * 0.04, // Space below the search bar, responsive to screen height
    },
    headerTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
});

export default VisitsScreen;