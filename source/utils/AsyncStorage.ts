import AsyncStorage from "@react-native-async-storage/async-storage";

const _getAStore = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key.toString())
    const data = jsonValue !== null ? JSON.parse(jsonValue) : undefined;
    return data;
  } catch (e) {
    // error reading value
    console.log("@loginInfo::LastSync::Storage Error", e);
    return [];
  }
}

const _setAStore = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key.toString(), jsonValue);
    return true;
  } catch (e) {
    // saving error
    console.warn(`${key}::Storage Error:::`, e);
    return false;
  }
}

export { _getAStore, _setAStore }