import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import ArrowButton from '../GeneralElements/ArrowButton';
import CheckBoxCircular from '../GeneralElements/CheckBoxCircular';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;
const elementWidth = (screenWidth - 30 * 2) / 3;

const SignupStep3 = ({ navigation }) => {

    const insterests = ["Culture and museums", 'Outdoor activities', 'Food', 'Nigthlife', 'Unusual routes'];
    const [newInterests, setInterests] = useState([]);
    const [interest, setInterest] = useState('');

    const addInterest = () => {
        const allInterests = [...insterests, ...newInterests].map(i => i.toLowerCase().trim());
        if (!interest.trim()) {
            Alert.alert('Error', 'Please enter a valid interest.');
            return;
        }

        if (allInterests.includes(interest.toLowerCase().trim())) {
            Alert.alert('Duplicate Interest', `"${interest}" is already in the list.`);
            return;
        }

        setInterests([...newInterests, interest.trim()]);
        setInterest('');
    };

    const renderItem = ({item}) => {
        return (
            <View style={styles.interest}>
                    <Text style={styles.text}>{item}</Text>
                    <CheckBoxCircular> </CheckBoxCircular>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        //keyboardVerticalOffset={5} // Adjust based on your app's header height
        >
            <View style={styles.container}>

                <Text style={styles.title}>Sign up</Text>

                <View style={styles.progressBar}>
                    <View style={styles.progressActive} />
                    <View style={styles.progressActive} />
                    <View style={styles.progressActive} />
                </View>

                <Text style={styles.subtitle}>Your Interests</Text>

                <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
                
                <View style={styles.interest}>
                    <Text style={styles.text}>Culture and museums</Text>
                    <CheckBoxCircular> </CheckBoxCircular>
                </View>
                <View style={styles.interest}>
                    <Text style={styles.text}>Outdoor activities</Text>
                    <CheckBoxCircular> </CheckBoxCircular>
                </View>
                <View style={styles.interest}>
                    <Text style={styles.text}>Food</Text>
                    <CheckBoxCircular> </CheckBoxCircular>
                </View>
                <View style={styles.interest}>
                    <Text style={styles.text}>Nightlife</Text>
                    <CheckBoxCircular> </CheckBoxCircular>
                </View>
                <View style={styles.interest}>
                    <Text style={styles.text}>Unusual routes</Text>
                    <CheckBoxCircular> </CheckBoxCircular>
                </View>

                {newInterests.map((item, index) => (
                        <View key={`new-${index}`} style={styles.interest}>
                            <Text style={styles.text}>{item}</Text>
                            <CheckBoxCircular />
                        </View>
                ))}

                <View style={styles.interest}>
                    <TextInput
                        placeholder="Add other..."
                        value={interest}
                        onChangeText={setInterest}
                        style={styles.text}
                    />
                    <TouchableOpacity onPress={addInterest} style={styles.addRouteIcon}>
                        <Icon name="add" size={30} style={{marginRight: 10}}/>
                    </TouchableOpacity>
                </View>

                </ScrollView>

                <View style={styles.buttonsRow}>
                    <ArrowButton
                      onPress={() => navigation.goBack()}
                      iconName={("chevron-left")}
                    />
                    {/*<ArrowButton
                      onPress={() => navigation.navigate('HomeScreen')}
                      iconName={("chevron-right")}
                    />*/}
                    <TouchableOpacity
                        style={styles.done}
                        onPress={() => navigation.navigate('HomeScreen')}>
                        <Text style={styles.doneText}>DONE</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
        paddingTop: 90,
    },

    title: {
        fontSize: 30,
        color: '#FF914D',
        marginBottom: 20,
        fontFamily: 'CodecPro-Bold',
    },

    subtitle: {
        fontSize: 30,
        fontFamily: 'CodecPro-Bold',
        marginTop: 20,
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
        marginBottom: 10,
        //position: 'absolute',
        //bottom: 10,
        //left: 20,
        //right: 20,
        justifyContent: 'space-between',
        marginTop: 10,

    },

    interest: {
        width: '100%',
        padding: 12,
        borderWidth: 0.7,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 30,
        backgroundColor: '#EBEBEB',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',

    },

    text: {
        fontSize: 18,
        fontFamily: 'CodecPro-Regular',
    },

    textInput: {
        fontSize: 16,
        fontFamily: 'CodecPro-Regular',
        paddingTop: 0,
        paddingBottom: 0,
    },

    done: {
        backgroundColor: '#FF914D',
        borderRadius: 30,
        padding: 10,
        width: 85,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    doneText: {
        fontSize: 15,
        fontFamily: 'CodecPro-Bold',
        color: '#FFFFFF',
    }

});

export default SignupStep3;