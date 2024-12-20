// GroupScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Dimensions, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import sampleData from '../sampledata';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');


const renderGroupItem = ({nav, item }) => (
    <TouchableOpacity onPress={() => nav.navigate('GroupEntry', {group: item}) } style={styles.groupCard}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{item.title}</Text>
                <View style={styles.infoRow}>
                    <FontAwesome6 name="users" size={14} color='#888' style={{marginRight: -0.1}}/>
                    <Text style={styles.numberPeopleInfo}>{item.numPeopl}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={14} color='#888' style={{marginRight: -0.1}}/>
                    <Text style={styles.location}>{item.location}</Text>
                </View>
            </View>
    </TouchableOpacity>
);

const GroupScreen = ( { nav, tours } ) => {
    return (
        <View style={styles.container}>
            <FlatList
                    data={tours}
                    renderItem={({ item }) => renderGroupItem({ nav, item })}
                    keyExtractor={item => item.id.toString()}
                    //contentContainerStyle={styles.listContainer}
                    contentContainerStyle={{
                        flexGrow: 1, // Ensures it grows to fit the content
                        paddingBottom: 20, // Adds padding to avoid cut-offs
                        justifyContent: tours.length < 3 ? 'flex-start' : 'center', // Adjust layout if fewer items
                    }}
                    ListFooterComponent={
                        tours.length === 1 || tours.length === 2 || tours.length === 3 || tours.length === 4 || tours.length === 5 ? <View style={{ height: 20 }} /> : null
                    } // Optional spacing for short lists
                />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        maxWidth: '100%', 
        maxHeight: '90%',
    },
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
       // fontWeight: 'bold',
       fontFamily: 'CodecPro-Bold',
    },
    numberPeopleInfo: {
        fontSize: 12,
        color: '#888',
        marginHorizontal: 5,
        fontFamily: 'CodecPro-Regular',
    },
    image: {
        width: width*0.27,
        height: height*0.11,
        borderRadius: 10,
    },
    location: {
        fontSize: 12,
        color: '#888',
        marginHorizontal: 5,
        fontFamily: 'CodecPro-Regular',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
},
});

export default GroupScreen;
