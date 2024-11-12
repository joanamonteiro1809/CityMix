import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // Importa ícones do Expo

// Dados de exemplo para tours
const toursData = [
  { id: '1', title: 'Belém: Best Sights', price: '30€', rating: '⭐️⭐️⭐️⭐️' },
  { id: '2', title: 'Belém: Worst Sights', price: '40€', rating: '⭐️' },
  // Adicione mais tours se necessário
];

export default function ProfileScreen() {
  const [selectedTab, setSelectedTab] = useState('Tours'); // Controla a aba selecionada
  const [isAvailable, setIsAvailable] = useState(true); // Controla a disponibilidade

  // Alterna a disponibilidade do usuário
  const toggleAvailability = () => setIsAvailable(previousState => !previousState);

  // Renderiza a lista de tours
  const renderTourItem = ({ item }) => (
    <View style={styles.tourItem}>
      <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.tourImage} />
      <View style={styles.tourInfo}>
        <Text style={styles.tourTitle}>{item.title}</Text>
        <Text>{item.rating}</Text>
        <Text style={styles.tourPrice}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header do Perfil */}
      <View style={styles.header}>
        {/* Botão de Edição (Lápis) */}
        <TouchableOpacity style={styles.editButton} onPress={() => alert('Editar Perfil')}>
          <Ionicons name="pencil" size={24} color="#333" />
        </TouchableOpacity>

        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatar} />

        {/* Nome com Ícone de Guia */}
        <View style={styles.nameContainer}>
          <Text style={styles.name}>João Silva, 32</Text>
          <Ionicons name="person-circle" size={20} color="#333" style={styles.guideIcon} />
        </View>

        <Text style={styles.location}>Lisboa</Text>

        {/* Seção de Disponibilidade com Switch */}
        <View style={styles.availability}>
          <Text>Available</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isAvailable ? 'green' : '#f4f3f4'}
            onValueChange={toggleAvailability}
            value={isAvailable}
          />
        </View>
      </View>

      {/* Menu de Abas */}
      <View style={styles.tabMenu}>
        {['About', 'Tours', 'Calendar', 'Events'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
          >
            <Text style={selectedTab === tab ? styles.activeTabText : styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Conteúdo da Aba Selecionada */}
      <View style={styles.content}>
        {selectedTab === 'Tours' && (
          <View>
            <TouchableOpacity style={styles.addTourButton}>
              <Text style={styles.addTourText}>+ Add new tour</Text>
            </TouchableOpacity>
            <FlatList
              data={toursData}
              renderItem={renderTourItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
        {/* Adicione conteúdo para as outras abas aqui */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4e3af',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 50,
    position: 'relative', // Para posicionamento do botão de edição
  },
  editButton: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  guideIcon: {
    marginLeft: 8, // Espaço entre o nome e o ícone de guia
  },
  location: {
    color: '#666',
  },
  availability: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  tabMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f1c232',
  },
  tabButton: {
    paddingVertical: 5,
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#333',
  },
  activeTabText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  content: {
    padding: 10,
  },
  addTourButton: {
    backgroundColor: '#f4e3af',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  addTourText: {
    color: '#333',
    fontWeight: 'bold',
  },
  tourItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  tourImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  tourInfo: {
    flex: 1,
    marginLeft: 10,
  },
  tourTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tourPrice: {
    color: '#333',
    fontWeight: 'bold',
  },
});
