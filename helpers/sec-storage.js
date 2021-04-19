import * as SecureStore from "expo-secure-store";

// Avalability Check
const isAvailable = async () => {
  try {
    let avalability = await SecureStore.isAvailableAsync();
    return avalability;
  } catch (error) {
    console.error(error.message);
  }
};

// Save
export const save = async (key, value) => {
  try {
    let availability = await isAvailable();
    if (availability) {
      await SecureStore.setItemAsync(key, value);
    }
  } catch (error) {
    console.error(error.message);
  }
};

// Get
export const getValueFor = async (key) => {
  try {
    let result = await SecureStore.getItemAsync(key);
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

// Delete
export const deleteValueFor = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(error.message);
  }
};
