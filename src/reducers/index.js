import { combineReducers } from 'redux';

import settingsReducer from './settings';
import questionsReducer from './questions';

export default combineReducers({
  settingsReducer,
  questionsReducer,
});
