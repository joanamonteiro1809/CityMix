// TourBookingScreen.js --> Page for booking and paying the tour
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ArrowButton from '../GeneralElements/ArrowButton';
import CalendarPicker from '../GeneralElements/CalendarPicker';
import dayjs from 'dayjs';
import Slider from '../GeneralElements/Slinder';
import sampleData from '../sampledata';

const FilterScreen = ({ navigation, route }) => {

    const prevFilters = route.params?.filters || {};
    const tabSel = route.params?.tabSel;
    const recentSearch = route.params?.recentSearch;

    // Filter Logic
    const applyFilters = () => {
        const filters = {
            selectedActivities,
            selectedLanguages,
            priceValues,
            ageValues,
            date,
        };

        let individual = sampleData.individual.filter((tour) => tour.location.includes(recentSearch));
        let group = sampleData.group.filter((tour) => tour.location.includes(recentSearch));
        let paid = sampleData.paidTours.filter((tour) => tour.location.includes(recentSearch));
       
        /*if(tabSel == 'Individuals'){
            filtered = sampleData.individual;
        } else if (tabSel == 'Group'){
            filtered = sampleData.group;
        } else{
            filtered = sampleData.paidTours;
        }*/

        if (date) {
            //filtered = filtered.filter((tour) => dayjs(tour.date).isSame(dayjs(date), 'day'));
        }

        //FILTRAR ATIVIDADES
        if (selectedActivities.length > 0) {
            individual = individual.filter((tour) =>
                selectedActivities.every((activity) => tour.activities.includes(activity))
            );

            paid = paid.filter((tour) =>
                selectedActivities.every((activity) => tour.activities.includes(activity))
            );
        }

        //FILTRAR PREÇO
        paid = paid.filter(
            (tour) => tour.price >= priceValues[0] && tour.price <= priceValues[1]
        );
        
        //FILTRAR IDADE
        individual = individual.filter(
            (tour) => tour.age >= ageValues[0] && tour.age <= ageValues[1]
        );
        
        //FILTRAR LANGUAGES
        if (selectedLanguages.length > 0) {
            individual = individual.filter((tour) =>
                selectedLanguages.every((language) => tour.languages.includes(language))
            );

            paid = paid.filter((tour) =>
                selectedLanguages.every((language) => tour.languages.includes(language))
            );
        }
        

        // Navigate to the FilteredToursScreen and pass the filtered tours as a parameter
        navigation.popTo('VisitsScreen', { tabSelected: tabSel, selectedFilters: filters ,location: recentSearch, filteredIndividuals: individual, filteredGroups: group, filteredPaid: paid});
    };

    const [showAllActivities, setShowAllActivities] = useState(false);
    const [selectedActivities, setSelectedActivities] = useState(prevFilters.selectedActivities || []);
    const activities = ['Museums', 'Art', 'Famous Spots', 'Nature', 'Nightlife', 'Food'];
    const activitiesToShow = showAllActivities ? activities : activities.slice(0, 4);

    const defaultPrice = [0, 300]; 
    const defaultAge = [18, 100]; 

    // State for the slider values
    const [priceValues, setPriceValues] = useState(prevFilters.priceValues ||defaultPrice);
    const [ageValues, setAgeValues] = useState(prevFilters.ageValues ||defaultAge);

    const toggleActivitiesSelection = (activity) => {
        setSelectedActivities((prevSelected) =>
        prevSelected.includes(activity)
        ? prevSelected.filter((act) => act !== activity) // Remove if already selected
            : [...prevSelected, activity] // Add if not selected
        );
    };

    const [showAllLanguages, setShowAllLanguages] = useState(false);
    const [selectedLanguages, setSelectedLanguages] = useState(prevFilters.selectedLanguages || []);
    const languages = ['English', 'Portuguese', 'Spanish', 'French', 'Chinese', 'Dutch', 'Italian', 'Japanese'];
    const languagesToShow = showAllLanguages ? languages : languages.slice(0, 4);

    const toggleLanguageSelection = (language) => {
        setSelectedLanguages((prevSelected) =>
        prevSelected.includes(language)
        ? prevSelected.filter((lang) => lang !== language) // Remove if already selected
            : [...prevSelected, language] // Add if not selected
        );
    };

    const [date, setDate] = useState(prevFilters.date || null); // Store the selected date
    const [showCalendar, setShowCalendar] = useState(false); // Track visibility of CalendarPicker
    
    // Toggle CalendarPicker visibility
    const handleToggleCalendar = () => {
        setShowCalendar((prev) => !prev); // Toggle showCalendar state
    };

    // Function to handle date selection without hiding the calendar
    const handleDateChange = (newDate) => {
        setDate(newDate); // Set selected date
    };

    const handlePriceChange = (values) => {
        setPriceValues(values); // Update price slider values
    };

    const handleAgeChange = (values) => {
        setAgeValues(values); // Update age slider values
    };

    const restoreFilters = () => {
        setSelectedActivities([]); // Clear selected activities
        setSelectedLanguages([]); // Clear selected languages
        setDate(null);
        setPriceValues(defaultPrice);
        setAgeValues(defaultAge);
    }

    const renderContent = () => (
        <View style={styles.infoCard}>
            
            {/* Date Input */}
            <View style={styles.dateContainer}>
                <Text style={styles.sectionTitle}>Date:</Text>
                <Text style={styles.input}>
                    {date ? dayjs(date).format('MMMM D, YYYY') : 'MMMM D, YYYY'}
                </Text>
                <TouchableOpacity onPress={handleToggleCalendar}>
                    <Icon name="calendar-month" size={24} color="#555" />
                </TouchableOpacity>
            </View>

            {/* Conditionally render CalendarPicker */}
            {showCalendar && (
                <CalendarPicker date={date} onDateChange={handleDateChange} disableMode={true} />
            )}

            {/* Activities info */}
            <View>
                <Text style={styles.sectionTitle}>Activities</Text>
            </View>
            <View style={styles.selectionContainer}>
                {activitiesToShow.map((act) => (
                    <TouchableOpacity key={act} style={[styles.tag, selectedActivities.includes(act) && styles.tagSelected,]}
                        onPress={() => toggleActivitiesSelection(act)}
                        >
                        <Text style={[selectedActivities.includes(act) && styles.tagTextSelected]}>
                            {act}
                        </Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity onPress={() => setShowAllActivities(!showAllActivities)}>
                    <Text style={styles.showMore}>{showAllActivities ? 'Show less' : 'Show more'}</Text>
                </TouchableOpacity>
            </View>

            {/* Price info */}
            {tabSel == "Paid" && (
                <View>
                    <View> 
                        <Text style={styles.sectionTitle}>Price</Text>
                    </View>
                    <View style={styles.sliderContainer}>
                        <Slider minVal={defaultPrice[0]} maxVal={defaultPrice[1]} values={priceValues} onSliderChange={handlePriceChange}></Slider>
                    </View>
                </View>
            )}

            {/* Age info */}
            {tabSel == "Individuals" && (
                <View>
                    <View>
                        <Text style={styles.sectionTitle}>Age</Text>
                    </View>
                    <View style={styles.sliderContainer}>
                        <Slider minVal={defaultAge[0]} maxVal={defaultAge[1]} values={ageValues} onSliderChange={handleAgeChange}></Slider>
                    </View>
                </View>
            )}

            {/* Languages info */}
            <View>
                <Text style={styles.sectionTitle}>Languages</Text>
            </View>
                <View style={styles.selectionContainer}>
                {languagesToShow.map((lang) => (
                    <TouchableOpacity key={lang} style={[styles.tag, selectedLanguages.includes(lang) && styles.tagSelected,]}
                        onPress={() => toggleLanguageSelection(lang)}
                        >
                        <Text style={[selectedLanguages.includes(lang) && styles.tagTextSelected]}>
                            {lang}
                        </Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity onPress={() => setShowAllLanguages(!showAllLanguages)}>
                    <Text style={styles.showMore}>{showAllLanguages ? 'Show less' : 'Show more'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            
            {/* Header */}
            <View style={styles.header}>
                <ArrowButton onPress={() => navigation.goBack()} iconName="close" />
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Filters</Text>
                </View>
            </View>

            
            {/* Using FlatList for the main content */}
            <FlatList
                data={[{ key: 'content' }]} // Single item to render all content
                renderItem={renderContent}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{ paddingHorizontal: 15, paddingVertical:20 }}
            />

             {/* Footer*/}
            <View style={styles.footerContainer}>
                <TouchableOpacity onPress={restoreFilters}>
                    <Text style={styles.footerBoxes}>Reset all</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={applyFilters}>
                    <Text style={styles.footerBoxes}>Apply filters</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 35,
        borderRadius: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        
    },
    headerTitleContainer: {
    },
    headerTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
    },

    infoCard: {
        //backgroundColor: '#f7f7f7',
        padding: 10,
        //borderRadius: 10,
        //shadowColor: '#000',
        //shadowOffset: { width: 0, height: 2 },
        //shadowOpacity: 0.4,
        //shadowRadius: 4,
        //elevation: 5,
        marginBottom: 20,
        //marginHorizontal: 5,
    },
    expandedInfoCard: {
        minHeight: 300, // Adjust to ensure enough space when CalendarPicker is visible
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 10,
    },
    // Date picker
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        paddingVertical:10,
        backgroundColor: '#e9e9e9',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 18,
        color: '#aaa',
        marginRight: 5,
    },    
    // Options selection
    selectionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    tag: {
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
        padding: 12,
        margin: 5,
    },
    tagSelected: {
        backgroundColor: '#FF914D', // Slightly darker color when selected
    },
    tagTextSelected: {
       color: '#fff', // Slightly darker color when selected
    },
    showMore: {
        color: '#000000',
        marginLeft: 5,
        marginTop: 5,
        textDecorationLine: 'underline',
    }, 

    // Sliders
    sliderContainer:{
        marginBottom: 10,
    },

    //Footer
    footerContainer:{
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor:'#FF914D',
    },
    footerBoxes:{
        backgroundColor: '#FF914D',
        borderWidth:2, 
        borderColor: '#fff',
        borderRadius: 20,
        padding: 12,
        //margin: 5,
        color: '#fff', // Slightly darker color when selected
        fontWeight: 'bold',
    },


});

export default FilterScreen;
