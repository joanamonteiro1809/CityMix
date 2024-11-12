import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ícones para barra de pesquisa e outros elementos

// Dados de exemplo para as listas
const individualData = [
  { id: '1', name: 'Ana Soares, 23', description: 'Food, Outdoor activities' },
  { id: '2', name: 'João Silva, 32', description: 'Nightlife, Arts & Museums' },
  { id: '3', name: 'Francisco Reis', description: 'Unusual Spots' },
  { id: '4', name: 'Renata Henriques', description: 'Maravilhosa' },
];

const groupData = [
  { id: '1', name: 'Day in Belém', description: 'and 15 more...', price: '' },
  { id: '2', name: 'Bar hopping in Chiado', description: 'and 10 more...' },
  { id: '3', name: 'Walk in Alfama', description: 'and 5 more...' },
];

const paidToursData = [
  { id: '1', name: 'Belém: Best Sights', price: '30€' },
  { id: '2', name: 'Alfama Walking Tour', price: '19€' },
  { id: '3', name: 'Taste of Portugal', price: '45€' },
];

export default function HomeScreen() {
  // Função de renderização dos itens das listas
  const renderIndividualItem = ({ item }) => (
    <View style={styles.card}>
      <Ionicons name="person-circle" size={40} color="#333" style={styles.icon} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </View>
  );

  const renderGroupItem = ({ item }) => (
    <View style={styles.card}>
      <Ionicons name="people-circle" size={40} color="#333" style={styles.icon} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </View>
  );

  const renderPaidTourItem = ({ item }) => (
    <View style={styles.card}>
      <Ionicons name="map" size={40} color="#333" style={styles.icon} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardPrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Barra de pesquisa */}
      <View style={styles.searchBar}>
        <TextInput placeholder="Search" style={styles.searchInput} />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="map-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Título da seção */}
      <Text style={styles.sectionTitle}>In Your Area</Text>

      {/* Lista Individual */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Individual</Text>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={individualData}
        renderItem={renderIndividualItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
      />

      {/* Lista Group */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Group</Text>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={groupData}
        renderItem={renderGroupItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
      />

      {/* Lista Paid Tours */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Paid Tours</Text>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={paidToursData}
        renderItem={renderPaidTourItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    fontSize: 16,
  },
  searchButton: {
    padding: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  horizontalList: {
    marginBottom: 20,
  },
  card: {
    width: 120,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
});
