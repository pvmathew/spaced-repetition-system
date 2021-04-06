import { SET_QUESTIONS } from '../constants';

const initialState = { questions: [] };

export default function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      };
    default:
      return state;
  }
}
