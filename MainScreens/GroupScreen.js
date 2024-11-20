// GroupScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Dimensions, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import sampleData from '../sampledata';

const { width, height } = Dimensions.get('window');

// TODO: adicionar os 2 icons das pessoas e da localizaçao + por texto em cima
const renderGroupItem = ({nav, item }) => (
    <TouchableOpacity onPress={() => nav.navigate('GroupEntry', {group: item}) } style={styles.groupCard}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{item.title}</Text>
                <Text style={styles.numberPeopleInfo}>{item.numPeopl}</Text>
                <Text style={styles.location}>{item.location}</Text>
            </View>
    </TouchableOpacity>
);

const GroupScreen = ( { nav, tours } ) => {
    return (
        <View>

            <FlatList
                    data={tours}
                    renderItem={({ item }) => renderGroupItem({ nav, item })}
                    keyExtractor={item => item.id.toString()}
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
        height: height * 0.14,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation: 2,
        position: 'relative',
    },
    groupInfo: {
        marginLeft: 10,
        justifyContent: 'flex-start',
        flex: 1,
    },
    groupName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    numberPeopleInfo: {
        fontSize: 12,
        color: '#888',
    },
    image: {
        width: width*0.27,
        height: height*0.11,
        borderRadius: 10,
    },
    location: {
        fontSize: 12,
        color: '#888',
    },
});

export default GroupScreen;
