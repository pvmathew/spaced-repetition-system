import {
  GRADUATE_QUESTION,
  GRADUATE_QUESTION_CAUTIOUSLY,
  INCREASE_GRADUATED_INTERVAL,
  INCREMENT_NUM_CORRECT,
  INCREMENT_NUM_WRONG,
  LEVEL_UP_QUESTION,
  RESET_QUESTION_LEVEL,
  SET_QUESTIONS,
} from '../constants';

const initialState = { questions: [], numCorrect: 0, numWrong: 0 };

export default function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_NUM_CORRECT: {
      return { ...state, numCorrect: state.numCorrect + 1 };
    }
    case INCREMENT_NUM_WRONG: {
      return { ...state, numWrong: state.numWrong + 1 };
    }
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      };

    case LEVEL_UP_QUESTION: // level range 0-3; 3 means the question is graduated
      return {
        ...state,
        questions: state.questions.map((question, i) =>
          i === action.key
            ? { ...question, learningLevel: question.learningLevel + 1 }
            : question
        ),
      };

    case GRADUATE_QUESTION:
      return {
        ...state,
        questions: state.questions.map((question, i) =>
          i === action.key
            ? { ...question, learningLevel: 3, isGraduated: true }
            : question
        ),
      };

    case GRADUATE_QUESTION_CAUTIOUSLY: // if a previously lapsed card is graduating, show it sooner than the last time it graduated
      return {
        ...state,
        questions: state.questions.map((question, i) =>
          i === action.key
            ? {
                ...question,
                learningLevel: 3,
                isGraduated: true,
                currentGraduatedInterval:
                  question.currentGraduatedInterval * 0.8,
              }
            : question
        ),
      };

    case INCREASE_GRADUATED_INTERVAL: // if a graduated card is answered correctly, increase the time until it appears again
      return {
        ...state,
        questions: state.questions.map((question, i) =>
          i === action.key
            ? {
                ...question,
                currentGraduatedInterval:
                  question.currentGraduatedInterval * question.startingEase,
              }
            : question
        ),
      };

    case RESET_QUESTION_LEVEL: // jf a question is answered wrong, reset its level back to 0
      return {
        ...state,
        questions: state.questions.map((question, i) =>
          i === action.key
            ? {
                ...question,
                learningLevel: 0,
                // jf a graduated card is answered incorrectly, lower the modifier used for increasing its graduated interval
                startingEase:
                  action.lapsed && question.startingEase > 1.5
                    ? question.startingEase - 0.2
                    : question.startingEase,
                lapsed: action.lapsed,
                isGraduated: false,
              }
            : question
        ),
      };
    default:
      return state;
  }
}
