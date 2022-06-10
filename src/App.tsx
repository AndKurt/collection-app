import React from 'react';
import { Provider } from 'react-redux';
import { Footer, Header, Router } from './components';
import { setupStore } from './redux/store';

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Router />
      <Footer />
    </Provider>
  );
}

export default App;
