import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Settings from './components/Settings';

const App = () => (
  <Provider store={store}>
    <Settings />
  </Provider>
);

export default App;
