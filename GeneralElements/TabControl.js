// components/SegmentedControl.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TabControl = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <View style={styles.tabsContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeTab === tab && styles.activeTab,
          ]}
          onPress={() => setActiveTab(tab)}
        >
          <Text style={[
            styles.tabText,
            activeTab === tab && styles.activeTabText,
          ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF914D', // Background color for the segmented control
    borderRadius: 25,
    padding: 4,
    marginVertical: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20, // Makes the selected tab round
  },
  activeTab: {
    backgroundColor: 'white', // White background for the selected tab
  },
  tabText: {
    fontSize: 16,
    color: 'black', // Default color for non-selected tabs
  },
  activeTabText: {
    fontWeight: 'bold',
    color: 'black', // Text color for the selected tab
  },
});

export default TabControl;
