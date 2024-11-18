import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TabControl from '../../GeneralElements/TabControl';

const { width, height } = Dimensions.get('window');

const OtherPersonProfile = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('About'); // Aba padrão

  const renderTabContent = () => {
    switch (activeTab) {
      case 'About':
        return (
          <ScrollView style={styles.content}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionContent}>
              I love traveling and meeting new people. I am very sociable.
            </Text>
            <Text style={styles.sectionTitle}>Interests</Text>
            <Text style={styles.sectionContent}>Outdoor activities</Text>
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={styles.sectionContent}>Portuguese, English</Text>
          </ScrollView>
        );
      case 'Reviews':
        return (
          <ScrollView style={styles.content}>
            {/* Média das avaliações */}
            <View style={styles.averageRatingContainer}>
              <Text style={styles.averageRatingText}>⭐️ 4.7</Text>
              <Text style={styles.totalReviewsText}>(3 reviews)</Text>
            </View>

            <Text style={styles.sectionTitle}>Reviews</Text>
            {[
              {
                user: 'Maria Silva',
                date: 'Jan 12, 2024',
                rating: 5,
                comment: 'Ana was amazing! Super friendly and easy to talk to. I’d love to meet her again.',
              },
              {
                user: 'João Pereira',
                date: 'Dec 18, 2023',
                rating: 4,
                comment: 'Had a great time chatting with Ana. She’s very kind and outgoing.',
              },
              {
                user: 'Clara Rocha',
                date: 'Nov 5, 2023',
                rating: 4.5,
                comment: 'Ana is very fun to be around! I really appreciated her good vibes.',
              },
            ].map((review, index) => (
              <View key={index} style={styles.reviewContainer}>
                <View style={styles.reviewHeader}>
                  <Icon
                    name="account-circle"
                    size={50}
                    color="#bbb"
                    style={styles.reviewIcon}
                  />
                  <View style={styles.reviewUserDetails}>
                    <Text style={styles.reviewUserName}>{review.user}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                  <Text style={styles.reviewRating}>⭐️ {review.rating}</Text>
                </View>
                <Text style={styles.reviewBody}>{review.comment}</Text>
              </View>
            ))}
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.profilePictureContainer}>
          <Icon
            name="account-circle"
            size={width * 0.3}
            color="#bbb"
            style={styles.profileIcon}
          />
        </View>
        <Text style={styles.profileName}>Ana Soares, 23</Text>
        <Text style={styles.profileLocation}>Lisboa, Portugal</Text>
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabBarContainer}>
        <TabControl
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={['About', 'Reviews']} // Define as abas
        />
      </View>

      {/* Conteúdo da Aba */}
      <View style={styles.tabContent}>{renderTabContent()}</View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF914D',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: height * 0.05, 
    paddingBottom: height * 0.02, 
  },
  backButton: {
    position: 'relative',
    backgroundColor: '#FF914D',
    left: -160,
    borderRadius: 50,
    top: 20,
  },
  profilePictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 0,
    backgroundColor: 'transparent',
  },
  profileName: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#000',
  },
  profileLocation: {
    fontSize: width * 0.04,
    color: '#000',
    marginBottom: 10,
  },
  messageButton: {
    backgroundColor: '#FF914D',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  messageButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  tabContent: {
    flex: 1,
    padding: 20, 
    backgroundColor: '#ffeadd',
    marginTop: 0, // Certifique-se de que não há valores desiguais
  },
  tabBarContainer: {
    backgroundColor: '#FF914D',
    paddingVertical: -5, // Use valores iguais para cima e baixo
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: width * 0.04,
    color: '#555',
    marginBottom: 20,
  },
  reviewContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewIcon: {
    marginRight: 10,
  },
  reviewUserDetails: {
    flex: 1,
  },
  reviewUserName: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#000',
  },
  reviewDate: {
    fontSize: width * 0.035,
    color: '#888',
  },
  reviewRating: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#f2b636',
  },
  reviewBody: {
    fontSize: width * 0.04,
    color: '#555',
    lineHeight: 20,
  },
  averageRatingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  averageRatingText: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#f2b636',
  },
  totalReviewsText: {
    fontSize: width * 0.04,
    color: '#555',
  },
});

export default OtherPersonProfile;
