// screens/SignupStep2.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';
import CustomCheckbox from './CustomCheckbox';
import ArrowButton from '../GeneralElements/ArrowButton';
import DateTimePicker from "@react-native-community/datetimepicker";
import CheckBox from '@react-native-community/checkbox';

const screenWidth = Dimensions.get('window').width;
const elementWidth = (screenWidth - 30 * 2) / 3;

const SignupStep2 = ({ navigation }) => {
    const [isTourGuide, setIsTourGuide] = useState(false);

    const toggleCheckbox = () => {
        setIsTourGuide(!isTourGuide);
    };

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

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Sign up</Text>

            <View style={styles.progressBar}>
                <View style={styles.progressActive} />
                <View style={styles.progressActive} />
                <View style={styles.progressInactive} />
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
                <CustomCheckbox isChecked={isTourGuide} onPress={toggleCheckbox} />
                {/*<CheckBox onPress={toggleCheckbox} value={isTourGuide} />*/}
                <Text style={styles.checkboxLabel}>I’m a certified tour guide</Text>
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
        backgroundColor: '#c0c0c0', // Slightly darker color when selected
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

});

export default SignupStep2;
