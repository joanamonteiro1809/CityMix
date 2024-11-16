import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

const CalendarPicker = ({ date, onDateChange, disableMode }) => {
  const today = dayjs().startOf('day').toDate(); // Convert dayjs object to a JS Date, set to start of today

  const disableDates = disableMode? (date) => dayjs(date).isBefore(today) : ''; // disable days before today
  return (
    <View style={styles.container}>
      <DateTimePicker
        mode="single"
        date={date}
        disabledDates={disableDates}
        selectedItemColor='#FF914D'
        onChange={(params) => onDateChange(params.date)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CalendarPicker;
