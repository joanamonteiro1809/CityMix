import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, DevSettings } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TabControl from '../../GeneralElements/TabControl';
import ArrowButton from '../../GeneralElements/ArrowButton';
import { useFocusEffect } from '@react-navigation/native'; // Import this hook

const { width, height } = Dimensions.get('window');

const OtherPersonProfile = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('About'); // Aba padrão
  const personDetails = route.params?.tour || sampleProfile;

  const sampleProfile ={
    id: '1', 
    name: 'Juliana Soares',
    age: 23, 
    activities: ['Food', 'Outdoor Activities'], 
    rating: '4,0',
    description: 'I love travelling and meeting new people. I am very sociable.',
    languages: ['Portuguese', 'English'],
    location: 'Coimbra, Portugal',
    picture: require('../../assets/user1.jpg'),
    reviews: [
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
    ]
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'About':
        return (
          <ScrollView style={styles.content}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionContent}>{personDetails.description}</Text>
            <Text style={styles.sectionTitle}>Interests</Text>
            <Text style={styles.sectionContent}>{personDetails.activities.join(', ')}</Text>
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={styles.sectionContent}>{personDetails.languages.join(', ')}</Text>
          </ScrollView>
        );
      case 'Reviews':
        return (
          <ScrollView style={styles.content}>
            {/* Média das avaliações */}
            <View style={styles.averageRatingContainer}>
              <View style={styles.ratingRow}>
                <Text style={styles.averageRatingText}>4.7</Text>
                <Image source={require('../../assets/star.png')} style={styles.starIcon} />
              </View>
              <Text style={styles.totalReviewsText}>(3 reviews)</Text>
            </View>
            {personDetails.reviews.map((review, index) => (
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
                  <View style={styles.reviewRatingContainer}>
                    <Text style={styles.reviewRating}>{review.rating}</Text>
                    <Image source={require('../../assets/star.png')} style={styles.starIcon} />
                  </View>
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
      {/* Back button */}
      <View style={styles.backButton}>
        <ArrowButton
            onPress={() => navigation.goBack()}
            iconName={("chevron-left")}
        />
      </View>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.profilePictureContainer}>
          <Image source={personDetails.picture} style={styles.profileIcon} />
        </View>
        <Text style={styles.profileName}>{personDetails.name}, {personDetails.age}</Text>
        <Text style={styles.profileLocation}>{personDetails.location}</Text>
        <TouchableOpacity
        style={styles.messageButton}
        onPress={() => navigation.navigate('IndividualMessage')}
        >

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
        backgroundColor: '#f2u839',
        paddingHorizontal: width * 0.05,
    },
    backButton:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 20,
        marginTop: 20, // Move o botão para baixo
        //borderWidth: 2, borderColor: 'red'
    },
    header: {
        alignItems: 'center',
        marginTop: height * 0.01,
        //borderWidth: 2, borderColor: 'red'

        //backgroundColor: '#fff',
        //paddingBottom: height * 0.02,
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
      marginTop: height * 0.01,
      color: '#000'
    },
    profileLocation: {
        marginTop: 5,
        color: '#888'
    },
    messageButton: {
        backgroundColor: '#FF914D',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    messageButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    tabContent: {
        //flex: 1,
        //padding: 20,
        //backgroundColor: '#ffeadd',
        flexGrow: 1,
        //paddingBottom: height * 0.02, // Ensure there’s padding at the bottom
        backgroundColor: '#ffeadd',
        padding: 10,
        borderRadius: 20, // Borda arredondada
        marginBottom: 20,
        width: width * 0.9,
        marginTop: 10,
    },
    content: {
        flex: 1,
    },
    sectionTitle: {
      fontSize: width * 0.05,
      fontWeight: 'bold',
      marginBottom: 15,
      marginTop: 15,
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
    reviewRatingContainer: {
        flexDirection: 'row', // Alinha estrela e número lado a lado
        alignItems: 'center', // Centraliza verticalmente
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
        alignItems: 'center', // Centraliza horizontalmente
        marginBottom: 20, // Espaçamento inferior
    },
    ratingRow: {
        flexDirection: 'row', // Alinha "4.7" e a estrela lado a lado
        alignItems: 'center', // Centraliza verticalmente os itens
    },
    averageRatingText: {
        fontSize: width * 0.08, // Tamanho do número
        fontWeight: 'bold',
        color: '#f2b636',
        marginRight: 5, // Espaço entre o texto e a estrela
    },
    starIcon: {
        width: 22, // Largura da estrela
        height: 22, // Altura da estrela
    },
    totalReviewsText: {
        fontSize: width * 0.04, // Tamanho do texto de reviews
        color: '#555',
        textAlign: 'center', // Centraliza o texto
        marginTop: 5, // Espaço entre o número/estrela e o texto de reviews
    },
    profileIcon: {
      width: width * 0.3,
      height: width * 0.3,
      borderRadius: (width * 0.3) / 2,
      borderWidth: 1,
      borderColor: '#888',
    },
});

export default OtherPersonProfile;