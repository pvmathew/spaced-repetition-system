import {
  SET_QUESTIONS,
  SET_QUIZ_TIME,
  START_QUIZ_SAGA,
  GET_QUESTIONS,
} from '../constants';

export function setQuizTime(time) {
  return { type: SET_QUIZ_TIME, time };
}

export function getQuestions() {
  return {
    type: GET_QUESTIONS,
  };
}
export function setQuestions(questions) {
  return {
    type: SET_QUESTIONS,
    questions,
  };
}

//Sagas
export function startQuizSaga() {
  return { type: START_QUIZ_SAGA };
}
