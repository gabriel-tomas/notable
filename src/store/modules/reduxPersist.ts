import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { Reducer, Action } from 'redux';

export default (reducers: Reducer<unknown, Action>) => {
  const persistedReducers = persistReducer(
    {
      key: 'Note-App',
      storage,
      whitelist: ['pages'],
    },
    reducers,
  );

  return persistedReducers;
};
