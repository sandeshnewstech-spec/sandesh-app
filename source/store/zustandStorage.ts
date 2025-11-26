import { createMMKV } from 'react-native-mmkv'
import { zuStandStoreOBJ } from '../utils';
import { StateStorage } from 'zustand/middleware';

export const storage = createMMKV();

const zuStandStorage: StateStorage/* : PersistStorage<IAppState> */ = {
    ...storage,
    getItem: (name: string) => JSON.parse(storage.getString(name) || JSON.stringify(zuStandStoreOBJ)),
    setItem: (name: string, value: string) => storage.set(name, JSON.stringify(value)),
    removeItem: (name: string) => storage.remove(name),
};

const exStorage = createMMKV();

export default zuStandStorage;
export { exStorage };