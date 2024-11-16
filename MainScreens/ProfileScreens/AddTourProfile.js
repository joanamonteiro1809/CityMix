import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const CreateTourScreen = () => {
    const navigation = useNavigation();
    const [route, setRoute] = useState('');
    const [routes, setRoutes] = useState([]);

    const addRoute = () => {
        if (route.trim()) {
            setRoutes([...routes, route]);
            setRoute('');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.title}>New Tour</Text>
                </View>

                <View style={styles.coverPicture}>
                    <Icon name="photo-camera" size={40} color="#888" />
                </View>

                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} placeholder="Enter title" />

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, { height: height * 0.1 }]}
                    placeholder="Enter description"
                    multiline
                />

                <Text style={styles.label}>Route</Text>
                <View style={styles.routeInput}>
                    <TextInput
                        placeholder="Add route"
                        value={route}
                        onChangeText={setRoute}
                        style={{ flex: 1 }}
                    />
                    <TouchableOpacity onPress={addRoute} style={styles.addRouteIcon}>
                        <Icon name="add" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                {routes.map((routeItem, index) => (
                    <View key={index} style={styles.routeItem}>
                        <Text style={styles.routeText}>{routeItem}</Text>
                    </View>
                ))}

                <Text style={styles.label}>Price</Text>
                <View style={styles.priceInput}>
                    <TextInput placeholder="Enter price" keyboardType="numeric" style={{ flex: 1 }} />
                    <Text>€</Text>
                </View>

                <TouchableOpacity style={styles.addButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.addButtonText}>Add Tour</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
    backButton: {
        marginRight: width * 0.03,
    },
    title: {
        fontSize: width * 0.07,
        fontWeight: 'bold',
        color: '#f2b636',
        textAlign: 'center',
        flex: 1,
    },
    label: {
        fontSize: width * 0.045,
        color: '#000',
        marginTop: height * 0.02,
        fontWeight: 'bold',
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
});

export default CreateTourScreen;
