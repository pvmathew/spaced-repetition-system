import React, { Component } from 'react';

import { Provider } from 'react-redux';

import store from './store';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>Why hello there!</div>
      </Provider>
    );
  }
}
