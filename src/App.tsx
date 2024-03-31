import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

import Editor from './components/Editor';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Editor />
      </PersistGate>
    </Provider> 
  );
}

export default App
