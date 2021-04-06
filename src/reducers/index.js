import { combineReducers } from 'redux';

import settingsReducer from './settings';
import questionsReducer from './questions';
import queueReducer from './queue';

export default combineReducers({
  settingsReducer,
  questionsReducer,
  queueReducer,
});
