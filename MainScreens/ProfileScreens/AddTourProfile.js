import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import sampleData from '../../sampledata';
import ArrowButton from '../../GeneralElements/ArrowButton';

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

    const guideName = route.params?.guideName;

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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
                imageLink: '',
                routeStops: routes,
                reviews: [],
                activities: [],
                availableTimes: [],
            };

            sampleData.paidTours.push(newTour);
            await AsyncStorage.setItem('paidTours', JSON.stringify(sampleData.paidTours));

            sampleData.joaoTours.push(newTour);
            await AsyncStorage.setItem('joaoTours', JSON.stringify(sampleData.joaoTours));

            Alert.alert('Success', 'The new tour has been added.');
            navigation.goBack();
        } catch (error) {
            console.error('Error saving tour:', error);
            Alert.alert('Error', 'An error occurred while saving the tour. Please try again.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            //keyboardVerticalOffset={5} // Adjust based on your app's header height
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <ArrowButton onPress={() => navigation.goBack()} iconName="chevron-left" />
                        <Text style={styles.title}>New Tour</Text>
                    </View>

                    <View style={styles.coverPicture}>
                        <Icon name="photo-camera" size={40} color="#888" />
                    </View>

                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={[styles.input, errors.title && styles.inputError]}
                        placeholder="Enter title"
                        value={title}
                        onChangeText={(text) => {
                            setTitle(text);
                            if (isSubmitted)
                                setErrors((prev) => ({
                                    ...prev,
                                    title: text.trim() ? '' : 'Title is required.',
                                }));
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

                    <Text style={styles.label}>Route</Text>
                    <View style={styles.routeInput}>
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
                        <View key={index} style={styles.routeItem}>
                            <Text style={styles.routeText}>{routeItem}</Text>
                        </View>
                    ))}

                    <Text style={styles.label}>Price</Text>
                    <View style={styles.priceInput}>
                        <TextInput
                            placeholder="Enter price"
                            keyboardType="numeric"
                            style={[{ flex: 1 }, errors.price && styles.inputError]}
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
        marginBottom: height * 0.02,
    },
    title: {
        fontSize: width * 0.07,
        fontWeight: 'bold',
        color: '#f2b636',
        textAlign: 'center',
        flex: 1,
    },
    coverPicture: {
        width: width * 0.5,
        height: width * 0.3,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: height * 0.02,
    },
    label: {
        fontSize: width * 0.045,
        color: '#000',
        marginTop: height * 0.02,
        fontWeight: 'bold',
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
        backgroundColor: '#f2b636',
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    addButton: {
        backgroundColor: '#f2b636',
        paddingVertical: height * 0.02,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: height * 0.04,
        marginBottom: height * 0.01,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: width * 0.04,
    },
    routeItem: {
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
        padding: width * 0.03,
        marginTop: height * 0.02,
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
});

export default CreateTourScreen;
