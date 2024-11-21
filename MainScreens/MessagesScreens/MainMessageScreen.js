import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';
import ArrowButton from '../../GeneralElements/ArrowButton';
import TabControl from '../../GeneralElements/TabControl';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const { width, height } = Dimensions.get('window');

const VisitsScreen = ({ navigation, route }) => {
    const initialTab = route.params?.tabSelected || "Individuals";

    const [activeTab, setActiveTab] = useState(initialTab); // Aba padrão

    const individualMessages = [
        { id: '1', name: 'John Edward', message: 'Hi, how are you?', picture: require('../../assets/message2.png') },
        { id: '2', name: 'Jane Smith', message: 'Let’s catch up soon!', picture: require('../../assets/message1.png') },
    ];

    const groupMessages = [
        { id: '1', name: 'Day in Belém', message: 'Meeting tomorrow at 10 AM.' },
        { id: '2', name: 'Walk in Óbidos', message: 'Don’t forget the reunion next weekend!' },
    ];

    const handlePressMessage = (item) => {
            if (activeTab === "Individuals") {
                // Navega para tela de mensagens individuais
                navigation.navigate('IndividualMessage', { individual: item });
            } else {
                // Navega para tela de mensagens em grupo
                navigation.navigate('GroupMessage', { group: item });
            }
        };

    const renderMessage = ({ item }) => (
        <View style={styles.messageContainer}>
            {item.picture ? (
                <Image source={item.picture} style={styles.messageImage} />
            ) : (
                <View style={styles.groupIconContainer}>
                    <FontAwesome6 name="users" size={24} color="white" />
                </View>
            )}
            <View style={styles.messageTextContainer}>
                <Text style={styles.messageTitle}>{item.name}</Text>
                <Text style={styles.messageText}>{item.message}</Text>
            </View>
        </View>
    );

    const messages = activeTab === "Individuals" ? individualMessages : groupMessages;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Messages</Text>
                </View>
            </View>

            <TabControl
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={['Individuals', 'Group']}
            />

            <View style={styles.messagesContainer}>
                {messages.length > 0 ? (
                    <FlatList
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.messagesList}
                    />
                ) : (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataTitle}>No Messages</Text>
                        <Text style={styles.noDataSubtitle}>
                            There are no messages in the {activeTab.toLowerCase()} tab.
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        paddingTop: 35,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginTop: 10,
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    arrowButton: {
        position: 'absolute',
        left: 0,
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    messageImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    groupIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FF914D',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    messageTextContainer: {
        flex: 1,
    },
    messageTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    messageText: {
        fontSize: 14,
        color: '#555',
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
    },
    noDataTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 10,
    },
    noDataSubtitle: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
    },
});

export default VisitsScreen;
