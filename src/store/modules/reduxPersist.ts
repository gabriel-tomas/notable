import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { Reducer, Action } from 'redux';
import { ActionProtocol } from './pages/interfaces';

export default (reducers: Reducer<Action<string>, ActionProtocol>) => {
  const persistedReducers = persistReducer(
    {
      key: 'Note-App',
      storage,
      whitelist: ['pages', 'currentPageID'],
    },
    reducers,
  );

  return persistedReducers;
};
