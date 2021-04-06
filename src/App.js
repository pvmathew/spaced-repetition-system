import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Provider } from 'react-redux';

import store from './store';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Settings from './components/Settings';

const App = () => (
  <Provider store={store}>
    <Grid style={{ height: '100vh' }} verticalAlign='middle' centered>
      <Grid.Column style={{ maxWidth: '600px' }}>
        <Settings />
      </Grid.Column>
    </Grid>
  </Provider>
);

export default App;
