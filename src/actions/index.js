import { GET_QUESTIONS_SAGA, SET_QUESTIONS } from '../constants';

export function setQuestions(questions) {
  return {
    type: SET_QUESTIONS,
    questions,
  };
}

//Sagas
export function getQuestionsSaga() {
  return {
    type: GET_QUESTIONS_SAGA,
  };
}
