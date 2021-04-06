import { combineReducers } from 'redux';

import settingsReducer from './settings';
import questionsReducer from './questions';
import queueReducer from './queue';
import timerReducer from './timer';

export default combineReducers({
  settingsReducer,
  questionsReducer,
  queueReducer,
  timerReducer,
});
