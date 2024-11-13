// screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IndividualScreen from './IndividualScreen';
import TabControl from './TabControl';

const { width, height } = Dimensions.get('window');

const VisitsScreen = () => {
    const [activeTab, setActiveTab] = useState('Individuals'); // Default tab

    return (
        <View style={styles.container}>
            
            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <View style={styles.backButtonInner}>
                        <Icon name="arrow-back" size={20} color="#fff" />
                    </View>
                </TouchableOpacity>
                
                <View style={styles.headerTitleContainer}>
                    <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
                    <Text style={styles.headerTitle}>Lisbon</Text>
                </View>

                <TouchableOpacity>
                    <Icon name="tune" size={24} color="#000" style={styles.filterIcon} />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Search" />
                <Icon name="search" size={24} color="#555" />
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