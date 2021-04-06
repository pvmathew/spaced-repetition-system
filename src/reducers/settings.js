import { SET_QUIZ_TIME } from '../constants';

const initialState = { quizTime: 0 };

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_QUIZ_TIME:
      return {
        ...state,
        quizTime: action.time,
      };
    default:
      return state;
  }
}
