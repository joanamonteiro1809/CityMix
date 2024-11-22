import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ArrowButton from '../../GeneralElements/ArrowButton';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Dimensions, } from 'react-native';

const { width, height } = Dimensions.get('window');

const GroupMessage = ({ navigation, route }) => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'How is everyone?', type: 'received' },
  ]);
  const [inputText, setInputText] = useState('');

  const group = route.params?.group;

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: inputText, type: 'sent' },
      ]);
      setInputText('');
    }
  };

  const renderMessage = ({ item }) => {
    return (
      <View
        style={[styles.messageBubble,
          item.type === 'sent' ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ArrowButton onPress={() => navigation.goBack()} iconName="chevron-left" />
        <View style={styles.name}>
            <FontAwesome6 name="users" size={24} color="white" style={{ marginHorizontal: 5 }}/>
            <Text style={styles.headerText}>{group.title}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('GroupDetail', {group: group})}>
            <Entypo name="dots-three-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type something"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    width: '100%',
    height: height * 0.09,
    backgroundColor: '#FF914D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
    marginTop: height * 0.035,
  },

  name: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
  },

  headerText: {
    fontSize: width * 0.06,
    color: '#fff',
    justifySelf: 'center',
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 50,
    fontFamily: 'CodecPro-ExtraBold',
  },

  messagesContainer: {
    flex: 1,
    padding: width * 0.03,
  },
  messageBubble: {
    maxWidth: '70%',
    borderRadius: width * 0.04,
    padding: width * 0.03,
    marginVertical: width * 0.02,
  },

  sentMessage: {
    backgroundColor: '#eaeaea',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#F7CBA2',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: width * 0.045,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: width * 0.03,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: width * 0.04,
    paddingHorizontal: width * 0.03,
    height: height * 0.06,
    fontFamily: 'CodecPro-Regular',
  },
  sendButton: {
    marginLeft: width * 0.02,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.05,
    height: height * 0.06,
  },
  sendButtonText: {
    fontFamily: 'CodecPro-Bold',
    fontSize: width * 0.04,
  },
});

export default GroupMessage;
