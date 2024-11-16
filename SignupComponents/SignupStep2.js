// screens/SignupStep2.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Pressable, Image } from 'react-native';
import ArrowButton from '../GeneralElements/ArrowButton';
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from 'expo-image-picker';
import Checkbox from 'expo-checkbox';
import * as DocumentPicker from 'expo-document-picker';

const screenWidth = Dimensions.get('window').width;
const elementWidth = (screenWidth - 30 * 2) / 3;

const SignupStep2 = ({ navigation }) => {

// CHECKBOX
    const [isTourGuide, setIsTourGuide] = useState(false);

    const toggleCheckbox = () => {
        setIsTourGuide(!isTourGuide);
    };

// DATE OF BIRTH
    const [date, setDate] = useState('');
    const [showPicker, setShowPicker] = useState(false);

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
    const [image, setImage] = useState(null);

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
    const [cert, setCert] = useState(null);

    const pickCert = async() => {
        let result = await DocumentPicker.getDocumentAsync({
            type: '*/*',
        });

        if(result.type === 'success') {
            setCert(result);
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Sign up</Text>

            <View style={styles.progressBar}>
                <View style={styles.progressActive} />
                <View style={styles.progressActive} />
                <View style={styles.progressInactive} />
            </View>

            <View style={styles.imageUploadContainer}>
                <TouchableOpacity onPress={pickImage}>
                    <Image source={require('../assets/upload.png')}  style={styles.image}/>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                </TouchableOpacity>
            </View>

            {showPicker && (
                <DateTimePicker
                    mode="date"
                    display= "spinner"
                    value={new Date()}
                    onChange={onChange}
                />
            )}

            <Pressable onPress={toggleDatepicker} >
                <TextInput style = {styles.input} placeholder = "Date of Birth"
                    value={date}
                    onChangeText={setDate}
                    editable={false}
                />
            </Pressable>

            <TextInput style={styles.input} placeholder="City of Residence" />
      
            <Text style={styles.subtitle}> Languages </Text>


            <View style={styles.languageContainer}>
                {languagesToShow.map((lang) => (
                    <TouchableOpacity key={lang} style={[styles.languageTag, selectedLanguages.includes(lang) && styles.languageTagSelected,]}
                        onPress={() => toggleLanguageSelection(lang)}
                        >
                        <Text>{lang}</Text>
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

            <View style={styles.certContainer}>
                {isTourGuide && (
                    <TouchableOpacity onPress={pickCert} style={styles.uploadCert}>
                        <Image source={require('../assets/file.png')} style={styles.fileIcon} />
                        <Text style={styles.text}>
                            {cert ? cert.name : "Upload Certificate"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        
            <View style={styles.buttonsRow}>
                <ArrowButton
                  onPress={() => navigation.goBack()}
                  iconName={("chevron-left")}
                />
                <ArrowButton
                  onPress={() => navigation.navigate('SignupStep2')}
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

    input: {
        width: '100%',
        padding: 15,
        borderWidth: 0.7,
        borderColor: '#ccc',
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: '#EBEBEB',
    },

    subtitle: {
        fontSize: 20,
        color: '#000000',
        marginTop: 30,
        marginBottom: 10,
        fontWeight: 'bold',
    },

    languageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 30,
    },

    languageTag: {
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
        padding: 12,
        margin: 5,
    },

    languageTagSelected: {
        backgroundColor: '#c0c0c0',
    },

    showMore: {
        color: '#000000',
        marginLeft: 5,
        marginTop: 5,
        textDecorationLine: 'underline',

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
    },

    certContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageUploadContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: 200,
        borderRadius: 50,
        backgroundColor: '#EBEBEB',
        borderColor: '#ccc',
        borderWidth: 0.7,
        marginTop: 30,
        padding: 10,

    },

    image: {
        width: 90,
        height: 90,
        marginTop: 10,
        alignSelf: 'center',

      },

    text: {
        fontSize: 16,
        marginTop: 5,
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

    }

});

export default SignupStep2;
