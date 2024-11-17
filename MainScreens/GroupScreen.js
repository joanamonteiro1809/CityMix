// GroupScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import sampleData from '../sampledata';

const { width } = Dimensions.get('window'); 

const renderGroupItem = ({ item }) => (
    <View style={styles.groupCard}>
            <Icon name="image" size={50} color="#555" />
            <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{item.title}</Text>
                <Text style={styles.numberPeopleInfo}>{item.numPeopl}</Text>
            </View>
    </View>
);

const GroupScreen = ( { nav, tours } ) => {

    return (
        <View>
            {/* Group tours cards */}
            <FlatList
                    data={tours}
                    renderItem={renderGroupItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    groupCard: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    groupInfo: {
        marginLeft: 10,
    },
    groupName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    numberPeopleInfo: {
        fontSize: 12,
        color: '#888',
    },
});

export default GroupScreen;
