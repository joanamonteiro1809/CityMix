import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert, Image, } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ArrowButton from "../../GeneralElements/ArrowButton";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const GroupDetail = ({ route }) => {
  const navigation = useNavigation();
  const groupEntry = route.params?.group;

  const members = ["Ana", "Rita", "Carlos", "Oscar", "João", "Pedro"];

  // Função para exibir o alerta de confirmação
  const handleExit = () => {
    Alert.alert(
      "Leave Group",
      "Are you sure you want to leave the Group?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Exit",
          onPress: () => {
            Alert.alert(
              "You left the Group", // Mensagem ao sair
              "",
              [
                {
                  text: "OK",
                  onPress: () => {
                   navigation.popTo("InYourArea"); // Navega para a próxima página
                  },
                },
              ]
            );
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ArrowButton
          onPress={() => navigation.goBack()}
          iconName="chevron-left"
        />
      </View>

      {/* Título e Endereço */}
      <View style={styles.infoContainer}>
          <Text style={styles.title}>{groupEntry.title}</Text>
          <View style={styles.location}>
              <Text style={styles.address}>{groupEntry.location}</Text>
          </View>
          <Image source={groupEntry.image} style={styles.photoButton} />
      </View>
      {/*</TouchableOpacity>*/}

      {/* Lista de Membros */}
      <Text style={styles.sectionTitle}>Members</Text>
      <ScrollView style={styles.memberList}>
        {members.map((member, index) => (
          <View key={index}>
            <View style={styles.memberItem}>
              <Icon name="account-circle" size={width * 0.08} color="#555" />
              <Text style={styles.memberName}>{member}</Text>
            </View>
            {index < members.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </ScrollView>

      {/* Botão Exit */}
      <TouchableOpacity style={styles.exitIcon} onPress={handleExit}>
        <Icon name="logout" size={width * 0.05} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default GroupDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: width * 0.05,
  },

  infoContainer: {
    borderRadius: 30,
    backgroundColor: '#fff',
    shadowColor: '#000',       // Shadow color (black)
    shadowOffset: {width: 0, height: 2,},
    shadowOpacity: 0.15,       // Shadow opacity (light shadow)
    shadowRadius: 5,          // Shadow blur radius
    elevation: 2,
    marginVertical: 10,
    padding: 5,
    flexShrink: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.01,
    marginTop: height * 0.05,
  },
  title: {
    fontSize: width * 0.08,
    //fontWeight: "bold",
    marginVertical: 5,
    alignSelf: "center",
    fontFamily: 'CodecPro-Bold',
    marginHorizontal: 5,
    textAlign: 'center',
  },

  location: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  address: {
    fontSize: width * 0.04,
    color: "#555",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  photoButton: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
    height: height * 0.12,
    borderRadius: width * 0.03,
    marginBottom: height * 0.02,
    width: "90%",
  },
  photoIcon: {
    marginBottom: height * 0.01,
  },
  photoText: {
    fontSize: width * 0.045,
    color: "#000",
  },
  exitIcon: {
    position: "absolute",
    bottom: height * 0.03,
    right: width * 0.05,
    width: width * 0.12,
    height: width * 0.12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF4444",
    borderRadius: width * 0.06,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    //fontWeight: "bold",
    fontFamily: 'CodecPro-Bold',
    marginTop: height * 0.02,
  },
  memberList: {
    flex: 1,
    //marginTop: height * 0.02,
    marginBottom: height * 0.12,
    //borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#F8F8F8',
    shadowColor: '#000',       // Shadow color (black)
    shadowOffset: {width: 0, height: 2,},
    shadowOpacity: 0.15,       // Shadow opacity (light shadow)
    shadowRadius: 5,          // Shadow blur radius
    elevation: 2,
    marginVertical: 10,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.02,
  },
  memberName: {
    fontSize: 18,
    marginLeft: width * 0.03,
    fontFamily: 'CodecPro-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: height * 0.005,
  },
});
