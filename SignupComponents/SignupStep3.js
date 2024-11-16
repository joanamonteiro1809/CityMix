import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Pressable, Image } from 'react-native';
import ArrowButton from '../GeneralElements/ArrowButton';

const screenWidth = Dimensions.get('window').width;
const elementWidth = (screenWidth - 30 * 2) / 3;

const SignupStep3 = ({ navigation }) => {
    return (
            <View style={styles.container}>

                <Text style={styles.title}>Sign up</Text>

                <View style={styles.progressBar}>
                    <View style={styles.progressActive} />
                    <View style={styles.progressActive} />
                    <View style={styles.progressActive} />
                </View>

                //TODO: procurar elemento para selecionar
                <Text style={styles.interest}>INTEREST </Text>
                <Text style={styles.interest}>INTEREST </Text>
                <Text style={styles.interest}>INTEREST </Text>
                <Text style={styles.interest}>INTEREST </Text>
                <Text style={styles.interest}>INTEREST </Text>
                <Text style={styles.interest}>INTEREST </Text>

                <View style={styles.buttonsRow}>
                    <ArrowButton
                      onPress={() => navigation.goBack()}
                      iconName={("chevron-left")}
                    />
                    //TODO: mudar para DONE
                    <ArrowButton
                      onPress={() => navigation.navigate('SignupStep3')}
                      iconName={("chevron-right")}
                    />
                </View>

            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
        paddingTop: 100,
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FF914D',
        marginBottom: 20,
    },

    progressBar: {
        flexDirection: 'row',
    },

    progressActive: {
        width: elementWidth,
        height: 10,
        backgroundColor: '#FF914D',
        marginHorizontal: 2,
        borderRadius: 10,
    },

    progressInactive: {
        width: elementWidth,
        height: 10,
        backgroundColor: '#ddd',
        marginHorizontal: 5,
        borderRadius: 10,
    },

    buttonsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        position: 'absolute',
        bottom: 10,
        left: 20,
        right: 20,
        justifyContent: 'space-between',
    },

    interest: {
        width: '100%',
        padding: 15,
        borderWidth: 0.7,
        borderColor: '#ccc',
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: '#EBEBEB',
    }

});

export default SignupStep3;