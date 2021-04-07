import { TICK, SET_QUIZ_TIME } from '../constants';

const initialState = { timeElapsed: 0, quizTime: 0, questionTime: 30 };

export default function timerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_QUIZ_TIME:
      return {
        ...state,
        quizTime: action.time,
      };
    case TICK:
      return { ...state, timeElapsed: state.timeElapsed + 1 };
    default:
      return state;
  }
}
