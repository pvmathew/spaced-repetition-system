import { combineReducers } from 'redux';

import questionsReducer from './questions';
import queueReducer from './queue';
import timerReducer from './timer';

export default combineReducers({
  questionsReducer,
  queueReducer,
  timerReducer,
});
