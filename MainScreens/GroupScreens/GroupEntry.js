import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ArrowButton from '../../GeneralElements/ArrowButton';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const { width, height } = Dimensions.get('window');

const GroupEntry = ({navigation, route}) => {

    const groupEntry = route.params?.group;

    return (
        <View style={styles.container}>



            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image source={groupEntry.image} style={styles.image} />
                    <View style={styles.header}>
                         <ArrowButton
                             onPress={() => navigation.goBack()}
                             iconName={("chevron-left")}
                         />
                    </View>
                </View>


                <View style={styles.groupInfoContainer}>
                    <Text style={styles.groupTitle}>{groupEntry.title}</Text>
                </View>

                <View style={styles.membersInfo}>
                    <View style={styles.iconContainer}>
                        <FontAwesome6 name="users" size={24} color="black" />
                    </View>
                    <Text style={styles.numMembers}>{groupEntry.numPeopl}</Text>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingHorizontal: 20,
        backgroundColor: '#fff',
        paddingTop: 35,
    },
    header: {
        flexDirection: 'row',
        justifySelf: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        top: 20,
        position: 'absolute',
    },
    imageContainer: {
        backgroundColor: '#e0e0e0',
        width: '100%',
        height: height * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },

    groupTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 5,
    },

    groupInfoContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    membersInfo: {
        //flexDirection: 'row',
        alignItems: 'flex-start', // Vertically align the icon and text
        paddingHorizontal: 20,
        marginTop: 20,
        justifyContent: 'flex-start',
        //backgroundColor: '#f0f0f0',
    },
    iconContainer: {
        justifyContent: 'center',   // Center the icon vertically
        alignItems: 'center',
    },

    numMembers: {
        fontSize: 16,
        textAlignVertical: 'center',
        alignSelf: 'flex-start',
    },

});

export default GroupEntry;