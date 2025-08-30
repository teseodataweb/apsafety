import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { AuthProvider } from './context/AuthContext';
import AllRoute from './main-component/router';
import './App.css';
import './css/mobile-responsive.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <AllRoute />
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
