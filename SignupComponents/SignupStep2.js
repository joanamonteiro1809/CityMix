// screens/SignupStep2.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Pressable, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import ArrowButton from '../GeneralElements/ArrowButton';
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from 'expo-image-picker';
import Checkbox from 'expo-checkbox';
import * as DocumentPicker from 'expo-document-picker';

const screenWidth = Dimensions.get('window').width;
const elementWidth = (screenWidth - 30 * 2) / 3;

const SignupStep2 = ({ navigation }) => {

// States
    const [isTourGuide, setIsTourGuide] = useState(false);
    const [date, setDate] = useState('');
    const [city, setCity] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [image, setImage] = useState(null);
    const [cert, setCert] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

// CHECKBOX
    const toggleCheckbox = () => {
        setIsTourGuide(!isTourGuide);
    };

// DATE OF BIRTH
    const toggleDatepicker = () => {
        setShowPicker(!showPicker);
    };

    const onChange = (_, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            setDate(selectedDate.toLocaleDateString());
        }
    };

// LANGUAGES
    const [showAllLanguages, setShowAllLanguages] = useState(false);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const languages = ['English', 'Portuguese', 'Spanish', 'French', 'Chinese', 'Dutch', 'Italian', 'Japanese'];
    const languagesToShow = showAllLanguages ? languages : languages.slice(0, 4);

    const toggleLanguageSelection = (language) => {
        setSelectedLanguages((prevSelected) =>
        prevSelected.includes(language)
        ? prevSelected.filter((lang) => lang !== language) // Remove if already selected
            : [...prevSelected, language] // Add if not selected
        );
    };

// PROFILE PICTURE
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
              setImage(result.assets[0].uri);
            }
    };

