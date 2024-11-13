import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SegmentedControl = ({opSelected}) => {
  const [selectedOption, setSelectedOption] = useState(opSelected);

  const options = ["Individual", "Group", "Paid"];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (onOptionSelect) {
      onOptionSelect(option); // Call the parent callback with the selected option
    }
  };

  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            selectedOption === option && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption(option)}
        >
          <Text style={[
            styles.optionText,
            selectedOption === option && styles.selectedOptionText
          ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFD36E', // Background color of the segmented control
    borderRadius: 25,
    padding: 4,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
  selectedOption: {
    backgroundColor: 'white', // Background color for selected option
  },
  optionText: {
    color: 'black',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: 'black', // Text color for selected option
  },
});

export default SegmentedControl;
