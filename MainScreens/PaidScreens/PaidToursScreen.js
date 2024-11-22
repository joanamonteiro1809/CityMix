// PaidToursScreen.js --> all paid tours available
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('screen');

const renderPaidToursItem = ({ item, nav }) => (
    <TouchableOpacity onPress={() => nav.navigate('TourDetails', { tour: item })} style={styles.tourCard}>
        <View style={styles.titleAndPhoto}>
            <Image source={item.picture} style={styles.image} />
            <View style={styles.tourInfo}>
                <Text style={styles.tourName}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.ratingContainer}>
                    <Text>{item.rating}</Text>
                    <Image source={require('../../assets/star.png')} style={styles.star}/>

                </View>
            </View>
        </View>
        <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price}€</Text>
        </View>
    </TouchableOpacity>
);

const PaidToursScreen = ({ nav, tours }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={tours}
                renderItem={({ item }) => renderPaidToursItem({ item, nav })}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        //flex: 2,
        //flexShrink:1,
        maxWidth: '100%', 
        maxHeight: '90%',
        //borderWidth: 2
    },
    tourCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
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
    titleAndPhoto:{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    tourInfo: {
        marginLeft: 10,
        flex: 1,
    },
    tourName: {
        fontSize: 16,
        fontFamily: 'CodecPro-Bold',
    },
    description: {
        fontSize: 12,
        fontFamily: 'CodecPro-Regular',
        lineHeight: 20,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    ratingText: {
        fontSize: 14,
        color: '#333',
        marginRight: 4,
        fontFamily: 'CodecPro-Regular',
    },
    star: {
        width: 16,
        height: 16,
        marginLeft: 4,
        resizeMode: 'contain',
    },
    priceContainer: {
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },

    image: {
        width: width*0.27,
        height: height*0.11,
        borderRadius: 10,
    },
});

export default PaidToursScreen;
