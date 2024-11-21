// screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IndividualScreen from './IndividualScreen';
import TabControl from '../GeneralElements/TabControl';
import ArrowButton from '../GeneralElements/ArrowButton';
import GroupScreen from './GroupScreen';
import PaidToursScreen from './PaidScreens/PaidToursScreen';
import sampleData from '../sampledata';

const { width, height } = Dimensions.get('window');

const VisitsScreen = ({ navigation, route }) => {

    const initialTab = route.params?.tabSelected || "Individuals";

    const filteredIndividuals = route.params?.filteredIndividuals || sampleData.individual;
    const filteredGroups = route.params?.filteredGroups || sampleData.group;
    const filteredPaid = route.params?.filteredPaid || sampleData.paidTours;

    const filters = route.params?.selectedFilters || {};

    const [activeTab, setActiveTab] = useState(initialTab); // Default tab

    const location = route.params?.location || "Lisbon";

    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <ArrowButton
                    onPress={() => navigation.goBack() }
                    iconName={("chevron-left")}
                />
                <TouchableOpacity onPress={() => navigation.navigate('SearchScreen', { recentSearch: location })}>
                    <View style={styles.headerTitleContainer}>
                        <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
                        <Text style={styles.headerTitle}>{location}</Text>
                    </View>
                </TouchableOpacity>

                {/** Show age filter on individuals */}
                {activeTab == 'Individuals' && (
                    <TouchableOpacity onPress={() => 
                        navigation.navigate('Filter', 
                            {tabSel: 'Individuals', 
                            filters: filters, 
                            recentSearch: location, 
                            })}>
                        <Icon name="tune" size={24} color="#000" style={styles.filterIcon} />
                    </TouchableOpacity>
                )}

                {activeTab == 'Group' && (
                    <TouchableOpacity onPress={() => 
                        navigation.navigate('Filter', 
                        {tabSel: 'Group', 
                        filters: filters, 
                        recentSearch: location,
                        })}>
                        <Icon name="tune" size={24} color="#000" style={styles.filterIcon} />
                    </TouchableOpacity>
                )
                }

                {activeTab == 'Paid' && (
                    <TouchableOpacity onPress={() => 
                        navigation.navigate('Filter', 
                        {tabSel: 'Paid', 
                        filters: filters, 
                        recentSearch: location,
                        })}>
                        <Icon name="tune" size={24} color="#000" style={styles.filterIcon} />
                    </TouchableOpacity>
                )
                }
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
                    filteredIndividuals.length > 0 ? (
                        <IndividualScreen 
                            nav={navigation} 
                            tours={sampleData.currentUser.role === 'tour_guide'
                                ? filteredIndividuals.filter(item => item.name !== 'João Silva')
                                : filteredIndividuals} />
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataTitle}>No Users Found</Text>
                            <Text style={styles.noDataSubtitle}>
                                It seems like there are no users available in your selected location or with your current filters.
                            </Text>
                            <Text style={styles.noDataAction}>
                                Try adjusting the filters or searching for a different location.
                            </Text>
                        </View>
                    )
                )}

                {activeTab === 'Group' && (
                    filteredGroups.length > 0 ? (
                        <GroupScreen nav={navigation} tours={filteredGroups} />
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataTitle}>No Communities Found</Text>
                            <Text style={styles.noDataSubtitle}>
                                It seems like there are no communities available in your selected location or with your current filters.
                            </Text>
                            <Text style={styles.noDataAction}>
                                Try adjusting the filters or searching for a different location.
                            </Text>
                        </View>
                    )
                )}

                {activeTab === 'Paid' && (
                    filteredPaid.length > 0 ? (
                        <PaidToursScreen nav={navigation} tours={filteredPaid} />
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataTitle}>No Tours Found</Text>
                            <Text style={styles.noDataSubtitle}>
                                It seems like there are no tours available in your selected location or with your current filters.
                            </Text>
                            <Text style={styles.noDataAction}>
                                Try adjusting the filters or searching for a different location.
                            </Text>
                        </View>
                    )
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
    noDataContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 20,
        //borderWidth:2,
        
    },
    noDataTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 10,
    },
    noDataSubtitle: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginBottom: 10,
    },
    noDataAction: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});

export default VisitsScreen;