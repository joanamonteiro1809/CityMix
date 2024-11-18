// screens/SignupStep1.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import ArrowButton from '../GeneralElements/ArrowButton';

const screenWidth = Dimensions.get('window').width;
const elementWidth = (screenWidth - 30 * 2) / 3;

const SignupStep1 = ({ navigation }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = () => {
        return (
            Object.values(formData).every((value) => value.trim()) &&
            formData.password === formData.confirmPassword
        );
    };

    const handleNext = () => {
        setIsSubmitted(true);
        if (validate()) {
            navigation.navigate('SignupStep2');
        }
    };

    const isFieldInvalid = (field) => isSubmitted && !formData[field].trim();
    const isPasswordMismatch = (field) =>
        isSubmitted && field === 'confirmPassword' && formData.password !== formData.confirmPassword;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign up</Text>
            <View style={styles.progressBar}>
                <View style={styles.progressActive} />
                <View style={styles.progressInactive} />
                <View style={styles.progressInactive} />
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
            <TextInput
                style={[styles.input, isFieldInvalid('name') && styles.inputError]}
                placeholder="Name*"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            {isFieldInvalid('name') && <Text style={styles.errorText}>Name is required.</Text>}

            <TextInput
                style={[styles.input, isFieldInvalid('email') && styles.inputError]}
                placeholder="Email*"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
            {isFieldInvalid('email') && <Text style={styles.errorText}>Email is required</Text>}

            <TextInput
                style={[styles.input, isFieldInvalid('username') && styles.inputError]}
                placeholder="Username*"
                value={formData.username}
                onChangeText={(text) => setFormData({ ...formData, username: text })}
            />
            {isFieldInvalid('username') && (<Text style={styles.errorText}>Username is required</Text>)}

            <TextInput
                style={[styles.input, isFieldInvalid('password') && styles.inputError]}
                placeholder="Password*"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
            />
            {isFieldInvalid('password') && <Text style={styles.errorText}>Password is required</Text>}

            <TextInput style={[styles.input, (isFieldInvalid('confirmPassword') || isPasswordMismatch('confirmPassword')) &&
                        styles.inputError,]}
                placeholder="Confirm Password*"
                secureTextEntry
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            />

            {isFieldInvalid('confirmPassword') && (
                <Text style={styles.errorText}>Confirm Password is required</Text>
            )}
            {isPasswordMismatch('confirmPassword') && (
                <Text style={styles.errorText}>Passwords do not match</Text>
            )}
            </ScrollView>

            <View style={styles.buttonsRow}>
                <ArrowButton
                    onPress={() => navigation.goBack()}
                    iconName={("chevron-left")}
                />
                <ArrowButton
                    onPress={handleNext}
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
        paddingTop: 90,
    },

    contentContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },

    title: {
        fontSize: 30,
        color: '#FF914D',
        marginBottom: 20,
        fontFamily: 'CodecPro-Bold',
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

    input: {
        width: '100%',
        padding: 15,
        borderWidth: 0.7,
        borderColor: '#ccc',
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: '#EBEBEB',
        fontFamily: 'CodecPro-Regular',
    },

    arrow: {
        width: '40%',
        height: 25,
        position: 'absolute',
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

    inputError: {
        borderColor: 'red',
    },

    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 5,
    }

});

export default SignupStep1;