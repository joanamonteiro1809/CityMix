import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useFonts } from 'expo-font'; // Import useFonts

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {

    const [fontsLoaded] = useFonts({
            'CodecPro-Regular': require('./assets/fonts/CodecPro-Regular.ttf'),
            'CodecPro-Italic': require('./assets/fonts/CodecPro-Italic.ttf'),

        });


    // Wait until fonts are loaded
    if (!fontsLoaded) {
        return null; // Avoid rendering until font is ready
    }

    return (
        <View style={styles.container}>
            {/* Top Section with Background and Illustration */}

            <Image
                source={require('./assets/Logo.png')}
                style={styles.logo}
            />

            <View style={styles.inputContainer}>

                {/* Login Title */}
                <Text style={styles.title}>Login</Text>
                <Text style={{ fontFamily: 'CodecPro-Regular' }}>CodecPro-Regular</Text>
                <Text style={{ fontFamily: 'CodecPro-Italic' }}>CodecPro-Italic</Text>

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
                        <Text style={styles.loginButtonText}> </Text>
                        <Image source={require('./assets/arrow.png')} style={styles.arrow}/>
                    </TouchableOpacity>
                </View>

                {/* Forgot Password Link */}
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
        backgroundColor: '#EBEBEB',
    },

    inputContainer: {
        bottom: -30,
        flex: 1,
        width: '120%',
        backgroundColor: '#FFF',
        padding: 30,
        borderRadius: 70,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',
        marginTop: 'auto',

    },

    logo: {
        /*width: 400,
        height: 300,
        marginTop: 20,
        position: 'absolute', // Position it absolutely within the container
        top: 50,
        left: 20,
        alignItems: 'center',
        resizeMode: 'contain', // Adjusts the image size while maintaining aspect ratio*/

        width: width * 0.8, // Make the logo responsive
        height: height * 0.3, // Adjust based on screen height
        resizeMode: 'contain', // Maintain aspect ratio
        alignSelf: 'center', // Center horizontally
        marginTop: height * 0.1, // Adjust top margin
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF914D', // Gold color
        marginBottom: 50,
        marginTop: 30,
        //fontFamily: "Gill Sans",       //fontFamily: 'CodecPro-Regular',
        //fontFamily: 'CodecPro-Italic',

    },
    input: {
        width: '90%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#f2f2f2',
        color: '#333', // Text color for input

    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        width: '90%',
        justifyContent: 'space-between',

    },

    arrow: {
        width: '40%',
        height: 25,
        position: 'absolute',
    },

    signupText: {
        color: '#888',
        fontSize: 16,

    },

    loginButton: {
        backgroundColor: '#FF914D', // Gold color
        width: 40,
        height: 40,
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
        textDecorationLine: 'underline',

    },
});

export default LoginScreen;
