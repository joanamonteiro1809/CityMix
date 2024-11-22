import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert, KeyboardAvoidingView, Platform, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import sampleData from '../../sampledata';
import ArrowButton from '../../GeneralElements/ArrowButton';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

const CreateTourScreen = ({ route }) => {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [routeLocation, setRoute] = useState('');
    const [routes, setRoutes] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [availableTime, setAvailableTime] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);

    const [showAllActivities, setShowAllActivities] = useState(false);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const activities = ['Museums', 'Art', 'Famous Spots', 'Nature', 'Nightlife', 'Food']; // Lista de atividades
    const activitiesToShow = showAllActivities ? activities : activities.slice(0, 4);

    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [showAllLanguages, setShowAllLanguages] = useState(false);
    const languages = ['English', 'Portuguese', 'Spanish', 'French', 'Chinese', 'Dutch', 'Italian', 'Japanese'];
    const languagesToShow = showAllLanguages ? languages : languages.slice(0, 4);

   const [image, setImage] = useState(null);
    const guideName = route.params?.guideName;

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
            setErrors((prev) => ({ ...prev, image: '' })); // Remove o erro
        }
    };

    const addRoute = () => {
        if (routeLocation.trim()) {
            setRoutes([...routes, routeLocation]);
            setRoute('');
            if (isSubmitted) setErrors((prev) => ({ ...prev, routes: '' }));
        }
    };

    const validateFields = () => {
        const newErrors = {};

        if (!title.trim()) newErrors.title = 'Title is required.';
        if (!description.trim()) newErrors.description = 'Description is required.';
        if (!price.trim()) newErrors.price = 'Price is required.';
        if (routes.length === 0) newErrors.routes = 'At least one route is required.';
        if (selectedActivities.length === 0) newErrors.activities = 'At least one activity is required.';
        if (selectedLanguages.length === 0) newErrors.languages = 'At least one language is required.';
        if (availableTimes.length === 0) newErrors.availableTimes = 'At least one available time is required.';
         if (!image) newErrors.image = 'Image is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const toggleActivitiesSelection = (activity) => {
        setSelectedActivities((prevSelected) => {
            const updated = prevSelected.includes(activity)
                ? prevSelected.filter((act) => act !== activity)
                : [...prevSelected, activity];
            if (isSubmitted) {
                setErrors((prev) => ({
                    ...prev,
                    activities: updated.length ? '' : 'At least one activity is required.',
                }));
            }
            return updated;
        });
    };

    const toggleLanguageSelection = (language) => {
        setSelectedLanguages((prevSelected) => {
            const updated = prevSelected.includes(language)
                ? prevSelected.filter((lang) => lang !== language)
                : [...prevSelected, language];
            if (isSubmitted) {
                setErrors((prev) => ({
                    ...prev,
                    languages: updated.length ? '' : 'At least one language is required.',
                }));
            }
            return updated;
        });
    };

    const addAvailableTime = () => {
        const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/; // Formato HH:mm
        if (!timeRegex.test(availableTime.trim())) {
            Alert.alert('Invalid Time', 'Please enter a valid time in HH:mm format.');
            return;
        }
        if (availableTimes.includes(availableTime)) {
            Alert.alert('Duplicate Time', 'This time is already added.');
            return;
        }
        setAvailableTimes([...availableTimes, availableTime]);
        setAvailableTime('');
        setErrors((prev) => ({ ...prev, availableTimes: '' })); // Remove o erro
    };


    const saveTour = async () => {
        setIsSubmitted(true);
        if (!validateFields()) return;

        try {
            const newTour = {
                id: Date.now().toString(),
                title,
                price,
                rating: '0.0',
                tourGuide: guideName,
                description,
                picture: image,
                routeStops: routes,
                activities: selectedActivities, // Inclui atividades
                reviews: [],
                availableTimes,
                languages: selectedLanguages,
            };

            sampleData.paidTours.push(newTour);
            await AsyncStorage.setItem('paidTours', JSON.stringify(sampleData.paidTours));

            sampleData.joaoTours.push(newTour);
            await AsyncStorage.setItem('joaoTours', JSON.stringify(sampleData.joaoTours));

            Alert.alert('Success', 'The new tour has been added.');
            navigation.goBack();
        } catch (error) {
            console.error('Error saving tour:', error);
            Alert.alert('Error', 'An error occurred while saving the tour. Please try again!');
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                <View style={styles.header}>
                    <ArrowButton onPress={() => navigation.goBack()} iconName="chevron-left" />
                </View>
                <Text style={styles.title}>New Tour</Text>

                {/* Área de imagem */}
                <TouchableOpacity onPress={pickImage}>
                    <View style={[styles.imageContainer, errors.image && styles.inputError]}>
                        {!image ? (
                          <Image source={require('../../assets/photo-upload.png')} style={styles.imagePlaceholder} />
                        ) : (
                          <Image source={image} style={styles.selectedImage} />
                        )}
                    </View>
                </TouchableOpacity>
                {errors.image && <Text style={styles.errorText}>{errors.image}</Text>}

                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={[styles.input, errors.title && styles.inputError]}
                    placeholder="Enter title"
                    value={title}
                    onChangeText={(text) => {
                        setTitle(text);
                        if (isSubmitted)
                            setErrors((prev) => ({...prev, title: text.trim() ? '' : 'Title is required.',}));
                    }}
                />
                {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[
                        styles.input,
                        errors.description && styles.inputError,
                        { height: height * 0.1 },
                    ]}
                    placeholder="Enter description"
                    multiline
                    value={description}
                    onChangeText={(text) => {
                        setDescription(text);
                        if (isSubmitted)
                            setErrors((prev) => ({
                                ...prev,
                                description: text.trim() ? '' : 'Description is required.',
                            }));
                    }}
                />
                {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

                <Text style={styles.label}>Activities</Text>
                <View style={styles.selectionContainer}>
                    {activitiesToShow.map((activity) => (
                        <TouchableOpacity
                            key={activity}
                            style={[
                                styles.tag,
                                selectedActivities.includes(activity) && styles.tagSelected,
                            ]}
                            onPress={() => toggleActivitiesSelection(activity)}>
                            <Text style={[selectedActivities.includes(activity) && styles.tagTextSelected,]}>{activity}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity onPress={() => setShowAllActivities(!showAllActivities)}>
                        <Text style={styles.showMore}>{showAllActivities ? 'Show less' : 'Show more'}</Text>
                    </TouchableOpacity>
                </View>
                {errors.activities && <Text style={styles.errorText}>{errors.activities}</Text>}

                <Text style={styles.label}>Languages</Text>
                <View style={styles.selectionContainer}>
                    {languagesToShow.map((language) => (
                        <TouchableOpacity
                            key={language}
                            style={[
                                styles.tag,
                                selectedLanguages.includes(language) && styles.tagSelected,
                            ]}
                            onPress={() => toggleLanguageSelection(language)}>
                            <Text style={[selectedLanguages.includes(language) && styles.tagTextSelected,]}>{language}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity onPress={() => setShowAllLanguages(!showAllLanguages)}>
                        <Text style={styles.showMore}>{showAllLanguages ? 'Show less' : 'Show more'}</Text>
                    </TouchableOpacity>
                </View>
                {errors.languages && <Text style={styles.errorText}>{errors.languages}</Text>}

                <Text style={styles.label}>Route</Text>
                <View style={[styles.routeInput, errors.routes && styles.inputError]}>
                    <TextInput
                        placeholder="Add route"
                        value={routeLocation}
                        onChangeText={setRoute}
                        style={{ flex: 1 }}
                    />
                    <TouchableOpacity onPress={addRoute} style={styles.addRouteIcon}>
                        <Icon name="add" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
                {errors.routes && <Text style={styles.errorText}>{errors.routes}</Text>}

                {routes.map((routeItem, index) => (
                    <View key={index} style={styles.item}>
                        <Text style={styles.routeText}>{routeItem}</Text>
                    </View>
                ))}


            {/* Available Times */}
            <Text style={styles.label}>Available Times</Text>
            <View style={[styles.inputContainer, errors.availableTimes && styles.inputError]}>
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Add time (HH:mm)"
                    value={availableTime}
                    onChangeText={(text) => {
                        const cleanedText = text.replace(/[^0-9]/g, '');
                        if (cleanedText.length <= 2) {
                            setAvailableTime(cleanedText);
                        } else if (cleanedText.length <= 4) {
                            setAvailableTime(`${cleanedText.slice(0, 2)}:${cleanedText.slice(2)}`);
                        }
                    }}
                    maxLength={5}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.addTimeButton} onPress={addAvailableTime}>
                    <Icon name="add" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            {errors.availableTimes && <Text style={styles.errorText}>{errors.availableTimes}</Text>}

            {availableTimes.map((time, index) => (
                <View key={index} style={styles.item}>
                    <Text style={styles.routeText}>{time}</Text>
                </View>
            ))}

            <Text style={styles.label}>Price</Text>
           <View style={[styles.priceInput, errors.price && styles.inputError]}>
               <TextInput
                   placeholder="Enter price"
                   keyboardType="numeric"
                   style={{ flex: 1 }}
                   value={price}
                   onChangeText={(text) => {
                       setPrice(text);
                       if (isSubmitted)
                           setErrors((prev) => ({
                               ...prev,
                               price: text.trim() ? '' : 'Price is required.',
                           }));
                   }}
               />
               <Text>€</Text>
           </View>
           {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}



            <TouchableOpacity style={styles.addButton} onPress={saveTour}>
                <Text style={styles.addButtonText}>Add Tour</Text>
            </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: width * 0.05,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.05,
    },
    title: {
        fontSize: width * 0.08,
        fontFamily: 'CodecPro-Bold',
        color: '#FF914D',
        textAlign: 'center',
        flex: 1,
        position: 'relative',
        alignSelf: 'center', 
        marginTop: height * -0.05,
        width: '60%',
    },
    label: {
        fontSize: width * 0.045,
        color: '#000',
        marginTop: height * 0.02,
        fontFamily: 'CodecPro-Bold',
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: width * 0.03,
        fontSize: width * 0.04,
        marginTop: height * 0.01,
    },
    routeInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: width * 0.03,
        marginTop: height * 0.01,
    },
    addRouteIcon: {
        backgroundColor: '#FF914D',
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    addButton: {
        backgroundColor: '#FF914D',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: height * 0.04,
        marginBottom: height * 0.02,
    },
    addButtonText: {
        color: '#fff',
        fontFamily: 'CodecPro-Bold',
        fontSize: 18,
    },
    item: {
        backgroundColor: '#eaeaea',
        padding: width * 0.03,
        borderRadius: 8,
        marginVertical: height * 0.01,
    },

    routeText: {
        fontSize: width * 0.04,
        color: '#333',
    },
    priceInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: width * 0.01,
        marginTop: height * 0.01,
    },
   inputError: {
       borderColor: 'red',
       borderWidth: 1,
   },

    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    selectionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    tag: {
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
        padding: 12,
        margin: 5,
    },
    tagSelected: {
        backgroundColor: '#FF914D',
    },
    tagTextSelected: {
        color: '#fff',
    },
    showMore: {
        color: '#000',
        marginLeft: 5,
        marginTop: 5,
        textDecorationLine: 'underline',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: width * 0.03,
        marginTop: height * 0.01,
        height: 50,
    },
    addTimeButton: {
        backgroundColor: '#FF914D',
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },

    imageContainer: {
        width: width * 0.35,
        height: width * 0.3,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: height * 0.02,
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#ccc',
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 2,
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    selectedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
});

export default CreateTourScreen;
