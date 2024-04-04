import { persistStore } from 'redux-persist';
import { Action, Reducer, legacy_createStore as createStore } from 'redux';

import persistedReducers from './modules/reduxPersist';

import rootReducer from './modules/rootReducer';
import { ActionProtocol } from './modules/pages/interfaces';

const store = createStore(
  persistedReducers(
    rootReducer as unknown as Reducer<Action<string>, ActionProtocol>,
  ),
);

export const persistor = persistStore(store);
export default store;
