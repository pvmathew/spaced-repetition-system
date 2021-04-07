import { TICK, SET_QUIZ_TIME, DECREASE_QUESTION_TIME } from '../constants';

const initialState = { elapsedTime: 0, quizTime: 0, questionTime: 30 };

export default function timerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_QUIZ_TIME:
      return {
        ...state,
        quizTime: action.time,
      };
    case DECREASE_QUESTION_TIME:
      return {
        ...state,
        questionTime: state.questionTime - 5,
      };
    case TICK:
      return { ...state, elapsedTime: state.elapsedTime + 1 };
    default:
      return state;
  }
}
