// asyncStorageUtils.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import sampleData from '../sampledata';

// Key for storing events in AsyncStorage
const EVENTS_KEY = 'joaoEvents';
const RITA_EVENTS_KEY = 'ritaEvents';

// Retrieve events from AsyncStorage
export const getEvents = async () => {
    try {
        const events = await AsyncStorage.getItem(EVENTS_KEY);
        return events != null ? JSON.parse(events) : sampleData.joaoEvents;  // Return empty array if no events
    } catch (e) {
        console.error('Failed to fetch events from AsyncStorage:', e);
        return [];
    }
};

// Save events to AsyncStorage
export const saveEvents = async (events) => {
    try {
        await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(events));
    } catch (e) {
        console.error('Failed to save events to AsyncStorage:', e);
    }
};

// Retrieve events from AsyncStorage
export const getRitaEvents = async () => {
    try {
        const events = await AsyncStorage.getItem(RITA_EVENTS_KEY);
        return events != null ? JSON.parse(events) : sampleData.ritaEvents;  // Return empty array if no events
    } catch (e) {
        console.error('Failed to fetch events from AsyncStorage:', e);
        return [];
    }
};

// Save events to AsyncStorage
export const saveRitaEvents = async (events) => {
    try {
        await AsyncStorage.setItem(RITA_EVENTS_KEY, JSON.stringify(events));
    } catch (e) {
        console.error('Failed to save events to AsyncStorage:', e);
    }
};
