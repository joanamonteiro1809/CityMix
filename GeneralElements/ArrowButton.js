import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ArrowButton = ({ onPress, iconName}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Icon name={iconName} style={styles.iconStyle} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FF914D', // Gold color
        width: 40,
        height: 40,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconStyle: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
    },
});

export default ArrowButton;