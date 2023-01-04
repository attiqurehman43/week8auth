import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authSlice from '../redux/authSlice';

import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

let persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

let rootReducer = combineReducers({
  userAuth: authSlice,
});

let persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
