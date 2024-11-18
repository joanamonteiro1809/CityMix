import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import ArrowButton from "../../GeneralElements/ArrowButton";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const CommunityScreen = () => {
  const navigation = useNavigation(); // Hook para acessar o navigation

  const members = ["Ana", "Rita", "Carlos", "Oscar", "João", "Pedro"]; // Lista de membros

  // Função para exibir o alerta de confirmação
  const handleExit = () => {
    Alert.alert(
      "Leave Community", // Título do alerta
      "Are you sure you want to leave the community?", // Mensagem do alerta
      [
        {
          text: "Cancel", // Opção de cancelar
          onPress: () => console.log("Cancel Pressed"), // Apenas fecha o alerta
          style: "cancel",
        },
        {
          text: "Exit", // Opção de sair
          onPress: () => Alert.alert("You left the community"), // Mostra mensagem de saída
          style: "destructive", // Estilo para ações perigosas
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
      <Text style={styles.title}>Day in Belém</Text>
      <Text style={styles.address}>Av. Brasília, 1400-038 Lisboa</Text>

      {/* Botão Photos */}
      <TouchableOpacity style={styles.photoButton}>
        <Icon
          name="photo-camera"
          size={width * 0.1}
          color="#888"
          style={styles.photoIcon}
        />
        <Text style={styles.photoText}>Photos</Text>
      </TouchableOpacity>

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

export default CommunityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: width * 0.05,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.001,
    marginTop: height * 0.05,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    marginVertical: height * 0.01,
    alignSelf: "center",
  },
  address: {
    fontSize: width * 0.04,
    color: "#555",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  photoButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
    height: height * 0.12,
    borderRadius: width * 0.03,
    marginBottom: height * 0.02,
    width: "100%",
  },
  photoIcon: {
    marginBottom: height * 0.01,
  },
  photoText: {
    fontSize: width * 0.045,
    color: "#000",
  },
  exitIcon: {
    position: "absolute", // Torna o botão fixo
    bottom: height * 0.03, // Define a distância da parte inferior
    right: width * 0.05, // Define a distância do lado direito
    width: width * 0.12,
    height: width * 0.12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF4444",
    borderRadius: width * 0.06,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginVertical: height * 0.02,
  },
  memberList: {
    flex: 1,
    marginTop: height * 0.02,
    marginBottom: height * 0.12,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.02,
  },
  memberName: {
    fontSize: width * 0.05,
    marginLeft: width * 0.03,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: height * 0.005,
  },
});
