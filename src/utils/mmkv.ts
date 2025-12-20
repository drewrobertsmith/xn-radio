import { createMMKV } from "react-native-mmkv";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

export const mmkv = createMMKV();

export const mmkvStorage = {
  setItem: (key: any, value: any) => {
    mmkv.set(key, value);
    return Promise.resolve();
  },
  getItem: (key: any) => {
    const value = mmkv.getString(key);
    return Promise.resolve(value ? value : null);
  },
  removeItem: (key: any) => {
    mmkv.remove(key);
    return Promise.resolve();
  },
};

export const clientPersister = createAsyncStoragePersister({
  storage: mmkvStorage,
});
