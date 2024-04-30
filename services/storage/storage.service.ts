import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key: string, data: any) => {
    try {
        await AsyncStorage.setItem('stock_data', JSON.stringify({ [key]: data }));
    } catch (e) {
        alert('Failed to save the data to the storage');
    }
};

export const removeItem = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        alert(`Failed to clear storage item ${key}`)
    }
};