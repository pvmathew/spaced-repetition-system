import {
  SET_QUESTIONS,
  SET_QUIZ_TIME,
  TICK,
  START_QUIZ_SAGA,
  INIT_PRIORITY_QUEUE,
  POP_NEXT_KEY,
  ANSWERED_CORRECTLY,
  ANSWERED_INCORRECTLY,
  ANSWER_QUESTION_SAGA,
} from '../constants';

export function setQuizTime(time) {
  return { type: SET_QUIZ_TIME, time };
}

export function tick() {
  return { type: TICK };
}

export function setQuestions(questions) {
  return {
    type: SET_QUESTIONS,
    questions,
  };
}

export function initPriorityQueue() {
  return {
    type: INIT_PRIORITY_QUEUE,
  };
}

export function popNextKey() {
  return {
    type: POP_NEXT_KEY,
  };
}

export function answeredCorrectly() {
  return {
    type: ANSWERED_CORRECTLY,
  };
}

export function answeredIncorrectly() {
  return {
    type: ANSWERED_INCORRECTLY,
  };
}

//Sagas
export function startQuizSaga() {
  return { type: START_QUIZ_SAGA };
}

export function answerQuestionSaga(bool) {
  return { type: ANSWER_QUESTION_SAGA, correct: bool };
}