// UPLOAD CERTIFICARE
    const pickCert = async() => {
        let result = await DocumentPicker.getDocumentAsync({
            type: '*/*',
        });

        //console.log('Document Picker Result:', result);
        if(!result.canceled) {
            setCert(result.assets[0]);
        }
    };

    const validate = () => {
        if (!date || !image || !city.trim()) return false;
        if (isTourGuide && !cert) return false;
        return true;
    };

    const handleNext = () => {
        setIsSubmitted(true);
        if (validate()) {
            navigation.navigate('SignupStep3');
        }
    };

    const isFieldInvalid = (field) => isSubmitted && !field;
    const isTourGuideCertInvalid = () => isSubmitted && isTourGuide && !cert;


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
                    <View style={styles.progressInactive} />
                </View>

                <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
                    <View style={[styles.imageUploadContainer, isFieldInvalid(date) && styles.inputError]}>
                        <TouchableOpacity onPress={pickImage}>
                            {!image ? (
                                <Image source={require('../assets/upload.png')}  style={styles.imagePlaceholder}/>
                            ) : (
                                <Image source={{ uri: image }} style={styles.image} />)
                            }
                        </TouchableOpacity>
                    </View>
                    {isFieldInvalid(image) && (<Text style={styles.errorText}>Profile picture is required</Text>)}

                    {showPicker && (
                        <DateTimePicker
                            mode="date"
                            display= "spinner"
                            value={new Date()}
                            onChange={onChange}
                        />
                    )}
                    <TouchableOpacity onPress={toggleDatepicker} >
                        <View style={styles.selectionContainer}>
                        <Text style={[styles.dateInput, isFieldInvalid(date) && styles.inputError, { color: date ? '#000000' : '#aaa' } ]}>
                                {date ? date : 'Date of Birth*'}
                        </Text>
                        
                    </View>
                    </TouchableOpacity>
                    {isFieldInvalid(date) && (<Text style={styles.errorText}>Date of Birth is required</Text>)}

                    <TextInput
                        style={[styles.input, isFieldInvalid(city) && styles.inputError]}
                        placeholder="City of Residence*"
                        value={city}
                        onChangeText={setCity}
                    />
                    {isFieldInvalid(city) && (<Text style={styles.errorText}>City of residence is required</Text>)}

                    <Text style={styles.subtitle}> Languages </Text>
                    <View style={styles.languageContainer}>
                        {languagesToShow.map((lang) => (
                            <TouchableOpacity key={lang} style={[styles.languageTag, selectedLanguages.includes(lang) && styles.languageTagSelected,]}
                                onPress={() => toggleLanguageSelection(lang)}
                                >
                                <Text style={[{fontFamily:'CodecPro-Regular'}, selectedLanguages.includes(lang) && styles.tagTextSelected]}>{lang}</Text>
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity onPress={() => setShowAllLanguages(!showAllLanguages)}>
                            <Text style={styles.showMore}>{showAllLanguages ? 'Show less' : 'Show more'}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.checkboxContainer}>
                            <Checkbox style={styles.checkbox} value={isTourGuide} onValueChange={setIsTourGuide} color={isTourGuide ? '#FF914D' : undefined}/>
                            <Text style={styles.text}>I'm a certified tour guide</Text>
                    </View>

                    {isTourGuide && (
                    <View style={styles.certContainer}>
                        <TouchableOpacity onPress={pickCert} style={styles.uploadCert}>
                            {!cert ? (
                                <>
                                <Image source={require('../assets/file.png')} style={styles.fileIcon} />
                                <Text style={styles.text}> Upload Certificate </Text>
                                </>
                            ) : (
                                <Text style={styles.showMore}> {cert.name} </Text>
                            )}
                        </TouchableOpacity>
                        {isTourGuideCertInvalid() && (<Text style={styles.errorText}>Certificate is required</Text>)}
                    </View>
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
        </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 90,
        paddingBottom: 20,
    },

    contentContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },

    title: {
        fontSize: 30,
        color: '#FF914D',
        marginBottom: 20,
        fontFamily: 'CodecPro-Bold'
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
    dateInput:{
        width: '100%',
        padding: 15,
        borderWidth: 0.7,
        borderColor: '#ccc',
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: '#EBEBEB',
        fontFamily: 'CodecPro-Regular',
        color: '#aaa'
    },

    subtitle: {
        fontSize: 20,
        color: '#000000',
        marginTop: 30,
        marginBottom: 10,
        fontFamily: 'CodecPro-Bold',
    },

    languageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 30,
    },

    languageTag: {
        backgroundColor: '#e0e0e0',
        borderRadius: 30,
        padding: 12,
        margin: 5,
    },

    languageTagSelected: {
        backgroundColor: '#FF914D',
        
    },
    tagTextSelected: {
        color: '#fff', // Slightly darker color when selected
        fontFamily:'CodecPro-Regular',
     },

    showMore: {
        color: '#000000',
        marginLeft: 5,
        marginTop: 5,
        textDecorationLine: 'underline',
        fontFamily: 'CodecPro-Italic',
    },

    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    checkbox: {
        alignSelf: 'center',
        padding: 10,
        marginRight: 10,
        marginLeft: 5, 
      },

    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
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
        marginTop: 'auto',
    },

    certContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageUploadContainer: {
        width: screenWidth * 0.30,
        height: screenWidth * 0.30,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#EBEBEB',
        borderColor: '#ccc',
        borderWidth: 0.7,
        marginTop: 30,
        padding: 10,
        borderRadius: (screenWidth * 0.3) / 2,
        overflow: 'hidden',
    },

    imagePlaceholder: {
        width: screenWidth * 0.20,
        height: screenWidth * 0.20,
        resizeMode: 'contain',
        alignSelf: 'center',
    },

    image: {
        width: screenWidth * 0.30,
        height: screenWidth * 0.30,
        borderRadius: (screenWidth * 0.3) / 2,
        resizeMode: 'cover',
        alignSelf: 'center',
      },

    text: {
        fontSize: 16,
        marginTop: 5,
        fontFamily: 'CodecPro-Regular',
    },

    uploadCert: {
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#EBEBEB',
        marginTop: 5,
        width: '100%',
    },

    fileIcon: {
        width: 40,
        height: 40,
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

export default SignupStep2;
