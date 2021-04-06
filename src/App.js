import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Quiz from './components/Quiz';

const App = () => (
  <Provider store={store}>
    <Quiz />
  </Provider>
);

export default App;
