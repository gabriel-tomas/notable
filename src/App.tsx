import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

import Editor from './components/Editor';
import SideMenu from './components/SideMenu';

import './styles/main-layout.css';
import './styles/colors.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="main-layout">
          <SideMenu />
          <Editor />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
