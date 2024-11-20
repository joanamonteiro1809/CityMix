import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { useFonts } from 'expo-font';
import sampleData from './sampledata';

const { width, height } = Dimensions.get('window');


const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');

    {/*const [fontsLoaded] = useFonts({
        'CodecPro-Bold': require('./assets/fonts/CodecPro-Bold.ttf'),
        'CodecPro-ExtraBold': require('./assets/fonts/CodecPro-ExtraBold.otf'),
        'CodecPro-Italic': require('./assets/fonts/CodecPro-Italic.ttf'),
        'CodecPro-Regular': require('./assets/fonts/CodecPro-Regular.ttf'),
    });
    if (!fontsLoaded) {
        return null;
    }*/}

    // ANIMATIONS
    const logoAnim = useRef(new Animated.Value(0)).current;
    const inputContainerAnim = useRef(new Animated.Value(0)).current;
    const inputOpacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(logoAnim, {
                toValue: 0.5,
                duration: 2000,
                useNativeDriver: true,
            }),
            Animated.timing(logoAnim, {
                toValue: 1.4,
                duration: 1200,
                useNativeDriver: true,
            }),
        ]).start();

        Animated.parallel([
            Animated.timing(inputContainerAnim, {
                toValue: 1,
                duration: 1200,
                delay: 2000,
                useNativeDriver: true,
            }),
            Animated.timing(inputOpacityAnim, {
                toValue: 1,
                duration: 1200,
                delay: 2000,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleEmail = (newEmail) => {
        setEmail(newEmail);
    }

    const handleNext = () => {
        console.log('Before: ', email)
        if(email == "Rita"){
            sampleData.currentUser.role = 'normal_user';
        } else {
            sampleData.currentUser.role = 'tour_guide';
        }
        console.log('After: ', sampleData.currentUser)
        navigation.navigate('HomeScreen');
    }

    return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        //keyboardVerticalOffset={5} // Adjust based on your app's header height
        >
            <View style={styles.container}>
                {/* Top Section with Background and Illustration */}

                <Animated.Image
                    source={require('./assets/Logo.png')}
                    style={[styles.logo, {transform: [{translateY: logoAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [height / 2 - height * 0.15, height * 0.1],}),},],},
                    ]}
                />

                <Animated.View
                    style={[styles.inputContainer, {opacity: inputOpacityAnim, transform: [{
                        translateY: inputContainerAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [height * 0.4, 0],
                        }),
                    },],
                    },
                    ]}
                >

                    {/* Login Title */}
                    <Text style={styles.title}>Login</Text>

                    {/* Email and Password Input */}
                    <TextInput 
                        style={styles.input} 
                        placeholder="Email" 
                        placeholderTextColor="#888" 
                        value={email}
                        onChangeText={handleEmail}
                    />
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
                        <TouchableOpacity style={styles.loginButton} onPress={handleNext}>
                            <Image source={require('./assets/arrow.png')} style={styles.arrow}/>
                        </TouchableOpacity>
                    </View>

                    {/* Forgot Password Link */}
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                </Animated.View>
            </View>
        </KeyboardAvoidingView>
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
        width: width * 0.8,
        height: height * 0.3,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: height * 0.1,
    },

    title: {
        fontSize: 32,
        color: '#FF914D',
        marginBottom: 40,
        marginTop: 30,
        fontFamily: 'CodecPro-Bold',
    },

    input: {
        width: '90%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#f2f2f2',
        color: '#333',
        fontFamily: 'CodecPro-Regular',
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
        color: '#FF914D',
        fontSize: 20,
        fontFamily: 'CodecPro-Italic',
    },

    loginButton: {
        backgroundColor: '#FF914D',
        width: 40,
        height: 40,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },

    forgotPasswordText: {
        color: '#888',
        fontSize: 14,
        textDecorationLine: 'underline',
        fontFamily: 'CodecPro-Regular',

    },
});

export default LoginScreen;
