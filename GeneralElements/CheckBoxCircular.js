import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CheckBoxCircular = ({ onPress, iconName}) => {
    const [isSelected, setSelected] = useState(false);

    const toggleCheckbox = () => {
        setSelected(!isSelected);
    };

    return (
        <Checkbox
            style={styles.checkbox}
            backgroundColor={isSelected ? '#FF914D' : '#EBEBEB'}
            value={isSelected}
            onValueChange={setSelected}
            color={isSelected ? '#FF914D' : undefined}
        />
    );
};

const styles = StyleSheet.create({
    checkbox: {
            alignSelf: 'center',
            padding: 15,
            marginRight: 10,
            marginLeft: 5,
            borderRadius: 50,
            borderColor: '#ccc',
    }
});

export default CheckBoxCircular;
