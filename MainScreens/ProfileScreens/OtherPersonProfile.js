import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, DevSettings } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TabControl from '../../GeneralElements/TabControl';
import ArrowButton from '../../GeneralElements/ArrowButton';
import { useFocusEffect } from '@react-navigation/native'; // Import this hook

const { width, height } = Dimensions.get('window');

const OtherPersonProfile = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('About');
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
              <View style={styles.content}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.sectionContent}>{personDetails.description}</Text>
                <Text style={styles.sectionTitle}>Interests</Text>
                <Text style={styles.sectionContent}>{personDetails.activities.join(', ')}</Text>
                <Text style={styles.sectionTitle}>Languages</Text>
                <Text style={styles.sectionContent}>{personDetails.languages.join(', ')}</Text>
              </View>
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
         onPress={() => navigation.navigate('IndividualMessage', { individual: personDetails })}
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

      {/* Conteúdo da Ana */}
      <View style={styles.tabContent}>{renderTabContent()}</View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: width * 0.05,
    },
    backButton:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        paddingTop: 20,
        //marginTop: 20,

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
      fontFamily: 'CodecPro-ExtraBold',
      marginTop: height * 0.01,
      color: '#000'
    },
    profileLocation: {
        fontFamily: 'CodecPro-Regular',
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
        fontFamily: 'CodecPro-Bold',
    },
    tabContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#E8E8E8',
        padding: 10,
        borderRadius: 20, // Borda arredondada
        marginBottom: 20,
        width: width * 0.9,
        height: height * 0.4,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6,},
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 3,
    },
    content: {
        flex: 1,
    },
    sectionTitle: {
      fontSize: width * 0.05,
      fontFamily: 'CodecPro-Bold',
      marginHorizontal: 10,
      marginTop: 15,
    },
    sectionContent: {
        fontSize: width * 0.04,
        color: '#555',
        marginBottom: 20,
        marginTop: 5,
        marginHorizontal: 10,
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
        fontFamily: 'CodecPro-Bold',
        color: '#000',
    },
    reviewRatingContainer: {
        flexDirection: 'row', // Alinha estrela e número lado a lado
        alignItems: 'center', // Centraliza verticalmente
    },
    reviewDate: {
        fontSize: width * 0.035,
        color: '#888',
        fontFamily: 'CodecPro-Regular',
    },
    reviewRating: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        color: '#f2b636',
        marginRight: 5,
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
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    averageRatingText: {
        fontSize: width * 0.08,
        fontWeight: 'bold',
        color: '#f2b636',
        marginRight: 5,
    },
    starIcon: {
        width: 22,
        height: 22,
    },
    totalReviewsText: {
        fontSize: width * 0.04, // Tamanho do texto de reviews
        color: '#555',
        fontFamily: 'CodecPro-Regular',
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