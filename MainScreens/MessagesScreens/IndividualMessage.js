import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ArrowButton from '../../GeneralElements/ArrowButton';
import { useFocusEffect } from '@react-navigation/native'; // Import this hook
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const IndividualMessage = ({ navigation, route }) => { // Certifique-se de passar o `navigation` como prop
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi!! I saw in your profile that you are a fan of museums and that you are currently in Belém and available. I am going there tomorrow by 14h do you want to meet?', type: 'sent' },
    { id: '2', text: 'Hello! Yes, let`s do it!!', type: 'received' },
  ]);
  const [inputText, setInputText] = useState('');

  const date = route.params?.date;
  const time = route.params?.time;
  const meetingPoint = route.params?.meetingPoint;

  React.useEffect(() => {
    if (date && time && meetingPoint) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          type: 'invite',
          text: `Invite sent! ${date} at ${time}`,
          meetingPoint,
        },
      ]);
    }
  }, [date, time, meetingPoint]);

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
    if (item.type === 'invite') {
      return (
        <View style={styles.inviteBubble}>
            <Text style={styles.inviteTitle}>Invite sent!</Text>
            <View>
              <Text>{date} at {time}</Text>
            </View>
            <View style={styles.inviteInfo}>
              <Icon name="location-pin" size={20} color="#555" />
              <Text>{meetingPoint}</Text>
            </View>

          </View>
      );
    }

    return (
      <View
        style={[
          styles.messageBubble,
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
        <View style={styles.avatarContainer}>
          <Icon name="person" size={height * 0.05} color="#bbb" />
        </View>
        <Text style={styles.headerText}>Ana</Text>
       <TouchableOpacity
        style={styles.createInvitationButton}
        onPress={() => navigation.navigate('CreateInvitation')}
        >
          <Text style={styles.createInvitationText}>Create Invitation</Text>
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
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: height * 0.09,
    backgroundColor: '#FF914D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.03,
    marginTop: height * 0.035,
  },
  avatarContainer: {
    width: height * 0.055,
    height: height * 0.055,
    borderRadius: height * 0.05,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#fff',
  },
  createInvitationButton: {
    padding: width * 0.05,
  },
  createInvitationText: {
    fontSize: width * 0.04,
    color: '#fff',
    textDecorationLine: 'underline',
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
  inviteBubble:{
    maxWidth: '70%',
    borderRadius: width * 0.04,
    paddingHorizontal: width * 0.09,
    paddingVertical: width * 0.03,
    marginVertical: width * 0.02,
    backgroundColor: '#eaeaea',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  inviteTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  inviteInfo: {
    flexDirection: 'row'
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
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
});

export default IndividualMessage;
