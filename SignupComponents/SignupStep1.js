// screens/SignupStep1.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';


const SignupStep1 = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign up</Text>
            <View style={styles.progressBar}>
                <View style={styles.progressActive} />
                <View style={styles.progressInactive} />
                <View style={styles.progressInactive} />
            </View>
            <TextInput style={styles.input} placeholder="Name" />
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Username" />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry />
            <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignupStep2')}>
                <Text style={styles.buttonText}>➔</Text>
            </TouchableOpacity>

            {/* Custom Back Button at the Bottom */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f2b636',
        marginBottom: 20,
    },
    progressBar: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    progressActive: {
        width: 30,
        height: 5,
        backgroundColor: '#f2b636',
        marginHorizontal: 2,
    },
    progressInactive: {
        width: 30,
        height: 5,
        backgroundColor: '#ddd',
        marginHorizontal: 2,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#f2b636',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },

    backButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    backButton: {
        backgroundColor: '#f2b636',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 20,
        color: '#fff',
    },

});

export default SignupStep1;