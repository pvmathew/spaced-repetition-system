import {
  ANSWERED_CORRECTLY,
  ANSWERED_INCORRECTLY,
  SET_QUESTIONS,
} from '../constants';

const initialState = { questions: [], numCorrect: 0, numWrong: 0 };

export default function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case ANSWERED_CORRECTLY: {
      return { ...state, numCorrect: state.numCorrect + 1 };
    }
    case ANSWERED_INCORRECTLY: {
      return { ...state, numWrong: state.numWrong + 1 };
    }
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      };
    default:
      return state;
  }
}
