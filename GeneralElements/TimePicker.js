import React, { useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TimePicker = ({ timeSelected, availableTimes, onTimeSelect }) => {
    const [selectedTime, setSelectedTime] = React.useState(timeSelected);

    useEffect(() => {
        // Update selectedTime whenever timeSelected changes
        setSelectedTime(timeSelected);
    }, [timeSelected]);

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
        if (onTimeSelect) {
            onTimeSelect(time);
        }
    };

    const numColumns = 3;
    const totalItems = availableTimes.length;
    const fullRows = Math.floor(totalItems / numColumns);
    const itemsInLastRow = totalItems - fullRows * numColumns;
    const numPlaceholders = itemsInLastRow === 0 ? 0 : numColumns - itemsInLastRow;
    const dataWithPlaceholders = [...availableTimes, ...Array(numPlaceholders).fill(null)];

    return (
        <View style={styles.container}>
            <FlatList
                key={`timePicker-${numColumns}`}
                data={dataWithPlaceholders}
                keyExtractor={(item, index) => item || `placeholder-${index}`}
                renderItem={({ item }) => {
                    if (item === null) {
                        return <View style={[styles.timeOption, styles.placeholder]} />;
                    }

                    return (
                        <TouchableOpacity
                            onPress={() => handleTimeSelect(item)}
                            style={[
                                styles.timeOption,
                                selectedTime === item && styles.selectedTimeOption
                            ]}
                        >
                            <Text
                                style={[
                                    styles.timeText,
                                    selectedTime === item && styles.selectedTimeText
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
                numColumns={numColumns}
                contentContainerStyle={styles.timeList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default TimePicker;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    timeList: {
        flexDirection: 'column',
    },
    timeOption: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 60,
    },
    selectedTimeOption: {
        backgroundColor: '#FF914D',
        borderColor: '#FF914D',
    },
    timeText: {
        fontSize: 16,
        color: '#333',
    },
    selectedTimeText: {
        color: '#fff',
    },
    placeholder: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
});
