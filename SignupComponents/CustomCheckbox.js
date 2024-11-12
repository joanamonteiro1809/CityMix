// components/CustomCheckbox.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const CustomCheckbox = ({ isChecked, onPress }) => {
  return (
    <TouchableOpacity style={styles.checkbox} onPress={onPress}>
      {isChecked && <Text style={styles.checkmark}>✔️</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkmark: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default CustomCheckbox;
