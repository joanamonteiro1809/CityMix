import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image
                source={require('./assets/Logo.png')} 
                style={styles.logo}
            />

            {/* Login Title */}
            <Text style={styles.title}>Login</Text>

            {/* Email and Password Input */}
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#888" />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
            />

            {/* Sign Up Link and Login Button */}
            <View style={styles.actionRow}>
                <TouchableOpacity onPress={() => navigation.navigate('SignupStep1')}>
                    <Text style={styles.signupText}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={() => { navigation.navigate('HomeScreen') }}>
                    <Text style={styles.loginButtonText}>➔</Text>
                </TouchableOpacity>
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    logo: {
        width: 200,
        height: 100,
        marginBottom: 20,
        resizeMode: 'contain', // Adjusts the image size while maintaining aspect ratio
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f2b636', // Gold color
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: '#f2f2f2',
        color: '#333', // Text color for input
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        width: '100%',
        justifyContent: 'space-between',
    },
    signupText: {
        color: '#888',
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: '#f2b636', // Gold color
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        fontSize: 24,
        color: '#fff',
    },
    forgotPasswordText: {
        color: '#888',
        fontSize: 14,
    },
});

export default LoginScreen;
