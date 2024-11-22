import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ArrowButton from '../../GeneralElements/ArrowButton';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const GroupEntry = ({navigation, route}) => {

    const groupEntry = route.params?.group;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                 <ArrowButton onPress={() => navigation.goBack()} iconName={("chevron-left")}/>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.imageContainer}>
                    <Image source={groupEntry.image} style={styles.image} />
                </View>

                <View style={styles.groupInfoContainer}>
                    <Text style={styles.groupTitle}>{groupEntry.title}</Text>
                    <Text style={styles.groupDescription}>{groupEntry.description}</Text>
                </View>

                <View style={styles.membersInfo}>
                    <View style={styles.locationContainer} >
                        <Ionicons name="location-outline" size={18} color="black" style={{ marginRight: 0 }} />
                        <Text style={styles.subtitle}>Location:</Text>
                        <Text style={styles.text}>{groupEntry.location}</Text>
                    </View>
                    <View style={styles.locationContainer}>
                        <FontAwesome6 name="users" size={18} color="black" style={{ marginRight: 5 }}/>
                        <Text style={styles.subtitle}>{groupEntry.numPeopl}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('GroupMessage', {group: groupEntry})}>
                            <Text style={styles.footerBoxes}>Join Group</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 35,
        backgroundColor: '#F8F8F8',
    },
    contentContainer: {
        alignItems: 'center',
    },
    header: {
        justifySelf: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        //top: 20,
        backgroundColor: '#F8F8F8',
    },
    imageContainer: {
        backgroundColor: '#F8F8F8',
        width: '100%',
        height: height * 0.35,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    image: {
        width: '75%',
        height: '100%',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
        backgroundColor: '#fff',
    },

    groupTitle: {
        fontSize: 26,
        color: '#333',
        marginLeft: 5,
        fontFamily: 'CodecPro-ExtraBold',
    },

    groupDescription: {
        marginTop: 5,
        fontSize: 14,
        color: '#333',
        paddingHorizontal: 25,
        textAlign: 'center',
        //fontFamily: 'CodecPro-Regular',
        //includeFontPadding: false,
        fontFamily: 'Roboto',
        lineHeight: 20,

    },

    groupInfoContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 1,
    },

    membersInfo: {
        padding: 20,
        width: '80%',
        height: height * 0.25,
        borderRadius: 40,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 3,},
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 3,
        marginVertical: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
    },

    locationContainer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 6,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'CodecPro-Bold',
        marginRight: 5,
    },
    text: {
        fontSize: 14,
        fontFamily: 'CodecPro-Regular',
        flexShrink: 1,
        lineHeight: 22,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonContainer: {
        backgroundColor: '#FF914D',
        borderRadius: 20,
        padding: 8,
        width: '60%',
        alignSelf: 'center',
        marginTop: 'auto',

    },
    footerBoxes:{
        fontSize: 16,
        color: '#fff',
        fontFamily: 'CodecPro-Bold',
        textAlign: 'center',
    },
});

export default GroupEntry;