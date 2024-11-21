import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ArrowButton from "./ArrowButton";
import sampleData from "../sampledata";

const { width, height } = Dimensions.get("window");
const cardWidth = width * 0.35;
const cardHeight = height * 0.18;

const SearchScreen = ({navigation, route}) => {
  const [searchText, setSearchText] = useState("");

  // Example data
  const defaultRecent = ["Chiado", "Alfama", "Sintra"];
  const suggestionItems = ["Alcântara", "Saldanha", "Marquês de Pombal"];
  const allLocations = ["Braga", "Lisbon", "Porto", "Portoalegre", "Belém"];
  const [recentItems, setRecentItems] = useState(defaultRecent);

  // Filter locations based on searchText
  const filteredLocations = allLocations.filter((location) =>
    location.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    if (route.params?.recentSearch) {
      const { recentSearch } = route.params;

      // Add the recent search to the beginning of the list if it's not already present
      if (!recentItems.includes(recentSearch)) {
        setRecentItems((prev) => [recentSearch, ...prev].slice(0, 5)); // Limit to 5 recent items
      }
    }
  }, [route.params?.recentSearch]);


  const renderListItem = (item) => (
    <TouchableOpacity onPress={() => handlePress(item) } style={styles.listItem}>
      <Text style={styles.listText}>{item}</Text>
    </TouchableOpacity>
  );

  const handlePress = (item) => {
    let individual = sampleData.individual;
    let group = sampleData.group;
    let paid = sampleData.paidTours;

    individual = individual.filter((tour) => tour.location.includes(item));
    group = group.filter((tour) => tour.location.includes(item));
    
    paid = paid.filter((tour) => tour.location.includes(item));
    

    navigation.navigate('VisitsScreen', {location: item, filteredIndividuals: individual, filteredGroups: group, filteredPaid: paid})

  }

  const handleMapPress = () => {
    const screen = Platform.OS === 'ios' ? 'MapIOS' : 'MapAndroid';
    navigation.navigate(screen);
  }

  return (
    
    <View style={styles.container}>

        {/* Search Bar */}
        <View style={styles.header}>
            <View style={styles.searchContainer}>
                <Icon name="search" size={24} color="#555" />
                <TextInput 
                    style={styles.searchInput} 
                    placeholder="Search" 
                    autoFocus={true}
                    onChangeText={setSearchText}
                />
            </View>
        
            {/* Image next to the search container */}
            <TouchableOpacity onPress={handleMapPress}>
                <Image
                    source={require('../assets/map.png')}
                    style={styles.map}
                />
            </TouchableOpacity>
        </View>

        {searchText && (
          <View style={styles.sections}>
            {/* Recent section*/}
            <View>
                <Text style={styles.sectionTitle}>Locations</Text>
                {filteredLocations.length > 0 ? (
                <FlatList
                    data={filteredLocations}
                    renderItem={({ item }) => renderListItem(item)}
                    keyExtractor={(item, index) => index.toString()}
                />
                ) : (
                <Text style={styles.emptyText}>No locations available.</Text>
                )}
            </View>
          </View>
        )}

        {!searchText  && (
          <View style={styles.sections}>
            {/* Recent section*/}
            <View>
                <Text style={styles.sectionTitle}>Recent</Text>
                {recentItems.length > 0 ? (
                <FlatList
                    data={recentItems}
                    renderItem={({ item }) => renderListItem(item)}
                    keyExtractor={(item, index) => index.toString()}
                />
                ) : (
                <Text style={styles.emptyText}>No recent items</Text>
                )}
            </View>

            {/* Suggestions section*/}
            <View>
                <Text style={styles.sectionTitle}>Suggestions</Text>
                {suggestionItems.length > 0 ? (
                <FlatList
                    data={suggestionItems}
                    renderItem={({ item }) => renderListItem(item)}
                    keyExtractor={(item, index) => index.toString()}
                />
                ) : (
                <Text style={styles.emptyText}>No suggestions</Text>
                )}
            </View>
          </View>          
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingHorizontal: 20,
    backgroundColor: '#fff',
    paddingTop: 35,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',  // Ensures both search bar and map align in the center vertically
    justifyContent: 'space-between', // Space out the elements if needed
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: height * 0.02, // Space below the search bar, responsive to screen height
    height: height * 0.06, // Adjusts the height of the search bar to screen height
    flex: 1, // Ensures search input takes the available space
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  map: {
    width: height * 0.06,
    height: height * 0.06,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  filterButton: {
    paddingHorizontal: 20,
    marginBottom: 5,
    //borderWidth: 2,
  },
  sections: {
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    padding: 8,
    backgroundColor: '#FF914D',
    paddingHorizontal: 20,
  },
  listItem: {
    padding: 16,
    backgroundColor: '#ffc9a1',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
  listText: {
    fontSize: 16,
    color: "#333",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 8,
  },
});

export default SearchScreen;
