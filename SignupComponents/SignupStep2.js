// screens/SignupStep2.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CustomCheckbox from './CustomCheckbox';

const SignupStep2 = ({ navigation }) => {
  const [isTourGuide, setIsTourGuide] = React.useState(false);

  const toggleCheckbox = () => {
    setIsTourGuide(!isTourGuide);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <View style={styles.progressBar}>
        <View style={styles.progressCompleted} />
        <View style={styles.progressActive} />
        <View style={styles.progressInactive} />
      </View>
      <TextInput style={styles.input} placeholder="Date of Birth (dd-mm-yyyy)" />
      <TextInput style={styles.input} placeholder="City of Residence" />
      
      <Text style={styles.label}>Languages</Text>
      <View style={styles.languageContainer}>
        {['English', 'Portuguese', 'Spanish', 'French', 'Chinese', 'Dutch'].map((lang) => (
          <Text key={lang} style={styles.languageTag}>{lang}</Text>
        ))}
        <Text style={styles.showMore}>Show more</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CustomCheckbox isChecked={isTourGuide} onPress={toggleCheckbox} />
        <Text style={styles.checkboxLabel}>I’m a certified tour guide</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>➔</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f2b636',
    marginBottom: 20,
  },
  progressBar: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  progressCompleted: {
    width: 30,
    height: 5,
    backgroundColor: '#f2b636',
    marginHorizontal: 2,
  },
  progressActive: {
    width: 30,
    height: 5,
    backgroundColor: '#f2b636',
    marginHorizontal: 2,
  },
  progressInactive: {
    width: 30,
    height: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 2,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  languageTag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    padding: 5,
    margin: 2,
  },
  showMore: {
    color: '#f2b636',
    marginLeft: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#f2b636',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default SignupStep2;
