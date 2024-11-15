// screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IndividualScreen from './IndividualScreen';
import TabControl from '../GeneralElements/TabControl';
import ArrowButton from '../GeneralElements/ArrowButton';
import GroupScreen from './GroupScreen';
import PaidToursScreen from './PaidScreens/PaidToursScreen';

const { width, height } = Dimensions.get('window');

const VisitsScreen = ({ navigation, route }) => {

    const initialTab = route.params?.tabSelected || "Individuals";
    const [activeTab, setActiveTab] = useState(initialTab); // Default tab
    return (
        <View style={styles.container}>
            
            {/* Custom Header */}
            <View style={styles.header}>
                <ArrowButton
                    onPress={() => navigation.goBack()}
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


            {/* Tab Control */}
            <TabControl
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={['Individuals', 'Group', 'Paid']}
            />
            
            {/* Tab Content */}
            <View>
                {activeTab === 'Individuals' && (
                    <IndividualScreen></IndividualScreen>
                )}

                {activeTab === 'Group' && (
                    <GroupScreen></GroupScreen>
                )}

                {activeTab === 'Paid' && (
                    <PaidToursScreen nav={navigation}></PaidToursScreen>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        paddingTop: 35,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        //marginTop: height * 0.04, // Space below the search bar, responsive to screen height
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
});

export default VisitsScreen;