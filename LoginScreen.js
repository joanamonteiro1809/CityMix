import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { useFonts } from 'expo-font';
import sampleData from './sampledata';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');


const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFontsReady, setIsFontsReady] = useState(false);
    const [isAppReady, setIsAppReady] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);


    const [fontsLoaded] = useFonts({
        'CodecPro-Bold': require('./assets/fonts/CodecPro-Bold.ttf'),
        'CodecPro-ExtraBold': require('./assets/fonts/CodecPro-ExtraBold.otf'),
        'CodecPro-Italic': require('./assets/fonts/CodecPro-Italic.ttf'),
        'CodecPro-Regular': require('./assets/fonts/CodecPro-Regular.ttf'),
        'ArchivoBlack-Regular': require('./assets/fonts/ArchivoBlack-Regular.ttf'),
    });


    // ANIMATIONS
    const logoAnim = useRef(new Animated.Value(0)).current;
    const inputContainerAnim = useRef(new Animated.Value(0)).current;
    const inputOpacityAnim = useRef(new Animated.Value(0)).current;

    const [animationStarted, setAnimationStarted] = useState(false);

    useEffect(() => {
        if (fontsLoaded) {
            setIsFontsReady(true);

            // Add a slight delay to ensure all font glyphs are loaded
            setTimeout(() => setIsAppReady(true), 500);
        }
    }, [fontsLoaded]);

    useEffect(() => {
        {/*if (fontsLoaded) {
            setIsReady(true);*/}

            if (isAppReady && !animationStarted) {
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
                setAnimationStarted(true);
            }
        {/*}*/}
    }, [isAppReady, animationStarted, logoAnim, inputContainerAnim, inputOpacityAnim]);

    if (!isAppReady) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={{ fontSize: 18, color: '#888', marginTop: 10 }}>Loading...</Text>
            </View>
        );
    }

    const handleEmail = (newEmail) => {
        setEmail(newEmail);
    }

    const isFieldInvalid = (field) => isSubmitted && !field;

    const isEmailInvalid = (field) => (isSubmitted && (!field || (field.trim() != 'rita') || (field.trim() != 'joao'))); 
 
    const validate = () => {
        let isValid = true;
    
        // Validate Username
        if (email.trim() !== 'rita' && email.trim() !== 'joao') {
            setUsernameError(true);
            isValid = false;
        } else {
            setUsernameError(false);
        }
    
        // Validate Password
        if (
            (email.trim() !== 'rita' && email.trim() !== 'joao') ||
            (email.trim() === 'rita' && password.trim() !== 'rita123') ||
            (email.trim() === 'joao' && password.trim() !== 'joao123')
        ) {
            setPasswordError(true);
            isValid = false;
        } else {
            setPasswordError(false);
        }
    
        return isValid;
    };
    
    

    const handleNext = () => {
        setIsSubmitted(true);
        if (validate()) {
            navigation.navigate('HomeScreen');
        }
    };
    
    

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
        >
            <View style={styles.container}>
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
                    {isSubmitted && usernameError && (
                        <Text style={styles.errorText}>Username is incorrect</Text>)}
                    <TextInput 
                        style={[styles.input, isSubmitted && usernameError && styles.inputError]} 
                        placeholder="Username" 
                        placeholderTextColor="#888" 
                        value={email}
                        onChangeText={handleEmail}
                    />
                    {isSubmitted && passwordError && (
                        <Text style={styles.errorText}>Password is incorrect</Text>)}
                    <TextInput
                        style={[styles.input, isSubmitted && passwordError && styles.inputError]}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
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
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                </Animated.View>
            </View>
        </KeyboardAwareScrollView>
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
    inputError:{
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 5,
        marginLeft: 20,
        alignSelf: 'flex-start'
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
